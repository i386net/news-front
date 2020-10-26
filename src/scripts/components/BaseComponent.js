export default class BaseComponent {
  constructor() {
    this._listeners = [];
    this._addListener = this._addListener.bind(this);
  }
  _addListener({element, event, callback}) {
    if(element && event && callback) {
      element.addEventListener(event, callback);
    }
  }
  _setHandlers(listeners) {
    listeners.forEach(listener => {
      this._listeners.push(listener);
      this._addListener({...listener});
    });
  }
  _clearListeners() {
    this._listeners.forEach((listener => {
      const {element, event, callback} = listener;
      if(element && event && callback) {
        element.removeEventListener(event, callback);
      }
    }))
    this._listeners = [];
  }
}