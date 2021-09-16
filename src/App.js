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
          // accessDateRange={[new Date(2021, 9, 1), new Date(2021, 12, 31)]}
          path="/login"
          component={Screens.Login}
        />
        <BCRoutes
          exact
          header
          protected
          transparency="sticky"
          // accessDateRange={[new Date(2021, 9, 1), new Date(2021, 12, 31)]}
          path="/dashboard"
          component={Screens.Dashboard}
        />
        <BCRoutes
          exact
          header
          protected
          protectLevel={1}
          transparency="fixed"
          // accessDateRange={[new Date(2021, 9, 1), new Date(2021, 12, 31)]}
          path="/update-profile"
          component={Screens.UpdateProfile}
        />
        <BCRoutes
          exact
          header
          protected
          transparency="sticky"
          // accessDateRange={[new Date(2021, 9, 1), new Date(2021, 12, 31)]}
          path="/propose-topic"
          component={Screens.ProposeTopic}
        />
        <BCRoutes
          exact
          header
          protected
          transparency="sticky"
          // accessDateRange={[new Date(2021, 9, 1), new Date(2021, 12, 31)]}
          path="/vote-topic"
          component={Screens.VoteTopic}
        />
        <BCRoutes
          exact
          header
          cta
          transparency="sticky"
          path="*"
          component={Screens.Landing}
        />
      </Switch>
      <Comp.Floater />
    </Router>
  );
}

export default App;
