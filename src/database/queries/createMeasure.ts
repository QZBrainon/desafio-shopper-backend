import prisma from "../client";

const createMeasure = async (
  image_url: string,
  measure_datetime: string,
  measure_type: "WATER" | "GAS",
  measure_value: number,
  customer_code: string
) => {
  const register = await prisma.measure.create({
    data: {
      imageUrl: image_url,
      measureDatetime: measure_datetime,
      measureType: measure_type,
      measureValue: measure_value,
      customerCode: customer_code,
    },
  });
  return register;
};

export default createMeasure;
