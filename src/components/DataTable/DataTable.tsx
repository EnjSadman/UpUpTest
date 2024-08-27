import { Pagination, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { Character } from '../../utils/types';
import { Link, useNavigate } from 'react-router-dom';

import './styles.css';
import { useState } from 'react';
import { DirectLinkFetch } from '../DataFetcher/DataFetcher';
import { initializeCharacters } from '../../lib/features/CharacterSlice/CharacterSlice';
import { initializeInfo } from '../../lib/features/InfoSlice/InfoSlice';

export function DataTable () {
  const charactersList = (useSelector((state : RootState) => state.characters)).characters;
  const InfoObject = (useSelector((state : RootState) => state.info)).info;

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const fetchData = async(link: string) => {
    const result = await DirectLinkFetch(link);
    const data = await result.json();
    dispatch(initializeCharacters(data.results))
    dispatch(initializeInfo(data.info))
  }
  
  return (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {
            charactersList.map((el : Character) => {
              return (
                <TableRow
                  key={el.id}
                  onClick={() => navigate(`/${el.id}`)}
                  sx={{cursor: "pointer"}}
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
                </TableRow>
              )
            })
          }
          <Pagination 
            defaultPage={1}
            count={InfoObject.pages}
            onChange={(event, page) => {
              if (page < currentPage) {
                if (InfoObject.prev !== null) {
                  fetchData(InfoObject.prev);
                }
                setCurrentPage(page);
              } else {
                if (InfoObject.next !== null) {
                  fetchData(InfoObject.next);
                }
                setCurrentPage(page);
              }
            }}
          />
        </TableBody>
      </Table>
  )
}