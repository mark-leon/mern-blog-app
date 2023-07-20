module.exports = {
  put: {
    tags: ["comments"],
    description: "Update comment",
    operationId: "updateComment",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Id of comment to be updated",
      },
    ],
    responses: {
      200: {
        description: "Comment updated successfully",
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
