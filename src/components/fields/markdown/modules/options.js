import Options from '@/components/fields/markdown/defaults.json';

export default {
	namespaced: true,
	state: {
		loading: true,
		options: Options
	},
	mutations: {
		options(state, value) {
			state.options = value;
		},
		loading(state, value) {
			state.loading = value;
		}
	}
};
