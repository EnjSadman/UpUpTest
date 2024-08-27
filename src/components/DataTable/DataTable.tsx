import { Pagination, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { Character } from '../../utils/types';

export function DataTable () {
  const charactersList = (useSelector((state : RootState) => state.characters)).characters;
  const InfoObject = (useSelector((state : RootState) => state.info)).info; 
  
  return (
    <Table>
        <TableBody>

          {
            charactersList.map((el : Character) => {
              return (

                  <TableRow >
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
              console.log(page)
            }}
          />
        </TableBody>
      </Table>
  )
}