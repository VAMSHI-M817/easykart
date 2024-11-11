import ProductImageUpload from "@/components/admin-layouts/ProductImageUpload"
import CommonForm from "@/components/common/form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/Form-Configs"
import { Fragment, useState } from "react"


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



  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenProductSidebar(true)}>
          Add New Product
        </Button>
      </div>

      <Sheet
        open={OpenProductSidebar}
        onOpenChange={() => setOpenProductSidebar(true)}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              <div>Admin</div>
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl} />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Add"}
              onSubmit={onsubmit} />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts
