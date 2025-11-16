import { reconcileChildFibers } from "./ChildFiber";
import {
  Fiber,
  FunctionComponent,
  HostComponent,
  HostText,
} from "./ReactInternalTypes";

/**
 * 遍历开始阶段要做的工作
 * @param fiber 父节点
 * @returns 子节点
 */
export function beginWork(fiber: Fiber): Fiber | null {
  // 纯文本节点
  if (typeof fiber.pendingProps.children === "string") {
    return null;
  }
  switch (fiber.tag) {
    case HostText:
      return null;
    case FunctionComponent:
      const children = fiber.type();
      fiber.child = reconcileChildFibers(fiber, children);
      return fiber.child;
    case HostComponent:
      fiber.child = reconcileChildFibers(fiber, fiber.pendingProps.children);
      return fiber.child;
    default:
      return null;
  }
}
