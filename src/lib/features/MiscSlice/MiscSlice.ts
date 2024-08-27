import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MiscState {
  pageNumber: number,
}

const initialState : MiscState = {
  pageNumber: 1,
}

export const MiscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    changePage: (state, action : PayloadAction<number>) =>  {
      state.pageNumber = action.payload;
    }
  }
});

export const {changePage} = MiscSlice.actions;

export default MiscSlice.reducer