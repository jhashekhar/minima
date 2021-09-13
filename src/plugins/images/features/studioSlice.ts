import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface StudioState {
  editMode: boolean
}

const initialState: StudioState = {
  editMode: false
}

const studioSlice = createSlice({
  name: "studio",
  initialState,
  reducers: {
    setEditMode(state, action) {
      state.editMode = action.payload
    }
  }
})

export const studioEditModeSelector = (state: RootState) => state.root.studio.editMode

export const { setEditMode } = studioSlice.actions
export default studioSlice.reducer
