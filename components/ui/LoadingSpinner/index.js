import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import styles from './index.module.scss'


const Component = () => {

    const antIcon = (
        <LoadingOutlined
            spin
            className={styles.icon}
            style={{ fontSize: 40 }} />
    )

    return (
        <Spin indicator={antIcon} />
    )
}


export default Component