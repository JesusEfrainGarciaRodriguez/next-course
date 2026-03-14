import { Product, products } from "@/src/products/data/products";
import { ItemCard } from "@/src/shopping-cart/components/ItemCard";
import { cookies } from "next/dist/server/request/cookies";

interface ProductInCart {
    product: Product;
    quantity: number;
}

const getProductsIncart = async ( cart: { [id: string]: number }) => {
    const productsInCart: ProductInCart[] = [];
    for (const productId in cart) {
        const product = products.find(p => p.id === productId);
        if (product) {
            productsInCart.push({
                product,
                quantity: cart[productId]
            });
        }
    }
    return productsInCart;
}
export default async function CartPage() {
    const cookieStore = await cookies();
    const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}") as { [id: string]: number };

    const productsInCart = await getProductsIncart(cart);

    return (
        <div>
            <h1 className="text-5xl">Productos en el carrito</h1>
            <hr className="mb-2" />
            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full sm:w-8/12">
                    {productsInCart.map(({ product, quantity }) => (
                        <ItemCard key={product.id} product={product} quantity={quantity} />
                    ))}
                </div>
            </div>
        </div>
    );
}