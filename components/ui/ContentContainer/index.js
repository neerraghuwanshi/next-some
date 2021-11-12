import React from 'react'

import styles from './index.module.scss'


function Component(props) {

    const { global, className } = props

    let normalClassNames = styles.normalContainer

    if (!global) {
        normalClassNames += ' ' + className
    }

    return (
        global ?
            <div className={styles.globalContainer}>
                <div className={styles.centredContainer}>
                    {props.children}
                </div>
            </div> :
            <div className={normalClassNames}>
                {props.children}
            </div>
    )
}


export default React.memo(Component)