import React from 'react'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { globalActions } from '#store/slices/global'


function Component(props) {

    const dispatch = useDispatch()

    const error = useSelector(state => state.global.error)

    const hideModal = () => {
        dispatch(globalActions.error(null))
    }

    return (
        <Modal
            centered
            title='Error'
            footer={null}
            visible={error}
            onCancel={hideModal}
            {...props}>
            <p>
                {error}
            </p>
        </Modal>
    )
}


export default React.memo(Component)