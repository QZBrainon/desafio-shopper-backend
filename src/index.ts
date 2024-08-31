import "dotenv/config";
import "express-async-errors";
import express from "express";
import promptWithImageAndText from "./utils/promptWithImageAndText";
import meterAnalysisPrompt from "./prompts/meterAnalysisPrompt";
import errorHandler from "./middlewares/error.middleware";
import validateUpload from "./validations/validateUpload";
import verifyDatetime from "./utils/verifyDatetime";
import createMeasure from "./database/queries/createMeasure";
import validateConfirm from "./validations/validateConfirm";
import getMeasure from "./database/queries/getMeasure";
import CustomError from "./utils/CustomError";
import confirmMeasure from "./database/queries/confirmMeasure";
import validateList from "./validations/validateList";
import getList from "./database/queries/getList";
import formatMeasureListResponse from "./utils/formatMeasureListResponse";

const app = express();

app.use(express.json());

app.post("/upload", validateUpload, async (req, res) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body;
  const { image_url, measure_value } = await promptWithImageAndText(
    image,
    meterAnalysisPrompt
  );

  await verifyDatetime(measure_datetime, measure_type);

  const register = await createMeasure(
    image_url,
    measure_datetime,
    measure_type,
    measure_value,
    customer_code
  );

  return res.status(201).json({
    image_url: register.imageUrl,
    measure_value: register.measureValue,
    measure_uuid: register.id,
  });
});

app.patch("/confirm", validateConfirm, async (req, res) => {
  const { measure_uuid, confirmed_value } = await req.body;

  const response = await confirmMeasure(measure_uuid, confirmed_value);
  console.log(response);

  return res.status(200).json(response);
});

app.get("/:customer_code/list", validateList, async (req, res) => {
  const { customer_code } = req.params;
  const { measure_type } = req.query as any;
  const allCustomerMeasures = await getList(customer_code, measure_type);
  const formattedResponse = formatMeasureListResponse(
    customer_code,
    allCustomerMeasures
  );
  return res.status(200).json(formattedResponse);
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
