import { Pagination, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { Character } from '../../utils/types';
import { useNavigate } from 'react-router-dom';

import './styles.css';
import { DirectLinkFetch } from '../DataFetcher/DataFetcher';
import { initializeCharacters } from '../../lib/features/CharacterSlice/CharacterSlice';
import { initializeInfo } from '../../lib/features/InfoSlice/InfoSlice';
import { changePage, setSelectedCharacter } from '../../lib/features/MiscSlice/MiscSlice';
import { Toolbar } from '../Toolbar/Toolbar';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export function DataTable () {
  const charactersList = (useSelector((state : RootState) => state.characters)).characters;
  const infoObject = (useSelector((state : RootState) => state.info)).info;
  const currentPage = (useSelector((state: RootState) => state.misc)).pageNumber;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchData = async(link: string) => {
    const result = await DirectLinkFetch(link);
    const data = await result.json();
    dispatch(initializeCharacters(data.results))
    dispatch(initializeInfo(data.info))
  }
  
  return (
    <>
      <Toolbar />
      <Table sx={{minWidth: "100vw"}}>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Status
              </TableCell>
              <TableCell>
                Species
              </TableCell>
              <TableCell>

              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              charactersList.map((el : Character) => {
                return (
                  <TableRow
                    key={el.id}
                  >
                        <TableCell>
                            {el.name}
                        </TableCell>
                        <TableCell>
                            {el.status}
                        </TableCell>
                        <TableCell>
                            {el.species}
                        </TableCell>
                        <TableCell>
                          <DeleteOutlineIcon />
                          <EditIcon />
                          <MoreHorizIcon
                            sx={{cursor: "pointer"}}
                            onClick={() => {
                              navigate(`/${el.id}`);
                              dispatch(setSelectedCharacter(el));
                            }}
                          />
                        </TableCell>
                  </TableRow>
                )
              })
            }
            <Pagination 
              defaultPage={currentPage}
              count={infoObject.pages}
              onChange={(event, page) => {
                if (page < currentPage) {
                  if (infoObject.prev !== null) {
                    fetchData(infoObject.prev);
                  }
                  dispatch(changePage(page));
                } else {
                  if (infoObject.next !== null) {
                    fetchData(infoObject.next);
                  }
                  dispatch(changePage(page));
                }
              }}
            />
          </TableBody>
      </Table>
    </>
  )
}