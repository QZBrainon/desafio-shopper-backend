import CustomError from "../../utils/CustomError";
import prisma from "../client";

const getList = async (
  customer_code: string,
  measure_type?: "water" | "gas"
) => {
  const whereClause: any = { customerCode: customer_code };

  if (measure_type) {
    whereClause.measureType = measure_type.toUpperCase();
  }

  const allCustomerMeasures = await prisma.measure.findMany({
    where: whereClause,
  });

  if (allCustomerMeasures.length === 0) {
    throw new CustomError(
      404,
      "MEASURES_NOT_FOUND",
      "Nenhuma leitura encontrada"
    );
  }

  return allCustomerMeasures;
};

export default getList;
