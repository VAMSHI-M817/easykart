import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import axios from 'axios'
import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteProduct, getAllProducts } from '@/store/admin/products-slice'
import { useToast } from '@/hooks/use-toast'

const AdminProductCard = ({ product, setOpenProductSidebar, setcurrentEditedId, setFormData }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()

    const handleDelete = async (id) => {
        console.log(id);
        const itemTd = product?._id
        dispatch(deleteProduct(itemTd)).then((data) => {
            console.log(data);
            if (data?.payload?.success) {
                toast({
                    title: "Product deleted successfully"
                })
                dispatch(getAllProducts())
            } else {
                toast({
                    title: "Product deletion failed",
                    variant: "destructive"
                })
            }
        })
    }

    return (
        <Fragment>
            <Card>
                <div>
                    <div className='relative'>
                        <img
                            src={product?.image}
                            alt={product?.title}
                            className='w-full h-[300px] object-cover rouded-t-lg'
                        />
                    </div>
                    <CardContent>
                        <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
                        <div className="flex justify-between items-center mb-2">
                            <span
                                className={`${product?.price > 0 ? "line-through" : ""
                                    } text-lg font-semibold text-primary`}
                            >
                                ${product?.price}
                            </span>
                            {product?.salePrice >= 0 ? (
                                <span className="text-lg font-bold">${product?.salePrice}</span>
                            ) : null}
                        </div>

                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button onClick={() => {
                            setOpenProductSidebar(true)
                            setcurrentEditedId(product?._id)
                            setFormData(product)
                        }}>Edit</Button>

                        <Button onClick={() => handleDelete(product?._id)}>Delete</Button>

                    </CardFooter>

                </div>
            </Card>
        </Fragment>
    )
}

export default AdminProductCard
