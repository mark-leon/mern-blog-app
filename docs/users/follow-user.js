module.exports = {
  post: {
    tags: ["users"],
    description: "follow user",
    operationId: "followUser",
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
