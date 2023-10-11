import { Elysia, t } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { comparePassword, hashPassword, md5hash } from "../../utils/bcrypt";
import { isAuthenticated } from "../../middleware/auth/isAuthenticated";
import { ServiceDB } from "../../db";

export const auth = (app: Elysia) =>
    app.group("auth", (app) =>
        app
            .use(jwt({
                name: 'jwt',
                secret: 'afrikelBavshvebsWyaliAkliat'
            }))
            .use(cookie())
            .decorate("db", new ServiceDB())
            .post("/sign_up", async ({ db, body, set }) => {
                console.log("Starting to sign up the user")
                const { firstName, lastName, password, username, email }: any = body;

                const emailExists = await db.checkUserByEmail(email);

                if (emailExists) {
                    set.status = 401;
                    console.log("Email already exists")
                    return {
                        success: false,
                        data: null,
                        message: "Email already exists",
                    }
                }

                const userNameExists = await db.checkUserByUsername(username);

                if (userNameExists) {
                    set.status = 401;
                    console.log("Username already exists")
                    return {
                        success: false,
                        data: null,
                        message: "Username already exists",
                    }
                }

                const { hash, salt } = await hashPassword(password);
                const emailHash = md5hash(email);

                const newUser = {
                    firstName,
                    lastName,
                    password: hash,
                    passwordSalt: salt,
                    username,
                    email: emailHash,
                }

                try {
                    console.log("Trying to create a new user")
                    await db.createUser(newUser);
                } catch (error) {
                    console.error(error)
                    return;
                } finally {
                    return {
                        success: true,
                        data: newUser,
                        message: "User created",
                    }
                }
            }, {
                body: t.Object({
                    firstName: t.String(),
                    lastName: t.String(),
                    password: t.String(),
                    username: t.String(),
                    email: t.String(),
                }),
            })

            .post("/sign_in", async ({ db, body, set, jwt, setCookie }: any) => {
                const { username, password }: any = body;

                const user = await db.getUserByUsername(username);

                if (!user) {
                    set.status = 400;
                    return {
                        success: false,
                        data: null,
                        message: "User not found",
                    }
                }

                const isCorrectPassword = await comparePassword(password, user.passwordSalt, user.password);

                if (!isCorrectPassword) {
                    set.status = 400;
                    return {
                        success: false,
                        data: null,
                        message: "Incorrect password",
                    }
                }

                const accessToken = await jwt.sign({
                    userId: user.id,
                })

                const refreshToken = await jwt.sign({
                    userId: user.id,
                })

                setCookie("refreshToken", refreshToken, {
                    maxAge: 86400 * 7,
                    path: "/"
                })

                setCookie("accessToken", accessToken, {
                    maxAge: 15 * 60,
                    path: "/"
                })

                return {
                    success: true,
                    data: null,
                    message: "User signed in",
                }
            }, {
                body: t.Object({
                    username: t.String(),
                    password: t.String(),
                }),
            })
            .use(isAuthenticated)
    );