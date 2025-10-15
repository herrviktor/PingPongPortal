import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import type { IAuthContext } from "../interfaces/interfaces";

export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error()
    }
    return context;
}