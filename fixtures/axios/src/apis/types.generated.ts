export interface paths {
    "/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a list of users
         * @description Returns a list of users.
         */
        get: {
            parameters: {
                query?: {
                    /** @description The maximum number of users to return. */
                    limit?: number;
                    /** @description The number of users to skip before starting to collect the result set. */
                    offset?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of users. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["User"][];
                    };
                };
            };
        };
        put?: never;
        /**
         * Create a new user
         * @description Adds a new user to the system.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description User object to create */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
            responses: {
                /** @description User created successfully. */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{userId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get user by ID
         * @description Retrieves a user by their ID.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID of the user */
                    userId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A single user. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["User"];
                    };
                };
                /** @description User not found. */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{userId}/resources": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get resources for a user
         * @description Retrieves a list of resources associated with the user.
         */
        get: {
            parameters: {
                query?: {
                    /** @description Filter resources by type. */
                    type?: string;
                };
                header?: never;
                path: {
                    /** @description ID of the user */
                    userId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of resources. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Resource"][];
                    };
                };
            };
        };
        put?: never;
        /**
         * Create a new resource for a user
         * @description Adds a new resource to the user's collection.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID of the user */
                    userId: string;
                };
                cookie?: never;
            };
            /** @description Resource object to create */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["Resource"];
                };
            };
            responses: {
                /** @description Resource created successfully. */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{userId}/resources/{resourceId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a specific resource for a user
         * @description Retrieves details of a specific resource associated with the user.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID of the user */
                    userId: string;
                    /** @description ID of the resource */
                    resourceId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Resource details. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Resource"];
                    };
                };
                /** @description Resource not found. */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        /**
         * Delete a specific resource for a user
         * @description Deletes a resource associated with the user.
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID of the user */
                    userId: string;
                    /** @description ID of the resource */
                    resourceId: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Resource deleted successfully. */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        User: {
            /** @description The unique identifier for the user. */
            id?: string;
            /** @description The name of the user. */
            name?: string;
            /**
             * Format: email
             * @description The email of the user.
             */
            email?: string;
            /** @description The age of the user. */
            age?: number;
        };
        Resource: {
            /** @description The unique identifier for the resource. */
            id?: string;
            /** @description The type of the resource. */
            type?: string;
            /** @description Additional attributes of the resource. */
            attributes?: Record<string, never>;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
