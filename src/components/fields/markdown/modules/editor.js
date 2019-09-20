import Marked from 'marked';

export default {
	namespaced: true,
	state: {
		input: '',
		buffer: '',
		html: '',
		sanitized: '',
		imagecount: 0,
		focus: 'editor',
		large: false,
		width: 0
	},
	mutations: {
		input(state, value) {
			state.input = value;
		},
		html(state) {
			const renderer = new Marked.Renderer();
			const baseUrl = '/fields/markdown/get/image?path=';

			const originalRendererLink = renderer.link.bind(renderer);
			const originalRendererImage = renderer.image.bind(renderer);

			let image_count = 0;

			renderer.link = (href, title, text) => {
				href = baseUrl + href;
				return originalRendererLink(href, title, text);
			};

			renderer.image = (href, title, text) => {
				href = baseUrl + href;
				image_count++;
				return originalRendererImage(href, title, text);
			};

			let marked = Marked(state.input, {
				renderer
			});

			state.imagecount = image_count;
			state.html = marked;
		},
		sanitize(state, html) {
			let div = document.createElement('div');
			div.innerHTML = html;
			let text = div.textContent || div.innerText || '';
			state.sanitized = text.replace(/(\r\n|\n|\r)/gm, ' ');
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
		}
	},
	getters: {
		pending: (state) => {
			return state.input != state.buffer;
		},
		chars: (state) => {
			return state.sanitized.length;
		}
	}
};
