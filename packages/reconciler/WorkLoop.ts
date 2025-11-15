import { beginWork } from "./BeginWork";
import { completeWork } from "./CompleteWork";
import { Fiber } from "./ReactInternalTypes";

/**
 * 遍历Fiber节点，完成对应工作
 * @param fiber
 * @returns {void}
 */
export function workLoop(fiber: Fiber): void {
  let child = beginWork(fiber);
  if (child) {
    workLoop(child);
  }
  completeWork(fiber);
  if (fiber.sibling) {
    workLoop(fiber.sibling);
  } else {
    return;
  }
}
