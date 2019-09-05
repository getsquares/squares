export default {
	saveWatch(vue) {
		vue.$store.watch(
			() => vue.$store.state['field/markdown/timer'].timer,
			() => {
				//console.log('CHANGED');
			}
		);

		this.saveNow(vue);

		return 'whatever';
	},
	// AUTOSAVE
	saveNow(vue) {
		// AFTER AJAX SUCCESS
		vue.$store.commit('field/markdown/timer/reset');
		vue.$store.commit('field/markdown/indicator/setType', 'spinning');
	}
};
