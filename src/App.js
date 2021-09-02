import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as screens from './screens';
import * as comp from './components';

function App() {
  return (
    <Router forceRefresh={true}>
      <comp.Header />
      <Switch>
        <Route exact path="/" component={screens.Landing} />
        <Route exact path="/login" component={screens.Login} />
        <Route exact path="/update-profile" component={screens.UpdateProfile} />
      </Switch>
      <comp.Footer />
    </Router>
  );
}

export default App;
