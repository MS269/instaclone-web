import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar } from "./apollo";
import routes from "./routes";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/SignUp";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App() {
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  const darkMode: boolean = useReactiveVar(darkModeVar);

  return (
    <div>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path="/" exact>
              {isLoggedIn ? <Home /> : <Login />}
            </Route>
            {!isLoggedIn ? (
              <Route path={routes.signUp}>
                <SignUp />
              </Route>
            ) : null}
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
