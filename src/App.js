import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as Screens from './screens';
import * as Comp from './components';

function App() {
  return (
    <Router forceRefresh={true}>
      <Comp.Header />
      <Switch>
        <Route exact path="/" component={Screens.Landing} />
        <Route exact path="/login" component={Screens.Login} />
        <Route exact path="/update-profile" component={Screens.UpdateProfile} />
      </Switch>
      <Comp.Footer />
    </Router>
  );
}

export default App;
