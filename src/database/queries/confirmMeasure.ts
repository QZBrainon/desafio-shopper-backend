import CustomError from "../../utils/CustomError";
import prisma from "../client";
import getMeasure from "./getMeasure";

const confirmMeasure = async (measureId: string, measureValue: number) => {
  try {
    const measure = await getMeasure(measureId);
    if (!measure) {
      throw new CustomError(
        404,
        "MEASURE_NOT_FOUND",
        "Leitura do mês já realizada"
      );
    }
    if (measure.confirmed) {
      throw new CustomError(
        409,
        "CONFIRMATION_DUPLICATE",
        "Leitura do mês já realizada"
      );
    }
    await prisma.measure.update({
      where: { id: measureId },
      data: {
        measureValue,
        confirmed: true,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error confirming measure:", error);
    throw error;
  }
};

export default confirmMeasure;
