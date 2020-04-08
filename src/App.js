import React from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Switch, Route } from 'react-router-dom';
import checkoutSummary from './components/Order/CheckoutSummary/CheckoutSummary';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    </Layout>
  );
}

export default App;
