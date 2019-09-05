export default {
	namespaced: true,
	state: {
		overflow: false,
		max: 255
	},
	mutations: {
		overflow(state, value) {
			state.overflow = value;
		}
	}
};
