module.exports = {
  post: {
    tags: ["posts"],
    description: "Create post",
    operationId: "createPost",
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
        description: "Todo created successfully",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
