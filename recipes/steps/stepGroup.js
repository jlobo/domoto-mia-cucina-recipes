module.exports = class StepGroup {
  constructor(...steps) {
    this.steps = steps;
  }

  execute() {
    for (const step of this.steps)
      step.execute();
  }

  cancel() {
    for (const step of this.steps)
      step.cancel();
  }
};
