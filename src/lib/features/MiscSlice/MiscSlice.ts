import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../../utils/enums";
import { Character } from "../../../utils/types";

interface MiscState {
  pageNumber: number,
  searchValue: string,
  statusValue: Status,
  selectedCharacter: Character | undefined,
}

const initialState : MiscState = {
  pageNumber: 1,
  searchValue: "",
  statusValue: Status.all,
  selectedCharacter: undefined,
}

export const MiscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    changePage: (state, action : PayloadAction<number>) =>  {
      state.pageNumber = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setStatus: (state, action : PayloadAction<Status>) => {
      state.statusValue = action.payload;
    },
    setSelectedCharacter: (state, action : PayloadAction<Character | undefined>) => {
      state.selectedCharacter = action.payload;
    }
  }
});

export const { changePage, setSearchValue, setStatus, setSelectedCharacter } = MiscSlice.actions;

export default MiscSlice.reducer