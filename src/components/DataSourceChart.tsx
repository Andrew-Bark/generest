import { Bar, BarChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";

const chartConfig = {
  people: {
    label: "people",
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface dataSourceChartProps {
  dataType: string;
  data: any;
}
export function DataSourceChart({ data, dataType }: dataSourceChartProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px]">
      <BarChart accessibilityLayer data={data}>
        <XAxis dataKey={"timestamp"} tickLine={false} />
        <Bar dataKey={dataType} />

        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  );
}
