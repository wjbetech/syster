import { useMemo } from "react";
import BaseChart from "./BaseChart";

export type ChartProps = {
  data: { value: number | string }[];
  maxDataPoints: number;
};

export default function Chart(props: ChartProps) {
  const preparedData = useMemo(() => {
    const points = props.data.map((point) => ({
      value: typeof point.value === "number" ? point.value : parseFloat(point.value)
    }));
    return [
      ...points,
      ...Array.from({ length: props.maxDataPoints - points.length }).map(() => ({ value: undefined }))
    ];
  }, [props.data, props.maxDataPoints]);

  return <BaseChart data={preparedData} />;
}
