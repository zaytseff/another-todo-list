import * as moment from 'moment';
const { Model } = Backbone;

/** 
 *  Todo Item - Backbone Model
 * 
 */

class Todo extends Model {

  defaults() {
    return {
      title: '',
      date: moment().add(1, 'd').format('YYYY-MM-DD'),
      completed: false
    };
  }

  // Completed tasks toggler
  toggle() {
    this.save({
      completed: !this.get('completed')
    });
  }
}
export default Todo;