/*export default class {
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
		return this.sorted;
	}
	getUnsorted() {
		return this.unsorted;
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
		this.sorted = array_results;
		this.unsorted = object_unsorted;
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
*/

export default class {
	static defaults() {
		return {
			words: 1,
			characters: 0,
			stopwords: [],
			filter: [ 'toText', 'toAlpha', 'toLowercase', 'stripWhitespace' ],
			selected: []
		};
	}
	static set(content) {
		this.add(content);

		this.o.filter.forEach((filter) => {
			switch (filter) {
				case 'toText':
					this.toText();
					break;
				case 'toAlpha':
					this.toAlpha();
					break;
				case 'toLowercase':
					this.toLowercase();
					break;
				case 'stripWhitespace':
					this.stripWhitespace();
					break;
			}
		});

		if (this.o.selected.length > 0) {
			this.processSelected();
		} else {
			this.process();
		}
	}
	static setOptions(options) {
		this.o = Object.assign({}, this.defaults(), options);
	}
	static getUnsorted(content, options) {
		this.setOptions(options);
		this.set(content);
		return this.unsorted;
	}
	static getSorted(content, options = {}) {
		this.setOptions(options);
		this.set(content);
		this.sort();
		return this.sorted;
	}
	static sort() {
		// Put it back as array to get it sortable by occurrences
		let i = 0;
		let array_results = [];
		for (let collection in this.unsorted) {
			array_results[i] = {
				count: this.unsorted[collection],
				word: collection
			};
			i++;
		}

		this.sorted = array_results.sort((a, b) => b.count - a.count);
	}
	static processSelected() {
		let object_unsorted = {};

		this.o.selected.forEach((phrase) => {
			object_unsorted[phrase] = this.vitimusOccurrences(' ' + this.content + ' ', ' ' + phrase + ' ', true);
		});

		this.unsorted = object_unsorted;
	}
	static process() {
		let array = this.content.split(' ');
		let object_unsorted = {};
		let array_words = [];

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

		this.unsorted = object_unsorted;
	}
	static add(content) {
		this.content = content;
	}
	static toText() {
		let div = document.createElement('div');
		div.innerHTML = this.content;

		let text = div.textContent || div.innerText || '';
		this.content = text.replace(/(\r\n|\n|\r)/gm, ' ');
	}
	static toLowercase() {
		this.content = this.content.toLowerCase();
	}
	static toAlpha() {
		this.content = this.content.replace(/[^a-zA-Z0-9À-ž\s]/g, '');
	}
	static stripWhitespace() {
		this.content = this.content.replace(/\s+/g, ' ').trim();
	}

	/** Function that count occurrences of a substring in a string;
   * @param {String} string               The string
   * @param {String} subString            The sub string to search for
   * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
   *
   * @author Vitim.us https://gist.github.com/victornpb/7736865
   * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
   * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
   */
	static vitimusOccurrences(string, subString, allowOverlapping) {
		string += '';
		subString += '';
		if (subString.length <= 0) return string.length + 1;

		var n = 0,
			pos = 0,
			step = allowOverlapping ? 1 : subString.length;

		while (true) {
			pos = string.indexOf(subString, pos);
			if (pos >= 0) {
				++n;
				pos += step;
			} else break;
		}
		return n;
	}
}
