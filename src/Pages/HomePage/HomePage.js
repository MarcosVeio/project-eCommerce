import { useState, useEffect } from 'react'
import { getAllProducts } from './../../services/Product/getAllProducts/product'
import 'antd/dist/antd.css'
import '../../styles.css'
import { Checkbox, Spin } from 'antd'
import { CardOfProduct } from '../../components/card/card'
import { useCartContext } from '../../context/productsCart'
import { Button, message, Empty, Divider } from 'antd'
import Text from 'antd/lib/typography/Text'

function HomePage() {
    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [selection, setSelection] = useState([])
    const { addProducts } = useCartContext()

    const getPostsData = async () => {
        setLoading(true)
        const { data } = await getAllProducts()
        setProducts(data.listProduct)
        setLoading(false)
    }

    const addidProductsInCart = () => {
        if (selection.length === 0) {
            message.error("Empty cart")
        } else {
            addProducts(selection)
            message.success(`${selection.length} product added`)
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

    if (isLoading) {
        return (
            <div className="empty-container">
                <Spin />
            </div>
        )
    }

    return (
        products.length === 0 ? <div className="empty-container" ><Empty description="LIST OF PRODUCT EMPTY" /></div> :
            <>
                <div id="buttonAddText" className="container">
                    <Text style={{ fontSize: '25px' }} type="secondary">PRODUCTS</Text>
                    <Button id="button" onClick={() => addidProductsInCart()}>ADD PRODUCT</Button>
                </div>
                <Divider />
                <div className="container">
                    {products.map((product) => {
                        return (
                            < CardOfProduct description={product.description} key={product.id} category={product.category} price={product.price} id={product.id} extra={
                                <Checkbox onChange={(ev) => handleSelection(ev, product)} ></Checkbox>
                            } />
                        )
                    })}
                </div>
            </>
    )
}

export default HomePage
