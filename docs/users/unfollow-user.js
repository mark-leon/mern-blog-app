module.exports = {
  post: {
    tags: ["users"],
    description: "unfollow user",
    operationId: "unfollowUser",
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
