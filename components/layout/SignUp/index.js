import * as Yup from 'yup'
import { useRouter } from 'next/dist/client/router'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { SignUpUser } from '#store/actionCreators/auth'
import LoadingSpinner from '#components/ui/LoadingSpinner'
import InputErrorMessage from '#components/ui/InputErrorMessage'

import styles from '../Login/index.module.scss'


function Component() {

    console.log('Sign Up')

    const router = useRouter()

    const dispatch = useDispatch()

    const loading = useSelector(state => state.auth.loading)

    let passwordFieldValue = ''

    const signUpSchema = Yup.object().shape({
        email: Yup.string()
            .required('Cannot be Empty')
            .email('E-mail is Invalid'),
        firstName: Yup.string()
            .required('Cannot be Empty')
            .test(
                'firstName-space',
                'Cannot include a White Space',
                (value)=> !/\s/.test(value),
            ).min(2, 'Cannot be Less than 2 Characters')
            .max(20, 'Cannot be Greater than 20 Characters')
            .matches(/^[\x20-\x7F]+$/, 'Allowed ASCII Characters - HEX(20-7F)'),
        lastName: Yup.string()
            .required('Cannot be Empty')
            .test(
                'lastName-space',
                'Cannot include a White Space',
                (value)=> !/\s/.test(value),
            ).min(2, 'Cannot be Less than 2 Characters')
            .max(20, 'Cannot be Greater than 20 Characters')
            .matches(/^[\x20-\x7F]+$/, 'Allowed ASCII Characters - HEX(20-7F)'),
        password: Yup.string()
            .required('Cannot be Empty')
            .test(
                'password-space',
                'Cannot include a White Space',
                (value)=> !/\s/.test(value),
            ).min(8, 'Cannot be Less than 8 Characters')
            .max(20, 'Cannot be Greater than 20 Characters')
            .matches(/[a-z]/, 'Needs a Lower Case Letter')
            .matches(/[A-Z]/, 'Needs an Upper Case Letter')
            .matches(/[0-9]/, 'Needs a Number')
            .matches(/[\W]/, 'Needs a Special Character')
            .matches(/^[\x20-\x7F]+$/, 'Allowed ASCII Characters - HEX(20-7F)'),
        confirmPassword: Yup.string()
            .test(
                'confirmPasswordEqualToPassword',
                'Should be equal to Password',
                (value)=> value === passwordFieldValue,
            ),
    })

    const onSubmitHandler = (values) => {
        dispatch(SignUpUser({
            router,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
        }))
    }

    return (
        <Formik
            initialValues={{
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: '',
            }}
            validationSchema={signUpSchema}
            onSubmit={onSubmitHandler}>
            {({values}) => {
                passwordFieldValue = values.password
                return (
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
                                type="text"
                                name="firstName" 
                                placeholder="First Name"
                                className={styles.input}/>
                            <ErrorMessage
                                name="firstName" 
                                component={InputErrorMessage}/>

                            <Field 
                                type="text"
                                name="lastName" 
                                placeholder="Last Name"
                                className={styles.input}/>
                            <ErrorMessage
                                name="lastName" 
                                component={InputErrorMessage}/>

                            <Field 
                                type="password"
                                name="password"
                                placeholder="Password"
                                className={styles.input}/>
                            <ErrorMessage
                                name="password" 
                                component={InputErrorMessage}/>

                            <Field 
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className={styles.input} />
                            <ErrorMessage
                                name="confirmPassword" 
                                component={InputErrorMessage}/>

                            <button
                                type="submit"
                                className={styles.formButton}>
                                Sign Up
                            </button>
                        
                        </Form>
                )
            }}
        </Formik>
    )
}


export default Component