import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState = {
	value: 'Enter your text',
	status: false,
	font: '',
	color: 'red',
	position: { left: 50, top: 50 },
	dimension: { width: 250, height: 250 },
	scale: { scaleX: 1, scaleY: 1 },
	angle: 0,
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
			const { left, top } = action.payload;
			state.position.left = left;
			state.position.top = top;
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
	},
});

export const ctSelector = (state: RootState) => state.root.canvasText;
export const ctStatusSelector = (state: RootState) =>
	state.root.canvasText.status;
export const ctColorSelector = (state: RootState) =>
	state.root.canvasText.color;
export const ctValueSelector = (state: RootState) =>
	state.root.canvasText.value;

export const {
	changeCtValue,
	changeCtStatus,
	changeCtFont,
	changeCtColor,
	changeCtPosition,
	changeCtDimensions,
	changeCtScale,
	changeCtAngle,
} = canvasTextSlice.actions;

export default canvasTextSlice.reducer;
