import { useRef, useReducer, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../app/api/authSlice'
import { useDispatch } from 'react-redux'
import { setAuth, setUser } from '../../app/api/authSlice'



const initialState = {
  username: '',
  password: '',
  error: '',
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'username':
      return { ...state, username: action.payload }
    case 'password':
      return { ...state, password: action.payload }
    case 'error':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

const LoginForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const dispatchStore = useDispatch()
  const userRef = useRef()
  const errRef = useRef()
  const navigate = useNavigate()
  const canSubmit = [state.username, state.password].every(Boolean)
  const [ login ] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    dispatch({ type: 'error', payload: '' })
  }, [state.username, state.password])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    dispatch({ type: name, payload: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const credentials = {
      username: state.username,
      password: state.password,
    }
    try {
      const response = await login(credentials).unwrap()
      const { accessToken, refreshToken, roles, username} = response
      //!
      // console.log(response)

      dispatchStore(setAuth(accessToken, refreshToken))
      dispatchStore(setUser(username, roles))
      //!
      // console.log(username, roles, _id)
      //!
      navigate('/dashboard')

    } catch (err) {
      dispatch({ type: 'error', payload: err.data.message })
      errRef.current.focus()
    }
  }

  const renderError = () => {
      if (state.error) {
          return <span style={{ color: 'red' }} ref={errRef} >{state.error}</span>
      }
  }

  const renderLoginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            ref={userRef}
            value={state.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" disabled={!canSubmit}>
          Login
        </button>
        {renderError()}
      </form>
    )    
}
    
  return (
    <div>
      <h1>Login</h1>
      {renderLoginForm()}
    </div>
  )
}

export default LoginForm
