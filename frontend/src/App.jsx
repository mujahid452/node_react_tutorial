//import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Tweet from './components/Tweet';
import Menue from './components/Menue';
import Configurations from './components/Configurations';
import Items from './components/Items';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/tweets" exact component={Tweet} />
            <Route path="/menue" exact component={Menue} />
            <Route path="/configurations" exact component={Configurations} />
            <Route path="/items" exact component={Items} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
