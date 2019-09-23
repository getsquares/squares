export default class {
	constructor(wpm = 200) {
		this.wpm = wpm;
	}

	countWords(value) {
		return this.sanitize(value).split(' ').filter(function(n) {
			return n != '';
		}).length;
	}

	sanitize(html) {
		let div = document.createElement('div');
		div.innerHTML = html;
		let text = div.textContent || div.innerText || '';
		return text.replace(/(\r\n|\n|\r)/gm, ' ');
	}

	set(value = '') {
		this.words = Number.isInteger(value) ? value : this.countWords(value);
		this.sec = this.words / this.wpm * 60;

		let suffix = 'hour';
		let divider = 3600;

		switch (true) {
			case this.sec < 60:
				suffix = 'second';
				divider = 1;
				break;
			case this.sec < 3600:
				suffix = 'minute';
				divider = 60;
				break;
		}

		const s = [ 1, 60, 3600 ].includes(this.sec) ? '' : 's';
		this.readingtime = Math.round(this.sec / divider) + ` ${suffix}` + s;
	}

	get time() {
		return this.readingtime;
	}

	get seconds() {
		return this.sec;
	}
}
