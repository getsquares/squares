export default {
	namespaced: true,
	state: {
		selectorState: false,
		loading: false,
		rows: []
	},
	mutations: {
		selectorState(state, value) {
			state.selectorState = value;
		},
		loading(state, value) {
			state.loading = value;
		},
		rows(state, value) {
			state.rows = value;
		}
	}
};
