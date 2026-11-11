import { useId, type ReactNode } from "react";
import frameSvg from "@/components/phone-frame.svg?raw";

/** iPhone-style bezel. Children render in the screen cutout, behind the frame. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  const suffix = useId().replace(/:/g, "");
  const svg = frameSvg.replaceAll("_2201_70", `_${suffix}`);

  return (
    <div className={className ? `phone-frame ${className}` : "phone-frame"}>
      <div className="phone-frame__shot">{children}</div>
      <div className="phone-frame__bezel" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}
