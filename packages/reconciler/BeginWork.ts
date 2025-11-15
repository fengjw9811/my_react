import { createFiberFromElement } from "./Fiber";
import { Fiber } from "./ReactInternalTypes";

export function beginWork(fiber: Fiber): Fiber {
  return createFiberFromElement(fiber.pendingProps.children);
}
