import { getCookie, hasCookie, setCookie } from "cookies-next"

export const getCookieCart = (): {[id:string]: number} => {
    if( hasCookie("cart") ) {
        const cookieCart = JSON.parse( getCookie("cart") as string ?? "{}" )
        return cookieCart
    }
    return {}
}

export const addProductToCart = (productId: string) => {
    const cart = getCookieCart()

    if( cart[productId] ) {
        cart[productId] += 1
    } else {
        cart[productId] = 1

    }
    
    setCookie("cart", JSON.stringify(cart)) 
}

export const removeProductFromCart = (productId: string) => {
    const cart = getCookieCart()
    delete cart[productId]
    setCookie("cart", JSON.stringify(cart))
}

export const removeSingleItemFromCart = (productId: string) => {
    const cart = getCookieCart()

    if (!cart[productId]) {
        return
    }

    cart[productId] -= 1

    if (cart[productId] <= 0) {
        delete cart[productId]
    }

    setCookie("cart", JSON.stringify(cart))
}
