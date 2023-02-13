const eventTypes = [
    "keypress",
    "mousemove",
    "mousedown",
    "scroll",
    "touchmove",
    "pointermove"
  ];
  
  interface ListenerFn {
    (): void;
  }
  
  export const addEventListeners = (listener: ListenerFn) => {
    eventTypes.forEach(type => {
      window.addEventListener(type, listener, false);
    });
  };
  
  export const removeEventListeners = (listener: ListenerFn | undefined) => {
    if (listener) {
      eventTypes.forEach(type => {
        window.removeEventListener(type, listener, false);
      });
    }
  };
  