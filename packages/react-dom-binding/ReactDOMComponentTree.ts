/**
 * DOM和Fiber之间关联的工具类
 */

import { Fiber } from "reconciler/ReactInternalTypes";
import { Instance } from "./FiberConfigDom";

// 属性的唯一性——随机字符串
let randomKey = Math.random().toString(36).substring(2);
export let internalInstanceKey = "__reactFiber$" + randomKey;

/**
 * 给DOM元素添加属性并设置值
 * @param {Fiber} fiber
 * @param {instance} instance
 */
export function precacheFiberNode(fiber: Fiber, instance: Instance) {
  (instance as any)[internalInstanceKey] = fiber;
}
