import { ReactElement } from "shared/ReactElementType";
import { createFiberFromElement, createHostRootFiber } from "./Fiber";
import { createFiberRoot } from "./FiberRoot";
import { Fiber } from "./ReactInternalTypes";
import { workLoop } from "./WorkLoop";
import { listenToAllSupportedEvents } from "react-dom-binding/DOMPluginEventSystem";
import { commitMutationEffects } from "./CommitWork";

/**
 * 创建FiberRoot、HostRootFiber，并建立关联
 * @param containerInfo
 * @returns
 */
export function createContainer(containerInfo: HTMLElement) {
  const root = createFiberRoot(containerInfo);
  const hostRootFiber = createHostRootFiber();
  hostRootFiber.stateNode = root;
  listenToAllSupportedEvents(root.containerInfo);
  return hostRootFiber;
}

/**
 * 更新容器
 * 1. 构建子fiber
 * 2. 关联hostRootFiber和子fiber
 * 3. 挂载子fiber到root dom上
 * @param {ReactElement} element
 * @param {Fiber} root
 */
export function updateContainer(element: ReactElement, root: Fiber) {
  // 1. 构建子fiber
  const containerFiber = createFiberFromElement(element);
  workLoop(containerFiber);
  // 2. 关联hostRootFiber和子fiber
  root.child = containerFiber;
  containerFiber.return = root;
  // 3. 挂载子fiber到root dom上
  commitMutationEffects(root);
}
