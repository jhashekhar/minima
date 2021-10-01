import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface GifsState {
	gifs: String[];
	status: boolean;
}

const initialState: GifsState = {
	gifs: [],
	status: false,
};

const gifsSlice = createSlice({
	name: 'Gifs',
	initialState,
	reducers: {
		updateGifs: (state, action) => {
			state.gifs = action.payload;
		},

		changeGifsStatus: (state, action) => {
			state.status = action.payload;
		},
	},
});

export const gifsIdsSelector = (state: RootState) => state.root.gifs.gifs;
export const gifsStatusSelector = (state: RootState) => state.root.gifs.status;

export const { updateGifs, changeGifsStatus } = gifsSlice.actions;
export default gifsSlice.reducer;
