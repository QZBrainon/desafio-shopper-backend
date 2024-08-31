import { PrismaClient } from "@prisma/client";
import CustomError from "./CustomError";

const prisma = new PrismaClient();

const verifyDatetime = async (
  datetime: string,
  measure_type: "WATER" | "GAS"
) => {
  const measureDate = new Date(datetime);
  const month = measureDate.getMonth() + 1;
  const year = measureDate.getFullYear();

  const existingMeasure = await prisma.measure.findFirst({
    where: {
      measureType: measure_type,
      measureDatetime: {
        gte: new Date(year, month - 1, 1).toISOString(),
        lt: new Date(year, month, 1).toISOString(),
      },
    },
  });
  if (existingMeasure) {
    throw new CustomError(409, "DOUBLE_REPORT", "Leitura do mês já realizada");
  }
};

export default verifyDatetime;
