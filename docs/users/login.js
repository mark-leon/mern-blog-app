module.exports = {
  post: {
    tags: ["users"],
    description: "Login user",
    operationId: "loginUser",
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
        description: "User logged in successfully",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
