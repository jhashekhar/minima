import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface TabActiveStatus {
	activeTab: string;
}

const initialState: TabActiveStatus = {
	activeTab: 'search',
};

const tabSlice = createSlice({
	name: 'tabStatus',
	initialState,
	reducers: {
		updateTabActiveStatus: (state, action) => {
			state.activeTab = action.payload;
		},
	},
});

export const tabActiveStatusSelector = (state: RootState) =>
	state.root.tab.activeTab;

export const { updateTabActiveStatus } = tabSlice.actions;
export default tabSlice.reducer;
