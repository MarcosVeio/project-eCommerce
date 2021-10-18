import React, { useState } from 'react'
import { Layout, Menu, Badge } from 'antd'
import { useHistory } from 'react-router-dom'
import { useCartContext } from '../../context/productsCart'
import {
    HomeOutlined,
    ShoppingCartOutlined,
    SettingOutlined,
    AppstoreAddOutlined
} from '@ant-design/icons'

const { Content, Sider } = Layout
const { SubMenu } = Menu

export const LayoutWithApp = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false)
    const history = useHistory()
    const { cartProducts } = useCartContext()

    const onCollapse = isCollapsed => {
        setCollapsed(isCollapsed)
    }

    return (
        <Layout className="site-layout" style={{ minHeight: '100vh' }}>
            <Sider theme="light" style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }} collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <Menu theme="light" /* defaultSelectedKeys={['1']} */ mode="inline">
                    <Menu.Item onClick={() => history.push('/')} key="1" icon={<HomeOutlined />}>
                        HomePage
                    </Menu.Item>
                    <Menu.Item style={cartProducts.length ? { paddingTop: 10 } : { paddingTop: 0 }} onClick={() => { history.push('/cart') }} key="2" icon={
                        <Badge count={cartProducts.length}>
                            <ShoppingCartOutlined style={{ color: 'black' }} />
                        </Badge>
                    }>
                        Cart
                    </Menu.Item>
                    <SubMenu key="3" icon={<SettingOutlined />} title="Settings">
                        <Menu.Item onClick={() => history.push('/products')} key="4" icon={<AppstoreAddOutlined />}>
                            Products
                        </Menu.Item>
                        <Menu.Item onClick={() => history.push('/orders')} key="5" icon={<AppstoreAddOutlined />}>
                            Orders
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider >
            <Layout id="content" className="site-layout" style={collapsed ? { marginLeft: 80 } : { marginLeft: 200 }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout >
    )
}