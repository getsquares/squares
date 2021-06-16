const $ = (selector, base = document) => {
  return base.querySelector(selector);
};
const $$ = (selector, base = document) => {
  return base.querySelectorAll(selector);
};

Node.prototype.on = function (type, listener) {
  return this.addEventListener(type, listener);
};

var get = {};
var set = {};
var actions = {};
var triggers = {};
var state = {
  database: null,
  table: null,
  databases_order: [],
  databases: {},
  tables: [],
  fields: {},
};
