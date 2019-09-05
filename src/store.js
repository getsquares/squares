import Vue from 'vue';
import Vuex from 'vuex';

import fieldMarkdownTimer from './components/fields/markdown/modules/timer';
import fieldMarkdownIndicator from './components/fields/markdown/modules/indicator';
import fieldMarkdownTree from './components/fields/markdown/modules/tree';
import fieldMarkdownLimit from './components/fields/markdown/modules/limit';
import Editor from './components/fields/markdown/modules/editor';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		'field/markdown/timer': fieldMarkdownTimer,
		'field/markdown/indicator': fieldMarkdownIndicator,
		'field/markdown/tree': fieldMarkdownTree,
		'field/markdown/limit': fieldMarkdownLimit,
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
