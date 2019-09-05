export default {
	namespaced: true,
	state: {
		showTree: false
	},
	mutations: {
		setTreeState(state, value) {
			state.showTree = value;
		}
	},
	actions: {}
};
