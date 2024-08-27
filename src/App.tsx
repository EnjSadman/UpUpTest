import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { DataFetcher } from './components/DataFetcher/DataFetcher';
import { initializeCharacters } from './lib/features/CharacterSlice/CharacterSlice';

import { initializeInfo } from './lib/features/InfoSlice/InfoSlice';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DataTable } from './components/DataTable/DataTable';
import { Status } from './utils/enums';

function App() {

  const dispatch = useDispatch();

  const fetchData = async () => {
    let result = await DataFetcher({});
    dispatch(initializeCharacters(result.results));
    dispatch(initializeInfo(result.info))
  }

  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatusValue] = useState<Status>(Status.all);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DataTable />}/>
          <Route path=":id" element={<div>123</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
