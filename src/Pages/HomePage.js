import { useState, useEffect } from 'react'
import axios from 'axios'

import 'antd/dist/antd.css';
import '../styles.css'

import { CardOfProduct } from '../components/card/card';
import { useCartContext } from '../context/productsCart';
import { Button, Menu, message, Empty, Skeleton } from 'antd';
import { DropComponent } from '../components/Dropdown/drop'

function HomePage() {
    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [selection, setSelection] = useState([])
    const { cartProducts, addProducts } = useCartContext()


    const getPostsData = async () => {
        setLoading(true)
        const { data } = await axios.get("http://localhost:3001/product")
        setProducts(data.listProduct)
        setLoading(false)
    }

    const addidProductsInCart = () => {
        if (selection.length < 1) {
            message.error("Empty cart")
        } else {
            selection.map((product) => { return addProducts([product]) })
            message.success(`${selection.length} product added`);
        }
    }

    useEffect(() => {
        getPostsData()
    }, [])

    const handleSelection = (e, product) => {
        if (e.target.checked) {
            const newSelections = [...selection, product]
            setSelection(newSelections)
        } else {
            const newSelections = selection.filter(({ id }) => id !== product.id)
            setSelection(newSelections)
        }
    }

    return (
        isLoading ?
            <Skeleton active />
            :
            products.length === 0 ? <div className="empty-container" ><Empty description="LIST OF PRODUCT EMPTY" /></div> :
                <>
                    <div className="container">
                        {products.map((product) => {
                            return (
                                < CardOfProduct description={product.description} key={product.id} category={product.category} price={product.price} id={product.id} onChange={(ev) => handleSelection(ev, product)} checkBox="true" />
                            )
                        })}
                    </div>
                    <div className="container">
                        <Button id="button" onClick={() => addidProductsInCart()}>ADD PRODUCT</Button>
                        <DropComponent contentButton="CART" productsLenght={cartProducts.length === 0 ? "0" : cartProducts.length} item={
                            cartProducts.length === 0 ?
                                <Menu.Item key={cartProducts.id}>
                                    Empty cart
                                </Menu.Item> :
                                cartProducts.map((products) => {
                                    return (
                                        <Menu.Item key={products.id}>
                                            {products.description}
                                        </Menu.Item>
                                    )
                                })
                        } />
                    </div>
                </>
    )
}

export default HomePage;
