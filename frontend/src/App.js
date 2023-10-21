import {BrowserRouter, Routes, Route} from 'react-router-dom'

// pages & components
import Dashboard from './pages/Dashboard'
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>

        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Dashboard/>}
            />

          </Routes>
        </div>

        </BrowserRouter>

    </div>
  );
}

export default App;
