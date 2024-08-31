import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import extractBase64Data from "./extractBase64Data";
import { tmpdir } from "os";
import fs from "fs";
import CustomError from "./CustomError";

const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY!);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface UploadResponse {
  image_url: string;
  measure_value: number;
}

const promptWithImageAndText = async (
  base64String: string,
  prompt: string
): Promise<UploadResponse> => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const data = extractBase64Data(base64String);

    const fileExtension = data.inlineData.mimeType.split("/")[1];
    const tempFilePath = `${tmpdir()}/temp_image.${fileExtension}`;

    const buffer = Buffer.from(data.inlineData.data, "base64");

    await fs.promises.writeFile(tempFilePath, buffer);

    const { file } = await fileManager.uploadFile(tempFilePath, {
      mimeType: data.inlineData.mimeType,
      displayName: "Register",
    });

    await fs.promises.rm(tempFilePath, { force: true });

    const imageAnalysis = await model.generateContent([prompt, data]);

    return {
      image_url: file.uri,
      measure_value: Number(imageAnalysis.response.text()),
    };
  } catch (error) {
    throw new CustomError(
      500,
      "IMAGE_PARSING_FAILED",
      "Failed to upload or parse image. Please try again."
    );
  }
};

export default promptWithImageAndText;
