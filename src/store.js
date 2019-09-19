import Vue from 'vue';
import Vuex from 'vuex';

// Browser
import Browser from './components/fields/markdown/modules/browser/browser';
//import Files from './components/fields/markdown/modules/browser/files';
//import Folders from './components/fields/markdown/modules/browser/folders';

import Editor from './components/fields/markdown/modules/editor';

// Footer
import Limit from './components/fields/markdown/modules/footer/limit';
import Timer from './components/fields/markdown/modules/footer/timer';
import Words from './components/fields/markdown/modules/footer/words';
import Indicator from './components/fields/markdown/modules/indicator';
import Options from './components/fields/markdown/modules/options';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		//'field/markdown/files': Files,
		//'field/markdown/folders': Folders,
		'field/markdown/browser': Browser,
		'field/markdown/editor': Editor,
		'field/markdown/limit': Limit,
		'field/markdown/timer': Timer,
		'field/markdown/words': Words,
		'field/markdown/indicator': Indicator,
		'field/markdown/options': Options
	}
});
