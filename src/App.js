import logo from './logo.svg';
import './App.css';
import Art from './components/Art';
import Page from './components/Page';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route index element={<Art />} />
          <Route path="/Art" element={<Art />} />
          <Route path="/page" element={<Page />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
