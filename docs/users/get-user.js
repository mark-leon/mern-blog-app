module.exports = {
  get: {
    tags: ["users"],
    description: "Get a user",
    operationId: "getUser",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "A single user id",
      },
    ],
    responses: {
      200: {
        description: "User is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Todo",
            },
          },
        },
      },
      404: {
        description: "User is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
              example: {
                message: "We can't find the user",
                internal_code: "Invalid id",
              },
            },
          },
        },
      },
    },
  },
};
