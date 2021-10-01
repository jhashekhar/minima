import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface CTDims {
	width: number;
	height: number;
}

interface CTPos {
	left: fabric.ITextOptions;
	top: fabric.ITextOptions;
}

interface CanvasTextState {
	value: string;
	status: boolean;
	font: string;
	color: string;
	position: CTPos;
	dimension: CTDims;
	scale: { scaleX: number; scaleY: number };
	angle: number;
	selected: boolean;
}

const initialState: CanvasTextState = {
	value: 'Enter your text',
	status: false,
	font: '',
	color: 'red',
	position: { left: null, top: null },
	dimension: { width: 250, height: 250 },
	scale: { scaleX: 1, scaleY: 1 },
	angle: 0,
	selected: false,
};

const canvasTextSlice = createSlice({
	name: 'canvasText',
	initialState,
	reducers: {
		changeCtValue(state, action) {
			state.value = action.payload;
		},

		changeCtStatus(state, action) {
			state.value = action.payload;
		},

		changeCtFont(state, action) {
			state.value = action.payload;
		},

		changeCtColor(state, action) {
			state.value = action.payload;
		},

		changeCtPosition(state, action) {
			state.position = action.payload;
		},

		changeCtDimensions(state, action) {
			const { width, height } = action.payload;
			state.dimension.width = width;
			state.dimension.height = height;
		},

		changeCtScale(state, action) {
			const { scaleX, scaleY } = action.payload;
			state.scale.scaleX = scaleX;
			state.scale.scaleY = scaleY;
		},

		changeCtAngle(state, action) {
			state.angle = action.payload;
		},

		changeSelected(state, action) {
			state.selected = action.payload;
		},
	},
});

export const ctSelector = (state: RootState) => state.root.canvasText;
export const ctStatusSelector = (state: RootState) =>
	state.root.canvasText.status;
export const ctColorSelector = (state: RootState) =>
	state.root.canvasText.color;
export const ctValueSelector = (state: RootState) =>
	state.root.canvasText.value;
export const ctSelectedSelector = (state: RootState) => {
	state.root.canvasText.selected;
};
export const ctPosSelector = (state: RootState) => {
	state.root.canvasText.position;
};

export const {
	changeCtValue,
	changeCtStatus,
	changeCtFont,
	changeCtColor,
	changeCtDimensions,
	changeCtScale,
	changeCtAngle,
	changeSelected,
	changeCtPosition,
} = canvasTextSlice.actions;

export default canvasTextSlice.reducer;
