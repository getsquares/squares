import Marked from 'marked';
import ReadingTime from '@/components/fields/markdown/methods/readingtime.js';
import formatter from '@/components/fields/markdown/methods/formatter.js';

export default {
	namespaced: true,
	state: {
		input: '',
		buffer: '',
		html: '',
		sanitized: '',
		imagecount: 0,
		wordcount: 0,
		focus: 'editor',
		large: false,
		width: 0,
		readingtime: null,
		indicator: 'success',
		timeObject: null,
		durationObject: null,
		timer: 0,
		duration: 0,
		limit: null
	},
	mutations: {
		input(state, value) {
			state.input = value;
		},
		html(state) {
			const trim = this.state['field/markdown/options'].options.media.trim;
			console.log(trim);
			const renderer = formatter.render(state.input, trim);

			state.imagecount = renderer.imageCount;
			state.html = renderer.html;
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
		readingtime(state) {
			const rt = new ReadingTime(200);
			rt.set(state.wordcount);

			state.readingtime = rt.time;
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
		},
		chars: (state) => {
			return state.sanitized.length;
		}
	}
};
