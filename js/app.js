import $ from 'jquery';
import Backbone from 'backbone';
import LocalStorage from 'backbone.localstorage';
import '../style/style.less';

import AppView from './common/app-view';
import Filters from './common/filters';

// Init APP modules
$(() => {
  new AppView();
  new Filters();
  Backbone.history.start();
});