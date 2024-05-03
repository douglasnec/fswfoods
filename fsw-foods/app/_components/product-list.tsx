import { Prisma } from '@prisma/client'
import ProductItem from './product-item'

interface ProductLisProps {
    products: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true
                }
            }
        }
    }>[]
}
const ProductList = ({products}: ProductLisProps) => {
    {/* [&::-webkit-scrollbar]:hidden  */}
    return (        
        <div className="flex overflow-x-scroll gap-4 px-5 pt-6">
            { products.map((product) => (            
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}
export default ProductList