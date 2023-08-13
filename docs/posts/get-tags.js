module.exports = {
  get: {
    tags: ["posts"],
    description: "Get all tags",
    operationId: "getPost",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "A single post id",
      },
    ],
    responses: {
      200: {
        description: "Post is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Todo",
            },
          },
        },
      },
      404: {
        description: "Post is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
              example: {
                message: "We can't find the post",
                internal_code: "Invalid id",
              },
            },
          },
        },
      },
    },
  },
};
