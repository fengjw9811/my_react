import { reconcileChildFibers } from "./ChildFiber";
import { Fiber } from "./ReactInternalTypes";

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
  // 1. 创建子节点
  fiber.child = reconcileChildFibers(fiber, fiber.pendingProps.children);
  return fiber.child;
}
