import { Card, Button } from 'antd';
import { Checkbox } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

export const CardOfProduct = ({ checkBox, onClick, button, onChange, description, category, price, id }) => {
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <span style={{ color: "red" }} onClick={() => onClick()} >Remove item</span>
            </Menu.Item>
        </Menu>
    );
    return (
        <Card id="card" description={description} extra={<Dropdown overlay={menu} trigger={['click']}>
            {button ? <Button onClick={e => e.preventDefault()}><EllipsisOutlined key="ellipsis" /></Button> : <></>}
        </Dropdown>} title={description}>
            <p>Category: {category}</p>
            <p>Price: {price}</p>
            {checkBox ? <Checkbox onChange={onChange}>select</Checkbox> : <></>}

        </Card>
    )
}