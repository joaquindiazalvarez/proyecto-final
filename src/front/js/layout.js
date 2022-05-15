import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./pages/home";
import { Single } from "./pages/single";
import { Privacy } from "./pages/privacy";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Profile } from "./pages/profile";
import { Register } from "./pages/register";
import { ProtectedRoute } from "./pages/protected_route";
import { Favorites } from "./pages/favorites";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/privacy">
              <Privacy />
            </Route>
            <Route exact path="/single/:theid">
              <Single />
            </Route>
            <Route exact path="/profile/:name">
              <Profile />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <ProtectedRoute exact path="/favorites" component={Favorites} />
            <Route>
              <h1>Not found!</h1>
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
