import Vue from 'vue';
import Vuex from 'vuex';

import Browser from './components/fields/markdown/modules/browser';
import Editor from './components/fields/markdown/modules/editor';
import Options from './components/fields/markdown/modules/options';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		'field/markdown/browser': Browser,
		'field/markdown/editor': Editor,
		'field/markdown/options': Options
	}
});
