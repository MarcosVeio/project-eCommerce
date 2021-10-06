import { useState } from 'react'
import axios from 'axios'

import 'antd/dist/antd.css';
import '../styles.css'

import { Skeleton, Select, Divider, InputNumber } from 'antd';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';

function FormRegistration() {
    const [isLoading, setLoading] = useState(false)

    const onFinish = async (values) => {
        const getValues = values.products
        const category = values.products.map(({ category }) => category)
        for (const postCategory of category) {
            const newProduct = getValues.filter(({ category }) => category === postCategory)
            const [deleteCategory] = newProduct.map(({ category, ...others }) => others)
            setLoading(true)
            await axios.post(`http://localhost:3001/products/${postCategory}`, deleteCategory)
            setLoading(false)
        }
    }

    return (
        isLoading ?
            <Skeleton active />
            :
            <>
                <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                    <Form.List name="products">
                        {(fields, { add, remove }) => (
                            <>
                                <div id="buttonAddText">
                                    <Text style={{ fontSize: '25px' }} type="secondary">REGISTER OF PRODUCTS</Text>
                                    <Form.Item>
                                        <Button style={{ marginRight: '15px' }} type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </div>
                                <Divider />
                                <div id="buttonAdd">
                                    <Form.Item>
                                        <Button id="buttonAddidProduct" onClick={() => add()} block icon={<PlusOutlined />}>
                                            ADD NEW PRODUCT
                                        </Button>
                                    </Form.Item>
                                </div>
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
                            </>
                        )}
                    </Form.List>
                </Form>
            </>
    )
}

export default FormRegistration;

