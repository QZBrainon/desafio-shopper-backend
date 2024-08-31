import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const uploadSchema = Joi.object({
  image: Joi.string().required(),
  customer_code: Joi.string().required(),
  measure_datetime: Joi.date().iso().required(),
  measure_type: Joi.string().valid("WATER", "GAS").required(),
});

const validateUpload = (req: Request, res: Response, next: NextFunction) => {
  const { error } = uploadSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: error.details
        .map((detail) => detail.message)
        .join(", "),
    });
  }

  next();
};

export default validateUpload;
