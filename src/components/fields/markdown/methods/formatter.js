import marked from 'marked';

export default class {
	static stripped(html) {
		let div = document.createElement('div');
		div.innerHTML = html;
		return div.textContent || div.innerText || '';
	}
	static toWords(stripped) {
		let div = document.createElement('div');
		div.innerHTML = stripped;
		let text = div.textContent || div.innerText || '';

		text = this.toAlphanumeric(text);
		text = this.stripWhitespace(text);
		text = this.toLowercase(text);

		return text;
	}
	static toLowercase(text) {
		return text.toLowerCase();
	}
	static toAlphanumeric(text) {
		return text.replace(/[^a-zA-Z0-9À-ž\s]/g, '');
	}
	static stripWhitespace(text) {
		return text.replace(/\s+/g, ' ').trim();
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

		let toc = [];

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
			/*if (level == 1 && counters.headlines == 0) {
				counters.h1 = raw.length;
			}*/
			counters.headlines++;

			toc.push({
				level: level,
				text: text
			});

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
			count: counters,
			toc: toc
		};
	}
}
