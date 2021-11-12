import { useSelector } from 'react-redux'

import Chat from '../Chat'
import LoadingSpinner from '#components/ui/LoadingSpinner'
import ContentContainer from '#components/ui/ContentContainer'


function Component() {

    const { loading, data } = useSelector(state => state.chats)

    const chats = data.map((item, index) => (
        <Chat
            key={item._id}
            isLast={index === (data.length - 1)}
            {...item} />
    ))

    console.log('Chats', loading, data)

    return (
        loading ?
            <LoadingSpinner /> :
            <ContentContainer>
                {chats}
            </ContentContainer>
    )
}


export default Component