// UI Only — Login page with student/admin toggle

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import Loader from '../components/Loader';
import { registerUser } from '../features/auth/authSlice';

const Register = () => {

  const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

  
  const [formData, setFormData] = useState({
   name:'',
   phone: '',
   email:'',
   password:'',
   confirmPassword:''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault();
   if(formData.password !== formData.confirmPassword){
    toast.error("Password Not Match!!", {position:'top-center'})
   }
   else{
    dispatch(registerUser(formData))
   }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {

    if(user){
      navigate("/")
    }


    if(isError && message){
      toast.error(message,{position: "top-center"})
    }
  }, [isError,message, user])

  if(isLoading){
    return(
    <Loader/>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D8BFD8] via-[#BC8F8F] to-[#D8BFD8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              CD
            </span>
          </div>
          <h2 className="text-4xl font-black text-white mb-2">Welcome! Student👋</h2>
          <p className="text-white/90 text-lg">Create Account Here...</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
  
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="text" className="block text-sm font-semibold text-slate-700 mb-2">
               Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                placeholder="Enter Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
               Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                placeholder="Enter Your Email"
              />
            </div>

<div>
              <label htmlFor="number" className="block text-sm font-semibold text-slate-700 mb-2">
               Your Phone Number
              </label>
              <input
                type="number"
                id="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                placeholder="Enter Your Phone Number"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="Confirm Password" className="block text-sm font-semibold text-slate-700 mb-2">
               Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-700">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
          Create an account
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or continue with</span>
              </div>
            </div>

          
          </div>

          <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
            <Link to ="/login" className="font-medium text-purple-600 hover:text-purple-700">
              Sign in now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
