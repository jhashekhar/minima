import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import unsplashUrls from '../apis/unsplashAPI';
import { RootState } from '../store';

interface SearchState {
	status: boolean;
	query: string;
	prevQueries: string[];
	urls: string[];
}

const initialState: SearchState = {
	status: false,
	query: '',
	prevQueries: [],
	urls: null,
};

export const getUnsplashImages = createAsyncThunk(
	'unsplash/getImages',
	async (query: string) => {
		const images = await unsplashUrls(query);
		return images;
	}
);

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		changeImageSearchStatus(
			state: SearchState,
			action: PayloadAction<boolean>
		) {
			state.status = action.payload;
		},
		updateQuery(state: SearchState, action: PayloadAction<string>) {
			state.query = action.payload;
		},
		updatePrevQueries(state: SearchState, action: PayloadAction<string>) {
			state.prevQueries.push(action.payload);
		},

		updateUrls(state: SearchState, action: PayloadAction<string[]>) {
			state.urls = action.payload;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(
			getUnsplashImages.fulfilled,
			(state: SearchState, action: PayloadAction<string[]>) => {
				state.urls = action.payload;
			}
		);
	},
});

export const searchStatusSelector = (state: RootState) =>
	state.root.search.status;
export const searchQuerySelector = (state: RootState) =>
	state.root.search.query;
export const searchUrlsSelector = (state: RootState) => state.root.search.urls;
export const searchPrevQueriesSelector = (state: RootState) =>
	state.root.search.prevQueries;

export const {
	changeImageSearchStatus,
	updateQuery,
	updatePrevQueries,
	updateUrls,
} = searchSlice.actions;
export default searchSlice.reducer;
