import Todo from './todo-model';
import TODO_STORAGE_NAME from '../common/app-config';

const { Collection, LocalStorage } = Backbone;

/**
 * Todo Items List - Backbone Collection
 * 
 */
class TodoList extends Collection {

  constructor(options) {
    // Call parent constructor
    super(options);

    // Set collection model
    this.model = Todo;

    // Set local storage
    this.localStorage = new LocalStorage(TODO_STORAGE_NAME);
  }

  // Get finished tasks
  // TODO: May be rename to "done"
  done() {
    return this.filter(todo => todo.get('completed'));
  }

  // Get ramained tasks
  // TODO: Rename to "left"
  left() {
    return this.without(...this.done());
  }

  // Get next task ID
  nextOrder() {
    if (!this.length) {
      return 1;
    }

    return this.last().get('order') + 1;
  }

  // Set Sort By option
  comparator(todo) {
    return todo.get('order');
  }
}

// Create Todos List
var Todos = new TodoList(); // let

export default Todos;