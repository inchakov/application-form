import './App.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApplicationContainer from '../containers/ApplicationContainer';
import StartApplicationContainer from '../containers/StartApplicationContainer';
import ToastContextProvider from './ToastContextProvider';

function App() {

  return (
    <ToastContextProvider>
      <Container className='application-container'>
        <BrowserRouter>
          <Routes>
            <Route path='/application/:applicationUid' element={<ApplicationContainer />} />
            <Route path='*' element={<StartApplicationContainer />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ToastContextProvider>
  );
}

export default App;
