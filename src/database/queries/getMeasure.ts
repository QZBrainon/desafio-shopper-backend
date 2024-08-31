import prisma from "../client";

const getMeasure = async (measureId: string) => {
  const measure = await prisma.measure.findUnique({ where: { id: measureId } });
  return measure;
};

export default getMeasure;
