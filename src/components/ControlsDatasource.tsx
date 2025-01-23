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
import { useRef, useState } from "react";
import { Select } from "./ui/select";
import Module from "@/models/module";
import { checkOutsideClick } from "@/helpers/checkOutsideClick";

const dataArray = [
  {
    street: "Quayside",
    sensor: "PER_PEOPLE_NCLQUAYSIDEWESLEYSQUARE_FROM_EAST_TO_WEST",
  },
  {
    street: "Shields Road",
    sensor: "PER_PEOPLE_NCLQUAYSIDEWESLEYSQUARE_FROM_WEST_TO_EAST",
  },

  {
    street: "Pilgrim Street",
    sensor: "PER_PEOPLE_NCLPILGRIMSTMARKETLN_FROM_SOUTH_TO_NORTH",
  },
];

interface SelectComponentProps {
  onStreetChange: (street: string) => void;
  module: Module | undefined;
}
const SelectComponent = ({ onStreetChange, module }: SelectComponentProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSensor = e.target.value;
    if (module?.datasource) {
      module.datasource.setEntity(selectedSensor);
    }
    const selectedStreet = dataArray.find(
      (location) => location.sensor === selectedSensor
    )?.street;
    if (selectedStreet) {
      onStreetChange(selectedStreet);
    }
  };

  const baseValue = module?.datasource?.entity;
  return (
    <select
      defaultValue={baseValue}
      className="bg-stone-900 text-white"
      onChange={handleChange}
    >
      {dataArray.map((location, idx) => (
        <option key={idx} value={location.sensor}>
          {location.street}
        </option>
      ))}
    </select>
  );
};

interface ControlsDataSourceProps {
  module: Module | undefined;
}

function ControlsDatasource({ module }: ControlsDataSourceProps) {
  console.log("datasource", module?.datasource);
  const datasource = module?.datasource;
  const [dataDescription, setDataDescription] = useState(
    "Number of people walking past Pilgrim Street"
  );

  const handleStreetChange = (newStreet: string) => {
    setDataDescription(`Number of people walking past ${newStreet}`);
  };

  function getTimeFromTimestamp(timestamp: any) {
    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Extract hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format hours and minutes with leading zero if necessary
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    // Return the time in HH:mm format
    return `${formattedHours}:${formattedMinutes}`;
  }

  // we need an object with value and timestamp
  const sensor = datasource?.rawDataFromApi.sensors[0].data["Walking"];
  let numberArray = [];
  for (let idx = 0; idx < sensor.length; idx++) {
    if (idx === 0) {
      console.log("yes", sensor[idx].Timestamp);
    }

    numberArray.push({
      people: sensor[idx].Value,
      timestamp: getTimeFromTimestamp(sensor[idx].Timestamp),
    });
  }

  const [isOpen, setIsOpen] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  checkOutsideClick(cardRef, () => {
    setIsOpen(false);
  });

  return (
    <Html>
      {isOpen && (
        <Card ref={cardRef}>
          <CardHeader>
            <CardTitle>Data Source</CardTitle>
            <CardDescription>{dataDescription}</CardDescription>
          </CardHeader>
          <CardContent className="text-blue-500 ">
            <SelectComponent
              onStreetChange={handleStreetChange}
              module={module}
            />
            <DataSourceChart data={numberArray} dataType="people" />
          </CardContent>
        </Card>
      )}
    </Html>
  );
}

export default ControlsDatasource;
