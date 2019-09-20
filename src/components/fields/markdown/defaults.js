export default {
	preview: {
		delay: 300,
		css: null,
		deleteThis: 'delete this'
	},
	editor: {
		spellcheck: false,
		width: 900
	},
	revisions: {
		path: 'revisions/markdown',
		limit: 5
	},
	media: {
		path: 'server-media',
		trim: null,
		folder: null
	},
	autosave: {
		save: 15,
		retry: 45,
		warning: 300,
		danger: 900
	},
	words: {
		danger: {
			min: 0,
			max: 799
		},
		warning: {
			min: 800,
			max: 1999
		},
		success: {
			min: 2000
		}
	}
};
