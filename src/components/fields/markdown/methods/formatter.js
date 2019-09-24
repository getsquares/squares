import Marked from 'marked';

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
		const renderer = new Marked.Renderer();
		const baseUrl = '/fields/markdown/get/image?path=';

		const originalRendererLink = renderer.link.bind(renderer);
		const originalRendererImage = renderer.image.bind(renderer);
		const originalRendererBlockquote = renderer.blockquote.bind(renderer);

		let image_count = 0;
		let link_count = 0;
		let blockquote_count = 0;
		let heading_count = 0;
		let list_count = 0;
		let paragraph_count = 0;
		let table_count = 0;

		renderer.link = (href, title, text) => {
			href = baseUrl + trim + href;
			link_count++;
			return originalRendererLink(href, title, text);
		};

		renderer.image = (href, title, text) => {
			href = baseUrl + trim + href;
			image_count++;
			return originalRendererImage(href, title, text);
		};

		renderer.blockquote = (blockquote) => {
			blockquote_count++;
			return originalRendererBlockquote(blockquote);
		};

		let marked = Marked(content, {
			renderer
		});

		return {
			html: marked,
			//imageCount: image_count,
			count: {
				images: image_count,
				links: link_count
			}
		};
	}
}
