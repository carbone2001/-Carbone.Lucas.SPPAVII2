import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './pages/HomePage';
import Error404Page from './pages/Error404Page';
import DetallePage from './pages/DetallePage';
import LoginPage from './pages/LoginPage';
import RegistracionPage from './pages/RegistracionPage';
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registracion" component={RegistracionPage} />
          <Route exact path="/" component={HomePage} />
          <Route path="/detalles/:id" component={DetallePage} />
          <Route path="*" component={Error404Page} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
