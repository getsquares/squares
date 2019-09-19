export default {
	namespaced: true,
	state: {
		showTree: false,
		loading: false,
		uri: '',
		alt: '',
		trail: '',
		breadcrumbs: []
	},
	mutations: {
		alt(state, value) {
			state.alt = value;
		},
		setTreeState(state, value) {
			state.showTree = value;
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
	}
	/*getters: {
		trail: (state, filename) => {
			const slash = state.uri == '' ? '' : '/';
			return state.uri + slash + filename;
		}
	}*/
};
