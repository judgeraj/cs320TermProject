import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from  'react-router-dom'
import Home from './pages/Home';
import Feed from './pages/Feed';
import Products from './pages/Products';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/feed' component={Feed}/>
          <Route path='/products' exact component={Products}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
