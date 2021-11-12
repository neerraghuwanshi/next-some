import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'

import User from '../User'
import LoadingSpinner from '#components/ui/LoadingSpinner'
import { SearchEmails } from '#store/actionCreators/chats'
import ContentContainer from '#components/ui/ContentContainer'

import mainStyles from './index.module.scss'
import loginStyles from '../Login/index.module.scss'


function Component() {

    const dispatch = useDispatch()

    const [data, setData] = useState({
        loading: false,
        searchTerm: '',
        searchData: [],
    })

    const { loading, searchTerm, searchData } = data

    const _setData = (data) => {
        setData(prev => ({ ...prev, ...data }))
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        if (searchTerm.length > 0) {
            dispatch(SearchEmails({
                _setData,
                email: searchTerm,
            }))
        }
    }

    const users = searchData.map((item, index) => (
        <User
            key={item._id}
            index={index}
            totalUsers={searchData.length}
            {...item} />
    ))

    console.log('Add Chat', loading, searchTerm, searchData)

    return (
        loading ?
            <LoadingSpinner /> :
            <ContentContainer className={mainStyles.mainContainer}>
                <form
                    onSubmit={onSubmitHandler}>
                    <div className={mainStyles.rowContainer}>
                        <input
                            required
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            className={loginStyles.input}
                            onChange={event => _setData({ searchTerm: event.target.value })} />
                        <SearchOutlined
                            onClick={onSubmitHandler} 
                            className={mainStyles.searchIcon} />
                    </div>
                </form>
                {users}
            </ContentContainer>
    )
}


export default Component