"use client"

import { Button } from "@/app/_components/ui/button"
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation";

interface ProductItemProps {
    product: Pick<Product, "name" | "imageUrl">;
}
const ProductImage = ({ product } : ProductItemProps) => {
    const router = useRouter();

    return (
        <div className='relative h-[360px] w-full'>
            <Image src={product?.imageUrl} alt={product.name} fill className='object-cover' />

            <Button
                className='absolute left-4 rounded-full bg-white text-foreground hover:text-white'
                size='icon'    
                onClick={() => router.back()}             
            >
                <ChevronLeftIcon />
            </Button>
        </div>
    )
}
export default ProductImage