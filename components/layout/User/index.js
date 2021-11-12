import React from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'

import { AddChat } from '#store/actionCreators/chats'
import profileImage from '#public/profileImage.jpeg'

import mainStyles from './index.module.scss'
import chatStyles from '../Chat/index.module.scss'


function Component(props) {

    const { _id, index, totalUsers, email, firstName, lastName } = props

    const dispatch = useDispatch()

    const isLast = totalUsers === (index + 1)

    const hrStyles = () => {
        return `${chatStyles.hr} ${mainStyles.hr}`
    }

    const onClickHander = () => {
        dispatch(AddChat({ participant: _id }))
    }

    console.log('User')

    return (
        <>
            <hr className={hrStyles()}/>
            <div 
                className={chatStyles.mainContainer + ' ' + mainStyles.mainContainer} 
                onClick={onClickHander}>
                <div className={chatStyles.profileImageContainer}>
                    <Image
                        width={50}
                        height={50}
                        layout='responsive'
                        alt='Profile Image'
                        src={profileImage} />
                </div>
                <div className={chatStyles.textContainer}>
                    <h6 className={chatStyles.email}>
                        {email}
                    </h6>
                    <p className={chatStyles.message}>
                        {firstName + ' ' + lastName}
                    </p>
                </div>
            </div>
            {isLast &&
                <>
                    <hr className={hrStyles()}/>
                    <div className={mainStyles.lastContainer}></div>
                </>
            }
        </>
    )
}


export default Component