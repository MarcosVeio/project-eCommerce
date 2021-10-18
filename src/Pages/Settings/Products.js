import { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import '../../styles.css'
import { Select, Divider, InputNumber, message, Spin } from 'antd'
import { Form, Input, Button, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons'
import Text from 'antd/lib/typography/Text'
import { addidProducts } from './../../services/Product/addidProducts/addidProducts'
import { ModalComponent } from '../../components/modal/Modal'
import { getAllProducts } from './../../services/Product/getAllProducts/product'
import { CardOfProduct } from '../../components/card/card'
import { removeProduct } from './../../services/Product/removeProduct/removeProduct'

function Products() {
    const [isLoading, setLoading] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [products, setProducts] = useState([])

    const getPostsData = async () => {
        setLoading(true)
        const { data } = await getAllProducts()
        setProducts(data.listProduct)
        setLoading(false)
    }

    useEffect(() => {
        getPostsData()
    }, [])

    const onFinish = async (values) => {
        if (values.products === undefined) {
            message.error("Empty cart")
        } else {
            const getValues = values.products
            setLoading(true)
            await addidProducts(getValues)
            setLoading(false)
            message.success("Product(s) added")
            await getPostsData()
            setIsModalVisible(false)
        }
    }

    const deleteProduct = async (id) => {
        setLoading(true)
        await removeProduct(id)
        setLoading(false)
        message.success("Product removed")
        await getPostsData()
    }

    if (isLoading) {
        return (
            <div className="empty-container">
                <Spin />
            </div>
        )
    }

    return (
        <>
            <div id="buttonAddText">
                <Text style={{ fontSize: '25px' }} type="secondary">EDIT PRODUCTS</Text>
                <div>
                    <Button id="buttonAddidProduct" onClick={() => setIsModalVisible(true)} block icon={<PlusOutlined />}>
                        ADD NEW PRODUCT
                    </Button>
                    <Button onClick={() => getPostsData()} icon={<ReloadOutlined />}></Button>
                </div>
            </div>
            <Divider />
            <ModalComponent
                width={550}
                buttonProps={{ style: { display: 'none' } }}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
                visible={isModalVisible}
                content={
                    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="on">
                        <Form.List name="products">
                            {(fields, { add, remove }) => (
                                <>
                                    <Button onClick={() => add()} icon={<PlusOutlined />}>
                                        ADD
                                    </Button>
                                    <Divider />
                                    {fields.map(({ key, name, fieldKey, category, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'description']}
                                                fieldKey={[fieldKey, 'description']}
                                                category={[category, 'description']}
                                                rules={[{ required: true, message: 'Missing description' }]}
                                            >
                                                <Input placeholder="Description" />
                                            </Form.Item>
                                            <Form.Item label="Category"
                                                {...restField}
                                                name={[name, 'category']}
                                                fieldKey={[fieldKey, 'category']}
                                                category={[category, 'category']}
                                                rules={[{ required: true, message: 'Missing category' }]}
                                            >
                                                <Select style={{ width: '100px' }}>
                                                    <Select.Option value="Beer">Beer</Select.Option>
                                                    <Select.Option value="Cigar">Cigar</Select.Option>
                                                    <Select.Option value="Eletronic">Eletronic</Select.Option>
                                                    <Select.Option value="Water">Water</Select.Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'price']}
                                                fieldKey={[fieldKey, 'price']}
                                                category={[category, 'price']}
                                                rules={[{ required: true, message: 'Missing price' }]}
                                            >
                                                <InputNumber placeholder="Price" />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    {fields.length !== 0 ?
                                        <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: '15px' }} type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                        :
                                        <Button style={{ marginRight: '15px' }} type="primary" htmlType="submit" disabled>
                                            Submit
                                        </Button>
                                    }
                                </>
                            )}
                        </Form.List>
                    </Form>
                }
            />
            <div className="container">
                {products.map((product) => {
                    return (
                        < CardOfProduct description={product.description} key={product.id} category={product.category} price={product.price} id={product.id} extra={
                            <Button danger ghost onClick={() => deleteProduct(product.id)} icon={<DeleteOutlined />}></Button>
                        } adm={<p>ID: {product.id}</p>} />
                    )
                })}
            </div>
        </>
    )
}

export default Products

