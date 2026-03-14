import { WidgetItem } from "@/src/components/widget-item/WidgetItem";
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
    const totalToPay = productsInCart.reduce((total, item) => total + item.product.price * item.quantity, 0);

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
                <div className="flex flex-col w-full sm:w-4/12">
                    <h2 className="text-2xl font-bold mb-4">Resumen de compra</h2>
                    <div className="p-4 border rounded-lg bg-gray-100">
                        <p className="text-lg mb-2">Total de productos: {productsInCart.reduce((total, item) => total + item.quantity, 0)}</p>
                        <p className="text-lg font-bold">Total a pagar: ${totalToPay.toFixed(2)}</p>
                        <span>Impuestos 15%: ${ (totalToPay * 0.15).toFixed(2) }</span>
                    </div>
                </div>
            </div>
        </div>
    );
}