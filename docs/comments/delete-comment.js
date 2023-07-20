module.exports = {
  delete: {
    tags: ["comments"],
    description: "Deleting a comment",
    operationId: "deleteComment",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Deleting a done comment",
      },
    ],
    responses: {
      200: {
        description: "Comment deleted successfully",
      },
      404: {
        description: "Comment not found",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
