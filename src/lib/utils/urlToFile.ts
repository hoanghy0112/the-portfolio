export async function getFileFromUrl(url: string) {
	const response = await fetch(url);
	const data = await response.blob();

	const filename = url.split('/').at(-1) || '';

	return new File([data], filename, {
		type: data.type || 'image/png'
	});
}
