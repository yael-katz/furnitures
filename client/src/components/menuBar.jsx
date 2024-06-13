// import React from 'react'; 
// import { Menubar } from 'primereact/menubar';
// import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../features/user/UserApiSlice';
import FromToken from './fromtoken';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';


import { useDispatch } from 'react-redux';
import { removeToken } from '../features/auth/authSlice';
import apiSlice from '../app/apiSlice';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';


const MenuBar = () => {

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const role = useSelector(x => x.slice.role)
     const user = FromToken()
 //const user={};


 window.addEventListener('beforeunload', function() {
    alert("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
});
    // const router = useRouter();

    const accept = () => {
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate("/")
    }
    const confirm = (event) => {
        confirmPopup({
            // target: event.currentTarget,
            message: 'Do you want to log out from this site?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            accept,


        });
    };

    useEffect(() => {
    }, [user])


    // const accept = () => {
    //     dispatch(removeToken())
    //     dispatch(apiSlice.util.resetApiState())
    //     navigate("/")
    // }
    const logout = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to log out from this site?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            accept,


        });
    };

    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {/* {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>} */}
        </a>
    );



    const unPluggedItems = [
        {
            label: "un plugged",
            icon: 'pi pi-user',
            url: '/login'
        },
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/'
        },
        {
            label: 'login',
            url: '/login',
            icon: 'pi pi-sign-in'
        }

    ]
    const userItems = [
        {
            label: `${user?.userName}`,
            icon: 'pi pi-user',
            template:itemRenderer,
            
           
            items: [
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                     command:()=>
            {
                confirm()
            },
                 
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-user-edit',
                    url: '/updateUser',
                    
                }
            ]
        },
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/'
        },
        // {
        //     label: 'login',
        //     url: '/login',
        //     icon: 'pi pi-sign-in'
        // },
        {
            label: 'products',
            icon: 'pi pi-bars',
            items: [
                {
                    label: 'sofas',
                    url: '/sofas',
            
                 
                },
                {
                    label: 'tables',
                    url: '/tables',
                    
                },
                {
                    label: 'beds',
                    url: '/beds',
                    
                },
                {
                    label: 'chairs',
                    url: '/chairs',
                    
                },
                {
                    label: 'desks',
                    url: '/desks',
                    
                }
            ]
        },


        {
            label: 'cart',
            url: '/cart',
            icon: 'pi pi-shopping-cart',
            badge: 1,

        },


    ];



    const adminItems = [
        {
            label: `${user?.userName}`,
            icon: 'pi pi-user',
            template:itemRenderer,
            items: [
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
            
                    command:()=>
                    {
                        confirm()
                    }
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-user-edit',
                    url: '/updateUser',
                    // template: itemRenderer
                }
            ]
        },
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/'
        },
        // {
        //     label: 'login',
        //     url: '/login',
        //     icon: 'pi pi-sign-in'
        // },
        {
            label: 'products',
            icon: 'pi pi-bars',
            items: [
                {
                    label: 'sofas',
                    url: '/adminSofas',
            
                 
                },
                {
                    label: 'tables',
                    url: 'AdminTables',

            
                    
                },
                {
                    label: 'beds',
                    url: '/AdminBeds',
                    
                },
                {
                    label: 'chairs',
                    url: '/AdminChairs',
                    
                },
                {
                    label: 'desks',
                    url: '/AdminDesks',
                    
                }
            ]
        },
        {
            label: 'addProduct',
            url: '/addProduct',
            icon: 'pi pi-database'
        },
        {
            label: 'Allusers',
            url: '/allusers',
            icon: 'pi pi-database'
        },




    ];
    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            {/* <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" /> */}
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />

        </div>
    );


    return (
        <>
            <ConfirmPopup  />

        <div className="card">
            <Menubar model={user === null ? unPluggedItems : user.role === 'admin' ? adminItems : userItems} start={start}  end={end} />
        </div></>
    )
}

export default MenuBar