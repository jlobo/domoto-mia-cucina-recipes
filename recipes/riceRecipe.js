const Recipe = require('./recipe');
const StepExecute = require('./steps/stepExecute');
const StepGroup = require('./steps/stepGroup');

module.exports = class RiceRecipe extends Recipe {
  constructor(stove) {
    super(stove);

    this.description = 'White Rice';
    this.banner = 'rice.jpg';
  }

  * getIngredients() {
    yield { can: this.volume, desc: 'Cup of white rice' };
    yield { can: this.volume * 2, desc: 'Cups of water' };
    yield { can: this.volume, desc: 'Teaspoon of salt' };
    yield { can: this.volume, desc: 'Spoonful of oil' };
    yield { can: this.volume, desc: 'Clove garlic minced' };
  }

  * buildSteps() {
    const disableNext = new StepExecute(() => (this._canNext = !this._canNext));

    yield new StepExecute(() => (this._message = '1. Wash rice'));

    yield new StepExecute(() => (this._message = '2. Add and stir ingredients'));

    yield new StepGroup(
      disableNext,
      new StepExecute(() => (this._message = '3. Wait for 20 minutes')),
      new StepExecute(this.stove.turnOn.bind(this.stove, { minutes: 20, temperature: 'high' })),
      new StepExecute(this.next, 5000)
    );

    yield new StepGroup(
      disableNext,
      new StepExecute(() => (this._message = '4. Cover the rice cooker')),
      new StepExecute(this.stove.turnOff.bind(this.stove))
    );

    yield new StepGroup(
      disableNext,
      new StepExecute(() => (this._message = '5. Wait for 15 minutes')),
      new StepExecute(this.stove.turnOn.bind(this.stove, { minutes: 15, temperature: 'low' })),
      new StepExecute(this.next, 5000)
    );

    yield new StepGroup(
      disableNext,
      new StepExecute(() => (this._message = '6. Finalized')),
      new StepExecute(this.stove.turnOff.bind(this.stove))
    );
  }
};
