import logo from './logo.svg';
import './App.css';
import InventoryCard from './components/InventoryCard';
import InventoryList from './components/InventoryList';
import CreateInventory from './components/CreateInventory';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import UpdateInventory from './components/UpdateInventory';
import Home from './components/Home';
import AddInventory from './components/AddInventory';
function App() {
  return (
    <Router>
    <div>
      <ul className='row'>
        <li>
          <Link to="/">Books</Link>
        </li>
        <li>
          <Link to="/inventory">Inventory</Link>
        </li>
        <li>
          <Link to="/create">Add Inventory</Link>
        </li>
        
      </ul>

      <Switch>
        <Route path="/create">
          <CreateInventory/>
        </Route>
        <Route path="/add/:googleId">
          <AddInventory/>
        </Route>
        <Route path="/update/:bookId">
          <UpdateInventory/>
        </Route>
        <Route path="/inventory">
          <InventoryList/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
