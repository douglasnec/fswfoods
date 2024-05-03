"use client"

import { Prisma } from "@prisma/client"
import Image from "next/image"
import { computeProductTotalPrice, formatCurrency } from "../_helpers/price"
import DiscountBadge from "./discount-badge"
import { useState } from "react"
import { Button } from "./ui/button"
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from "lucide-react"
import { Card } from "./ui/card"
import ProductList from "./product-list"

interface ProductDetailProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>
    complementaryProducts: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>[]
}

const ProductDetail = ({ product, complementaryProducts }: ProductDetailProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncreaseQuantityClick = () => setQuantity((currentState) => currentState + 1)
    const handleDecreaseQuantityClick = () => setQuantity((currentState) => {
        if(currentState === 1) return 1;
        return currentState - 1
    })

    return (
        <div className='py-5'>
            { /* restaurante */}
            <div className='flex items-center gap-[0.375rem] px-5'>
                <div className='relative h-6 w-6'>
                    <Image src={product?.restaurant.imageUrl} alt={product.restaurant.name} fill className='rouded-full object-cover' />
                </div>
                <span className='text-xs text-muted-foreground'>{product.restaurant.name}</span>
            </div>
            
            { /* NOME DO PRODUTO */}
            <h1 className='text-xl font-semibold mt-1 bm-3 px-5'>{product.name}</h1>

            { /* preço do produto e quantidade */}
            <div className="flex justify-between px-5">
                { /* preço */}
                <div>
                    <div className='flex items-center gap-2'>
                        <h2 className='text-xl font-semibold'>
                            {formatCurrency(computeProductTotalPrice(product))}
                        </h2>
                        {product.discountPercentage > 0 && (
                            <DiscountBadge product={product} />
                        )}
                    </div>

                    {product.discountPercentage > 0 && (
                        <span className='text-muted-foreground text-sm'>
                            De: {formatCurrency(Number(product.price))}
                        </span>
                    )}
                </div>

                {/* quantidade */}
                <div className='flex items-center gap-3 text-center'>
                    <Button size='icon' variant='ghost' className='border border-solid border-muted-foreground' onClick={handleDecreaseQuantityClick}>
                        <ChevronLeftIcon />
                    </Button>
                    <span className='w-4'>{quantity}</span>
                    <Button size='icon' onClick={handleIncreaseQuantityClick}>
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>
            
            {/* dados da entrega */}
            <div className='px-5'>
                <Card className='flex justify-around py-3 mt-6 px-5'>
                    <div className='flex flex-col items-center'>
                        <div className='flex items-center gap-1 text-muted-foreground'>
                            <span className='text-xs'>Entrega</span>
                            <BikeIcon size={14} />
                        </div>
                        <div>
                            {Number(product.restaurant.deliveryFee) > 0 ? (
                                <p className='text-sm font-semibold'>
                                    {formatCurrency(Number(product.restaurant.deliveryFee))}
                                </p>
                            ):(
                                <p className='text-sm font-semibold'>Grátis</p>
                            )}
                        </div>
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='flex items-center gap-1 text-muted-foreground'>
                            <span className='text-xs'>Entrega</span>
                            <TimerIcon size={14} />
                        </div>
                        <div>
                            {Number(product.restaurant.deliveryFee) > 0 ? (
                                <p className='text-sm font-semibold'>
                                    {Number(product.restaurant.deliveryTimeMinutes)} min
                                </p>
                            ):(
                                <p className='text-sm font-semibold'>Grátis</p>
                            )}
                        </div>
                    </div>

                </Card>
            </div>
            
            <div className='mt-6 space-y-3 px-5'>
                <h3 className='font-semibold'>Sobre</h3>
                <p className='text-sm text-muted-foreground text-justify'>{product.description}</p>
            </div>

            <div className='mt-6 space-y-3 px-5'>
                <h3 className='font-semibold'>Sucos</h3>
                <ProductList products={complementaryProducts} />
            </div>

        </div>
    )
}
export default ProductDetail