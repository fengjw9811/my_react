import { MULTIPLE_ELEMENT } from "../data";
import { createFiberFromElement } from "../Fiber";
import { HostComponent, HostText } from "../ReactInternalTypes";
import { workLoop } from "../WorkLoop";

describe("workLoop测试", () => {
  test("测试Fiber构建", () => {
    const container_fiber = createFiberFromElement(MULTIPLE_ELEMENT);
    workLoop(container_fiber);
    // 测试根节点
    expect(container_fiber.tag).toBe(HostComponent);
    expect(container_fiber.type).toBe("div");
    expect(container_fiber.stateNode.childNodes.length).toBe(2);
    // 测试h1节点
    const h1_fiber = container_fiber.child!;
    expect(h1_fiber).not.toBeNull();
    expect(h1_fiber.tag).toBe(HostComponent);
    expect(h1_fiber.child).toBeNull();
    expect(h1_fiber.stateNode).not.toBeNull();
    expect(h1_fiber.stateNode.tagName).toBe("H1");
    expect(h1_fiber.stateNode.textContent).toBe("Hello,my react!!!");
    // 测试p节点
    const p_fiber = h1_fiber.sibling!;
    expect(p_fiber).not.toBeNull();
    expect(p_fiber.tag).toBe(HostComponent);
    expect(p_fiber.stateNode.tagName).toBe("P");
    expect(p_fiber.stateNode.childNodes.length).toBe(2);
    // 测试p节点的第一个子节点
    const p_first_child = p_fiber.child!;
    expect(p_first_child).not.toBeNull();
    expect(p_first_child.tag).toBe(HostText);
    expect(p_first_child.stateNode.tagName).toBeUndefined();
    expect(p_first_child.stateNode.textContent).toBe("du1 react ");
    // 测试p节点的第二个子节点
    const p_second_child = p_first_child.sibling!;
    expect(p_second_child).not.toBeNull();
    expect(p_second_child.tag).toBe(HostComponent);
    expect(p_second_child.stateNode.tagName).toBe("SPAN");
    expect(p_second_child.stateNode.textContent).toBe("span text");
  });
});
