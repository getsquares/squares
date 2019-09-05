import Vue from 'vue';
import Axios from 'axios';

Vue.use(Axios);

export default {
	load(vue) {
		let uri = `api`;

		Axios.get(uri, {
			params: {
				db: vue.$route.params.db,
				table: vue.$route.params.table,
				column: vue.$route.params.column,
				id: vue.$route.params.id
			}
		})
			.then((response) => {
				/*this.input = response.data;
          this.buffer = this.input;
          */
				console.log('SUCCESS');
				console.log(response.data);
			})
			.catch(() => {
				//console.log('ERROR');
				//console.log(error);
			})
			.finally(() => {
				//this.resetTimer();
			});
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
