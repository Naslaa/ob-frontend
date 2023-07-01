import React, { useState } from 'react'
import { forgotPasswordApi } from '../../apis/Api';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
    const [email, setEmail]= useState('');

const handleSubmit=(e)=>{
    e.preventDefault();
    forgotPasswordApi({email}).then((res)=>{
        toast.success("password reset link sent to your email")

    }).catch((err)=>{
    toast.error("something went wrong")
})
}

  return (
    <div className='container'>
<h1> Forgot Password</h1>
<label> type your email</label>
<input className='form-control w-25 ' type='email' placeholder='enter valid email' onChange={(e)=>setEmail(e.target.value)}/>
<button className='btn btn-primary' onClick={handleSubmit}>
    send password reset link
</button>
    </div>
  )
}

export default ForgetPassword