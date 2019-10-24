import Axios from 'axios';

export default {
	saveWatch(vue) {
		vue.$store.watch(
			() => vue.$store.state['field/markdown/editor'].duration,
			() => {
				const duration = vue.$store.state['field/markdown/editor'].duration;
				const options = vue.$store.state['field/markdown/options'].options;
				const pending = vue.$store.getters['field/markdown/editor/pending'];

				if (pending) {
					if (duration == options.autosave.retry) {
						this.saveNow(vue);
						this.saveRevision(vue);
					}
				} else {
					vue.$store.commit('field/markdown/editor/timerReset');
					vue.$store.commit('field/markdown/editor/durationReset');
				}
			}
		);

		/*this.saveNow(vue);

		return 'whatever';*/
	},
	// AUTOSAVE
	saveNow(vue) {
		const uri = '/fields/markdown/save';
		const value = vue.$store.state['field/markdown/editor'].input;

		vue.$store.commit('field/markdown/editor/indicator', 'spinning');

		Axios.post(uri, {
			db: vue.$route.params.db,
			table: vue.$route.params.table,
			column: vue.$route.params.column,
			id: vue.$route.params.id,
			value: value
		})
			.then((response) => {
				vue.$store.commit('field/markdown/editor/buffer', value);

				vue.$store.commit('field/markdown/editor/timerReset');
				vue.$store.commit('field/markdown/editor/indicator', 'success');
			})
			.catch((error) => {
				vue.$store.commit('field/markdown/editor/indicator', 'warning');
			})
			.finally(() => {
				vue.$store.commit('field/markdown/editor/durationReset');
			});
	},

	saveRevision(vue) {
		const uri = '/fields/markdown/add/revision';
		const value = vue.$store.state['field/markdown/editor'].input;

		Axios.post(uri, {
			db: vue.$route.params.db,
			table: vue.$route.params.table,
			column: vue.$route.params.column,
			id: vue.$route.params.id,
			value: value
		})
			.then((response) => {
				vue.$store.commit('field/markdown/editor/revisionCount', response.data);
			})
			.catch((error) => {
				//vue.$store.commit('field/markdown/editor/indicator', 'warning');
			})
			.finally(() => {
				//vue.$store.commit('field/markdown/editor/durationReset');
			});
	}
};
