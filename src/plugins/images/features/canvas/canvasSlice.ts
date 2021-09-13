import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface CanvasDims {
	width: number;
	height: number;
}

interface CanvasState {
	c: string;
	parent: HTMLDivElement;
	canvasDims: CanvasDims;
}

const initialState: CanvasState = {
	c: null,
	parent: null,
	canvasDims: { width: 400, height: 400 },
};

const canvasSlice = createSlice({
	name: 'canvas',
	initialState,
	reducers: {
		updateCanvas(state, action) {
			state.c = action.payload;
		},

		updateParentOfC(state, action) {
			state.parent = action.payload;
		},

		updateCanvasWidth(state, action) {
			state.canvasDims.width = action.payload;
		},

		updateCanvasHeight(state, action) {
			state.canvasDims.height = action.payload;
		},

		updateInnerHTML(state, action) {
			state.c = action.payload;
		},
	},
});

export const canvasWidthSelector = (state: RootState) =>
	state.root.canvas.canvasDims.width;
export const canvasHeightSelector = (state: RootState) =>
	state.root.canvas.canvasDims.height;
export const canvasSelector = (state: RootState) => state.root.canvas.c;

export const {
	updateCanvas,
	updateParentOfC,
	updateInnerHTML,
	updateCanvasWidth,
	updateCanvasHeight,
} = canvasSlice.actions;
export default canvasSlice.reducer;
