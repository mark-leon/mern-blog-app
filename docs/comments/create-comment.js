module.exports = {
  post: {
    tags: ["comments"],
    description: "Create todo",
    operationId: "createTodo",
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
        description: "Comment created successfully",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
