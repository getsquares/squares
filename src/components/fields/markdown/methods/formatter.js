import marked from 'marked';

export default class {
	static toWords(html) {
		let div = document.createElement('div');
		div.innerHTML = html;
		let text = div.textContent || div.innerText || '';
		return text.replace(/(\r\n|\n|\r)/gm, ' ');
	}
	static wordCount(words) {
		return words.split(' ').filter(function(n) {
			return n != '';
		}).length;
	}
	static render(content, trim) {
		const renderer = new marked.Renderer();
		const baseUrl = '/fields/markdown/get/image?path=';
		const r = {
			link: renderer.link.bind(renderer),
			image: renderer.image.bind(renderer),
			blockquote: renderer.blockquote.bind(renderer),
			heading: renderer.heading.bind(renderer),
			list: renderer.list.bind(renderer),
			paragraph: renderer.paragraph.bind(renderer),
			table: renderer.table.bind(renderer)
		};

		let counters = {
			images: 0,
			lists: 0,
			links: 0,
			blockquotes: 0,
			headlines: 0,
			h1: 0,
			paragraphs: 0,
			tables: 0,
			alt: 0
		};

		renderer.blockquote = (blockquote) => {
			counters.blockquotes++;
			return r.blockquote(blockquote);
		};

		renderer.image = (href, title, text) => {
			if (text != '') {
				counters.alt++;
			}
			href = baseUrl + trim + href;
			counters.images++;
			return r.image(href, title, text);
		};

		renderer.heading = (text, level, raw, slugger) => {
			if (level == 1 && counters.headlines == 0) {
				counters.h1 = raw.length;
			}
			counters.headlines++;
			return r.heading(text, level, raw, slugger);
		};

		renderer.link = (href, title, text) => {
			href = baseUrl + trim + href;
			counters.links++;
			return r.link(href, title, text);
		};

		renderer.list = (body, ordered, start) => {
			counters.lists++;
			return r.list(body, ordered, start);
		};

		renderer.paragraph = (text) => {
			counters.paragraphs++;
			return r.paragraph(text);
		};

		renderer.table = (header, body) => {
			counters.tables++;
			return r.table(header, body);
		};

		const html = marked(content, {
			renderer
		});

		return {
			html: html,
			count: counters
		};
	}
}
