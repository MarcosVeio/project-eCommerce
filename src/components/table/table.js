import { Table } from 'antd';

export const TableComponent = ({ columns, dataSource }) => {
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
        />
    )
}