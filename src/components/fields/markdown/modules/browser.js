export default {
	namespaced: true,
	state: {
		browserState: false,
		loading: false,
		uri: '',
		alt: '',
		trail: '',
		breadcrumbs: [],
		files: [],
		filename: '',
		foldername: null,
		folders: []
	},
	mutations: {
		folders(state, value) {
			state.folders = value;
		},
		foldername(state, value) {
			state.foldername = value;
		},
		files(state, value) {
			state.files = value;
		},
		filename(state, value) {
			state.filename = value;
		},
		alt(state, value) {
			state.alt = value;
		},
		browserState(state, value) {
			state.browserState = value;
		},
		loading(state, value) {
			state.loading = value;
		},
		breadcrumbs(state, value) {
			state.breadcrumbs = value;
		},
		uri(state, name) {
			state.uri = state.uri == '' ? name : state.uri + '/' + name;
		},
		trail(state, filename) {
			const slash = state.uri == '' ? '' : '/';
			state.trail = state.uri + slash + filename;
		},
		back(state) {
			let parts = state.uri.split('/');
			parts.pop();
			let parent = parts.join('/');

			state.uri = parent;
		}
	},
	getters: {
		trail(state) {
			return state.uri + (state.uri == '' ? '' : '/') + state.filename;
		}
	}
};
