import { GiphyFetch } from '@giphy/js-fetch-api';

const gf = new GiphyFetch('S9vzdS73MOx34IoK18SRXCORhBK1x0lI');

/*
export const getGifs = async () => {
	await gf.trending({ limit: 10 });
};
*/

export const { data: gif } = await gf.trending({
	limit: 10,
	offset: 25,
	rating: 'g',
});

export const getGifs = { data: gif };
