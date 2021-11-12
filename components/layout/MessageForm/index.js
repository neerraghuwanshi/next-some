import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SendOutlined } from '@ant-design/icons'

import { getCurrentChatId } from '#helpers/url'
import { AddMessage } from '#store/actionCreators/messages'

import styles from './index.module.scss'
import loginStyles from '../Login/index.module.scss'


function Component() {

    const dispatch = useDispatch()
    
    const [message, setMessage] = useState('')
    
    const onSubmitHandler = (event) => {
        event.preventDefault()
        setMessage('')
        dispatch(AddMessage({ chatId: getCurrentChatId(), message }))
    }

    console.log('Message Form', message)

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={onSubmitHandler}>
                <input
                    type='text'
                    placeholder='Message...'
                    className={loginStyles.input + ' ' + styles.input}
                    value={message}
                    onChange={(event)=> setMessage(event.target.value)} />
                <SendOutlined
                    className={styles.icon}
                    onClick={onSubmitHandler} />
            </form>
        </div>
    )
}


export default React.memo(Component)