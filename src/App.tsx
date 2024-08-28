import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { DataFetcher } from './components/DataFetcher/DataFetcher';
import { initializeCharacters } from './lib/features/CharacterSlice/CharacterSlice';

import { initializeInfo } from './lib/features/InfoSlice/InfoSlice';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DataTable } from './components/DataTable/DataTable';
import { RootState } from './lib/store';
import { changePage } from './lib/features/MiscSlice/MiscSlice';
import { FetchProps } from './utils/types';
import { CharacterPage } from './components/CharacterPage/CharacterPage';

function App() {

  const dispatch = useDispatch();

  const search = useSelector((state : RootState) => state.misc).searchValue;
  const status = useSelector((state : RootState) => state.misc).statusValue;
  const pageNumber = useSelector((state : RootState) => state.misc).pageNumber;

  const fetchData = async ({ pageNumber, characterId, status, name }: FetchProps) => {
    let result = await DataFetcher({pageNumber, characterId, status, name});
    dispatch(initializeCharacters(result.results));
    dispatch(initializeInfo(result.info))
  }

  useEffect(() => {
    fetchData({});
  }, []);

  useEffect(() => {
    dispatch(changePage(1));
    fetchData({name: search, status: status})
  }, [search, status])
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DataTable />}/>
          <Route path=":id" element={<CharacterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
