import $ from 'jquery';
import _ from 'lodash';
import Todos from '../todo/todos-collection';
import TodoView from '../todo/todo-view';
import stat_tpl from './statistic.tpl'

import { ENTER_KEY } from './app-config';

const { View } = Backbone;


// Main App View
class AppView extends View {
  constructor() {
    // super() call MUST BE BEFORE touch this;
    super();

    this.setElement($('#todoapp'), true);

    this.statsTemplate = _.template(stat_tpl),

    // *Delegate events for creating new items and clearing completed ones.*
    this.events = {
      'keypress #new-todo': 'createOnEnter',
      'click #clear-completed': 'clearCompleted',
      'click #toggle-all': 'toggleAllComplete'
    };

    this.allCheckbox = this.$('#toggle-all')[0];
    this.$input = this.$('#new-todo');
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');

    this.listenTo(Todos, 'add', this.addOne);
    this.listenTo(Todos, 'reset', this.addAll);
    this.listenTo(Todos, 'change:completed', this.filterOne);
    this.listenTo(Todos, 'filter', this.filterAll);
    this.listenTo(Todos, 'all', this.render);

    Todos.fetch();

    // super(); /// Error when super() call after this!!!!
    // Workaround trick - init backbone view
    View.apply(this);
  }

  // RENDER HERE
  render() {
    const completed = Todos.done().length; // const
    const remaining = Todos.left().length; // const
    let currentRoute = Backbone.history.fragment;

    if (Todos.length) {
      this.$main.show();
      this.$footer.show();

      this.$footer.html(
        this.statsTemplate({
          completed, remaining
        })
      );

      this.$('#filters li a')
        .removeClass('selected')
        .filter('[href="#/' + (currentRoute || '') + '"]')
        .addClass('selected');
    } else {
      this.$main.hide();
      this.$footer.hide();
    }

    this.allCheckbox.checked = !remaining;
  }

  addOne(model) {
    var view = new TodoView({ model }); // const
    $('#todo-list').append(view.render().el);
  }

  addAll() {
    this.$('#todo-list').html('');
    Todos.each(this.addOne, this);
  }

  filterOne(todo) {
    todo.trigger('visible');
  }

  filterAll() {
    Todos.each(this.filterOne, this);
  }

  newAttributes() {
    return {
      title: this.$input.val().trim(),
      order: Todos.nextOrder(),
      completed: false
    };
  }

  // Create on press Enter 
  createOnEnter(e) {
    if (e.which !== ENTER_KEY || !this.$input.val().trim()) {
      return;
    }

    Todos.create(this.newAttributes());
    this.$input.val('');
  }

  // Clear completed
  clearCompleted() {
    _.invokeMap(Todos.done(), 'destroy');
    return false;
  }

  toggleAllComplete() {
    var completed = this.allCheckbox.checked; // const
    Todos.each(todo => todo.save({ completed }));
  }
}
export default AppView;
