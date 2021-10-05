import React, { useState } from 'react';
import { Layout, Menu, Badge } from 'antd';
import { useHistory } from 'react-router-dom';
import { useCartContext } from '../../context/productsCart';
import {
    HomeOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';

const { Content, Sider } = Layout;

export const SideBar = ({ children, badgeCount }) => {
    const [collapsed, setCollapsed] = useState(true)
    const history = useHistory()
    const { cartProducts } = useCartContext()

    const onCollapse = isCollapsed => {
        setCollapsed(isCollapsed);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme="light" collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item onClick={() => history.push('/')} key="1" icon={<HomeOutlined />}>
                        HomePage
                    </Menu.Item>
                    <Menu.Item style={cartProducts.length ? { paddingTop: 10 } : { paddingTop: 0 }} onClick={() => { history.push('/cart') }} key="2" icon={
                        <Badge count={cartProducts.length}>
                            <ShoppingCartOutlined />
                        </Badge>
                    }>
                        Cart
                    </Menu.Item>
                </Menu>
            </Sider >
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout >
    );
}