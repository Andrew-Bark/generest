import { Vector3, ArrowHelper } from "three";
import { ConnectionObj, ModuleObj } from "@/models/types";

interface LineProps {
  connectionObj: ConnectionObj;
  modules: ModuleObj[];
  key: number;
}

function Line(props: LineProps) {
  // create arrow connecting the two shapes (used to create cylinder)
  const idFrom = props.connectionObj.connection.fromModuleId;
  const idTo = props.connectionObj.connection.toModuleId;
  const posFrom = props.modules[idFrom].module.worldPos;
  const posTo = props.modules[idTo].module.worldPos;
  const direction = new Vector3().subVectors(posTo, posFrom).normalize(); // todo: understand why normalize is needed here
  const distance = new Vector3().subVectors(posTo, posFrom).length();
  const arrow = new ArrowHelper(direction, posFrom, distance);
  const cylinderRotation = arrow.rotation.clone();

  // generate properties for a cylinder mesh to represent the connection
  const cylinderDirection = new Vector3(...direction).multiplyScalar(
    distance / 2
  );
  const cylinderPosition = new Vector3().addVectors(posFrom, cylinderDirection);

  // JSX
  return (
    <>
      <mesh position={cylinderPosition} rotation={cylinderRotation}>
        <cylinderGeometry args={[0.1, 0.1, distance, 32]} />
        <meshStandardMaterial color={"slategray"} />
      </mesh>
    </>
  );
}

export default Line;

{
  /* <arrowHelper args={[direction, posFrom, distance]} /> */
}
{
  /* <Html>
  <span>baseX {Math.round(posFrom!.x * 10) / 10}</span><br />
  <span>baseY {Math.round(posFrom!.y * 10) / 10}</span><br />
  <span>baseZ {Math.round(posFrom!.z * 10) / 10}</span><br />
  <span>tipX {Math.round(posTo!.x * 10) / 10}</span><br />
  <span>tipY {Math.round(posTo!.y * 10) / 10}</span><br />
  <span>tipZ {Math.round(posTo!.z * 10) / 10}</span><br />
  <span>directionX {Math.round(direction.x * 10) / 10}</span><br />
  <span>directionY {Math.round(direction.y * 10) / 10}</span><br />
  <span>directionZ {Math.round(direction.z * 10) / 10}</span><br />
  <span>direction.length {Math.round(direction.length() * 10) / 10}</span><br />
</Html> */
}
