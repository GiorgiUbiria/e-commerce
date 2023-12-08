import { Elysia, t } from "elysia";
import { comparePassword, hashPassword, md5hash } from "../../utils/bcrypt";

export const auth = (app: Elysia) =>
    app.group("auth", (app) =>
        app
            .post("/sign_up", async (context) => {
                const { db, body, set }: any = context;
                const { firstName, lastName, password, username, email }: any = body;

                const emailExists = await db.checkUserByEmail(email);

                if (emailExists) {
                    set.status = 401;
                    return {
                        success: false,
                        data: null,
                        message: "Email already exists",
                    }
                }

                const userNameExists = await db.checkUserByUsername(username);

                if (userNameExists) {
                    set.status = 401;
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
                    role: "admin",
                    email: emailHash,
                }

                try {
                    await db.createUser(newUser);
                } catch (error) {
                    console.error(error)
                    return;
                } finally {
                    return {
                        success: true,
                        data: newUser.role,
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
            .post("/sign_in", async (context) => {
                const { db, body, set, jwt, setCookie }: any = context;
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
                }, {
                    expiresIn: 30 * 60,
                    issuer: "elysia",
                });

                const refreshToken = await jwt.sign({
                    userId: user.id,
                }, {
                    expiresIn: 7 * 60 * 60 * 24,
                    issuer: "elysia",
                });

                setCookie("accessToken", accessToken, {
                    httpOnly: true,
                    maxAge: 30 * 60,
                    path: "/",
                });

                setCookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 7 * 60 * 60 * 24,
                    path: "/",
                })

                return {
                    success: true,
                    data: {
                        role: user.role,
                        id: user.id,
                    },
                    message: "User signed in",
                }
            }, {
                body: t.Object({
                    username: t.String(),
                    password: t.String(),
                }),
            })
            .get("/sign_out", (context) => {
                const { setCookie }: any = context;
                setCookie("accessToken", "", {
                    maxAge: 0,
                    path: "/",
                })

                setCookie("refreshToken", "", {
                    maxAge: 0,
                    path: "/",
                })

                setCookie("userRole", "", {
                    maxAge: 0,
                    path: "/",
                })

                setCookie("userId", "", {
                    maxAge: 0,
                    path: "/",
                })
            })
    );
