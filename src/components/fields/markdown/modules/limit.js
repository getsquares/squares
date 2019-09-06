export default {
	namespaced: true,
	state: {
		overflow: false,
		max: 0
	},
	mutations: {
		overflow(state, value) {
			state.overflow = value;
		},
		max(state, value) {
			state.max = value;
		}
	}
};
