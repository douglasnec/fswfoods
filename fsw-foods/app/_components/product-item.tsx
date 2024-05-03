import { Product } from '@prisma/client'
import Image from 'next/image'
import { computeProductTotalPrice, formatCurrency } from '../_helpers/price';
import Link from 'next/link';

interface productItemProps {
    product: Product;
}

const ProductItem = ({ product }: productItemProps) => {
    

    return (
        <Link className='w-[150px] y-[150px]' href={`/products/${product.id}`}>
            <div className='space-y-2 w-full'>
                <div className='h-[150px] w-full relative'>
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className='object-cover rouded-lg shadow-md'
                    />
                </div>

                <div>
                    <h2 className='text-sm truncate'>{product.name}</h2>
                    <div className='flex gap-1 items-center'>
                        <h3 className='font-semibold'>
                            { formatCurrency(computeProductTotalPrice(product)) }
                        </h3>
                        {product.discountPercentage > 0 && (
                            <span className='text-xs text-muted-foreground line-through'>
                                {formatCurrency(Number(product.price))}
                            </span>
                        )}
                    </div>
                    <div>
                        <span className='text-muted-foreground text-xs block'>{product.restaurant.name}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default ProductItem;