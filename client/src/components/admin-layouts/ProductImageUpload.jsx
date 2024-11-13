import React, { useEffect, useRef } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { CircleX, FileIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'

const ProductImageUpload = ({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, imageLoadingState, setImageLoadingState }) => {

    const inputRef = useRef()

    const handleImageFileChange = (e) => {
        // console.log(e.target.files[0]);
        const selectedFile = e.target.files[0]
        if (selectedFile) setImageFile(selectedFile)
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }
    //PICTURE DRAG AND DROPPING FUNCTIONALITY
    const handleDrop = (e) => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files?.[0];
        setImageFile(droppedFile)
    }

    const handleRemoveFile = () => {
        setImageFile(null)
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    const uploadImageToCloudinary = async () => {
        setImageLoadingState(true)
        const data = new FormData
        data.append("my_file", imageFile)
        const response = await axios.post("http://localhost:5000/api/admin/products/upload-image", data);
        // console.log(uploadedImageUrl);

        if (response?.data?.success) {
            setUploadedImageUrl(response?.data?.result?.url)
            console.log("Image Uploaded successfully");
            setImageLoadingState(false)


        }
    }

    useEffect(() => {
        if (imageFile !== null) uploadImageToCloudinary()
    }, [imageFile])


    return (
        <div className='w-full max-w-md mx-auto'>
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div className='border-2 border-dashed p-4 rounded-lg'
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <Input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    ref={inputRef}
                    onChange={handleImageFileChange}
                />

                {
                    !imageFile ? (<Label htmlFor="image-upload" className="flex flex-col items-center justify-center  h-32 cursor-pointer">
                        <UploadCloudIcon />
                        <div>Drag and drop or click to upload image</div>
                    </Label>) : imageLoadingState ? (<Skeleton className="h-10 bg-gray-300" />) : (<div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-8 text-primary mr-2 h-8" />
                        </div>
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={handleRemoveFile}
                        >
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Remove File</span>
                        </Button>
                    </div>)
                }

            </div >
        </div >
    )
}

export default ProductImageUpload
