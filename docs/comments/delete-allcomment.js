module.exports = {
  delete: {
    tags: ["comments"],
    description: "Delete all comment",
    operationId: "deleteAllComments",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "A single comment id",
      },
    ],
    responses: {
      200: {
        description: "Comment is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Todo",
            },
          },
        },
      },
      404: {
        description: "Comment is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
              example: {
                message: "We can't find the comments",
                internal_code: "Invalid id",
              },
            },
          },
        },
      },
    },
  },
};
