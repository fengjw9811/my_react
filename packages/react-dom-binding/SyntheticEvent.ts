// 合成事件

/**
 * 合成事件类型
 * nativeEvent: 原生事件
 * currentTarget: 当前事件目标
 * stopPropagation: 阻止事件冒泡
 * isPropagationStopped: 是否阻止事件冒泡
 */
type SyntheticEvent = {
  nativeEvent: Event;
  currentTarget: EventTarget | null;
  stopPropagation: () => void;
  isPropagationStopped: () => boolean;
};

// 函数方式返回true
function functionThatReturnsTrue() {
  return true;
}

// 函数方式返回false
function functionThatReturnsFalse() {
  return false;
}

// 合成事件构造函数接口，包含构造签名
interface SyntheticEventConstructor {
  new (nativeEvent: Event): SyntheticEvent;
}

const SyntheticEvent = function (this: SyntheticEvent, nativeEvent: Event) {
  this.nativeEvent = nativeEvent;
  this.currentTarget = null;
} as unknown as SyntheticEventConstructor;

SyntheticEvent.prototype = {
  stopPropagation() {
    this.isPropagationStopped = functionThatReturnsTrue;
  },
  isPropagationStopped: functionThatReturnsFalse,
};

/**
 * 创建合成事件
 * @param nativeEvent 原生事件
 * @returns 合成事件
 */
export function createSyntheticEvent(nativeEvent: Event): SyntheticEvent {
  return new SyntheticEvent(nativeEvent);
}
