import { useRef, useReducer, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../app/api/authSlice'
import { useDispatch } from 'react-redux'
import { setAuth, setUser } from '../../app/api/authSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



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
  // const inputRef = useRef()
  const errRef = useRef()
  const navigate = useNavigate()
  const canSubmit = [state.username, state.password].every(Boolean)
  const [login] = useLoginMutation()
  
  const notifyLogin = () => toast.success('Login successful!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
  })

  // useEffect(() => {
  //   inputRef.current.focus()
  // }, [])

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
      dispatchStore(setAuth(accessToken, refreshToken))
      dispatchStore(setUser(username, roles))
      navigate('/dashboard')
      notifyLogin()

    } catch (err) {
      dispatch({ type: 'error', payload: err.message })
      errRef.current.focus() //!
    }
  }

  const renderError = () => {
      if (state.error) {
          return <span style={{ color: 'red' }} ref={errRef} >{state.error}</span>
      }
  }

  const renderInput = (name, placeholder, type, value, inputRef) => {
    return (
      <input
        className='login__form__input'
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        ref={inputRef}
        onChange={handleInputChange}
      />
    )
  }
  const renderLoginForm = () => {
    return (
      <form onSubmit={handleSubmit} className='login__form'>
        <div>
          <label htmlFor="username" className='login__form__label'>Username</label>
          {renderInput('username', 'Enter username', 'text', state.username)}
        </div>
        <div>
          <label htmlFor="password" className='login__form__label'>Password</label>
          {renderInput('password', 'Enter password', 'password', state.password)}
        </div>
        <button className='login__form__button' type="submit" disabled={!canSubmit}>
          Login
        </button>
        {renderError()}
      </form>
    )
  }

//   const renderLoginForm = () => {
//     return (
//       <form onSubmit={handleSubmit} className='login__form'>
//         <div>
//           <label htmlFor="username" className='login__form__label'>Username</label>
//           <input
//             className='login__form__input'
//             type="text"
//             name="username"
//             ref={userRef}
//             value={state.username}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className='login__form__label'>Password</label>
//           <input
//             className='login__form__input'
//             type="password"
//             name="password"
//             value={state.password}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button type="submit" disabled={!canSubmit}>
//           Login
//         </button>
//         {renderError()}
//       </form>
//     )    
// }
    
  return (
    <div>
      <h1>Login</h1>
      {renderLoginForm()}
    </div>
  )
}

export default LoginForm
