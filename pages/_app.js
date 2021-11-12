import { Provider } from 'react-redux'

import { store } from '#store/index'
import Wrapper from '#components/layout/Wrapper'

import 'antd/dist/antd.css'
import '#styles/resets.scss'


function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Wrapper>
                <Component {...pageProps} />
            </Wrapper>
        </Provider>
    )
}


export default MyApp