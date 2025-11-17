import { appendChild } from "react-dom-binding/FiberConfigDom";
import { Fiber } from "./ReactInternalTypes";

/**
 * 提交之突变副作用
 * 更新dom树
 * @param {Fiber} fiber hostRootFiber
 */
export function commitMutationEffects(fiber: Fiber) {
  appendChild(fiber.stateNode.containerInfo, fiber.child?.stateNode);
}
