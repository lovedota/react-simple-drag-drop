import {EventEmitter} from 'events';
import Dispatcher     from '../cores/dispatcher';

interface Action {
  type: string;
}

class BaseStore extends EventEmitter {

  static handlers = new Map();

  changeEventName:string;

  constructor(changeEventName) {
    super();

    this.changeEventName = changeEventName;

    let self = this;

    Dispatcher.register((action: Action) => {
      if (BaseStore.handlers.has(action.type)) {
        let func: Function = BaseStore.handlers.get(action.type);
        func.apply(this, [action]);
      }
    });
  }

  addChangeListener(callback) {
    this.on(this.changeEventName, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.changeEventName, callback);
  }

  emitChange() {
    this.emit(this.changeEventName);
  }

  register(eventName, handler) {
    BaseStore.handlers.set(eventName, handler);
  }
}

export default BaseStore;
