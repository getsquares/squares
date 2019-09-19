import Marked from 'marked';

export default {
	namespaced: true,
	state: {
		input: '',
		html: '',
		buffer: '',
		imagecount: 0
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
		buffer(state, value) {
			state.buffer = value;
		}
	},
	getters: {
		pending: (state) => {
			return state.input != state.buffer;
		}
	}
};
