

import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Link, Navigate, useNavigate } from 'react-router-dom';


import { useGetUsersQuery } from "../features/user/UserApiSlice";
import Register from "./Register";
import MenuBar from './menuBar';
import DeleteUser from './DeleteUser';
import UpdateUserDialog from './UpdateUserDialog';



const ManagerUsers = () => {
    const navigate=useNavigate()
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    

    const { data,refetch} = useGetUsersQuery()
    const dt = useRef(null);
    const cols = [
        { field: 'userName', header: 'userName' },
        { field: 'name', header: 'name' },
        { field: 'email', header: 'email' },
        { field: 'phone', header: ' phone' }
    ];

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const adduser = () => {
        navigate('/adduser')
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <>

<div className="flex align-items-center justify-content-end gap-2">
                   
                   <Button type="button" icon="pi pi-plus" rounded onClick={ adduser}  />
               </div>

                <div className="flex justify-content-start">
                    <span className="p-input-icon-right">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="search" />
                    </span>
                </div>
                <div className="flex align-items-center justify-content-end gap-2">
                   
                    <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                </div>
            </>
        );
    };
    const header = renderHeader();
    const updateTemplate = (user) => {
        return <UpdateUserDialog user={user} refetch={refetch}/>
    }
    const deleteuser = (user) => {
        
        return <DeleteUser _id={user._id} />
    }
    return (
        <>
            <div className="card" style={{direction:'rtl',padding:"150px",zIndex:1}}>
                <Tooltip target=".export-buttons>button" position="bottom" />
                <DataTable ref={dt} value={data} header={header} scrollable tableStyle={{ direction:'rtl',padding:"3%" }} showGridlines filters={filters} filterDisplay="row" >
                    {cols.map((col, index) => (
                        <Column style={{textAlign:'right'}} className='cul' key={index} field={col.field} header={col.header} />
                    ))}
                    <Column className='cul' body={updateTemplate} header='update' style={{width:"50px"}}/>
                    <Column className='cul' body={deleteuser} header='delete' style={{width:"50px"}}/>
                </DataTable>
            </div>
        </>
    );
}
export default ManagerUsers