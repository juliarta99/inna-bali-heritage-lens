/**
 * Deklarasi tipe minimal untuk modul tanpa tipe bawaan.
 */

declare module "three/examples/jsm/effects/StereoEffect.js" {
  export class StereoEffect {
    constructor(renderer: unknown);
    setEyeSeparation(eyeSep: number): void;
    setSize(width: number, height: number): void;
    render(scene: unknown, camera: unknown): void;
  }
}

declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        poster?: string;
        ar?: boolean;
        "ar-modes"?: string;
        "ar-placement"?: string;
        "camera-controls"?: boolean;
        "auto-rotate"?: boolean;
        "touch-action"?: string;
        "shadow-intensity"?: string;
        exposure?: string;
        loading?: "auto" | "lazy" | "eager";
      };
    }
  }
}
