import * as Yup from 'yup'
import { useRouter } from 'next/dist/client/router'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { LoginUser } from '#store/actionCreators/auth'
import LoadingSpinner from '#components/ui/LoadingSpinner'
import InputErrorMessage from '#components/ui/InputErrorMessage'

import styles from './index.module.scss'


function Component() {

    const router = useRouter()

    const dispatch = useDispatch()

    const loading = useSelector(state => state.auth.loading)

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .required('Cannot be Empty')
            .email('E-mail is Invalid'),
        password: Yup.string()
            .required('Cannot be Empty')
            .test(
                'password-space',
                'Cannot include a White Space',
                (value) => !/\s/.test(value),
            )
            .min(8, 'Cannot be Less than 8 Characters')
            .max(20, 'Cannot be Greater than 20 Characters')
            .matches(/[a-z]/, 'Needs a Lower Case Letter')
            .matches(/[A-Z]/, 'Needs an Upper Case Letter')
            .matches(/[0-9]/, 'Needs a Number')
            .matches(/[\W]/, 'Needs a Special Character')
            .matches(/^[\x20-\x7F]+$/, 'Allowed ASCII Characters - HEX(20-7F)'),
    })

    const onSubmitHandler = (values) => {
        dispatch(LoginUser({
            router,
            email: values.email,
            password: values.password,
        }))
    }

    console.log('Login')

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={onSubmitHandler}>
            {
                loading ?
                    <LoadingSpinner /> :
                    <Form
                        className={styles.form}>

                        <Field 
                            type="email"
                            name="email" 
                            placeholder="E-mail"
                            className={styles.input}/>
                        <ErrorMessage
                            name="email"
                            component={InputErrorMessage}/>

                        <Field 
                            type="password"
                            name="password"
                            placeholder="Password"
                            className={styles.input}/>
                        <ErrorMessage
                            name="password" 
                            component={InputErrorMessage}/>

                        <button
                            type="submit"
                            className={styles.formButton}>
                            Login
                        </button>
                        
                    </Form>
            }
        </Formik>
    )
}


export default Component