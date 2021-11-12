import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { useSelector, useDispatch } from 'react-redux'
import {
    HomeOutlined,
    PlusCircleOutlined,
    PoweroffOutlined,
} from '@ant-design/icons'

import { LogoutUser } from '#store/actionCreators/auth'

import styles from './index.module.scss'


const Component = () => {

    const router = useRouter()
    
    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)

    const logout = () => {
        dispatch(LogoutUser())
    }

    const routes = {
        home: '/',
        chat: '/messages/[chatId]',
        addChat: '/addchat',
        login: '/auth/login',
        signUp: '/auth/signup',
    }

    const getClassName = (route) => {
        let className = styles.link
        if (router.pathname === route || (route === routes.home && router.pathname === routes.chat)) {
            className += ' ' + styles.activeLink
        }
        return className
    }

    console.log('Footer', router.pathname)

    return (
        <footer className={styles.mainContainer}>
            <nav className={styles.linksContainer}>
                {token ?
                    <>
                        <Link href={routes.home}>
                            <a className={getClassName(routes.home)}>
                                <HomeOutlined
                                    className={styles.icon} />
                            </a>
                        </Link>
                        <Link href={routes.addChat}>
                            <a className={getClassName(routes.addChat)}>
                                <PlusCircleOutlined
                                    className={styles.icon} />
                            </a>
                        </Link>
                        <button
                            onClick={logout}
                            className={`${styles.link} ${styles.logoutButton}`}>
                            <PoweroffOutlined
                                className={styles.icon} />
                        </button>
                    </> :
                    <>
                        <Link href={routes.login}>
                            <a className={getClassName(routes.login)}>
                                Login
                            </a>
                        </Link>
                        <Link href={routes.signUp}>
                            <a className={getClassName(routes.signUp)}>
                                Sign Up
                            </a>
                        </Link>
                    </>
                }
            </nav>
        </footer>
    )
}


export default React.memo(Component)