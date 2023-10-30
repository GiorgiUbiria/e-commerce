import { Database } from "bun:sqlite";

import { User, UserDto, Service } from "./types/types";

export class ServiceDB {
    private db: Database;

    constructor() {
        this.db = new Database("service.db", { create: true });
        this.init()
            .then(() => console.log("Validated service table successfully!"))
            .catch(console.error);
    }


    async init(): Promise<void> {
        const query = `CREATE TABLE IF NOT EXISTS services (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    serviceName TEXT NOT NULL,
    price FLOAT NOT NULL DEFAULT 0.0,
    description TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updatedAt TIMESTAMP NOT NULL DEFAULT current_timestamp,
    userCount INTEGER NOT NULL DEFAULT 0
)`;

        const query2 = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    password TEXT NOT NULL,
    passwordSalt TEXT NOT NULL,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updatedAt TIMESTAMP NOT NULL DEFAULT current_timestamp
)`;

        this.db.run(query);
        this.db.run(query2);
        return;
    }

    async createUser({
        firstName,
        lastName,
        password,
        passwordSalt,
        email,
        username,
    }: Omit<User, "id" | "createdAt" | "boughtServices" | "role">): Promise<
        Omit<User, "id" | "createdAt" | "boughtServices" | "role"> | Error
    > {
        const query = this.db.query(`
            INSERT INTO users (firstName, lastName, password, passwordSalt, username , email, role) VALUES ($firstName, $lastName, $password, $passwordSalt, $username, $email, $role)
        `);

        let user: void | User;

        try {
            user = query.run({
                $firstName: firstName,
                $lastName: lastName,
                $password: password,
                $passwordSalt: passwordSalt,
                $username: username,
                $email: email,
                $role: "admin",
            });
        } catch (e) {
            return new Error("An error occurred while creating the user");
        }

        return {
            firstName,
            lastName,
            password,
            passwordSalt,
            username,
            email,
        };
    }

    async createService({
        serviceName,
        price,
        description,
    }: Omit<Service, "id" | "createdAt" | "userCount" | "updatedAt">): Promise<
        Omit<Service, "id" | "createdAt" | "userCount" | "updatedAt"> | Error
    > {
        const existingService = await this.getService(serviceName);

        if (!(existingService instanceof Error)) {
            return new Error("Service already exists");
        }

        const query = this.db.query(`
            INSERT INTO services (serviceName, price, description) VALUES ($serviceName, $price, $description)
        `);

        let user: void | User;

        try {
            user = query.run({
                $serviceName: serviceName,
                $price: price,
                $description: description,
            });
        } catch (e) {
            return new Error("An error occurred while creating the user");
        }

        const service = {
            serviceName,
            price,
            description,
        }

        return service;
    }


    async getUserByEmail(email: string): Promise<UserDto | Error> {
        const query = this.db.query(
            `SELECT (firstName, lastName, username, email, boughtServices) FROM users WHERE email  = $email`
        );

        const user = query.get({
            $email: email,
        }) as UserDto;

        if (!user) {
            return new Error("User not found");
        }

        return user;
    }

    async checkUserByEmail(email: string): Promise<boolean> {
        const query = this.db.query(
            `SELECT * FROM users WHERE email  = $email`
        );

        const user = query.get({
            $email: email,
        }) as User;

        if (!user) {
            return false
        }

        return true;
    }


    async getUserById(id: string): Promise<User | Error> {
        const query = this.db.query(
            `SELECT * FROM users WHERE id  = $id`
        );

        const user = query.get({
            $id: id,
        }) as User;

        if (!user) {
            return new Error("User not found");
        }

        return user;
    }

    async getUserByUsername(username: string): Promise<User | Error> {
        const query = this.db.query(
            `SELECT * FROM users WHERE username  = $username`
        );

        const user = query.get({
            $username: username,
        }) as User;

        if (!user) {
            return new Error("User not found");
        }

        return user;
    }

    async checkUserByUsername(username: string): Promise<boolean> {
        const query = this.db.query(
            `SELECT * FROM users WHERE username  = $username`
        );

        const user = query.get({
            $username: username,
        }) as User;

        if (!user) {
            return false
        }

        return true;
    }

    async getService(id: string): Promise<Service | Error> {
        const query = this.db.query(
            `SELECT * FROM services WHERE id  = $id`
        );

        const service = query.get({
            $id: id,
        }) as Service;

        if (!service) {
            return new Error("Service not found");
        }

        return service;
    }


    async getAllUsers(): Promise<User[] | Error> {
        const query = this.db.query(`SELECT * FROM users`);
        const users = query.all() as User[];

        if (!users.length) {
            return new Error("No users found");
        }

        return users;
    }

    async getAllServices(): Promise<Service[] | Error> {
        const query = this.db.query(`SELECT * from services`);
        const services = query.all() as Service[];

        if (!services.length) {
            return new Error("No services found");
        }

        return services;
    }

    async deleteService(id: string): Promise<Service | Error> {
        const service = await this.getService(id);

        if (service instanceof Error) {
            return service;
        }

        const query = this.db.query(`DELETE FROM services WHERE id = $id`);
        query.run({
            $id: id,
        })

        return service
    }
}
