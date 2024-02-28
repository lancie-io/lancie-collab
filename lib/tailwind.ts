import colors from '@/resolveConfig';

type ColorShades = {
  [key: string]: {
    [key: string]: string;
  };
};

type ColorName = keyof typeof tailwindColorNames;
type ColorType = 'all' | 'colorful' | 'non-colors';
type Mode = 'dark' | 'light';
type ShadeValue =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950';

type TailwindOptions = {
  include?: ColorName[];
  range?: { min?: number; max?: number };
  exclude?: ColorName[];
  colorType?: ColorType;
  mode?: Mode;
};

class TailwindColor {
  private include: ColorName[];
  private range: { min: number; max: number };
  private colorType: 'all' | 'colorful' | 'non-colors';
  private exclude: ColorName[];
  private randomColor: string;
  private mode: Mode;

  constructor(options?: TailwindOptions) {
    const {
      include = Object.values(tailwindColorNames) as ColorName[],
      range = { min: 50, max: 950 },
      exclude = [],
      colorType = 'all',
      mode = 'dark',
    } = options || {};
    this.include = include;
    this.range = {
      min: range.min || 50,
      max: range.max || 950,
    };
    this.colorType = colorType;
    this.exclude = exclude;
    this.randomColor = this.pick();
    this.mode = mode;
  }

  public pick(): string {
    let colorKeys = Object.keys(tailwindColorNames);
    colorKeys = Object.keys(tailwindColorNames).filter(
      (color) => !this.exclude.includes(color as ColorName)
    );
    if (this.colorType === 'colorful') {
      colorKeys = colorKeys.filter((color) => !nonColors.includes(color));
    } else if (this.colorType === 'non-colors') {
      colorKeys = colorKeys.filter((color) => nonColors.includes(color));
    }
    const randomColorKey =
      colorKeys[Math.floor(Math.random() * colorKeys.length)];
    let shadeValues: number[] = shades;
    if (this.mode === 'dark') {
      shadeValues = shadeValues.filter((shade) => shade > 400);
    } else if (this.mode === 'light') {
      shadeValues = shadeValues.filter((shade) => shade <= 400);
    }
    shadeValues = shadeValues.filter(
      (shade) => shade >= this.range.min && shade <= this.range.max
    );
    const randomShadeValue: number =
      shadeValues[Math.floor(Math.random() * shadeValues.length)];
    return fullColors[randomColorKey][randomShadeValue];
  }
}

const nonColors = ['slate', 'gray', 'zinc', 'neutral', 'stone'];

const fullColors = colors;

const shades: number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const tailwindColorNames = {
  slate: 'slate',
  gray: 'gray',
  zinc: 'zinc',
  neutral: 'neutral',
  stone: 'stone',
  red: 'red',
  orange: 'orange',
  amber: 'amber',
  yellow: 'yellow',
  lime: 'lime',
  green: 'green',
  emerald: 'emerald',
  teal: 'teal',
  cyan: 'cyan',
  sky: 'sky',
  blue: 'blue',
  indigo: 'indigo',
  violet: 'violet',
  purple: 'purple',
  fuchsia: 'fuchsia',
  pink: 'pink',
  rose: 'rose',
};

export default TailwindColor;
