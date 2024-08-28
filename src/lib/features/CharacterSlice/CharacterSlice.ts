import { Character } from "../../../utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CharacterState {
  characters: Character[];
}

const initialState : CharacterState = {
  characters: []
}

const CharaterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    initializeCharacters : (state, action :PayloadAction<Character[]>) => {
      if (action.payload !== undefined) {
        state.characters = [...action.payload]
      } else {
        state.characters = [];
      }
    }
  }
})

export const { initializeCharacters } = CharaterSlice.actions;

export default CharaterSlice.reducer


