import Marked from 'marked';

export default {
	namespaced: true,
	state: {
		options: {},
		input: '',
		buffer: '',
		wordcount: 0
	},
	mutations: {
		input(state, value) {
			state.input = value;
		},
		buffer(state, value) {
			state.buffer = value;
		},
		options(state, value) {
			state.options = value;
			//console.log('hello');
			//console.log(value);
		},
		wordcount(state) {
			console.log('Woirdcount');
			let markdown = Marked(state.input);
			let sanitized = markdown.replace(/(\r\n|\n|\r)/gm, ' ');

			let code = sanitized;

			state.wordcount = code.split(' ').filter(function(n) {
				return n != '';
			}).length;
		}
	},
	getters: {
		pending: (state) => {
			return state.input != state.buffer;
		}
	},
	actions: {}
};
