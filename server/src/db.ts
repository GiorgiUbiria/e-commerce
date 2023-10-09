import { Database } from "bun:sqlite";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
    email: string;
    createdAt: string;
    boughtServices: Service[];
}

export interface Service {
    id: string;
    serviceName: string;
    price: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    userCount: number;
}

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
    username TEXT NOT NULL,
    email TEXT NOT NULL,
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
        email,
        username,
    }: Omit<User, "id" | "createdAt" | "boughtServices">): Promise<
        Omit<User, "id" | "createdAt" | "boughtServices"> | Error
    > {
        const existingPerson = await this.getUser(email);

        if (!(existingPerson instanceof Error)) {
            return new Error("User already exists");
        }

        const query = this.db.query(`
            INSERT INTO users (firstName, lastName, password, username , email) VALUES ($firstName, $lastName, $password, $username, $email)
        `);

        let user: void | User;

        try {
            user = query.run({
                $firstName: firstName,
                $lastName: lastName,
                $password: password,
                $username: username,
                $email: email,
            });
        } catch (e) {
            return new Error("An error occurred while creating the user");
        }

        return {
            firstName,
            lastName,
            password,
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

        console.log("serviceName: ", serviceName, "price: ", price, "description: ", description);
        console.log("created service");

        return {
            serviceName,
            price,
            description,
        };
    }


    async getUser(email: string): Promise<User | Error> {
        const query = this.db.query(
            `SELECT * FROM users WHERE email  = $email`
        );

        const user = query.get({
            $email: email,
        }) as User;

        if (!user) {
            return new Error("User not found");
        }

        return user;
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
        console.log("getAllUsers");
        const query = this.db.query(`SELECT * FROM users`);
        const users = query.all() as User[];

        if (!users.length) {
            return new Error("No users found");
        }

        console.log("users Got")
        return users;
    }

    async getAllServices(): Promise<Service[] | Error> {
        console.log("getAllServices");
        const query = this.db.query(`SELECT * FROM services`);
        const services = query.all() as Service[];

        if (!services.length) {
            return new Error("No services found");
        }

        console.log("services Got")
        return services;
    }
}
