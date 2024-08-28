import "./styles.css"

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { setModalOpened, setModalState, setSearchValue, setStatus } from "../../lib/features/MiscSlice/MiscSlice";
import { ModalState, Status } from "../../utils/enums";
import AddIcon from '@mui/icons-material/Add';

export function Toolbar() {
  const searchValue = useSelector((state : RootState) => state.misc).searchValue;
  const statusValue = useSelector((state: RootState) => state.misc).statusValue;
  const dispatch = useDispatch();
  

  return (
    <div className="toolbar">
      <Button
        variant="outlined"
        sx={{boxSizing: "border-box"}}
        size="small"
        onClick={() => {
          dispatch(setModalState(ModalState.add))
          dispatch(setModalOpened(true))
        }}
      >
        Add new character 
        <AddIcon />
      </Button>
      <TextField
        sx={{minWidth: 300}}
        id="outlined-basic"
        label="Character name"
        variant="outlined"
        value={searchValue}
        onChange={(event) => {
          dispatch(setSearchValue(event.target.value));
        }}
      />
      <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={statusValue}
    label="Status"
    onChange={(event) => {
      const statusType = event.target.value as Status;
      dispatch(setStatus(statusType))
    }}
  >
    <MenuItem value={Status.all}>All</MenuItem>
    <MenuItem value={Status.alive}>Alive</MenuItem>
    <MenuItem value={Status.dead}>Dead</MenuItem>
    <MenuItem value={Status.unknown}>Unknown</MenuItem>
  </Select>
</FormControl>
    </div>
  )
}