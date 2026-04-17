import { z } from "zod";

const validate = (schema) => {
  return (req, res, next) => {
    try {
      // Parse and validate request body
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Format Zod errors
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          error: "Validation failed",
          details: formattedErrors,
        });
      }
      next(error);
    }
  };
};

export default validate;
