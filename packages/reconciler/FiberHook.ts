import { Fiber } from "./ReactInternalTypes";
import { updateOnFiber } from "./WorkLoop";

export type Hook = {
  memoizedState: any;
  next: Hook | null;
};

// 当前正在渲染的fiber
let currentlyRenderingFiber: Fiber | null = null;
// 当前工作的hook
let workInProgressHook: Hook | null = null;

// 定义一个导出的状态管理hook
export let useState: any = null;

/**
 * 更新组件状态值
 * 1. 更改状态值
 * 2. 重新渲染组件
 * @param newState 新的状态值
 */
function setState(newState: any) {
  const hook = currentlyRenderingFiber?.memoizedState;
  hook.memoizedState = newState;
  updateOnFiber(currentlyRenderingFiber!);
}

/**
 * mount阶段创建hook对象
 * @param initialState 初始状态
 * @returns hook对象
 */
function mountWorkInProgressHook(initialState: any) {
  const hook: Hook = {
    memoizedState: initialState,
    next: null,
  };
  if (workInProgressHook === null) {
    // 如果当前工作的hook为空，说明是第一个hook，将hook挂载到fiber的memoizedState上
    currentlyRenderingFiber!.memoizedState = hook;
  } else {
    // 否则将hook挂载到当前工作的hook的next上
    workInProgressHook.next = hook;
  }
  // 将当前工作的hook指向新创建的hook
  workInProgressHook = hook;
  return hook;
}

/**
 * 首次构建时状态管理的hook
 * 1. 创建一个hook
 * 2. 将hook挂载到fiber的memoizedState上
 * 3. 返回状态和更新状态的方法
 * @param initialState 初始状态
 * @returns [state, setState]
 */
export function mountState(initialState: any) {
  const hook = mountWorkInProgressHook(initialState);
  return [hook.memoizedState, setState];
}

/**
 * 更新时状态管理的hook
 * 1. 获取当前fiber的hook
 * 2. 返回状态和更新状态的方法
 * @returns [state, setState]
 */
export function updateState() {
  const hook = currentlyRenderingFiber?.memoizedState;
  return [hook.memoizedState, setState];
}

/**
 * 渲染函数组件，考虑hooks，并返回组件的返回值
 * 1. 设置当前正在渲染的fiber
 * 2. 执行函数组件的函数
 * @param {Fiber} workInProgress 当前正在渲染的fiber
 * @param Component 函数组件
 * @returns 组件的返回值
 */
export function renderWithHooks(workInProgress: Fiber, Component: any) {
  currentlyRenderingFiber = workInProgress;
  if (currentlyRenderingFiber.memoizedState === null) {
    console.log("首次构建");
    useState = mountState;
  } else {
    console.log("更新");
    useState = updateState;
  }
  return Component();
}
