export default {
	namespaced: true,
	state: {
		files: [],
		filename: ''
	},
	mutations: {
		files(state, value) {
			state.files = value;
		},
		filename(state, value) {
			state.filename = value;
		}
	}
};
