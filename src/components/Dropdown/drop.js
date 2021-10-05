import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Dropdown } from 'antd';
import { useHistory } from 'react-router-dom';

export const DropComponent = ({ item, productsLenght, contentButton }) => {
    const history = useHistory()

    const menu = (
        <Menu>
            {item}
        </Menu>
    );

    return (
        <Dropdown.Button onClick={() => history.push('/cart')} overlay={menu} icon={productsLenght}>
            {contentButton}
        </Dropdown.Button>
    )
}