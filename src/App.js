import logo from './logo.svg';
import './App.css';
import Search from './components/Search';
import Forecast from './components/Forecast';
import Favourite from './components/Favourite';



function App() {
  return (
    <div className="App">
     <h1 id="heading">Weather Dashboard</h1>
     <Search/>
     
     </div>
  );
}

export default App;
