import { ReactElement } from "shared/ReactElementType";
import {
  Fiber,
  FunctionComponent,
  HostComponent,
  HostRoot,
  HostText,
  WorkTag,
} from "./ReactInternalTypes";

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
  let fiberTag: WorkTag =
    typeof type === "function" ? FunctionComponent : HostComponent;
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

// 创建纯文本fiber
export function createFiberFromText(text: string): Fiber {
  const fiber: Fiber = createFiber(HostText, null);
  fiber.pendingProps = text;
  return fiber;
}

// 创建HostRotFiber的方法
export function createHostRootFiber(): Fiber {
  const fiber = createFiber(HostRoot, null);
  return fiber;
}
