import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Info } from "../../../utils/types";

interface InfoState {
  info: Info
}

const initialState : InfoState = {
  info: {
    count: 0,
    pages: 0,
    prev: null,
    next: null
  }
}

export const InfoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    initializeInfo : ((state, action : PayloadAction<Info>) => {
      state.info = {...action.payload}
    })
  }

}) 

export const {initializeInfo} = InfoSlice.actions;

export default InfoSlice.reducer