module.exports = class StepExecute {
  constructor(callback, time) {
    this.timer = null;
    this.time = time;
    this.callback = callback;
  }

  execute() {
    if (!this.time)
      return this.callback();

    this.timer = window.setTimeout(this.callback, this.time);
  }

  cancel() {
    if (this.timer)
      window.clearTimeout(this.timer);
  }
};
