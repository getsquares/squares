export default {
	namespaced: true,
	state: {
		input: '',
		buffer: ''
	},
	mutations: {
		input(state, value) {
			state.input = value;
		},
		buffer(state, value) {
			state.buffer = value;
		}
	},
	getters: {
		pending: (state) => {
			return state.input != state.buffer;
		}
	},
	actions: {}
};
