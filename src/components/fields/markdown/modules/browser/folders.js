export default {
	namespaced: true,
	state: { foldername: null, folders: [] },
	mutations: {
		folders(state, value) {
			state.folders = value;
		},
		foldername(state, value) {
			state.foldername = value;
		}
	}
};
