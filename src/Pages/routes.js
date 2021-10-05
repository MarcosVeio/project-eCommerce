import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./HomePage";
import Cart from './Cart';
import { CartProvider } from './../context/productsCart';

const Routes = () => {
    return (
        <BrowserRouter>
            <CartProvider initialState={[]}>
                <Switch>
                    <Route path="/cart">
                        <Cart />
                    </Route>
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </CartProvider>
        </BrowserRouter>
    );
};

export default Routes;