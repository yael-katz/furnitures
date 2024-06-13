import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useAddToCartMutation, useGetCartQuery } from '../features/user/UserApiSlice';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { Checkbox } from "primereact/checkbox";
import { useAddOrderMutation } from '../features/Order/OrderApiSlice';
import { InputNumber } from 'primereact/inputnumber';

const Cart = () => {
    const [cart, setCart] = useState();
    const [val, setValue] = useState(0);

    const { data, error, isError, refetch} = useGetCartQuery();

    const [addToCart] = useAddToCartMutation()

    const [addOrder, { isError: isErrorOrd, error: errorOrd }] = useAddOrderMutation()

    useEffect(() => {
        if (!isError && data) {
            setCart(data);
        } else {
            setCart([]);
        }
    }, [data, isError]);
    
    const handlesubmit = async () => {
        let prices = 0
        cart.forEach(element => {
            prices += element.prod.price * element.qty
        });
        alert("you have to pay " + prices)
        await handleBuy()
    }
    const handleBuy = async () => {
        await addOrder({ products: cart });
        await refetch();
        await setCart([]);
    }
    const addOrd = async (e, prod) => {

        const updatedCart = cart.map(item => {
            if (item.prod._id === prod) {
                console.log("prod",prod);
                console.log("item",item);
                if(e.value!=0){
                    console.log("oooooooooooo",{ ...item, qty: e.value });
                    return { ...item, qty: e.value };

                }
            }
            console.log("oooooooo item", item);
            return item;
        });
        console.log(updatedCart,"*************************cart");
    
        // Check if the updated quantity is 0 for the last item in the cart
        if (updatedCart.length === 1 && updatedCart[0].qty === 0) {
            setCart([]); // Reset the cart to an empty array
        } else {
            setCart(updatedCart);
        }
    
        await addToCart({ prod, qty: e.value });

        // setValue(e.value);

        
        // const updatedCart = cart.map(item => {
        //     if (item.prod.id === prod.id) {
        //         return { ...item, qty: e.value };
        //     }
        //     return item;
        // });

        // await addToCart({ prod, qty: e.value }).then((res) => {
        //     setValue(e.value);
        //     //setCart(updatedCart);

        // })

        // // await addToCart({ prod, qty: e.value }).then((res) => {
        // // })
        // // setValue(e.value)
    }


    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: 'The form is successfully submitted.' });
    };

    const formik = useFormik({
        initialValues: {
            checked: false
        },
        validate: (data) => {
            let errors = {};
            if (!data.checked) {
                errors.checked = 'Accept is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            data && show(data);
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const itemTemplate = (product, index) => {
        return (
            <div className="col-12" key={product.prod.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={product.prod.image} alt={product.prod.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.prod.name}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.prod.category}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.prod.price}</span>
                            <div className="card flex justify-content-center">
                                <form onSubmit={formik.handleSubmit} className="flex flex-column align-items-center gap-2">
                                    <div></div>
                                    <Toast ref={toast} />
                                    <div className="card flex justify-content-center">
                                        <InputNumber min={0} max={product.prod.qty} value={product.qty} onValueChange={(e) => addOrd(e, product.prod._id)} showButtons buttonLayout="vertical" style={{ width: '4rem' }}
                                            decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                                    </div>
                                    {getFormErrorMessage('checked')}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            if (product.prod)
                return itemTemplate(product, index);

        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <div className="card">
            <DataView value={cart} listTemplate={listTemplate} />
            <Button type="submit" label="Buy"  onClick={() => (handlesubmit())} />

        </div>
    )
}

export default Cart

