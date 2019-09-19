import Axios from 'axios';

export default {
	saveWatch(vue) {
		vue.$store.watch(
			() => vue.$store.state['field/markdown/timer'].duration,
			() => {
				const duration = vue.$store.state['field/markdown/timer'].duration;
				const options = vue.$store.state['field/markdown/options'].options;
				const pending = vue.$store.getters['field/markdown/editor/pending'];

				//console.log(options);

				if (pending) {
					if (duration == options.autosave.retry) {
						this.saveNow(vue);
					}
				} else {
					vue.$store.commit('field/markdown/timer/timerReset');
					vue.$store.commit('field/markdown/timer/durationReset');
				}
			}
		);

		//vue.$store.commit('field/markdown/timer/durationReset');

		/*this.saveNow(vue);

		return 'whatever';*/
	},
	// AUTOSAVE
	saveNow(vue) {
		const uri = '/fields/markdown/save';
		const value = vue.$store.state['field/markdown/editor'].input;

		vue.$store.commit('field/markdown/indicator/setType', 'spinning');

		Axios.post(uri, {
			db: vue.$route.params.db,
			table: vue.$route.params.table,
			column: vue.$route.params.column,
			id: vue.$route.params.id,
			value: value
		})
			.then((response) => {
				vue.$store.commit('field/markdown/editor/buffer', value);

				vue.$store.commit('field/markdown/timer/timerReset');
				vue.$store.commit('field/markdown/indicator/setType', 'success');
			})
			.catch((error) => {
				vue.$store.commit('field/markdown/indicator/setType', 'warning');
			})
			.finally(() => {
				vue.$store.commit('field/markdown/timer/durationReset');
			});
	}
};
