import type { IFormErrors, IUser } from "../interfaces/interfaces";

export const sanitize = (str: string): string => {
    if (!str || typeof str !== "string") return "";
    let sanitized = str.trim();
    sanitized = sanitized
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
    sanitized = sanitized.replace(/javascript:/gi, "");
    return sanitized;
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
};

export const validatePassword = (password: string): boolean => {
    const passwordRegex = /^[\w!@#$%^&*()\-_=+{};:,<.>]{8,30}$/;
    return passwordRegex.test(password);
};

export const validateSearch = (searchTerm: string): boolean => {
  return typeof searchTerm === "string" && searchTerm.trim().length >= 1 && searchTerm.length <= 50;
};

export const validateUser = (user: IUser): IFormErrors => {
    const errors: IFormErrors = {};
    if (!validateUsername(user.username)) errors.username = "3-20 tecken, endast bokstäver, siffror eller _";
    if (!validateEmail(user.email)) errors.email = "Ogiltig e-postadress";
    if (!validatePassword(user.password)) errors.password = "Lösenordet måste vara 8-30 tecken";
    return errors;
};

export const handleBlur = (
        fieldName: string,
        setErrors: React.Dispatch<React.SetStateAction<IFormErrors>>
    ) => (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let error = "";

        if (fieldName === "email" && !validateEmail(value)) {
            error = "Ogiltig e-postadress";
        } else if (fieldName === "username" && !validateUsername(value)) {
            error = "3-20 tecken, endast bokstäver, siffror eller _";
        } else if (fieldName === "password" && !validatePassword(value)) {
            error = "Lösenordet måste vara 8-30 tecken";
        } else if (fieldName === "search" && !validateSearch(value)) {
            error = "minst 1 tecken och högst 50";
        }

        setErrors(prev => ({ ...prev, [fieldName]: error }));
    };
