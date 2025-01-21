import React, { useEffect } from "react";

export function checkOutsideClick ( ref: React.RefObject<HTMLElement>, callback: () => void) {
   useEffect(() => {
    const handleOutsideCLick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)){
            callback();
        }
   };

   document.addEventListener("mousedown", handleOutsideCLick);
   return () => {
    document.removeEventListener("mousedown", handleOutsideCLick);
   };
}, [ref, callback]);
}