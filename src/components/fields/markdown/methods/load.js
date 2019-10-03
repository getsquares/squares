import Axios from 'axios';

export default {
	load(vue) {
		const uri = '/fields/markdown/load';

		Axios.get(uri, {
			params: {
				db: vue.$route.params.db,
				table: vue.$route.params.table,
				column: vue.$route.params.column,
				id: vue.$route.params.id
			}
		})
			.then((response) => {
				vue.$store.commit('field/markdown/editor/input', response.data.value);
				vue.$store.commit('field/markdown/editor/buffer', response.data.value);
				vue.$store.commit('field/markdown/editor/html');
				vue.$store.commit('field/markdown/editor/words', vue.$store.state['field/markdown/editor'].html);

				let html = vue.$store.state['field/markdown/editor'].html;

				vue.$store.commit('field/markdown/editor/wordcount');
				vue.$store.commit('field/markdown/editor/limit', response.data.length);
				vue.$store.commit('field/markdown/editor/timerReset');
				vue.$store.commit('field/markdown/editor/durationReset');
				//vue.$store.commit('field/markdown/editor/readingtime');
			})
			.catch()
			.finally(() => {});
	}
};

// http://localhost:8080/field/markdown/presenth_pollenbutiken/cms_pages/59/meta_title
// http://localhost/tools/squares2/server/get/value/?db=presenth_pollenbutiken&table=cms_pages&column=meta_title&id=59

/*
load() {
			let columns = this.$store.state.table.columns;
			let column = columns[pos.x].key;
			let columnIndex;

			columns.forEach(function(element, index) {
				if (element.key == 'id') {
					columnIndex = index;
				}
			});

			let id = this.$store.state.table.data[pos.y][columnIndex].presentation;
			let uri = `/server/get/value/`;

			axios
				.get(uri, {
					params: {
						db: this.$route.params.db,
						table: this.$route.params.table,
						id: id,
						column: column
					}
				})
				.then((response) => {
					this.input = response.data;
					this.buffer = this.input;
				})
				.catch((error) => {})
				.finally(() => {
					this.resetTimer();
				});
		},
*/
