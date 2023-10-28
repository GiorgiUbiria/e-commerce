import { Elysia } from "elysia";

export const isFormValidated = (app: Elysia) =>
    app.derive(async ({ body, set }: any) => {
        if (!body) {
            set.status = 401;
            return {
                success: false,
                data: null,
                message: "Empty body",
            }
        }

        const { serviceName, price, description } = body;

        if (!serviceName || !price || !description) {
            set.status = 401;
            return {
                formValidationResponse: {
                    success: false,
                    data: null,
                    message: "Missing fields",
                }
            }
        }

        if (price < 0) {
            set.status = 401;
            return {
                formValidationResponse: {
                    success: false,
                    data: null,
                    message: "Price cannot be negative",
                }
            }
        }

        if (description.length < 10) {
            set.status = 401;
            return {
                formValidationResponse: {
                    success: false,
                    data: null,
                    message: "Description must be at least 10 characters",
                }
            }
        }

        if (description.length > 100) {
            set.status = 401;
            return {
                formValidationResponse: {
                    success: false,
                    data: null,
                    message: "Description must be less than 100 characters",
                }
            }
        }

        if (serviceName.length < 3) {
            set.status = 401;
            return {
                formValidationResponse: {
                    success: false,
                    data: null,
                    message: "Service name must be at least 3 characters",
                }
            }
        }

        if (serviceName.length > 30) {
            set.status = 401;
            return {
                formValidationResponse: {
                    success: false,
                    data: null,
                    message: "Service name must be less than 30 characters",
                }
            }
        }

        return {
            formValidationResponse: {
                success: true,
                data: {
                    serviceName,
                    price,
                    description,
                },
                message: "Form validated",
            }
        }
    })
