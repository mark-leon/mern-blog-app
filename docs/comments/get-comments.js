module.exports = {
  get: {
    tags: ["comments"],
    description: "Get comments",
    operationId: "getComments",
    parameters: [],
    responses: {
      200: {
        description: "Comments were obtained",
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
