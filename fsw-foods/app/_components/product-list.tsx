import { db  } from '../_lib/prisma'

const ProductList = async () => {
    const products = await db.product.findMany({})

    return (
        <div className="flex overflow-x-scroll">
            { products.map((product) => (            
                <div id={product.id}>{product.name}</div>
            ))}
        </div>
    )
}
export default ProductList