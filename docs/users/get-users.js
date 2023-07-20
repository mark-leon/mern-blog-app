module.exports = {
  get: {
    tags: ["users"],
    description: "Get users",
    operationId: "getUsers",
    parameters: [],
    responses: {
      200: {
        description: "Users were obtained",
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
