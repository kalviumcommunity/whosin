import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './Elements/Navbar';
import Sessions from './Elements/Sessions';
import CreateSession from './Elements/CreateSession';
import IndSession from './Elements/IndSession';

function App() {
  return (
    <Router>
    <div className='maincontainer'>
      <div className='navbarcontainer'>
        <Navbar />
      </div>
      <div className='routescontainer'>
      
        <Routes>
          <Route exact path = '/' element = {<Sessions />}/>
          <Route exact path = '/create' element = {<CreateSession/>}/>
          <Route exact path = '/:id' element = {<IndSession />}/>
        </Routes>
      
      </div>
    </div>
    </Router>
  );
}

export default App;
