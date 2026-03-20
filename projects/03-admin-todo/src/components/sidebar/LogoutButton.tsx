'use client'
import { CiLogout } from "react-icons/ci";
import { signIn, signOut, useSession } from "next-auth/react"

export default function LogoutButton() {
    const { status } = useSession()
    
    if (status === 'loading') {
        return (
            <button 
                className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group cursor-pointer hover:bg-gray-100"
            >
                <CiLogout />
                <span className="group-hover:text-gray-700">Cargando...</span>
            </button>
        )
    }

    if (status === 'unauthenticated') {
        return (
            <button 
            onClick={() => signIn()}
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group cursor-pointer hover:bg-gray-100"
        >
            <CiLogout />
            <span className="group-hover:text-gray-700">Iniciar sesión</span>
        </button>
        )
    }

    return (
        <button 
            onClick={() => signOut()}
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group cursor-pointer hover:bg-gray-100"
        >
            <CiLogout />
            <span className="group-hover:text-gray-700">Cerrar sesión</span>
        </button>
    )
}
