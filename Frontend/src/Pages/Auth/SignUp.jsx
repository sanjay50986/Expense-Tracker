import React, { useContext, useState } from 'react'
import AuthLayout from '../../Components/Layouts/AuthLayout'
import Input from '../../Components/Inputs/Input'
import ProfilePhotoSelector from '../../Components/Inputs/ProfilePhotoSelector'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../Utils/helper'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPaths'
import uploadImage from '../../Utils/uploadImage'
import { UserContext } from '../../Context/UserContext'




const SignUp = () => {

  const [profilePic, setprofilePic] = useState(null)
  const [fullName, setfullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate()


  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name")
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;

    }

    if (!password) {
      setError("Please enter the password")
      return;

    }

    setError("");

    // Signup Api Call
    try {

      // Upload Image if present
      if (profilePic) {
        const imgUploadsRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadsRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  return (

    <AuthLayout>
      <div className='lg-w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center '>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below.</p>

        <form>
          <ProfilePhotoSelector
            image={profilePic}
            setImage={setprofilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({ target }) => setfullName(target.value)}
              label="Full Name"
              placeholders="Jhon"
              type='text' />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholders="jhon@example.com"
              type='email' />

            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholders="Min 8 Characters"
                type='password' />
            </div>

          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button onClick={handleSignup} type='submit' className='btn-primary'>
            SIGN UP
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary underline">
              LogIn
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
