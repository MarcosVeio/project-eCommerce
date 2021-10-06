import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./HomePage";
import Cart from './Cart';
import FormRegistration from './formRegistration';
import { CartProvider } from './../context/productsCart';
import { SideBar } from './../components/sideBar/sideBar';

const Routes = () => {
    return (
        <BrowserRouter>
            <CartProvider initialState={[]}>
                <SideBar children={
                    <Switch>
                        <Route path="/cart">
                            <Cart />
                        </Route>
                        <Route path="/registration">
                            <FormRegistration />
                        </Route>
                        <Route path="/">
                            <HomePage />
                        </Route>
                    </Switch>
                } />
            </CartProvider>
        </BrowserRouter>
    );
};

export default Routes;