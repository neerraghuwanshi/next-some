import Image from 'next/image'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/dist/client/router'

import profileImage from '#public/profileImage.jpeg'

import styles from './index.module.scss'


function Component(props) {

    const { isLast, _id, participants, lastMessage } = props

    const router = useRouter()

    const email = useSelector(state => state.auth.email)

    const onClickHander = () => {
        router.push(`/messages/${_id}`)
    }

    console.log('Chat', _id)

    return (
        <>
            <div className={styles.mainContainer} onClick={onClickHander}>
                <div className={styles.profileImageContainer}>
                    <Image
                        width={50}
                        height={50}
                        layout='responsive'
                        alt='Profile Image'
                        src={profileImage} />
                </div>
                <div className={styles.textContainer}>
                    <h6 className={styles.email}>
                        {participants[0].email === email ? 
                            participants[1].email :
                            participants[0].email
                        }
                    </h6>
                    <p className={styles.message}>
                        {lastMessage.message}
                    </p>
                </div>
            </div>
            <hr className={isLast ? styles.lastHr : styles.hr} />
        </>
    )
}


export default Component