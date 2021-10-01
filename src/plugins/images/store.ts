import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/searchSlice';
import studioReducer from './features/studioSlice';
import canvasReducer from './features/canvas/canvasSlice';
import canvasImageReducer from './features/canvas/canvasImage';
import canvasTextReducer from './features/canvas/canvasTextSlice';
import gifsReducer from './features/gifSlice';
import tabReducer from './features/tabSlice';

const rootReducer = combineReducers({
	search: searchReducer,
	studio: studioReducer,
	canvas: canvasReducer,
	canvasImage: canvasImageReducer,
	canvasText: canvasTextReducer,
	gifs: gifsReducer,
	tab: tabReducer,
});

const store = configureStore({
	reducer: {
		root: rootReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
