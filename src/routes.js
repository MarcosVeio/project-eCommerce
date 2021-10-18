import React, { lazy, Suspense } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { CartProvider } from './context/productsCart'
import { LayoutWithApp } from "./components/layout/layoutWithApp"
import { Spin } from "antd"
const HomePage = lazy(() => import('./Pages/HomePage/HomePage'))
const Cart = lazy(() => import('./Pages/Cart/Cart'))
const Products = lazy(() => import('./Pages/Settings/Products'))
const Orders = lazy(() => import('./Pages/Settings/Orders'))

const Routes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={
                <div className="empty-container">
                    <Spin />
                </div>
            }>
                <CartProvider initialState={[]}>
                    <LayoutWithApp children={
                        <Switch>
                            <Route component={HomePage} exact path="/" />
                            <Route component={Cart} path="/cart" />
                            <Route component={Products} path="/products" />
                            <Route component={Orders} path="/orders" />
                        </Switch>
                    } />
                </CartProvider>
            </Suspense>
        </BrowserRouter>
    )
}

export default Routes