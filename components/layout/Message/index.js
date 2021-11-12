import { useSelector } from 'react-redux'

import styles from './index.module.scss'


function Component(props) {

    const { _id, message, from } = props

    const email = useSelector(state => state.auth.email)

    console.log('Message', _id)

    return (
        <div
            key={_id}
            className={
                from.email !== email ?
                    styles.left :
                    styles.right
            }>
            {message}
        </div>
    )
}


export default Component