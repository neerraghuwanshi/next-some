import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useDispatch, useSelector } from 'react-redux'

import Navbar from '../Navbar'
import Footer from '../Footer'
import { authActions } from '#store/slices/auth'
import { InitializeSocketEvents } from '#store/actionCreators/socket'
import ErrorModal from '#components/ui/ErrorModal'
import ContentContainer from '#components/ui/ContentContainer'


function Component(props) {
    
    const router = useRouter()
    const { pathname } = router
    
    const dispatch = useDispatch()

    const { token, doneSettingInitialState } = useSelector(state => state.auth)

    const authRoutes = useMemo(() => ([
        '/auth/login',
        '/auth/signup', 
        '/auth/verify',
    ]), [])

    const safeRoute = useMemo(() => (
        authRoutes.includes(pathname)
    ), [authRoutes, pathname])

    useEffect(() => {
        const init = async () => {
            if (!doneSettingInitialState) {
                dispatch(authActions.setInitials())
            }
            else if (!token) {
                if (!safeRoute) {
                    router.replace('/auth/login')
                }
            }
            else {
                dispatch(InitializeSocketEvents({ router }))
            }
        }
        init()
    }, [dispatch, doneSettingInitialState, router, token, safeRoute])

    console.log(token, doneSettingInitialState, pathname, 'Wrapper')

    return (
        doneSettingInitialState && (token || safeRoute) && (
            <>  
                <ErrorModal />
                <Navbar />
                    <main>
                        <ContentContainer global={true}>
                            {props.children}
                        </ContentContainer>
                    </main>
                <Footer />
            </>
        )
    )
}


export default React.memo(Component)