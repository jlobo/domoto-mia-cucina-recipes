const Domoto = require('domoto');
const RiceRecipe = require('./recipes/riceRecipe');
const ChildItemMenu = require('domoto/childItemMenu');
const RecipeController = require('./recipes/recipeController');
const viewPath = require('path').resolve(__dirname, './files/view.html');

module.exports = class DomotoRecipe extends Domoto {
  constructor() {
    super('domoto-mia-cucina-recipes');

    this.description = 'Recipes';
    this.itemMenu.iconLeft = 'restaurant';

    const view = this.addView(viewPath);
    view.on('load', this._onLoadView.bind(this));
  }

  _onLoadView(view) {
    const controller = new RecipeController(view);
    const stove = this.getModule('domoto-mia-cucina');

    const rice = new RiceRecipe(stove);
    controller.recipe = rice;
    controller.applyRecipe(rice);

    const riceItem = this.itemMenu.add(new ChildItemMenu('Rice'));
    riceItem.on('click', () => (controller.recipe = rice));
    riceItem.on('click', this.viewManager.show(view));
  }
};
