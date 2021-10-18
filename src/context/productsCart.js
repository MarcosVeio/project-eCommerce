import React, { createContext, useCallback, useContext, useReducer, useEffect } from 'react'

const cartContext = createContext()

const cartReducer = (state, { type, payload }) => {
    switch (type) {
        case 'ADD_PRODUCTS':
            return [...state, payload]
        case 'REMOVE_PRODUCT':
            return (
                state.filter(({ id }) => payload.id !== id)
            )
        case 'CLEAR_STATE':
            return state = []
        default:
            return state
    }
}

export const CartProvider = ({ initialState, children }) => {
    const [cartProducts, dispatchCartProducts] = useReducer(cartReducer, initialState, () => {
        const localData = localStorage.getItem('cartProducts')
        return localData ? JSON.parse(localData) : initialState
    })

    useEffect(() => {
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
    }, [cartProducts])

    return <cartContext.Provider value={{ cartProducts, dispatchCartProducts }}>{children}</cartContext.Provider>
}


export const useCartContext = () => {
    const { cartProducts, dispatchCartProducts } = useContext(cartContext)

    const addProducts = useCallback((products) => {
        for (const product of products) {
            dispatchCartProducts({ type: 'ADD_PRODUCTS', payload: product })
        }
    }, [dispatchCartProducts])

    const removeProducts = useCallback((products) => {
        for (const product of products) {
            dispatchCartProducts({ type: 'REMOVE_PRODUCT', payload: product })
        }
    }, [dispatchCartProducts])

    const clearCart = useCallback(() => {
        dispatchCartProducts({ type: 'CLEAR_STATE' })
    }, [dispatchCartProducts])

    return { cartProducts, addProducts, removeProducts, clearCart }
}