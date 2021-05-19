import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddMarks from './AddMarks';
import './App.css';
import Header from './Header';
import Home from './Home';
import Leaderboard from './Leaderboard';

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path='/enter-marks'>
          <AddMarks />
        </Route>
        <Route path='/leaderboard'>
          <Leaderboard />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
