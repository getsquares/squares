export default function(html, strStart, strEnd) {
	const start = html.indexOf(strStart);
	const end = html.indexOf(strEnd, start);

	if (start == -1 || end == -1) return;

	return {
		before: html.substr(0, start),
		match: html.substr(start, end - start + strEnd.length),
		after: html.substr(end + strEnd.length, html.length - end)
	};
}
