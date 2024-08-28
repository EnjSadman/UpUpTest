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
    },
    addCharacter : (state, action: PayloadAction<Character>) => {
      const copy = [action.payload, ...state.characters];
      state.characters = [...copy];
    },
    editCharacter : (state, action: PayloadAction<Character>) => {
      const index = state.characters.findIndex(el => el.id === action.payload.id);
      const copy = [...state.characters];
      copy[index] = action.payload;
      state.characters = [...copy];
    },
    deleteCharacter : (state, action: PayloadAction<Character>) => {
      const index = state.characters.findIndex(el => el.id === action.payload.id);
      const copy = [...state.characters];
      copy.splice(index, 1);
      state.characters = [...copy];
    }
  }
})

export const { initializeCharacters, addCharacter, deleteCharacter, editCharacter } = CharaterSlice.actions;

export default CharaterSlice.reducer


