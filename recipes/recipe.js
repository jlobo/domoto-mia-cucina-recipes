const EventEmitter = require('events');

module.exports = class Recipe extends EventEmitter {
  constructor(stove) {
    super();

    this.stove = stove;
    this.volume = 2;
    this.banner = '';
    this.description = '';
    this._stepIndex = 0;
    this._canNext = true;
    this._message = null;
    this._ingredients = null;
    this.next = this.next.bind(this);
    this._steps = Array.from(this.buildSteps());
  }

  getIngredients() {
    throw new Error('you must set the ingredients');
  }

  buildSteps() {
    throw new Error('You must create the steps to return');
  }

  get message() {
    return this.isStarting ? this._ingredients : this._message;
  }

  get canNext() {
    return this._canNext;
  }

  set volume(value) {
    this._volume = value;
  }

  get volume() {
    return this._volume;
  }

  get isEnding() {
    return this._stepIndex >= this._steps.length;
  }

  get isCooking() {
    return !this.isStarting && !this.isEnding;
  }

  get isStarting() {
    return this._stepIndex === 0;
  }

  stop() {
    if (!this._stepIndex)
      return;

    this._steps[this._stepIndex - 1].cancel();
    this.stove.turnOff();
    this._stepIndex = 0;
    this._canNext = true;
  }

  next() {
    if (this.isEnding) {
      this._stepIndex = 0;
      return this.emit('start');
    } if (this.isStarting)
      this.emit('begin');

    this._steps[this._stepIndex].execute();
    this._stepIndex++;
    this.emit('show');
  }
};
