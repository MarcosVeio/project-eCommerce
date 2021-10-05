import React, { useState } from 'react'
import { CardOfProduct } from '../components/card/card';
import { useCartContext } from '../context/productsCart';
import { Button, message, Skeleton } from 'antd';
import axios from 'axios'
import { Empty } from 'antd';

function Cart() {
    const { cartProducts, removeProducts, clearCart } = useCartContext()
    const [isLoading, setLoading] = useState(false)

    const postData = async () => {
        setLoading(true)
        await axios.post("http://localhost:3001/orders", cartProducts)
        setLoading(false)
        clearCart()
    }

    const removeProduct = (productId) => {
        setLoading(true)
        removeProducts([productId])
        message.success(`product removed`);
        setLoading(false)
    }

    const totalPrice = () => {
        let priceTotal = 0
        for (const products of cartProducts) {
            priceTotal = priceTotal += products.price
        }
        console.log(priceTotal)
    }

    return (
        isLoading ?
            <Skeleton active />
            :
            cartProducts.length === 0 ? <div className="empty-container" ><Empty description="EMPTY CART" /></div> :
                <>
                    <div className="container">
                        {
                            cartProducts.map((products) => {
                                return (
                                    <CardOfProduct description={products.description} key={products.id} title={products.description} category={products.category} price={products.price} id={products.id} button="true" onClick={() => removeProduct(products)} />
                                )
                            })
                        }
                    </div>
                    <div className="container">
                        <Button id="button" onClick={() => { postData() }} >BUY</Button>
                        <Button onClick={() => { clearCart() }} >CLEAR CART</Button>
                    </div>
                    {totalPrice()}
                </>
    )
}

export default Cart;