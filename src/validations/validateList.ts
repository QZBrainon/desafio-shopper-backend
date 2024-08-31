import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const listSchema = Joi.object({
  measure_type: Joi.string()
    .pattern(/^(WATER|GAS)$/i)
    .optional(),
});

const validateList = (req: Request, res: Response, next: NextFunction) => {
  const { error } = listSchema.validate(req.query);

  if (error) {
    return res.status(400).json({
      error_code: "INVALID_TYPE",
      error_description: "Tipo de medição não permitida",
    });
  }

  next();
};

export default validateList;
