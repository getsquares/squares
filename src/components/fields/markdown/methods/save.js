import Axios from 'axios';

export default {
	saveWatch(vue) {
		vue.$store.watch(
			() => vue.$store.state['field/markdown/timer'].duration,
			() => {
				const duration = vue.$store.state['field/markdown/timer'].duration;

				if (duration == 15) {
					// KOLLA SÅ DET DIFFAR
					if (vue.$store.getters['field/markdown/editor/pending']) {
						this.saveNow(vue);
					}
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

		console.log(value);

		vue.$store.commit('field/markdown/indicator/setType', 'spinning');

		Axios.post(uri, {
			db: vue.$route.params.db,
			table: vue.$route.params.table,
			column: vue.$route.params.column,
			id: vue.$route.params.id,
			value: value
		})
			.then((response) => {
				console.log('SDAVED');
				console.log(response);
				/*this.input = response.data;
          this.buffer = this.input;
          */
				/*vue.$store.commit('field/markdown/editor/input', response.data.value);
				vue.$store.commit('field/markdown/editor/buffer', response.data.value);
        */

				//vue.$store.commit('field/markdown/editor/input', value);
				console.log(value);
				vue.$store.commit('field/markdown/editor/buffer', value);

				vue.$store.commit('field/markdown/timer/timerReset');
				vue.$store.commit('field/markdown/indicator/setType', 'success');
			})
			.catch((error) => {
				console.log('ERROR');
				console.log(error);

				vue.$store.commit('field/markdown/indicator/setType', 'warning');
			})
			.finally(() => {
				//this.resetTimer();
				vue.$store.commit('field/markdown/timer/durationReset');
			});
	}
};
