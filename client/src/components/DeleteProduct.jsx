import React, { useState, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useDeleteProductMutation } from '../features/products/ProductApiSlice';

const DeleteProduct = (props) => {
    const [visibleDel, setVisibleDel] = useState(false);
    const toast = useRef(null);
    const [deleteProductFunc, { isError, error, isSuccess, data }] = useDeleteProductMutation()

    const accept = () => {

        deleteProductFunc(props.id)
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    return (
        <>

            <Toast ref={toast} />
            <ConfirmDialog group="declarative" visible={visibleDel} onHide={() => setVisibleDel(false)} message="Are you sure you want to proceed?"
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
            <div className="card flex justify-content-center">
                <Button icon="pi pi-trash" className="p-button-rounded" onClick={() => setVisibleDel(true)}></Button>
                {/* <Button onClick={() => setVisibleDel(true)} icon="pi pi-check" label="Confirm" /> */}
            </div>
        </>
    )
}

export default DeleteProduct