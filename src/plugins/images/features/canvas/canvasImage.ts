import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface CanvasImageState {
	width: number;
	height: number;
}

const initialState: CanvasImageState = { height: 240, width: 240 };

const canvasImageSlice = createSlice({
	name: 'canvasImage',
	initialState,
	reducers: {
		updateCiDims(
			state: CanvasImageState,
			action: PayloadAction<CanvasImageState>
		) {
			const { width, height } = action.payload;
			state.width = width;
			state.height = height;
		},
	},
});

export const ciSelector = (state: RootState) => state.root.canvasImage;

export const { updateCiDims } = canvasImageSlice.actions;
export default canvasImageSlice.reducer;
