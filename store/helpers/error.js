import { globalActions } from '#store/slices/global'


export const handleError = (dispatch, error) => {
    console.log(error)
    let errorMessage = ''
    if (error.code === "ECONNABORTED"){
        errorMessage = 'Request Timed Out'
    }
    else {
        errorMessage = error.message
    }
    dispatch(globalActions.error(errorMessage))
}