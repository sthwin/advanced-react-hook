export const createEventEmitter = (value: unknown): EventEmitter => {
    let handlers: ((value: unknown) => void)[] = [];
  
    const on = (handler: (value: unknown) => void) => handlers.push(handler);
    const off = (handler: (value: unknown) => void) => {
      handlers = handlers.filter((h) => h !== handler);
    };
  
    const get = () => value;
    const set = (newValue: unknown) => {
      value = newValue;
      console.log("emitter set", value)
      handlers.forEach((handler) => handler(value));
    };
  
    return {
      on,
      off,
      get,
      set,
    }
  }


  // createEventEmitter 의 반환 타입을 정의
  export type EventEmitter = {
    on: (handler: (value: unknown) => void) => void;
    off: (handler: (value: unknown) => void) => void;
    get: () => unknown;
    set: (value: unknown) => void;
  }