/*  This component renders the module controls onto the 3d Shape
 */

import "./Controls.css";
import { Html } from "@react-three/drei";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Datasource } from "@/datasource";
import { Bar, BarChart } from "recharts";
import { ChartContainer, ChartTooltipContent } from "./ui/chart";
import { DataSourceChart } from "./DataSourceChart";
import { useState } from "react";
interface ControlsDataSourceProps {
  datasource: Datasource | undefined;
}

function ControlsDatasource({ datasource }: ControlsDataSourceProps) {
  console.log("datasource", datasource);

  const [dataDescription, setDataDescription] = useState(
    "Number of people walking past pilgrim street"
  );
  function getHourFromTimestamp(timestamp: any) {
    const date = new Date(timestamp);
    const suffix = date.getHours() > 12 ? " PM" : " AM";
    return date.getHours().toString() + suffix;
  }

  // we need an object with value and timestamp
  const sensor = datasource?.rawDataFromApi.sensors[0].data["Walking"];
  let numberArray = [];
  for (let idx = 0; idx < sensor.length; idx++) {
    if (idx === 0) {
      console.log("yes", sensor[idx].Timestamp);
    }
    let timestamp = "";
    if (idx % 4 === 0) {
      timestamp = getHourFromTimestamp(sensor[idx].Timestamp);
    }
    numberArray.push({
      people: sensor[idx].Value,
      timestamp,
    });
  }
  console.log("Hello world: ", numberArray);

  return (
    <Html>
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Data Source</CardTitle>
          <CardDescription>{dataDescription}</CardDescription>
        </CardHeader>
        <CardContent className="text-blue-500 ">
          <DataSourceChart data={numberArray} dataType="people" />
        </CardContent>
      </Card>
    </Html>
  );
}

export default ControlsDatasource;
