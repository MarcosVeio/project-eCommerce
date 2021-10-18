import React from 'react'
import { Modal } from 'antd'

export const ModalComponent = ({ buttonProps, okType, width, content, title, onOk, onCancel, visible }) => {
    return (
        <>
            <Modal okType={okType} width={width} okButtonProps={buttonProps} cancelButtonProps={{ style: { display: 'none' } }} title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
                {content}
            </Modal>
        </>
    )
}