import BaseChart from "./BaseChart";

export type ChartProps = {
  data: { value: number | string }[];
};

export default function Chart(props: ChartProps) {
  return <BaseChart data={props.data} />;
}
