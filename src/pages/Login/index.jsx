import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Navigate} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
    const navigate = useNavigate()

    const [errorMsg, setErrorMsg] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitForm = async (e) => {
        e.preventDefault()

        const userDetails = {email, password}
        const url = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin"

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        }

        const response = await fetch(url, options)
        const data = await response.json()

        if (response.ok) {
            Cookies.set('jwt_token', data.data.token)
            navigate('/')
        } else {
            setErrorMsg(data.message)
        }
    }

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
        return <Navigate to='/' />
    }

    return (
        <div className='login-bg'>
            <div className='login-card'>
                <h1 className='login-title'>Go Business</h1>

                <p className='login-subtitle'>Sign in to open your referral dashboard</p>

                <form onSubmit={onSubmitForm}>
                    <div className='input-container'>
                        <label htmlFor="email">
                            Email
                        </label>

                        <br />

                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) =>
                            setEmail(e.target.value)
                            }
                        />
                    </div>

                    <br />

                    <div className='input-container'>
                        <label htmlFor="password">
                            Password
                        </label>

                        <br />

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) =>
                            setPassword(e.target.value)
                            }
                        />
                    </div>
                            
                    <br />

                    <button type="submit" className='login-button'>
                        Sign in
                    </button>

                    {errorMsg && (
                        <p className='error-message'>{errorMsg}</p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login