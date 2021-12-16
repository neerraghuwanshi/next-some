import React from 'react'

import styles from './index.module.scss'


const Component = () => {

    console.log('Navbar')

    return (
        <header 
            data-testid='header'>
            <nav 
                className={styles.mainContainer}
                data-testid='headerNav'>
                <h2 
                    className={styles.heading}
                    data-testid='headerNavHeading'>
                    So-Me
                </h2>
            </nav>
        </header>
    )
}


export default React.memo(Component)