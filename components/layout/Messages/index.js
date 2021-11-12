import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCurrentChatId } from '#helpers/url'
import Message from '../Message'
import MessageForm from '../MessageForm'
import { messagesActions } from '#store/slices/messages'
import { FetchMessages } from '#store/actionCreators/messages'
import LoadingSpinner from '#components/ui/LoadingSpinner'
import ContentContainer from '#components/ui/ContentContainer'

import styles from './index.module.scss'


function Component() {

    const dispatch = useDispatch()

    const messagesEndRef = useRef(null)

    const { loading, data } = useSelector(state => state.messages)

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const Messages = data.map(item => (
        <Message
            key={item._id}
            {...item} />
    ))

    useEffect(() => {
        dispatch(FetchMessages({ chatId: getCurrentChatId() }))
        return () => {
            dispatch(messagesActions.update({ data: [] }))
        }
    }, [dispatch])

    useEffect(scrollToBottom, [data])

    console.log('Messages', messagesEndRef, loading, data)

    return (
        <ContentContainer>
            <div className={styles.messagesContainer}>
                {loading ?
                    <div className={styles.centredContainer}>
                        <LoadingSpinner />
                    </div> :
                    Messages
                }
                <div ref={messagesEndRef}></div>
            </div>
            <MessageForm />
        </ContentContainer>
    )
}


export default React.memo(Component)