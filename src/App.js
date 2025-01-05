// import logo from './logo.svg';
// import './App.css';
// import Art from './components/Art';
// import Page from './components/Page';
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import Header from './components/Header';

// function App() {
//   return (
//     <>
//       <Router>
//         <Header />
//         <Routes>
//           <Route index element={<Art />} />
//           <Route path="/Art" element={<Art />} />
//           <Route path="/page" element={<Page />} /> 
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;


import logo from './logo.svg';
import './App.css';
import Art from './components/Art';
import Page from './components/Page';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import { useState, useEffect } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Router>
        <Header />
        {isLoading ? (
          <div className='loading'>Loading...</div>
        ) : (
          <Routes>
            <Route index element={<Art />} />
            <Route path="/Art" element={<Art />} />
            <Route path="/page" element={<Page />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
