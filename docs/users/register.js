module.exports = {
  post: {
    tags: ["users"],
    description: "Create user",
    operationId: "createUser",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/TodoInput",
          },
        },
      },
    },
    responses: {
      201: {
        description: "User created successfully",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
