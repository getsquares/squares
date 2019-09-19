import Marked from 'marked';

export default {
	namespaced: true,
	state: {
		wordcount: 0
	},
	mutations: {
		wordcount(state, html) {
			let div = document.createElement('div');
			div.innerHTML = html;
			let text = div.textContent || div.innerText || '';

			let sanitized = text.replace(/(\r\n|\n|\r)/gm, ' ');

			state.wordcount = sanitized.split(' ').filter(function(n) {
				return n != '';
			}).length;
		}
	}
};
