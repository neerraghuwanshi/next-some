import * as Yup from 'yup'
import { useRouter } from 'next/dist/client/router'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import LoadingSpinner from '#components/ui/LoadingSpinner'
import { VerifyUserEmail } from '#store/actionCreators/auth'
import InputErrorMessage from '#components/ui/InputErrorMessage'

import styles from '../Login/index.module.scss'


function Component() {

    const router = useRouter()

    const dispatch = useDispatch()

    const loading = useSelector(state => state.auth.loading)

    const verifyEmailSchema = Yup.object().shape({
        otp: Yup.string()
            .required('Cannot be Empty')
            .min(6, 'Should be exactly 6 digits')
            .max(6, 'Should be exactly 6 digits')
            .matches(/^[0-9]+$/, 'Should be only digits')
            .test(
                'shouldNotStartWithZero',
                'Should be between 100000 to 999999',
                val => {
                    if (val && val.length > 0) {
                        return val.slice(0, 1) !== '0'
                    }
                    return true
                }
            ),
    })

    const onSubmitHandler = (values) => {
        dispatch(VerifyUserEmail({
            router,
            otp: values.otp,
        }))
    }

    console.log('Verify Email')

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={verifyEmailSchema}
            onSubmit={onSubmitHandler}>
            {
                loading ?
                    <LoadingSpinner /> :
                    <Form
                        className={styles.form}>

                        <Field 
                            type="otp"
                            name="otp" 
                            placeholder="OTP"
                            className={styles.input}/>
                        <ErrorMessage
                            name="otp"
                            component={InputErrorMessage}/>

                        <button
                            type="submit"
                            className={styles.formButton}>
                            Verify Email
                        </button>

                    </Form>
            } 
        </Formik>
    )
}


export default Component