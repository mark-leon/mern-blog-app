module.exports = {
  get: {
    tags: ["posts"],
    description: "Get published posts",
    operationId: "getPosts",
    parameters: [],
    responses: {
      200: {
        description: "Posts were obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Todo",
            },
          },
        },
      },
    },
  },
};
