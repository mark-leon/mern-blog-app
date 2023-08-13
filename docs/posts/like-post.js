module.exports = {
  post: {
    tags: ["posts"],
    description: "like post",
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
