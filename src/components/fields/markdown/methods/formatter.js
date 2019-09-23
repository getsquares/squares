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

		let image_count = 0;

		renderer.link = (href, title, text) => {
			console.log(href);
			href = baseUrl + trim + href;
			return originalRendererLink(href, title, text);
		};

		renderer.image = (href, title, text) => {
			href = baseUrl + trim + href;
			image_count++;
			return originalRendererImage(href, title, text);
		};

		let marked = Marked(content, {
			renderer
		});

		return {
			html: marked,
			imageCount: image_count
		};
	}
}
