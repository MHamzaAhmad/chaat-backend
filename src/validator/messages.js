const getMessagesSchema = {
  type: "object",
  properties: {
    receiverId: { type: "string" },
  },
  required: ["receiverId"],
};

export default getMessagesSchema;
