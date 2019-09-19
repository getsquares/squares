import Marked from 'marked';

export default {
	namespaced: true,
	state: {
		wordcount: 0
	},
	mutations: {
		wordcount(state) {
			const sanitized = this.state['field/markdown/editor'].sanitized;

			state.wordcount = sanitized.split(' ').filter(function(n) {
				return n != '';
			}).length;
		}
	}
};
