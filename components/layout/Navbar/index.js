import React from 'react'

import styles from './index.module.scss'


const Component = () => {

    console.log('Navbar')

    return (
        <header>
            <nav className={styles.mainContainer}>
                <h2 className={styles.heading}>
                    So-Me
                </h2>
            </nav>
        </header>
    )
}


export default React.memo(Component)