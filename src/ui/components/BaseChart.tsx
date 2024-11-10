import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

type BaseChartProps = {
  data: { value: number | string | undefined }[];
};

export default function BaseChart(props: BaseChartProps) {
  return (
    <ResponsiveContainer
      width="100%"
      height={120}
    >
      <h1>CPU Usage</h1>
      <AreaChart data={props.data}>
        <CartesianGrid
          stroke="#333"
          strokeDasharray="5 5"
          fill="#1C1C1C" // Corrected color format
        />
        <Area
          fillOpacity={0.3}
          fill="#0A4D5C"
          stroke="#5DD4EE"
          strokeWidth={3}
          type="monotone"
          dataKey="value"
          isAnimationActive={false}
        />
        <XAxis
          stroke="transparent"
          height={0}
        />
        <YAxis
          domain={[0, 100]}
          stroke="transparent"
          width={0}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
