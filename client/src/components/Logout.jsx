// const HomeManager=()=>{
//     return (<>
//     blublubluacher
//     </>)
// }
// export default HomeManager

import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiSlice from '../app/apiSlice';
import { removeToken } from '../features/auth/authSlice';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';


export default function Logout() {
    
    const dispatch=useDispatch()
    const navigate = useNavigate()

    // const router = useRouter();

    const accept = () => {
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate("/")
    }
    const confirm = (event) => {
        debugger
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to log out from this site?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            accept,


        });
    };


    return (
        <>
        <div className="card">
        <ConfirmPopup  />
        {/* {confirm()} */}
        <Button icon="pi pi-sign-out" onClick ={confirm} label="Logout"/>
            {/* <Menubar model={items} start={start} end={end} />    */}
        </div>
        {/* <Outlet/> */}
       </>
    )
}
        