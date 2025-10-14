import { useContext } from "react"
import { AuthContext, type IAuthContext } from "../context/AuthProvider"

export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error()
    }
    return context;
}