'use client'

import { useCallback, useEffect, useState } from "react"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Textarea from "../inputs/Textarea"
import Checkbox from "../inputs/Checkbox"
import { categories } from "@/utils/categories"
import CategoryInput from "../inputs/CategoryInput"
import { colors } from "@/utils/colors"
import SelectColor from "../inputs/SelectColor"
import Button from "../Button"

export type ImageType = {
  color: string,
  colorCode: string,
  image: File | null
}

//from db/firebase storage
export type UploadedImageType = {
  color: string,
  colorCode: string,
  image: string
}

function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<ImageType[] | null>(null)
  const [isProductCreated, setIsProductCreated] = useState(false)

  const {register, handleSubmit, setValue, watch, reset, formState: {errors}} = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      brand: '',
      category: '',
      inStock: false,
      images: []
    }
  })

  useEffect(() => {setCustomValue('images', images)}, [images])

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null)
      setIsProductCreated(false)
    }
  }, [isProductCreated])

  const onSubmit: SubmitHandler<FieldValues> = async  (data) => {}

  const category = watch('category')
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value]
      }

      return [...prev, value]
    })
  }, [])

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter((item) => item.color !== value.color)
        return filteredImages
      }

      return prev
    })
  }, [])

  return (
    <>
      <Heading title="Add a Product" center />
      <Input 
        id="name"
        label="name"
        errors={errors}
        register={register}
        disabled={isLoading}
        required
      />
      <Input 
        id="price"
        label="price"
        errors={errors}
        register={register}
        disabled={isLoading}
        required
        type="number"
      />
      <Input 
        id="brand"
        label="brand"
        errors={errors}
        register={register}
        disabled={isLoading}
        required
      />
      <Textarea 
        id="description"
        label="description"
        errors={errors}
        register={register}
        disabled={isLoading}
        required
      />
      <Checkbox id="inStock" register={register} label="This product is in stock" />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          { categories.map((item) => {
            if (item.label === 'All') {
              return null
            }

            return <div key={item.label} className="col-span-1">
              <CategoryInput 
                onClick={(category) => setCustomValue('category', category)}
                selected={category === item.label}
                label={item.label} 
                icon={item.icon}
              />
            </div>
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <p className="font-bold">Select the available product colours and upload their images.
          </p>
          <p className="text-sm">You must upload an image for each of the colour selected, otherwise your colour selection shall be ignored.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          { colors.map((item, index) => (
            <SelectColor key={index} item={item} addImageToState={addImageToState} removeImageFromState={removeImageFromState} isProductCreated={false} />
          ))}
        </div>
      </div>
      <Button label={isLoading ? 'Loading...' : 'Add Product'} onClick={handleSubmit(onSubmit)} />
    </>
  )
}

export default AddProductForm