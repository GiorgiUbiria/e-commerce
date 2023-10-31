export interface User {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordSalt: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
}

export interface Service {
    id: string;
    serviceName: string;
    price: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    userCount: number;
    serviceAuthorId: string;
}

export interface UserDto {
    firstName: string;
    lastName: string;
    username: string;
    role: string;
    email: string;
}

export interface ServiceDto {
    serviceName: string;
    price: number;
    description: string;
    userCount: number;
    serviceAuthorId: string;
}
