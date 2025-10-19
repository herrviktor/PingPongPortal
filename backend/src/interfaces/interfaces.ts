export interface IUserRegister {
    username: string;
    email: string;
    password: string;
}

export interface IUpdateUser {
    username?: string;
    email?: string;
    password?: string;
}