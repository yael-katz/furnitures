import { useGetProductsQuery } from '../features/products/ProductApiSlice';


import React, { useState, useEffect, useRef } from 'react';
import { Galleria } from 'primereact/galleria';
// import { PhotoService } from './service/PhotoService';

import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useAddToCartMutation, useGetUserQuery } from '../features/user/UserApiSlice';

const Products = () => {


    const [prod,setProd]=useState(null)
    const [qty,setQty]=useState(1)

    const {
        data,
        isLoading,
        isError,
        isSuccess,
        error
    } = useGetProductsQuery();

    const [addToCart] = useAddToCartMutation()

    const handleAddToCart=(prod,qty)=>{
        addToCart({prod,qty,from:"addOne"})

    }


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

    // useEffect(() => {
    //     ProductService.getProducts().then((data) => setProducts(data.slice(0, 12)));
    // }, []);

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


    const sofasgridItem = (product) => {
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
                            <div className="flex flex-column align-items-center gap-3 py-5" style={{ "height": "400px" }} >
                                <img className="w-9 shadow-2 border-round" src={product.image} alt={product.name} />
                            </div>
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button icon="pi pi-cart-plus" className="p-button-rounded" disabled={product.qty === 0} onClick={()=>handleAddToCart(product._id,1)} ></Button>
                    </div>
                </div>
            </div>
        );
    };


    const tablegridItem = (product) => {
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
                            <div className="flex flex-column align-items-center gap-3 py-5" style={{ "height": "400px" }} >
                                <img className="w-9 shadow-2 border-round" src={product.image} alt={product.name} />
                            </div>
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button icon="pi pi-cart-plus" className="p-button-rounded" disabled={product.qty === 0} onClick={()=>handleAddToCart(product._id,1)} ></Button>
                    </div>
                </div>
            </div>
        );
    };

    const chairsgridItem = (product) => {
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
                            <div className="flex flex-column align-items-center gap-3 py-5" style={{ "height": "400px" }} >
                                <img className="w-9 shadow-2 border-round" src={product.image} alt={product.name} />
                            </div>
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button icon="pi pi-cart-plus" className="p-button-rounded" disabled={product.qty === 0} onClick={()=>handleAddToCart(product._id,1)} ></Button>
                    </div>
                </div>
            </div>
        );
    };


    const desksgridItem = (product) => {
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
                            <div className="flex flex-column align-items-center gap-3 py-5" style={{ "height": "400px" }} >
                                <img className="w-9 shadow-2 border-round" src={product.image} alt={product.name} />
                            </div>
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button icon="pi pi-cart-plus" className="p-button-rounded" disabled={product.qty === 0} onClick={()=>handleAddToCart(product._id,1)} ></Button>
                    </div>
                </div>
            </div>
        );
    };

    const bedsgridItem = (product) => {
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
                            <div className="flex flex-column align-items-center gap-3 py-5" style={{ "height": "400px" }} >
                                <img className="w-9 shadow-2 border-round" src={product.image} alt={product.name} />
                            </div>
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button icon="pi pi-cart-plus" className="p-button-rounded" disabled={product.qty === 0} onClick={()=>handleAddToCart(product._id,1)} ></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product) => {
        if (!product) {
            return;
        }
        if(product.category==="sofa")return sofasgridItem(product);
        else if(product.category==="table")return tablegridItem(product);
        else if(product.category==="bed")return bedsgridItem(product);
        else if(product.category==="chair")return chairsgridItem(product);
        else if(product.category==="desk")return desksgridItem(product);
        

    };

    const listTemplate = (data) => {
        return <div className="grid grid-nogutter">{data?.map((product)  => itemTemplate(product))}</div>;
    };



    return (
        <div className="card">
            <DataView value={data} listTemplate={listTemplate} layout={layout} />
        </div>
    )
}


















// const ProductList = () => {
//     const {
//         data,
//         isLoading,
//         isError,
//         isSuccess,
//         error
//     } = useGetProductsQuery()

//     // const [images, setImages] = useState(null);
//     const [activeIndex, setActiveIndex] = useState(0);
//     const galleria = useRef(null);

//     useEffect(() => {
//         console.log('data',data);
//     }, [data]);

//     useEffect(() => {
//         console.log('error',error);
//     }, [error]);

//     const itemTemplate = (item) => {
//         return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
//     }

//     const thumbnailTemplate = (item) => {
//         return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
//     }

//     return (
//         <div className="card flex justify-content-center">
//             <Galleria ref={galleria} value={data} numVisible={7} style={{ maxWidth: '850px' }}
//                 activeIndex={activeIndex} onItemChange={(e) => setActiveIndex(e.index)}
//                 circular fullScreen showItemNavigators showThumbnails={false} item={itemTemplate} thumbnail={thumbnailTemplate} />
//             <div className="grid" style={{ maxWidth: '400px' }}>
//                 {
//                     data?.map((prod,index) => {
//                         let imgEl = <img src={prod.picSrc} alt={prod.name} width="200" style={{ cursor: 'pointer' }} onClick={
//                             () => { setActiveIndex(index); galleria.current.show() }
//                         } />
//                         return (
//                             <div className="col-3" key={index}>
//                                 {imgEl}
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     )
// };

export default Products