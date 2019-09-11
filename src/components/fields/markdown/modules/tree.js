export default {
	namespaced: true,
	state: {
		showTree: false,
		loading: false,
		foldername: null,
		folders: [],
		files: [],
		filename: '',
		uri: '',
		alt: '',
		breadcrumbs: []
	},
	mutations: {
		setTreeState(state, value) {
			state.showTree = value;
		},
		folders(state, value) {
			state.folders = value;
		},
		files(state, value) {
			state.files = value;
		},
		trail(state, value) {
			state.trail = value;
		},
		alt(state, value) {
			state.alt = value;
		},
		loading(state, value) {
			state.loading = value;
		},
		breadcrumbs(state, value) {
			state.breadcrumbs = value;
		},
		filename(state, value) {
			state.filename = value;
		},
		foldername(state, value) {
			state.foldername = value;
		},
		uri(state, name) {
			state.uri = state.uri == '' ? name : state.uri + '/' + name;
		},
		backFolder(state) {
			let parts = state.uri.split('/');
			parts.pop();
			let parent = parts.join('/');

			state.uri = parent;
		}
	},
	getters: {
		trail: (state) => {
			const slash = state.uri == '' ? '' : '/';
			return state.uri + slash + state.filename;
		}
	},
	actions: {
		back(context) {
			if (context.state.uri == '') return;

			context.commit('backFolder');
			context.commit('filename', '');
			context.commit('foldername', '');
		}
	}
};
