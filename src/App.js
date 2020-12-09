import './App.css';
import routes from './routes'
import Nav from './Components/Nav'

function App() {
  return (
    <div className="App">
      <Nav/>
      {routes}
    </div>
  );
}

export default App;
