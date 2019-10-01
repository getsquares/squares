import Mark from 'mark.js';

export default class {
	static populate(keywords, html) {
		let dom = document.createElement('div');
		dom.innerHTML = html;
		let instance = new Mark(dom);
		instance.unmark();

		keywords.forEach((word) => {
			instance.mark(word, {
				accuracy: {
					value: 'exactly',
					limiters: [ ',', '.', '(', ')', '[', ']', '#', '-', '=', '!', '?' ]
				},
				acrossElements: true
			});
		});

		return dom.innerHTML;
	}
}
