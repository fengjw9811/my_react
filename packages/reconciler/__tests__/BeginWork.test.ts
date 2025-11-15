import { beginWork } from "../BeginWork";
import { SINGLE_ELEMENT } from "../data";
import { createFiberFromElement } from "../Fiber";

describe("beginWork测试", () => {
  it("单节点测试", () => {
    const root_fiber = createFiberFromElement(SINGLE_ELEMENT);
    const child_fiber = beginWork(root_fiber);
    expect(child_fiber.type).toBe("p");
    expect(root_fiber.pendingProps).not.toBeNull();
    expect(child_fiber.pendingProps).not.toBeNull();
  });
});
