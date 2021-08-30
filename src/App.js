import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as screens from './screens';

function App() {
  return (
    <Router forceRefresh={true}>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/" component={screens.Landing} />
      </Switch>
    </Router>
  );
}

export default App;
