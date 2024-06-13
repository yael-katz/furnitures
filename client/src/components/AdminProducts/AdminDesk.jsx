import { useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from '../../features/products/ProductApiSlice';


import React, { useState, useEffect, useRef } from 'react';
import { Galleria } from 'primereact/galleria';
// import { PhotoService } from './service/PhotoService';

import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import {  useNavigate } from 'react-router-dom';

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import UpdateProduct from '../UpdateProduct';
import DeleteProduct from '../DeleteProduct';


const AdminDesks = () => {
    

    const navigate = useNavigate()

    const handleUpdateProduct=(product)=>{
        navigate('/updateProduct/'+product._id)
    
    }
    const handleDeleteProduct=()=>{
        DeleteProduct()
    }
  
    const {
        data,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch
    } = useGetProductsQuery();



    useEffect(() => {
        console.log('data     ', data);
    }, [data]);

    useEffect(() => {
        console.log('error   ', error);
    }, [error]);

    useEffect(() => {
        console.log('load   ', isLoading);
    }, [isLoading]);



    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');



    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };



    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category}</span>
                        </div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className='align-items-center' >
                            <div className="flex flex-column align-items-center gap-3 py-5"  >
                                <img className="w-9 shadow-2 border-round" src={product.image} alt={product.name} />
                            </div>
                        </div>
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <UpdateProduct refetch={refetch} product={product}/>
                        <DeleteProduct refetch={refetch} id={product._id}/>
                    </div>

                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }
        if(product.category==="desk")return gridItem(product);

    };

    const listTemplate = (data, layout) => {
        return <div className="grid grid-nogutter">{data?.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };


    return (
        <div className="card">
            <DataView value={data} listTemplate={listTemplate} layout={layout} />
        </div>
    )
}


export default AdminDesks