import './App.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApplicationContainer from '../containers/ApplicationContainer';
import StartApplicationContainer from '../containers/StartApplicationContainer';

function App() {

  return (
    <Container className='application-container'>
      <BrowserRouter>
        <Routes>
          <Route path='/application/:applicationUid' element={<ApplicationContainer />} />
          <Route path='*' element={<StartApplicationContainer />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
