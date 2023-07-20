module.exports = {
  put: {
    tags: ["posts"],
    description: "Update Post",
    operationId: "updatePost",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Id of post to be updated",
      },
    ],
    responses: {
      200: {
        description: "Post updated successfully",
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
