import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const confirmSchema = Joi.object({
  measure_uuid: Joi.string().required(),
  confirmed_value: Joi.number().required(),
});

const validateConfirm = (req: Request, res: Response, next: NextFunction) => {
  const { error } = confirmSchema.validate(req.body);

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

export default validateConfirm;
