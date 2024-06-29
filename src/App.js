import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'components/Container';
import ImageFinder from 'components/ImageFinder';

function App() {
  return (
    <>
      <Container>
        <ImageFinder />
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
