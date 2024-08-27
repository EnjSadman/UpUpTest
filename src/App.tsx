import { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { DataFetcher } from './components/DataFetcher/DataFetcher';
import { Character, RequestResponse } from './utils/types';
import { initializeCharacters } from './lib/features/CharacterSlice/CharacterSlice';
import { RootState } from './lib/store';

import { initializeInfo } from './lib/features/InfoSlice/InfoSlice';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DataTable } from './components/DataTable/DataTable';

function App() {

  const dispatch = useDispatch();

  const fetchData = async () => {
    let result = await DataFetcher({});
    dispatch(initializeCharacters(result.results));
    dispatch(initializeInfo(result.info))
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DataTable/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
