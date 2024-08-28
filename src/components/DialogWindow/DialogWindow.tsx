import './styles.css';

import { Button, Dialog, MenuItem, Select, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { Gender, ModalState, Status } from "../../utils/enums";
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';
import { setModalOpened, setSelectedCharacter } from '../../lib/features/MiscSlice/MiscSlice';
import { useEffect, useState } from 'react';
import { addCharacter, deleteCharacter, editCharacter } from '../../lib/features/CharacterSlice/CharacterSlice';
import { Character } from '../../utils/types';

export function DialogWindow() {
  const dispatch = useDispatch();
  const dialogState = useSelector((state : RootState) => state.misc).modalState;
  const dialogOpened = useSelector((state : RootState) => state.misc).isModalOpened;
  const selectedCharacter = useSelector((state: RootState) => state.misc).selectedCharacter;

  const [characterName, setCharacterName] = useState("");
  const [characterStatus, setCharacterStatus] = useState<Status>(Status.unknown);
  const [characterGender, setCharacterGender] = useState<Gender>(Gender.male);
  const [characterSpecies, setCharacterSpecies] = useState("");
  const [characterOrigin, setCharacterOrigin] = useState("");
  const [characterLocation, setCharacterLocation] = useState("");
  const [characterImage, setCharacterImage] = useState("");

  useEffect(() => {
    if (dialogState === ModalState.edit && selectedCharacter !== undefined) {
      setCharacterName(selectedCharacter.name);
      setCharacterStatus((selectedCharacter.status) as Status);
      setCharacterGender((selectedCharacter.gender) as Gender);
      setCharacterSpecies(selectedCharacter.species);
      setCharacterOrigin(selectedCharacter.origin.name);
      setCharacterLocation(selectedCharacter.location.name);
      setCharacterImage(selectedCharacter.image)
    }
  }, [selectedCharacter]);

  function deleteStateValues() {
    setCharacterName("");
    setCharacterStatus(Status.unknown);
    setCharacterGender(Gender.male);
    setCharacterSpecies("");
    setCharacterOrigin("");
    setCharacterLocation("");
    setCharacterImage("");
    
    dispatch(setSelectedCharacter(undefined));
  }

  switch (dialogState) {
    case (ModalState.add): {
      return(
        <Dialog
          open={dialogOpened}
          classes={{paper: "dialogPaper"}}
          maxWidth="md"
          onClose={() => {
            dispatch(setModalOpened(false));
            deleteStateValues();
          }}
        >
          <div className='dialog__close'>
            <CloseIcon 
              sx={{cursor: "pointer"}}
              onClick={() => {
                dispatch(setModalOpened(false));
                deleteStateValues();
              }}
            />
          </div>
          <FormControl
            sx={{gap: "30px"}}
          >
            {(characterImage !== undefined && characterImage !== "") ?
              <img className='dialog__image--preview' src={characterImage}  />
            : <div>There no image of this character</div>
            }
            <TextField
              id="input-image"
              label="Link to image"
              value={characterImage}
              onChange={(event) => {
                setCharacterImage(event.target.value)
              }}
            />
            <TextField
              id="input-name"
              label="Character name"
              value={characterName}
              onChange={(event) => {
                setCharacterName(event.target.value)
              }}
            />
            <Select
              id="gender"
              onChange={(event) => {
                setCharacterGender((event.target.value) as Gender)
              }}
            >
              <MenuItem
                value={Gender.male}
              >
                Male
              </MenuItem>
              <MenuItem
                value={Gender.female}
              >
                Female
              </MenuItem>
              <MenuItem
                value={Gender.other}
              >
                Other
              </MenuItem>
            </Select>
            <Select
              id="status"
              value={characterStatus}
              onChange={(event) => {
                setCharacterStatus((event.target.value) as Status)
              }}
            >
              <MenuItem
                value={Status.alive}
              >
                Alive
              </MenuItem>
              <MenuItem
                value={Status.dead}
              >
                Dead
              </MenuItem>
              <MenuItem
                value={Status.unknown}
              >
                Unknown
              </MenuItem>
            </Select>
            <TextField
              id="input-species"
              label="Character species"
              value={characterSpecies}
              onChange={(event) => {
                setCharacterSpecies(event.target.value)
              }}
            />
            <TextField
              id="input-species"
              label="Character origin"
              value={characterOrigin}
              onChange={(event) => {
                setCharacterOrigin(event.target.value)
              }}
            />
            <TextField
              id="input-species"
              label="Character location"
              value={characterLocation}
              onChange={(event) => {
                setCharacterLocation(event.target.value)
              }}
            />
          </FormControl>
          <div className='dialog__buttons'>
              <Button
                color="error"
                variant='contained'
                size='large'
                onClick={() => {
                  dispatch(setModalOpened(false));
                  deleteStateValues();
                }}
              >
                Cancel
              </Button>
              <Button
                color="success"
                variant='contained'
                size='large'
                onClick={() => {
                  const newCharacter : Character = {
                    id: selectedCharacter?.id ?? 0,
                    name: characterName,
                    status: characterStatus,
                    species: characterSpecies,
                    type: '',
                    gender: characterGender,
                    origin: {
                      name: characterOrigin,
                      url: selectedCharacter?.origin.url ?? "",
                    },
                    location: {
                      name: characterLocation,
                      url: selectedCharacter?.location.url ?? ""
                    },
                    image: characterImage,
                    episode: [...selectedCharacter?.episode ?? []],
                    url: selectedCharacter?.url ?? "",
                    created: selectedCharacter?.created ?? ""
                  }
                  console.log(newCharacter);
                  dispatch(addCharacter(newCharacter));
                  dispatch(setModalOpened(false));

                }}
              >
                Save
              </Button>
          </div>
        </Dialog>
      )
    }
    case(ModalState.edit): {
      return(
        <Dialog
          open={dialogOpened}
          classes={{paper: "dialogPaper"}}
          maxWidth="md"
          onClose={() => {
            dispatch(setModalOpened(false));
            deleteStateValues();
          }}
        >
          <div className='dialog__close'>
            <CloseIcon 
              sx={{cursor: "pointer"}}
              onClick={() => {
                dispatch(setModalOpened(false));
                deleteStateValues();
              }}
            />
          </div>
          <FormControl
            sx={{gap: "30px"}}
          >
            {(characterImage !== undefined && characterImage !== "") ?
              <img className='dialog__image--preview' src={characterImage}  />
            : <div>There no image of this character</div>
            }
            <TextField
              id="input-image"
              label="Link to image"
              value={characterImage}
              onChange={(event) => {
                setCharacterImage(event.target.value)
              }}
            />
            <TextField
              id="input-name"
              label="Character name"
              value={characterName}

              onChange={(event) => {
                setCharacterName(event.target.value)
              }}
            />
            <Select
              id="gender"
              value={characterGender}
              onChange={(event) => {
                setCharacterGender((event.target.value) as Gender)
              }}
            >
              <MenuItem
                value={Gender.male}
              >
                Male
              </MenuItem>
              <MenuItem
                value={Gender.female}
              >
                Female
              </MenuItem>
              <MenuItem
                value={Gender.other}
              >
                Other
              </MenuItem>
            </Select>
            <Select
              id="status"
              value={characterStatus}
              onChange={(event) => {
                setCharacterStatus((event.target.value) as Status)
              }}
            >
              <MenuItem
                value={Status.alive}
              >
                Alive
              </MenuItem>
              <MenuItem
                value={Status.dead}
              >
                Dead
              </MenuItem>
              <MenuItem
                value={Status.unknown}
              >
                Unknown
              </MenuItem>
            </Select>
            <TextField
              id="input-species"
              label="Character species"
              value={characterSpecies}
              onChange={(event) => {
                setCharacterSpecies(event.target.value)
              }}
            />
            <TextField
              id="input-species"
              label="Character origin"
              value={characterOrigin}
              onChange={(event) => {
                setCharacterOrigin(event.target.value)
              }}
            />
            <TextField
              id="input-species"
              label="Character location"
              value={characterLocation}
              onChange={(event) => {
                setCharacterLocation(event.target.value)
              }}
            />
          </FormControl>
          <div className='dialog__buttons'>
              <Button
                color="error"
                variant='contained'
                size='large'
                onClick={() => {
                  dispatch(setModalOpened(false));
                  deleteStateValues();
                }}
              >
                Cancel
              </Button>
              <Button
                color="success"
                variant='contained'
                size='large'

                onClick={() => {
                  const editedCharacter : Character = {
                    id: selectedCharacter?.id ?? 0,
                    name: characterName,
                    status: characterStatus,
                    species: characterSpecies,
                    type: '',
                    gender: characterGender,
                    origin: {
                      name: characterOrigin,
                      url: selectedCharacter?.origin.url ?? "",
                    },
                    location: {
                      name: characterLocation,
                      url: selectedCharacter?.location.url ?? ""
                    },
                    image: characterImage,
                    episode: [...selectedCharacter?.episode ?? []],
                    url: selectedCharacter?.url ?? "",
                    created: selectedCharacter?.created ?? ""
                  }
                  dispatch(editCharacter(editedCharacter));
                  dispatch(setModalOpened(false));
                  deleteStateValues();
                }}
              >
                Save
              </Button>
          </div>
        </Dialog>
      )
    }
    case(ModalState.delete): {
      return(
        <Dialog
        open={dialogOpened}
          classes={{paper: "dialogPaper"}}
          maxWidth="md"
          onClose={() => {
            dispatch(setModalOpened(false));
            deleteStateValues();
          }}
        >
          <div className='dialog__deletion--text'>
            <h1>
              Are you sure, you want delete {selectedCharacter?.name} entry?
            </h1>
          </div>
          <div className='dialog__buttons'>
              <Button
                color="error"
                variant='contained'
                size='large'
                onClick={() => {
                  if (selectedCharacter !== undefined) {
                    dispatch(deleteCharacter(selectedCharacter));
                  }
                  dispatch(setModalOpened(false));
                  deleteStateValues();
                }}
              >
                Yes
              </Button>
              <Button
                color="success"
                variant='contained'
                size='large'
                onClick={() => {
                  dispatch(setModalOpened(false));
                  deleteStateValues();
                }}
              >
                No
              </Button>
          </div>
        </Dialog>
      )
    }
  }
  
}