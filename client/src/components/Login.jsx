import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { setToken } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { updateNewUser, updateRole } from '../app/slice';
import FromToken from './fromtoken';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginFunc, { isError, error, isSuccess, data }] =useLoginMutation()
  const [formData,setFormData]=useState({
    userName:'',
    password:''
  })
  
  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data))
      const user=FromToken()
      dispatch(updateRole({data:user.role}))
      navigate("/")
    }
  }, [isSuccess])
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    loginFunc(formData)
  };
  const handleRegister = (e) => {
    navigate("/register")
  };
  return (
    <div className="card">
    <div className="flex flex-column md:flex-row">
        <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                <label className="w-6rem">Username</label>
                <InputText id="username" type="text" className="w-12rem" onBlur={(e)=>{setFormData({userName:e.target.value,password:formData.password})}}/>
            </div>
            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                <label className="w-6rem">Password</label>
                <InputText id="password" type="password" className="w-12rem" onBlur={(e)=>{setFormData({userName:formData.userName,password:e.target.value})}}/>
            </div>
            <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto" onClick={handleSubmit}></Button>
        </div>
        <div className="w-full md:w-2">
            <Divider layout="vertical" className="hidden md:flex">
                <b>OR</b>
            </Divider>
            <Divider layout="horizontal" className="flex md:hidden" align="center">
                <b>OR</b>
            </Divider>
        </div>
        <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
            <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem" onClick={handleRegister}></Button>
        </div>
    </div>
</div>
  );
};
export default Login;
