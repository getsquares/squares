export default {
	namespaced: true,
	state: {
		type: 'success'
	},
	mutations: {
		setType(state, type) {
			state.type = type;
		}
	}
};
