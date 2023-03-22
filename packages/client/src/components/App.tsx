import './App.css';
import Container from 'react-bootstrap/Container';
import ApplicationForm from './application/ApplicationForm';

function App() {

  return (
    <Container className='application-container'>
      <ApplicationForm applicationUid='e8f7d574-5015-41bb-abb0-1e5cb90b071d' />
    </Container>
  );
}

export default App;
