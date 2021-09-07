import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import * as Screens from './screens';
import * as Comp from './components';
import BCRoutes from './utils/BCRoutes';

function App() {
  return (
    <Router forceRefresh={true}>
      <Switch>
        <BCRoutes
          exact
          header
          cta
          transparency="sticky"
          path="/"
          component={Screens.Landing}
        />
        <BCRoutes
          exact
          header
          transparency="sticky"
          path="/login"
          component={Screens.Login}
        />
        <BCRoutes
          exact
          header
          transparency="sticky"
          path="/dashboard"
          component={Screens.Dashboard}
        />
        <BCRoutes
          exact
          header
          transparency="fixed"
          path="/update-profile"
          component={Screens.UpdateProfile}
        />
        <BCRoutes
          exact
          header
          transparency="sticky"
          path="/propose-topic"
          component={Screens.ProposeTopic}
        />
      </Switch>
      <Comp.Footer />
    </Router>
  );
}

export default App;
