import ProductImageUpload from "@/components/admin-layouts/ProductImageUpload"
import CommonForm from "@/components/common/form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/Form-Configs"
import { Fragment, useEffect, useState } from "react"
import { getAllProducts, addProduct, editProduct } from '../../store/admin/products-slice'
import { useDispatch, useSelector } from "react-redux"
import { useToast } from "@/hooks/use-toast"
import AdminProductCard from "./AdminProductCard"


const AdminProducts = () => {
  const [OpenProductSidebar, setOpenProductSidebar] = useState(false)
  const initialFormdata = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: ""
  }
  const [formData, setFormData] = useState(initialFormdata)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState("")
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [currentEditedId, setcurrentEditedId] = useState(null)
  const { toast } = useToast()
  const dispatch = useDispatch()
  const { productList } = useSelector(store => store.adminProducts)


  const onSubmit = (e) => {
    e.preventDefault()

    currentEditedId !== null ? (dispatch(editProduct({ id: currentEditedId, formData: formData })).then((data) => {
      console.log(data)

      if (data?.payload?.success) {
        setFormData(initialFormdata)
        setOpenProductSidebar(false)
        setcurrentEditedId(null)
        dispatch(getAllProducts())
        toast({
          title:"Product Edited Successfully"
        })
      }


    })) : (dispatch(addProduct({ ...formData, image: uploadedImageUrl })).then((res) => {
      console.log(res);
      setImageFile(null)
      setFormData(initialFormdata)
      dispatch(getAllProducts())
      toast({
        title: "Product added Successfully"
      })
      setOpenProductSidebar(false)
    }))
  }

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])


  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenProductSidebar(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0 ? productList.map((product) => {
          return <AdminProductCard
            key={product?._id}
            product={product}
            setOpenProductSidebar={setOpenProductSidebar}
            setFormData={setFormData}
            setcurrentEditedId={setcurrentEditedId}
          />
        }) : null}
      </div>
      <Sheet
        open={OpenProductSidebar}
        onOpenChange={(isOpen) => {
          setOpenProductSidebar(isOpen)
          setcurrentEditedId(false)
          setFormData(initialFormdata)
        }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit" : "add"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Add"}
              onSubmit={onSubmit} />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>

  )
}

export default AdminProducts
