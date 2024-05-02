import { Prisma } from '@prisma/client'
import { db  } from '../_lib/prisma'
import ProductItem from './product-item'

interface ProductLisProps {
    products: Prisma.ProductGetPayload<{
        select: {
            name: true
        }
    }>[]
}
const ProductList = async ({products}: ProductLisProps) => {
    return (
        <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5 pt-6">
            { products.map((product) => (            
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}
export default ProductList