{
  "location": "full",
  "whitelist": [
    "jpg", "jpeg", "png", "svg", "gif", "webp"
  ],
  "server_url": "{{$url}}plugins/markdown/api/file-browser-server/api/"
}

Vue.component('field-markdown', {
	props: [ 'data', 'x', 'y' ],
	data: function() {
		return {			
			interval: null,
			lastSaveText: 'init',
			saving: false,
			error: false,
			tree: false,
			breadcrumbs: [],
			filename: ''
		};
	},
	mounted() {
		this.setTimer();		
	},
	template: /*html*/ `
    <div class="field field-markdown">
      <div class="field-markdown-main">
        <file-browser v-show="tree" @loaded="hasLoaded($event)"></file-browser>
      </div>
    </div>
  `,
	computed: {
		trail() {
			let trail = '';

			for (const item in this.breadcrumbs) {
				trail += this.breadcrumbs[item] + '/';
			}

			if (this.filename) {
				trail += this.filename;
			}

			if (trail != '/') {
				trail = '/' + trail.replace(/\/$/, '');
			}
			return trail;
		},
		savingState() {
			if (this.error) {
				return 'failed';
			} else if (this.saving) {
				return 'saving';
			} else if (this.input == this.buffer) {
				return 'saved';
			}
			return 'unsaved';
		},
		isSaved() {
			return this.input == this.buffer;
		},
		autosave() {
			return this.$store.state.table.plugins.markdown.autosave;
		},
		serverUrl() {
			let server_url = this.$store.state.table.plugins.markdown.server_url;
			server_url = server_url.replace('{{$url}}', this.$url);

			return server_url;
		},
		limit() {
			const pos = finder.pos(this, this.$route.params.id, this.$route.params.column);
			return this.$store.state.table.columns[pos.x].limit;
		}
	},
	methods: {
		hasLoaded(e) {
			this.breadcrumbs = e.breadcrumbs;
			this.filename = e.filename;
		},
		autosavedTime() {
			this.lastSaveText = timeago.format(this.lastSave);
		},
		toggleTree() {
			this.tree = !this.tree;
		},
		close() {
			this.save();

			this.$router.push({
				name: 'table',
				params: {
					db: this.$route.params.db,
					table: this.$route.params.table
				}
			});
		},
		update(e) {
			this.input = e.target.value;

			if (this.error && !this.overflow) {
				this.resetTimer();
				this.setTimer();
				this.error = false;
			}
		},
		
		},
		
		save() {
			this.saveData();
		},
		saveData() {
			const uri = `/server/update/cell/`;
			this.saving = true;

			let data = {
				db: this.$route.params.db,
				table: this.$route.params.table,
				id: this.$route.params.id,
				column: this.$route.params.column,
				value: this.input
			};

			let result = axios({
				method: 'post',
				url: uri,
				data: data
			})
				.then((response) => {
					this.buffer = this.input;
					this.lastSave = Date.now();

					this.error = false;
					this.saving = false;

					clearInterval(this.interval);
					this.resetTimer();
					this.setTimer();
				})
				.catch((error) => {
					this.error = true;
					clearInterval(this.interval);
					this.resetTimer();
				})
				.finally(() => {});
		},
		saveRevision() {
			const uri = `/plugins/markdown/api/save/`;

			let data = {
				db: this.$route.params.db,
				table: this.$route.params.table,
				row: this.$route.params.id,
				col: this.$route.params.column,
				content: this.input
			};

			axios({
				method: 'post',
				url: uri,
				data: data,
				validateStatus: (status) => {
					return true;
				}
			})
				.then((response) => {})
				.catch((error) => {})
				.finally(() => {
				});
		}
	}
});

Vue.component('file-browser', {
	data: function() {
		return {
			uri: '',
			filename: '',
			alt: '',
			files: [],
			folders: [],
			params: []
		};
	},
	created() {
		this.get();
	},
	computed: {
		fileuri() {
			return this.uri + '/' + this.filename;
		},
		src() {
			return this.serverUrl + 'read?path=' + encodeURIComponent(this.fileuri);
		},
		serverUrl() {
			let server_url = this.$store.state.table.plugins.markdown.server_url;
			server_url = server_url.replace('{{$url}}', this.$url);

			return server_url;
		},
		whitelist() {
			return this.$store.state.table.plugins.markdown.whitelist;
		}
	},
	methods: {
		setFilename(filename) {
			this.filename = filename;

			this.params.filename = this.filename;

			this.$emit('loaded', this.params);
		},
		
	}
});