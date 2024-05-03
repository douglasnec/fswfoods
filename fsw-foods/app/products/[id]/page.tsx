import { db } from "@/app/_lib/prisma"
import ProductImage from "./_components/product-image"
import ProductDetail from "@/app/_components/product-detail"

interface ProductPageProps {
    params: {
        id: String
    }
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
    const product = await db.product.findUnique({
        where: {
            id
        },
        include: {
            restaurant: true
        }
    })

    const juices = await db.product.findMany({
        where: {
            category: {
                name: 'Sucos'
            },
            restaurant: {
                id: product?.restaurantId
            }
        },
        include: {
            restaurant: true
        }
    })

    return (
        <div>
            <ProductImage product={product} />
            <ProductDetail product={product} complementaryProducts={juices}/>
        </div>
    )
}
export default ProductPage;