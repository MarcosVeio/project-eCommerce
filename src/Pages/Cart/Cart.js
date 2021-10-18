import React, { useState } from 'react'
import { CardOfProduct } from '../../components/card/card'
import { ModalComponent } from '../../components/modal/Modal'
import { useCartContext } from '../../context/productsCart'
import 'antd/dist/antd.css'
import '../../styles.css'
import { Button, message, Divider, Result, Spin } from 'antd'
import { Empty } from 'antd'
import Text from 'antd/lib/typography/Text'
import { addidOrder } from '../../services/Order/addidOrder/addidOrder'
import { EllipsisOutlined } from '@ant-design/icons'
import { Menu, Dropdown } from 'antd'
import { getAllOrders } from '../../services/Order/getAllOrders/getAllOrders'

function Cart() {
    const { cartProducts, removeProducts, clearCart } = useCartContext()
    const [isLoading, setLoading] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [ordersList, setOrdersList] = useState([])


    const getPostsData = async () => {
        setLoading(true)
        const { data } = await getAllOrders()
        setOrdersList(data.listOrders)
        setLoading(false)
    }

    const postData = async () => {
        setLoading(true)
        await addidOrder(cartProducts)
        setLoading(false)
        getPostsData()
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
        clearCart()
    }

    const removeProduct = (productId) => {
        setLoading(true)
        removeProducts([productId])
        message.success(`product removed`)
        setLoading(false)
    }

    const totalPrice = () => {
        let priceTotal = 0
        for (const products of cartProducts) {
            priceTotal = priceTotal += products.price
        }
        return (
            <Text style={{ fontSize: '20px' }} type="primary">Total price: {
                <Text style={{ fontSize: '20px' }} type="success">
                    R$ {priceTotal}
                </Text>
            }</Text>
        )
    }

    const resultSucess = () => {
        const codeOrder = ordersList.map(({ code }) => code)
        return (
            <Result
                status="success"
                title="Order sent successfully!"
                subTitle={`Order number: ${codeOrder[codeOrder.length - 1]}`}
            />
        )
    }

    const extra = (products) => {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <span style={{ color: "red" }} onClick={() => removeProduct(products)} >Remove item</span>
                </Menu.Item>
            </Menu>
        )

        return (
            <Dropdown overlay={menu} trigger={['click']}><Button onClick={e => e.preventDefault()}><EllipsisOutlined key="ellipsis" /></Button></Dropdown>
        )
    }

    if (isLoading) {
        return (
            <div className="empty-container">
                <Spin />
            </div>
        )
    }

    return (
        cartProducts.length === 0 ? <div className="empty-container" ><Empty description="EMPTY CART" /></div> :
            <>
                <div id="buttonAddText" className="container">
                    <Text style={{ fontSize: '25px' }} type="secondary">CART</Text>
                    {totalPrice()}
                    <div>
                        <Button id="button" className="buttonPersonalized" onClick={() => postData()} >BUY</Button>
                        <Button onClick={() => { clearCart() }} >CLEAR CART</Button>
                    </div>
                </div>
                <Divider />
                <div className="container">
                    {
                        cartProducts?.map((products) => {
                            return (
                                <CardOfProduct description={products.description} key={products.id} title={products.description} category={products.category} price={products.price} id={products.id} extra={extra(products)} />
                            )
                        })
                    }
                </div>
                <ModalComponent title="" visible={isModalVisible} onOk={handleOk} onCancel={handleOk} content={resultSucess()} />
            </>
    )
}

export default Cart