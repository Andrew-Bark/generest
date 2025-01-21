/*  This component renders the module controls onto the 3d Shape
 */

import "./Controls.css";
import { Html } from "@react-three/drei";
import { Instrument } from "../instrument";
import { useRef, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Play, Square } from "lucide-react";
import { checkOutsideClick } from "@/helpers/checkOutsideClick";

interface controlsProps {
  instrument: Instrument;
}

interface IFormData {
  [key: string]: {
    title: string;
    sliderPointer: number[];
    callback: (arg: any) => void;
    array: Array<string | number>;
  };
}

function ControlsInstrument({ instrument }: controlsProps) {
  const tempo = ["2n", "4n", "8n", "16n", "32n", "64n"];
  const scaleArray = ["Dminor", "Dpenta", "Fmajor"];
  const octaveArray = [2, 3, 4, 5, 6, 7];
  const octaveRangeArray = [0, 1, 2, 3, 4];

  const [isPlaying, setIsPlaying] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const [formData, setFormData] = useState<IFormData>({
    tempo: {
      title: "Tempo",
      sliderPointer: [2],
      callback: instrument.setSequenceTempo,
      array: tempo,
    },
    scale: {
      title: "Scale",
      sliderPointer: [2],
      callback: instrument.setScale,
      array: scaleArray,
    },
    noteLength: {
      title: "Note Length",
      sliderPointer: [2],
      callback: instrument.setNoteDuration,
      array: tempo,
    },
    sequenceLength: {
      title: "Sequence Length",
      sliderPointer: [2],
      callback: instrument.setNNotesInSequence,
      array: tempo,
    },
    octave: {
      title: "Octave",
      sliderPointer: [2],
      callback: instrument.setOctave,
      array: octaveArray,
    },
    octaveRange: {
      title: "Octave Range",
      sliderPointer: [2],
      callback: instrument.setOctaveRange,
      array: octaveRangeArray,
    },
  });

  const handleSliderChange = (
    sliderPointer: number[],
    key: keyof typeof formData
  ) => {
    console.log("value in slider change", sliderPointer);
    console.log("key in slider change", key);

    setFormData((prev) => ({
      ...prev,
      [key]: { ...prev[key], sliderPointer: sliderPointer },
    }));
  };

  const handleClickPlay = () => {
    setIsPlaying(true);
    setIsStopped(false);
    instrument.playSequence();
  };
  const handleClickStop = () => {
    setIsPlaying(false);
    setIsStopped(true);
    instrument.stopSequence();
  };

  const cardRef = useRef<HTMLDivElement>(null);

  checkOutsideClick(cardRef, () => {
    setIsOpen(false);
  });
  return (
    <Html>
      {isOpen && (
        <Card className="bg-stone-800 relative w-[300px] " ref={cardRef}>
          <CardHeader className="flex flex-row  justify-between items-baseline">
            <Button onClick={handleClickPlay}>
              <Play className={isPlaying ? "fill-white" : ""} />
            </Button>
            <CardTitle className="text-white  text-center text-xl">
              Instrument
            </CardTitle>
            <Button onClick={handleClickStop}>
              <Square className={isStopped ? "fill-white" : ""} />
            </Button>
          </CardHeader>

          <form onSubmit={() => console.log("Hello from card")}>
            <CardContent className="space-y-6 ">
              {Object.entries(formData).map(
                ([key, { sliderPointer, callback, title, array }]) => (
                  <div key={key} className="space-y-2 text-white ">
                    <Label className="text-center font-bold text-white">
                      {title}
                    </Label>
                    <Slider
                      id={title}
                      min={0}
                      max={array.length - 1}
                      value={sliderPointer}
                      onValueChange={(sliderPointer: number[]): void => {
                        handleSliderChange(sliderPointer, key);
                      }}
                      onValueCommit={(sliderPointer: number[]): void => {
                        callback(array[sliderPointer[0]]);
                      }}
                    />
                    <div className="flex justify-between text-sm ">
                      {array.map((textValue: string | number, index) => (
                        <span
                          className={
                            index === sliderPointer[0] ? "font-bold" : ""
                          }
                        >
                          {textValue}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </form>
        </Card>
      )}
    </Html>
  );
}

export default ControlsInstrument;
