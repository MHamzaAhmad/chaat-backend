const getUserSchema = (allRequired) => {
  const fields = allRequired ? ["email", "password"] : [];

  return {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string" },
      role: { type: "string", enum: ["user", "admin"], default: "user" },
    },
    required: fields,
  };
};
export default getUserSchema;
