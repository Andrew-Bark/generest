import { Vector3 } from "three";

export default function Environment() {
  const dirLightPos = new Vector3(5, 2, 5);

  return (
    <>
      {/* <OrbitControls> */}
      <ambientLight intensity={1.0} />
      {/* directionalLight: sun; casts shadows; infinitely far w/ parallel rays */}
      {/* pointLight: light bulb */}
      <directionalLight color="white" position={dirLightPos} />
      <mesh position={dirLightPos} visible={false} /* DEBUG */>
        <boxGeometry />
      </mesh>
      {/* </OrbitControls> */}
    </>
  );
}
