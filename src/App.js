import React, { Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout';
import { authCheckState } from './store/actions';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = (props) => {

  useEffect(() => {
    props.onTryAutoSignIn();
  }, []);

  let routes = (
    <Switch>
      <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
      <Route path="/auth" render={(props) => <Auth {...props}/>} />
      <Route path="/" component={BurgerBuilder} />
      {/* <Redirect to="/" /> ###redirect any other route */}
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props}/>}/>
        <Route path="/orders" render={(props) => <Orders {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={BurgerBuilder} />
        {/* <Redirect to="/" /> ###redirect any other route */}
      </Switch>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </Layout>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
