const { createApi } = require('unsplash-js');
const fetch = require('node-fetch');

const unsplash = createApi({
	accessKey: 'qrdBdq4HIc-r0BwlKe0Tm9CVvigrTDacNC5l7eItsfA',
	fetch: fetch,
});

export default async function unsplashUrls(queryString: string) {
	const images = await unsplash.search
		.getPhotos({
			query: queryString,
			page: 1,
			perPage: 6,
			orientation: 'portrait',
			orderBy: 'latest',
		})
		.then((data: any) => {
			let imageUrls: any[] = [];

			const images = data.response.results;
			images.forEach((img: { urls: string }) => imageUrls.push(img.urls.small));

			return imageUrls;
		})
		.catch((err: any) => console.log(err));

	return images;
}
