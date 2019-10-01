import formatter from '@/components/fields/markdown/methods/formatter.js';
import keywords from '@/components/fields/markdown/methods/keywords.js';

export default {
	namespaced: true,
	state: {
		input: '',
		buffer: '',
		html: '',
		sanitized: '',
		count: {},
		wordcount: 0,
		focus: 'editor',
		large: false,
		width: 0,
		indicator: 'success',
		timeObject: null,
		durationObject: null,
		timer: 0,
		duration: 0,
		limit: null,
		sidebar: null,
		toc: [],
		densityKeywords: []
	},
	mutations: {
		sidebarToggle(state, value) {
			if (value == state.sidebar) {
				state.sidebar = null;
			} else {
				state.sidebar = value;
			}
		},
		input(state, value) {
			state.input = value;
		},
		html(state) {
			const trim = this.state['field/markdown/options'].options.media.trim;
			const renderer = formatter.render(state.input, trim);
			let html = renderer.html;

			if (state.sidebar == 'density') {
				html = keywords.populate(state.densityKeywords, renderer.html);
			}

			state.count = renderer.count;
			state.html = html;
			state.toc = renderer.toc;
			console.log(state.html);
		},
		sanitize(state, html) {
			state.sanitized = formatter.toWords(html);
		},
		buffer(state, value) {
			state.buffer = value;
		},
		focus(state, value) {
			state.focus = value;
		},
		large(state) {
			const width = document.querySelector('.fieldMarkdown .editor textarea').clientWidth;
			const max = this.state['field/markdown/options'].options.editor.width;
			const diff = width > max;

			state.width = width;
			state.large = diff;
		},
		densityKeywordsSet(state, words) {
			state.densityKeywords = words;
		},
		densityKeywordToggle(state, word) {
			if (!state.densityKeywords.includes(word)) {
				state.densityKeywords.push(word);
			} else {
				state.densityKeywords = state.densityKeywords.filter((item) => item !== word);
			}
		},
		wordcount(state) {
			state.wordcount = formatter.wordCount(state.sanitized);
		},
		indicator(state, value) {
			state.indicator = value;
		},
		timerSet(state) {
			clearInterval(state.timeObject);
			state.timeObject = setInterval(() => {
				state.timer++;
			}, 1000);
		},
		timerApppend(state) {
			state.timer++;
		},
		timerReset(state) {
			state.timer = 0;
		},
		durationSet(state) {
			clearInterval(state.durationObject);
			state.durationObject = setInterval(() => {
				state.duration++;
			}, 1000);
		},
		durationAppend(state) {
			state.duration++;
		},
		durationReset(state) {
			state.duration = 0;
		},
		limit(state, value) {
			state.limit = value;
		}
	},
	getters: {
		pending: (state) => {
			return state.input != state.buffer;
		},
		overflow: (state) => {
			return state.input.length > state.limit;
		}
	}
};
