import Image from "next/image"
import { CartProductType, SelectedImgType } from "../ProductDetails"

type ProductImagePropTypes = {
    cartProduct: CartProductType
    product: any
    handleColorSelect: (value: SelectedImgType) => void
}

export default function ProductImage({ cartProduct, product, handleColorSelect }: ProductImagePropTypes) {
    return (
        <div className="grid grid-cols-6 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
            <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">{ product.images.map((image: SelectedImgType) => (
                <div key={image.color} onClick={() => handleColorSelect(image)} className={`relative w-[80%] aspect-square border border-teal-300 ${cartProduct.selectedImg.color === image.color ? 'border-[1.5px]': 'border-none'}`}>
                  <Image src={image.image} alt={image.color} fill className="object-contain" />
                </div>
            ))}</div>
            <div className="col-span-5 relative aspect-square">
                <Image src={cartProduct.selectedImg.image} alt={cartProduct.name} fill className="object-contain h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]" />
            </div>
        </div>
    )
}