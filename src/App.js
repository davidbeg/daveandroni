import React, { useRef, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
import {
  createMuiTheme,
} from "@material-ui/core/styles";

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';
import OP from './views/OP';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
  <MuiThemeProvider theme={darkTheme}>
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute exact path="/op-simulator" component={OP} layout={LayoutDefault} />
        </Switch>
      )} />
  </MuiThemeProvider>
  );
}

export default App;