import { Play, Square } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ButtonProps {
  type: "play" | "stop";
  callback: () => void;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}
const GlobalActionButton = ({
  type,
  callback,
  isPlaying,
  setIsPlaying,
}: ButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={"text-white border-none"}
          onClick={() => {
            callback(), setIsPlaying(type === "play" ? true : false);
          }}
          aria-label={type}
        >
          {type == "play" ? (
            <Play
              className="transition-all duration-700"
              fill={isPlaying ? "white" : "transparent"}
              size="40"
            />
          ) : (
            <Square
              className="transition-all duration-700"
              fill={!isPlaying ? "white" : "transparent"}
              size="40"
            />
          )}
        </TooltipTrigger>
        <TooltipContent>{`Click this to ${type} all instruments at once`}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GlobalActionButton;
