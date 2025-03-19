import React, { useState } from 'react'
import AuthLayout from '../../Components/Layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../Components/Inputs/Input'
import { validateEmail } from '../../Utils/helper'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;
    }

    if (!password) {
      setError("Please enter the password")
      return;
    }

    setError("")
  }


  return (

    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to log in</p>

        <form >
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholders="jhon@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholders="Min 8 Characters"
            type="password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button onClick={handleLogin} type='submit' className='btn-primary'>
            LOGIN
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have and account?{" "}
            <Link to="/signup" className="font-medium text-primary underline">
              SignUp
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
