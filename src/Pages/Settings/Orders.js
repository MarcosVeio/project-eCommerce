import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import '../../styles.css'
import { Spin, Collapse, Divider, message, Button, Table, Empty } from 'antd'
import { getAllOrders } from '../../services/Order/getAllOrders/getAllOrders'
import Text from 'antd/lib/typography/Text'
import { removeOrder } from './../../services/Order/removeOrder/removeOrder'
import { DeleteOutlined } from '@ant-design/icons'
import { deleteProductInOrder } from './../../services/Order/deleteProductInOrder/deleteProductInOrder';

const Orders = () => {
    const [isLoading, setLoading] = useState(false)
    const [ordersList, setOrdersList] = useState([])
    const { Panel } = Collapse

    const getPostsData = async () => {
        setLoading(true)
        const { data } = await getAllOrders()
        setOrdersList(data.listOrders)
        setLoading(false)
    }

    useEffect(() => {
        getPostsData()
    }, [])

    const deleteOrder = async (code) => {
        setLoading(true)
        await removeOrder(code)
        setLoading(false)
        message.success("Order removed")
        await getPostsData()
    }

    const removeProductInOrder = async (code, id) => {
        await deleteProductInOrder(code, id)
        await getPostsData()
    }

    const genExtra = (code) => (
        <Button onClick={() => deleteOrder(code)} danger ghost>
            <DeleteOutlined />
        </Button>

    )

    const priceTotal = (codeOrder) => {
        let total = 0
        const order = ordersList.filter(({ code }) => code === codeOrder)
        const [products] = order.map(({ productList }) => productList)
        products.map(({ price }) => total = price += total)
        return total
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: text => <p style={{ color: '#45a5fe' }}>{text}</p>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'Description',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'Category',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'Price',
        },
        {
            title: 'Delete',
            dataIndex: 'action',
            key: 'action',
        },
    ]

    if (isLoading) {
        return (
            <div className="empty-container">
                <Spin />
            </div>
        )
    }

    return (
        ordersList.length === 0 ? <div className="empty-container" ><Empty description="EMPTY ORDER LIST" /></div> :
            <>
                <Text style={{ fontSize: '25px' }} type="secondary">ORDERS LIST</Text>
                <Divider />
                <div>
                    <Collapse accordion>
                        {
                            ordersList.map((order) => {
                                return (
                                    <Panel header={order.code} key={order.code} extra={genExtra(order.code)}>
                                        <Table
                                            columns={columns}
                                            pagination={false}
                                            footer={() => <p style={{ color: '#52c41a' }}>Price total: R$ {priceTotal(order.code)}</p>}
                                            dataSource={
                                                order.productList.map((product) => {
                                                    return (
                                                        {
                                                            key: product.id,
                                                            id: product.id,
                                                            description: product.description,
                                                            category: product.category,
                                                            price: product.price,
                                                            action: <Button onClick={() => removeProductInOrder(order.code, product.id)} danger ghost><DeleteOutlined /></Button>
                                                        }
                                                    )
                                                })
                                            }
                                        />
                                    </Panel>
                                )
                            })
                        }
                    </Collapse>
                </div>
            </>
    )
}

export default Orders