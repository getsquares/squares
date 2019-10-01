export default class {
	constructor(options = {}) {
		this.o = Object.assign({}, this.defaults(), options);
	}
	defaults() {
		return {
			words: 1,
			characters: 0,
			stopwords: []
		};
	}
	set(content) {
		this.add(content);
		this.htmlToText();
		this.toLowercase();
		this.toAlphanumeric();
		this.stipWhitespace();
		this.process();
	}
	get() {
		return this.results;
	}
	process() {
		let array = this.content.split(' ');
		let object_unsorted = {};
		let array_words = [];
		let array_results = [];

		// Set x number of words to array
		for (let i = 0; i < array.length; i++) {
			let collection = '';
			// Loop limit to set x number of words
			for (let j = 0; j < this.o.words; j++) {
				if (typeof array[i + j] === 'undefined') continue;
				if (j > 0) collection += ' ';
				collection += array[i + j];
			}
			if (this.o.stopwords.includes(collection)) continue;
			if (collection.length <= this.o.characters) continue;
			array_words[i] = collection;
		}

		// Put the words as key and count the words occurrences
		array_words.forEach((item) => {
			object_unsorted[item] = typeof object_unsorted[item] === 'undefined' ? 1 : object_unsorted[item] + 1;
		});

		// Put it back as array to get it sortable by occurrences
		let i = 0;
		for (let collection in object_unsorted) {
			array_results[i] = {
				count: object_unsorted[collection],
				word: collection
			};
			i++;
		}

		// Sort array by occurrences
		array_results.sort((a, b) => b.count - a.count);
		this.results = array_results;
	}
	add(content) {
		this.content = content;
	}
	htmlToText() {
		let div = document.createElement('div');
		div.innerHTML = this.content;

		let text = div.textContent || div.innerText || '';
		this.content = text.replace(/(\r\n|\n|\r)/gm, ' ');
	}
	toLowercase() {
		this.content = this.content.toLowerCase();
	}
	toAlphanumeric() {
		this.content = this.content.replace(/[^a-zA-Z0-9À-ž\s]/g, '');
	}
	stipWhitespace() {
		this.content = this.content.replace(/\s+/g, ' ').trim();
	}
}
