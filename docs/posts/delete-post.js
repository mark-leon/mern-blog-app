module.exports = {
  delete: {
    tags: ["posts"],
    description: "Deleting a post",
    operationId: "deletePost",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Deleting a done post",
      },
    ],
    responses: {
      200: {
        description: "Post deleted successfully",
      },
      404: {
        description: "Post not found",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
