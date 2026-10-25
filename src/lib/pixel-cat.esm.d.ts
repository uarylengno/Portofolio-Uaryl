export interface PixelCatOptions {
  container?: HTMLElement | null;
  parent?: HTMLElement | null;
  scale?: 'auto' | number;
  bottom?: number;
  side?: 'left' | 'right' | number;
  zIndex?: number;
  messages?: string[] | null;
  autonomous?: boolean;
  sleepAfter?: number;
  timeScale?: number;
  sound?: boolean;
  respectReducedMotion?: boolean;
  persistHidden?: boolean;
  hideButton?: boolean;
  ariaLabel?: string;
}
export interface PixelCatController {
  hide(): void;
  show(): void;
  toggle(): void;
  say(text: string, ms?: number): void;
  trigger(name: string): boolean;
  pause(): void;
  resume(): void;
  destroy(): void;
  getState(): unknown;
}
export function mountPixelCat(opts?: PixelCatOptions): PixelCatController;
export default mountPixelCat;
