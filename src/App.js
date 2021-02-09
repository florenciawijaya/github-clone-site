import './App.css';
import Router from './components/Routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
          <Router/>
      </BrowserRouter>
    </div>
  );
}

export default App;
