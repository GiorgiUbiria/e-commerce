import { Elysia } from "elysia";

export const isFormValidated = (app: Elysia) =>
    app.derive(async ({ body, set }: any) => {
        function sendErrorResponse(status: number, message: string) {
            set.status = status;
            return {
                formValidationResponse: {
                    success: false,
                    data: null,
                    message,
                }
            };
        }

        console.log("validating the body" + JSON.stringify(body))

        if (!body) {
            return sendErrorResponse(401, "Empty body");
        }

        const { serviceName, price, description } = body;

        if (!serviceName || !price || !description) {
            return sendErrorResponse(401, "Missing fields");
        }

        if (Number(price) <= 0) {
            return sendErrorResponse(401, "Price cannot be negative or equal to 0");
        }

        if (description.length < 10) {
            return sendErrorResponse(401, "Description must be at least 10 characters");
        }

        if (description.length > 100) {
            return sendErrorResponse(401, "Description must be less than 100 characters");
        }

        if (serviceName.length < 3) {
            return sendErrorResponse(401, "Service name must be at least 3 characters");
        }

        if (serviceName.length > 30) {
            return sendErrorResponse(401, "Service name must be less than 30 characters");
        }

        console.log("Form validated")

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
        };
    });
