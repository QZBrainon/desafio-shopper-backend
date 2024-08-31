import { Measure } from "@prisma/client";

const formatMeasureListResponse = (
  customerCode: string,
  measures: Measure[]
) => {
  const formattedMeasures = measures.map((measure) => ({
    measure_uuid: measure.id,
    measure_datetime: measure.measureDatetime,
    measure_type: measure.measureType,
    has_confirmed: measure.confirmed,
    image_url: measure.imageUrl,
  }));

  return {
    customer_code: customerCode,
    measures: formattedMeasures,
  };
};

export default formatMeasureListResponse;
