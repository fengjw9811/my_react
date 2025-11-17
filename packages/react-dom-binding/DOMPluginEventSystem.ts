// dom插件之事件系统
import { Fiber, HostComponent } from "reconciler/ReactInternalTypes";
import { internalInstanceKey } from "./ReactDOMComponentTree";
import { createSyntheticEvent } from "./SyntheticEvent";

// 顶层事件之原生dom事件到React事件的映射
const topLevelEventsToReactEvents: Map<string, string> = new Map([
  ["click", "onClick"],
]);

/**
 * 事件监听器
 * listener 方法
 * currentTarget 当前事件目标
 * fiber (instance) Fiber
 */
type DispatchListener = {
  listener: Function;
  currentTarget: EventTarget | null;
  fiber: Fiber | null;
};

/**
 * 创建事件监听器
 * @param {Fiber} fiber (instance) Fiber
 * @param {Function} listener 方法
 * @param {EventTarget} currentTarget 当前事件目标
 * @returns {DispatchListener} 事件监听器
 */
export function createDispatchListener(
  fiber: Fiber | null,
  listener: Function,
  currentTarget: EventTarget | null
): DispatchListener {
  return {
    listener,
    currentTarget,
    fiber,
  };
}

/**
 * 收集事件
 * 累计单相监听器-收集单一阶段的方法
 * @param {Fiber} targetFiber (instance)
 * @param {string} reactName React事件名
 * @returns {DispatchListener[]} 方法的集合
 */
export function accumulateSinglePhaseListeners(
  targetFiber: Fiber,
  reactName: string
): DispatchListener[] {
  let fiber: Fiber | null = targetFiber;
  const listeners: DispatchListener[] = [];
  while (fiber) {
    const { pendingProps, tag } = fiber;
    if (tag === HostComponent) {
      const listener = pendingProps[reactName];
      if (typeof listener === "function") {
        listeners.push(
          createDispatchListener(fiber, listener, fiber.stateNode)
        );
      }
    }
    fiber = fiber.return;
  }
  return listeners;
}

/**
 * 执行事件
 * 按顺序处理事件队列中的事件
 * @param {any} event 事件
 * @param {any[]} listeners 事件的集合
 */
export function processEventQueueItemsInOrder(
  event: any,
  listeners: DispatchListener[]
) {
  for (let i = 0; i < listeners.length; i++) {
    const { listener, currentTarget } = listeners[i];
    event.currentTarget = currentTarget;
    listener(event);
    event.currentTarget = null;
    if (event.isPropagationStopped()) {
      return;
    }
  }
}

/**
 * 监听所有支持的事件
 * @param rootContainerElement 根元素
 */
export function listenToAllSupportedEvents(rootContainerElement: HTMLElement) {
  topLevelEventsToReactEvents.forEach((reactName, nativeEvent) => {
    // 根元素添加事件监听，当捕获到事件触发时，找到event.target对应的fiber，执行fiber的对应方法
    rootContainerElement.addEventListener(nativeEvent, (e) => {
      const listeners = accumulateSinglePhaseListeners(
        (e.target as any)[internalInstanceKey],
        reactName
      );
      const syntheticEvent = createSyntheticEvent(e);
      processEventQueueItemsInOrder(syntheticEvent, listeners);
      console.log(reactName);
    });
  });
}
