import { useAuth } from "@/context/auth-context"

export default function LogoutButton() {
    const { logout } = useAuth()
    return (
        <button className="rounded-md bg-gray-900 px-6 py-3 text-white font-medium hover:bg-gray-800 transition" onClick={logout}>Logout</button>
    )
}