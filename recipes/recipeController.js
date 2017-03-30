const FloatingButton = require('./floatingButton');

module.exports = class RecipeController {
  constructor(view) {
    this.view = view;
    this._recipe = null;

    this._titulo = view.querySelector('#titulo');
    this._banner = view.querySelector('#banner');
    this._message = view.querySelector('#message');
    this._btnFixed = new FloatingButton(view.querySelector('#btnFixed'), view.querySelector('#btnStop'));
    this._btnFixed.on('next', e => this._onNext(e));
    this._btnFixed.on('stop', e => this._onStop(e));
  }

  set recipe(recipe) {
    if (!recipe || this._recipe === recipe)
      return;

    if (this._recipe)
      this._recipe.stop();

    this._titulo.innerText = recipe.description;
    this._banner.setAttribute('src', '/extension/domoto-mia-cucina-recipes/files/' + recipe.banner);

    this._recipe = recipe;
    this._onStart();
  }

  get recipe() {
    return this._recipe;
  }

  applyRecipe(recipe) {
    recipe.on('start', this._onStart.bind(this));
    recipe.on('begin', this._onBegin.bind(this));
    recipe.on('show', this._onShow.bind(this));
  }

  _onStop() {
    this.recipe.stop();
    this._onStart();
  }

  _onBegin() {
    this._btnFixed.start();
  }

  _onNext() {
    this.recipe.next();
  }

  _onShow() {
    this._message.innerHTML = ['<div class="col s12"><span class="flow-text">',
      this.recipe.message, '</span></div>'].join('');

    this._btnFixed.disabled = !this.recipe.canNext;
  }

  _onStart() {
    this._btnFixed.stop();
    const elemnt = ['<div id="message1" class="row">'];

    for (const ingredient of this.recipe.getIngredients()) {
      elemnt.push('<div class="col l4 m6 s12"><span class="flow-text"><strong>');
      elemnt.push(ingredient.can);
      elemnt.push('</strong> ');
      elemnt.push(ingredient.desc);
      elemnt.push('</span></div>');
    }

    elemnt.push('</div>');
    this._message.innerHTML = elemnt.join('');
  }
};
