import { useState, useCallback } from "react"

// Will help later
function withModal(WrappedComponent) {

    return function WrapperComponent(props) {

        const [modalVisible, setModalVisible] = useState(false)
    
        const showModal = useCallback(() => {
            setModalVisible(true)
        }, [])
    
        const hideModal = useCallback(() => {
            setModalVisible(false)
        }, [])
    
        return (
            <WrappedComponent
                modalVisible={modalVisible}
                showModal={showModal}
                hideModal={hideModal}
                {...props}>
                {props.children}
            </WrappedComponent>
        )
    }
}


export default withModal