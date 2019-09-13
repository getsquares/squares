import Vue from 'vue';
import Vuex from 'vuex';

import fieldMarkdownTree from './components/fields/markdown/modules/tree';
import Editor from './components/fields/markdown/modules/editor';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		'field/markdown/tree': fieldMarkdownTree,
		'field/markdown/editor': Editor
	},
	state: {
		boom: 'hello'
	},
	mutations: {
		//test(store, test) {}
	},
	actions: {}
});
