import './App.css';
import { CreateVideo, SignIn } from './components';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';

import { useSelector } from 'react-redux';
import VideoPlayer from './pages/VideoPlayer';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import { ErrorPage } from './pages/indexOfPages';
import { Footer } from './container';

function App() {
  const location = window.location.pathname;
  const user = useSelector(state => state.user.currentUser);
  const history = useHistory();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/video/:videoId" component={VideoPlayer} />
          <Route exact path="/signin">
            {!user ? <SignIn /> : <ErrorPage />}
          </Route>
          <Route exact path="/create-video">
            {!user ? <Redirect to="/signin" /> : <CreateVideo />}
          </Route>
          <Route exact path="/settings" component={SettingsPage} />
          {/* <Route exact path="/settings" component={SettingsPage} /> */}
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
