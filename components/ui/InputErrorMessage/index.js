import React from 'react'

import styles from './index.module.scss'


function Component(props) {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    )
}


export default React.memo(Component)