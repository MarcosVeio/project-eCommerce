import React, { useState } from 'react';
import { Layout, Menu, Badge } from 'antd';
import { useHistory } from 'react-router-dom';
import { useCartContext } from '../../context/productsCart';
import {
    HomeOutlined,
    ShoppingCartOutlined,
    SettingOutlined,
    AppstoreAddOutlined
} from '@ant-design/icons';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export const SideBar = ({ children }) => {
    const [collapsed, setCollapsed] = useState(true)
    const history = useHistory()
    const { cartProducts } = useCartContext()

    const onCollapse = isCollapsed => {
        setCollapsed(isCollapsed);
    };

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
                            <ShoppingCartOutlined />
                        </Badge>
                    }>
                        Cart
                    </Menu.Item>
                    <SubMenu key="3" icon={<SettingOutlined />} title="Settings">
                        <Menu.Item onClick={() => history.push('/registration')} key="4" icon={<AppstoreAddOutlined />}>
                            Registration
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
    );
}