export default {
	namespaced: true,
	state: {
		showTree: false,
		folders: [],
		files: [],
		trail: '',
		filename: '',
		alt: ''
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
		filename(state, value) {
			state.filename = value;
		}
	},
	actions: {}
};
