import { Card, Col } from 'antd'
import './card.css'

export const CardOfProduct = ({ adm, checkBox, extra, description, category, price, id }) => {

    return (
        <Col className="gutter-row" span={6}>
            <Card id="card" description={description} extra={extra} title={description}>
                <p>Category: {category}</p>
                <p>Price: {price}</p>
                {adm}
                {checkBox}
            </Card>
        </Col>
    )
}