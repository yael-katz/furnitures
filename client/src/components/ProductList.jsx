import { useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from '../features/products/ProductApiSlice';


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
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';


const ProductList = () => {
    

    const navigate = useNavigate()

    const handleUpdateProduct=(product)=>{
        navigate('/updateProduct/'+product._id)
    
    }
    const handleDeleteProduct=()=>{
        DeleteProduct()
    }
    // const DeleteProduct= ()=> {
    //     const [visibleDel, setVisibleDel] = useState(false);
    //     const toast = useRef(null);
    
    //     const accept = () => {
    //         toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    //     }
    
    //     const reject = () => {
    //         toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    //     }
    
    //     return (
    //         <>
    //             <Toast ref={toast} />
    //             <ConfirmDialog group="declarative"  visible={visibleDel} onHide={() => setVisibleDel(false)} message="Are you sure you want to proceed?" 
    //                 header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
    //             <div className="card flex justify-content-center">
    //                 <Button onClick={() => setVisibleDel(true)} icon="pi pi-check" label="Confirm" />
    //             </div>
    //         </>
    //     )
    // }

    const {
        data,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch
    } = useGetProductsQuery();




    // const [images, setImages] = useState(null);
    // const [activeIndex, setActiveIndex] = useState(0);
    // const galleria = useRef(null);

    useEffect(() => {
    }, [data]);

    useEffect(() => {
    }, [error]);

    useEffect(() => {
    }, [isLoading]);

    // const itemTemplate = (item) => {
    //     return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    // }

    // const thumbnailTemplate = (item) => {
    //     return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
    // }


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
                        {/* <Button icon="pi pi-pencil" className="p-button-rounded" disabled={product.qty === 0} onClick={()=>handleUpdateProduct(product)}></Button> */}
                        <DeleteProduct refetch={refetch} id={product._id}/>
                        {/* <Button icon="pi pi-trash" className="p-button-rounded" disabled={product.qty === 0} onClick={handleDeleteProduct}></Button> */}
                    </div>

                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }
       
        // if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (data, layout) => {
        return <div className="grid grid-nogutter">{data?.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    // const header = () => {
    //     return (
    //         <div className="flex justify-content-end">
    //             <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
    //         </div>
    //     );
    // };

    return (
        <div className="card">
            <DataView value={data} listTemplate={listTemplate} layout={layout} />
        </div>
    )
}


export default ProductList