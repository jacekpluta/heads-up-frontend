import buttonClick from "../sounds/buttonClick.mp3";
import UIfx from "uifx";

export const clickSound = new UIfx(buttonClick, {
  volume: 1,
  throttleMs: 100,
});
