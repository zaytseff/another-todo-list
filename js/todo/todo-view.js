import $ from 'jquery';
import { ENTER_KEY } from '../common/app-config';
import todo_tpl from './todo-item.tpl';
import Todo from './todo-model';

const { View } = Backbone;

class TodoView extends View {

  constructor(options) {
    
    // Set tagName into options. When use this.tagName - tagName doesn't set!!!
    options.tagName = 'li';
    
    // On ES6 syntax MUST call before this.
    super(options);

    // Set item template
    this.template = _.template(todo_tpl);

    this.inputTitle = '';
    this.inputDate = '';

    // Set events
    this.events = {
      'click .toggle': 'toggleCompleted',
      'click .destroy': 'clear',
      // Title
      'dblclick .input-title': 'editTitle',
      'keypress .input-title': 'updateTitleOnEnter',
      'blur .input-title': 'saveTitle',
      // Date
      'dblclick .input-date': 'editDate',
      'keypress .input-date': 'updateDateOnEnter',
      'blur .input-date': 'saveDate',

    };

    // Set listeners
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.toggleVisible);

    // Apply this into View !!! Important
    View.apply(this);
  }

  // Re-render the contents of the todo item.
  render() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.toggleClass('completed', this.model.get('completed'));
    this.toggleVisible();
    this.inputTitle = this.$('.input-title');
    this.inputDate = this.$('.input-date');
    return this;
  }

  // Todo item visible toggler
  toggleVisible() {
    this.$el.toggleClass('hidden', this.isHidden);
  }

  get isHidden() {
    let currentRoute = Backbone.history.fragment;
    
    const isCompleted = this.model.get('completed');
    return (
      (!isCompleted && currentRoute === 'completed') ||
      (isCompleted && currentRoute === 'active')
    );
  }

  // Toggle completed
  toggleCompleted() {
    this.model.toggle();
  }

  // Edit Title functions
  editTitle() {
    this.$el.addClass('editing');

    this.inputTitle.removeAttr('disabled');
    this.inputTitle.focus();
  }
  saveTitle() {
    const title = this.inputTitle.val(); // const

    if (title) {
      this.model.save({ title });
    } else {
      this.clear();
    }

    this.inputTitle.attr('disabled', 'disabled');
    this.$el.removeClass('editing');
  }
  // On keypress "Enter" update
  updateTitleOnEnter(e) {
    if (e.which === ENTER_KEY) {
      this.saveTitle();
    }
  }

  // Edit Date functions
  editDate() {
    this.$el.addClass('editing');
    this.inputDate.removeAttr('disabled');
    this.inputDate.focus();
  }
  saveDate() {
    const date = this.inputDate.val(); // const
    this.inputDate.attr('disabled');

    if (date) {
      this.model.save({ date });
    } else {
      this.clear();
    }
    this.inputDate.attr('disabled', 'disabled');
    this.$el.removeClass('editing');
  }

  // On keypress "Enter" update
  updateDateOnEnter(e) {
    if (e.which === ENTER_KEY) {
      this.saveDate();
    }
  }

  // Destroy model
  clear() {
    this.model.destroy();
  }
}
export default TodoView;