import { Html } from "@react-three/drei";
import { Vector3 } from "three";
interface debuggerProps {
  position: Vector3;
}
const CubePositionDebugger = ({ position }: debuggerProps) => {
  // const coordinates: Array<keyof Vector3> = ["x", "y", "z"];
  const coordinates = { x: position.x, y: position.y, z: position.z };
  return (
    <Html className="bg-black text-white rounded-md p-2 w-[70px] flex flex-col items-left">
      {Object.entries(coordinates).map(([coordinate, value]) => (
        <p key={coordinate}>
          <strong className="p-2">{coordinate.toUpperCase()}</strong>
          {Math.round(value * 10) / 10}
        </p>
      ))}
    </Html>
  );
};

export default CubePositionDebugger;
