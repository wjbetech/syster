import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type BaseChartProps = {
  data: { value: number | string | undefined }[];
};

export default function BaseChart(props: BaseChartProps) {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <AreaChart data={props.data}>
        <CartesianGrid
          stroke="#333"
          strokeDasharray="1 1"
          fill="#1C1C1C"
          horizontalPoints={[40, 80]}
        />
        <Area
          dataKey="value"
          fillOpacity={0.3}
          fill="#0A4D5C"
          stroke="#5DD4EE"
          strokeWidth={2}
          type="basis"
          isAnimationActive={true}
        />
        <XAxis stroke="transparent" height={0} />
        <YAxis domain={[0, 100]} stroke="transparent" width={0} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
