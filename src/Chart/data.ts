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
  private _context: CanvasRenderingContext2D
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
  private _axesColor: string = "#b1b1b1";
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

  private _axesLineWidth: number = 1;
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

    if(!data.length) throw Error('Invalid data provided')
 
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
    this._horizontalFontsize = this._higherXvalue / this._data.length;


    this._targetId = targetId;
    this._canvas = document.getElementById(this._targetId) as HTMLCanvasElement;
    if(!this._canvas.getContext('2d')) throw new Error('Internal Error')
    this._context = this._canvas.getContext('2d') as CanvasRenderingContext2D;
    this._width = this._canvas.clientWidth;
    this._height = this._canvas.clientHeight;

    //axes config
    this._axesRatio = 3;
    this._verticalMargins = (this._width * this._axesRatio) / 100;
    this._horizontalMargins = (this._width * this._axesRatio) / 100;
    this._axesWidth = this._width - 2 * this._horizontalMargins;
    this._axesHeight = this._height - 2 * this._verticalMargins;

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
  }
  public BarChart() {
    console.log(this);

    //draw vertical axis 
    this._context.beginPath()
    this._context.strokeStyle = this._axesColor;
    this._context.lineWidth = this._axesLineWidth
    this._context.moveTo(this._horizontalMargins, this._verticalMargins)
    this._context.lineTo(this._horizontalMargins, this._axesHeight)
    this._context.stroke()
    //draw horizontal axis


  }
}

//maintenant j'ai des labeled points
export const ChartData = [
  {
    label: { "x-label": "January", "y-label": "" },
    coordinate: { x: Math.random(), y: Math.random() },
  },
  {
    label: { "x-label": "Febuary", "y-label": "" },
    coordinate: { x: Math.random(), y: Math.random() },
  },
  {
    label: { "x-label": "March", "y-label": "" },
    coordinate: { x: Math.random(), y: Math.random() },
  },
  {
    label: { "x-label": "April", "y-label": "" },
    coordinate: { x: Math.random(), y: Math.random() },
  },
  {
    label: { "x-label": "May", "y-label": "" },
    coordinate: { x: Math.random(), y: Math.random() },
  },
  {
    label: { "x-label": "June", "y-label": "" },
    coordinate: { x: Math.random(), y: Math.random() },
  },
  {
    label: { "x-label": "July", "y-label": "" },
    coordinate: { x: Math.random(), y: Math.random() },
  },
];

//TODO - à l'avenir j'aimerais bien créer un pop-up rouge qui affiche l'erreur
//NOTE - je n'aime pas les try catch j'ai l'impression que que la raison pour laquelle je crash n'est pas explicite
//est ce que je crash parce qu'il n'y a pas d'élément avec l'id `targetId` ou est ce que cet element n'est pas un canvas
// ou est ce que le canvas a eu un soucis d'initialisation  ? Mais je ne sais pas comment faire différemment
