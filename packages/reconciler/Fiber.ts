import { ReactElement } from "shared/ReactElementType";
import { Fiber, HostComponent, WorkTag } from "./ReactInternalTypes";

export function createFiber(tag: WorkTag, key: string | null): Fiber {
  const fiber: Fiber = {
    tag,
    key,
    elementType: null,
    type: null,
    stateNode: null,
    return: null,
    child: null,
    sibling: null,
    ref: null,
    pendingProps: null,
  };
  return fiber;
}

export function createFiberFromTypeAndProps(
  type: any,
  pendingProps: any,
  key: string | null
): Fiber {
  let fiberTag: WorkTag = HostComponent;
  const fiber = createFiber(fiberTag, key);
  fiber.elementType = type;
  fiber.type = type;
  fiber.pendingProps = pendingProps;
  return fiber;
}

// ReactElement -> FiberNode
export function createFiberFromElement(element: ReactElement): Fiber {
  const { type, props, key } = element;
  const fiber: Fiber = createFiberFromTypeAndProps(type, props, key);
  return fiber;
}
