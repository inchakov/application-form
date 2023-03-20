import './App.css';
import Container from 'react-bootstrap/Container';
import ApplicationForm from './application/ApplicationForm';

function App() {

  return (
    <Container className='application-container'>
      <ApplicationForm />
    </Container>
  );
}

export default App;
