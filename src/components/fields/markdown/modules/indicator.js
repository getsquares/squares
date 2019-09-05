export default {
	namespaced: true,
	state: {
		type: 'spinning'
	},
	mutations: {
		setType(state, type) {
			state.type = type;
		}
	},
	actions: {}
};
