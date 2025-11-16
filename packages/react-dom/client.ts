import { ReactElement } from "shared/ReactElementType";
import { createContainer, updateContainer } from "reconciler/FiberReconciler";
import { Fiber } from "reconciler/ReactInternalTypes";

type ReactDOMRootType = {
  _internalRoot: Fiber;
  render: (element: ReactElement) => void;
};

function ReactDOMRoot(hostRootFiber: Fiber): ReactDOMRootType {
  return {
    _internalRoot: hostRootFiber,
    render: function (element: ReactElement) {
      updateContainer(element, this._internalRoot);
    },
  };
}

/**
 * 初始化react，创建根节点
 * @param {HTMLElement} containerInfo
 * @returns {ReactDOMRootType}
 */
export function createRoot(containerInfo: HTMLElement): ReactDOMRootType {
  const hostRootFiber = createContainer(containerInfo);
  return ReactDOMRoot(hostRootFiber);
}

export { useState } from "reconciler/FiberHook";
