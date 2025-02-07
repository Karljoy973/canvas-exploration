import { Chart, ChartData } from "./Chart/data";
import { MouseLogger } from "./MouseLogger";
import "./style.css";

window.addEventListener("load", () => {
  new MouseLogger("canvas");
  let canvas = document.getElementById("canvas") as HTMLCanvasElement;

  let context = canvas.getContext("2d") as CanvasRenderingContext2D;

  let chart: Chart = new Chart("canvas", ChartData);
  chart.BarChart();
});
