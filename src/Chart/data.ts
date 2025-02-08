/**
 * @class Point
 * @description base class for a `Point` object, this Point object will serve
 * as a base class for other classes such as `EnhancedPoint`
 * @member X provides the x coordinate of the point (no setter declared)
 * @member Y provides the y coordinate of the point (no setter declared)
 * @description if you want to update the points you would likely prefer to use another class //TODO -
 */
export class Point {
  //contient seulement ce qu'il faut au sens mathématique
  //x , y, sans rien pour mettre à jour les coordonnées d'un point
  private _x: number;
  private _y: number;
  get X() {
    return this._x;
  }
  get Y() {
    return this._y;
  }
  get attributes() {
    return {
      x: this._x,
      y: this._y,
      stringified: this.toString(),
    };
  }

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
  public toString() {
    return `x : ${this._x} - y : ${this._y}`;
  }
}

/**
 * @class LabeledPoint
 * @description a Point with a label : it can be useful if you want to have a point with a xlabel, a ylabel or both or none
 */
export class LabeledPoint {
  private _point: Point;
  private _xlabel: string;
  private _ylabel: string;

  get Point() {
    return this._point;
  }
  get attributes() {
    return {
      point: this._point,
      Xlabel: this._xlabel,
      Ylabel: this._ylabel,
      stringified: this.toString(),
    };
  }
  get Xlabel() {
    return this._xlabel;
  }
  get Ylabel() {
    return this._ylabel;
  }
  constructor(point: Point, xlabel: string, ylabel: string) {
    this._point = point;
    this._xlabel = xlabel;
    this._ylabel = ylabel;
  }
  public toString() {
    return `xlabel : ${this._xlabel} - ylabel : ${this._ylabel} - Point : ${this._point} `;
  }
}

export class Chart {
  //I will split this Chart class with a Chart vue, a chart model and a chart controller later on
  private _targetId: string;
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _width: number;
  private _height: number;

  // could be an array with different formats
  private _data: any[];
  private _lowerYvalue: number;
  private _higherYvalue: number;
  private _lowerXvalue: number;
  private _higherXvalue: number;

  //TODO refactor later on - Axes specs
  private _axesRatio: number;
  private _axesColor: string = "black";
  private _axesWidth: number;
  private _axesHeight: number;
  private _verticalMargins: number;
  private _horizontalMargins: number;
  private _verticalFrequency: number;
  private _horizontalFrequency: number;

  //TODO refactor later on - label configuration
  private _fontRatio: number;
  private _fontFamily: string;
  private _fontStyle: string;
  private _fontWeight: string;
  private _fontColor: string;
  private _verticalFontSize: number;
  private _horizontalFontsize: number;

  private _verticalUpperBound: number;
  private _horizontalUpperBound: number;
  private _verticalLowerBound: number;
  private _horizontalLowerBound: number;

  private _axesLineWidth: number = 2;
  private _guidelineWidth: number;
  private _guidelineColor: string;

  //getters

  constructor(targetId: string, data: any[]) {
    //this part is for the view
    try {
      let correspondingElement = document.getElementById(
        targetId,
      ) as HTMLCanvasElement;
      if (
        !correspondingElement.width ||
        !correspondingElement.height ||
        !correspondingElement.getContext("2d")
      )
        throw Error(
          "Provided Selector does not match any canvas in the Document",
        );
    } catch (e) {
      console.log(e);
    }

    if (!data.length) throw Error("Invalid data provided");

    //model
    this._data = [...data];

    this._lowerXvalue = Math.min(
      ...(this._data.map((e) => e.coordinate.x) as number[]),
    );

    this._higherXvalue = Math.max(
      ...(this._data.map((e) => e.coordinate.x) as number[]),
    );

    this._lowerYvalue = Math.min(
      ...(this._data.map((e) => e.coordinate.y) as number[]),
    );
    this._higherYvalue = Math.max(
      ...(this._data.map((e) => e.coordinate.y) as number[]),
    );

    this._verticalFrequency = this._higherYvalue / this._data.length;
    this._horizontalFrequency = this._higherXvalue / this._data.length; 
    this._horizontalFontsize = this._higherXvalue / this._data.length;

    this._targetId = targetId;
    this._canvas = document.getElementById(this._targetId) as HTMLCanvasElement;
    if (!this._canvas.getContext("2d")) throw new Error("Internal Error");
    this._context = this._canvas.getContext("2d") as CanvasRenderingContext2D;
    this._width = this._canvas.width;
    this._height = this._canvas.height;

    //axes config
    this._axesRatio = 10;
    this._verticalMargins = (this._height * this._axesRatio) / 100;
    this._horizontalMargins = (this._width * this._axesRatio) / 100;
    this._axesWidth = this._width - 2 * this._horizontalMargins;
    this._axesHeight = this._height - 2 * this._verticalMargins;
    this._verticalUpperBound = Math.ceil(this._higherYvalue / 10) * 10;
    this._verticalLowerBound = Math.floor(this._lowerYvalue / 10) * 10;

    this._horizontalUpperBound = Math.ceil(this._higherXvalue / 10) * 10; 
    this._horizontalLowerBound = Math.floor(this._lowerXvalue/10)*10

    //label config
    this._fontRatio = 3;
    this._fontFamily = "Roboto";
    this._fontColor = "#b1b1b1";
    this._fontStyle = "normal";
    this._fontWeight = "300";
    this._verticalFontSize = (this._height * this._fontRatio) / 100;
    this._horizontalFontsize = (this._width * this._fontRatio) / 100;

    //Guidelines Configs
    this._guidelineWidth = 0.5;
    this._guidelineColor = "#e5e6e7";
    console.log(this);
  }
  public BarChart() {
    this._RenderBarChartAxis();
    this._RenderLabels();
  }

  private _RenderBarChartAxis() {
    //draw vertical axis
    this._context.beginPath();
    this._context.strokeStyle = this._axesColor;
    this._context.lineWidth = this._axesLineWidth;
    this._context.moveTo(this._horizontalMargins, this._verticalMargins);
    this._context.lineTo(
      this._horizontalMargins,
      this._height - this._verticalMargins,
    );
    this._context.stroke();
    //draw horizontal axis
    this._context.beginPath();
    this._context.strokeStyle = this._axesColor;
    this._context.lineWidth = this._axesLineWidth;
    this._context.moveTo(
      this._horizontalMargins,
      this._height - this._verticalMargins,
    );
    this._context.lineTo(this._axesWidth, this._height - this._verticalMargins);
    this._context.stroke();
  }

  private _RenderLabels() {
    //vertical labels
    this._context.font = `${this._fontStyle} ${this._fontWeight} ${this._verticalFontSize}px  ${this._fontColor}`;
    this._context.fillStyle = this._fontColor;
    this._context.textAlign = "right";
    let ylabels = this._data.map(
      (e, i) =>
        `${Math.floor(this._verticalUpperBound - i * this._verticalFrequency)}`,
    );
    let verticalLabelX = this._data.map(
      (e) =>
        this._horizontalMargins - this._horizontalMargins / this._axesRatio,
    );
    let verticalLabelY = this._data.map(
      (e, i) =>
        this._verticalMargins +
        (i * this._verticalFrequency * this._axesHeight) /
          this._verticalUpperBound,
    );
    this._data.forEach((e, i) =>
      this._context.fillText(ylabels[i], verticalLabelX[i], verticalLabelY[i]),
    );

    //horizontal labels 
    let xlabels = this._data.map((e, i) => { Math.floor(this._horizontalUpperBound - i * this._horizontalFrequency)})

  }
}

//maintenant j'ai des labeled points
export const ChartData = [
  {
    label: { "x-label": "January" },
    coordinate: { x: 1, y: Math.random() * 100 },
  },
  {
    label: { "x-label": "Febuary" },
    coordinate: { x:2 , y: Math.random() * 100 },
  },
  {
    label: { "x-label": "March" },
    coordinate: { x: 3, y: Math.random() * 100 },
  },
  {
    label: { "x-label": "April" },
    coordinate: { x: 4, y: Math.random() * 100 },
  },
  {
    label: { "x-label": "May" },
    coordinate: { x: 5, y: Math.random() * 100 },
  },
  {
    label: { "x-label": "June" },
    coordinate: { x: 6, y: Math.random() * 100 },
  },
  {
    label: { "x-label": "July" },
    coordinate: { x: 7, y: Math.random() * 100 },
  },
];

//TODO - à l'avenir j'aimerais bien créer un pop-up rouge qui affiche l'erreur
//NOTE - je n'aime pas les try catch j'ai l'impression que que la raison pour laquelle je crash n'est pas explicite
//est ce que je crash parce qu'il n'y a pas d'élément avec l'id `targetId` ou est ce que cet element n'est pas un canvas
// ou est ce que le canvas a eu un soucis d'initialisation  ? Mais je ne sais pas comment faire différemment
