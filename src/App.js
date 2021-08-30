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
      </Switch>
      <comp.Footer />
    </Router>
  );
}

export default App;
