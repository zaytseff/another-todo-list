import Todos from '../todo/todos-collection';
/**
 * Filters - Backbone router
 */
const { Router } = Backbone;

class Filters extends Router {

  constructor() {
    // Add super() call - otherwise get compilling error!!!
    super();

    this.routes = {
      '*filter': 'filter'
    }

    this._bindRoutes();

    Router.apply(this);
  }

  filter(param = '') {
    Todos.trigger('filter');
  }

}
export default Filters;
