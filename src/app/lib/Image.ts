export class BaseImage {

    pixels: Pixel[][];

    constructor(width: number, height: number) {
        this.pixels = [];
        for (let i = 0; i < height; i++) {
            this.pixels[i] = [];
            for (let j = 0; j < width; j++) {
                this.pixels[i][j] = new Pixel(0, 0, 0, 0);
            }
        }
    }

    toImageData(): ImageData {
        let data = new ImageData(this.pixels[0].length, this.pixels.length);
        let c = 0;
        for (let i = 0; i < this.pixels.length; i++) {
            let l = this.pixels[i].length * 4;
            for (let j = 0; j < this.pixels[i].length; j++) {
                data.data[i * l + j * 4] = this.pixels[i][j].R;
                data.data[i * l + j * 4 + 1] = this.pixels[i][j].G;
                data.data[i * l + j * 4 + 2] = this.pixels[i][j].B;
                data.data[i * l + j * 4 + 3] = this.pixels[i][j].A;
                c += 4;
            }
        }
        return data;
    }
}

export class VisionCalibrationImage extends BaseImage {
    constructor(width: number, height: number, size = 100) {
        super(width, height);
        this.drawCard(size);
    }

    drawCard(size: number) {
        let radius = Math.round(size * 0.04);
        let offsetCol = Math.round((this.pixels[0].length - size) / 2);
        let offsetRow = Math.round((this.pixels.length - size * (53.98 / 85.6)) / 2);
        for (let row = offsetRow; row < this.pixels.length - offsetRow; row++)
            for (let col = offsetCol; col < this.pixels[row].length - offsetCol; col++) {
                this.pixels[row][col] = new Pixel(30, 30, 30, 255);
            }
        this.drawCircle_lu(offsetCol + radius, offsetRow + radius, radius);
        this.drawCircle_ru(this.pixels[0].length - offsetCol - radius - 1, offsetRow + radius, radius);
        this.drawCircle_rd(this.pixels[0].length - offsetCol - radius - 1, this.pixels.length - offsetRow - radius - 1, radius);
        this.drawCircle_ld(offsetCol + radius, this.pixels.length - offsetRow - radius - 1, radius);
    }

    x(cx, cy, r, i, j) {
        if (
            Math.ceil(Math.sqrt(i * i + j * j)) <= r
        ) this.pixels[cy + i][cx + j] = new Pixel(30, 30, 30, 255);
        else if (
            Math.floor(Math.sqrt(i * i + j * j)) == r
        ) this.pixels[cy + i][cx + j] = new Pixel(30, 30, 30, 255 * (1 - (Math.sqrt(i * i + j * j) - r)));
        else
            this.pixels[cy + i][cx + j] = new Pixel(0, 0, 0, 0);
    }

    drawCircle_ru(cx, cy, r) {
        for (let i = -r; i <= 0; i += 1) {
            for (let j = 0; j <= r; j += 1) {
                this.x(cx, cy, r, i, j);
            }
        }
    }

    drawCircle_rd(cx, cy, r) {
        for (let i = 0; i <= r; i += 1) {
            for (let j = 0; j <= r; j += 1) {
                this.x(cx, cy, r, i, j);
            }
        }
    }

    drawCircle_ld(cx, cy, r) {
        for (let i = 0; i <= r; i += 1) {
            for (let j = -r; j <= 0; j += 1) {
                this.x(cx, cy, r, i, j);
            }
        }
    }

    drawCircle_lu(cx, cy, r) {
        for (let i = -r; i <= 0; i += 1) {
            for (let j = -r; j <= 0; j += 1) {
                this.x(cx, cy, r, i, j);
            }
        }
    }
}

export class VisionTestImage extends BaseImage {

    puxel: number;

    constructor(puxel: number) {
        super(puxel * 5, puxel * 5);
        this.puxel = puxel;
    }

    drawC(direction: Direction) {
        for (let row = 0; row < this.pixels.length; row++)
            for (let col = 0; col < this.pixels[row].length; col++) {
                if (row + 1 > this.puxel && row < this.pixels.length - this.puxel && col + 1 > this.puxel && col < this.pixels[0].length - this.puxel)
                    this.pixels[row][col] = new Pixel(0, 0, 0, 0);
                else
                    this.pixels[row][col] = new Pixel(0, 0, 0, 255);
            }
        switch (direction) {
            case Direction.top:
                // -
                for (let row = 0; row < this.puxel; row++)
                    for (let col = this.puxel * 2; col < this.puxel * 3; col++) {
                        this.pixels[row][col] = new Pixel(0, 0, 0, 0);
                    }
                break;
            case Direction.bottom:
                // -
                for (let row = this.puxel * 4; row < this.puxel * 5; row++)
                    for (let col = this.puxel * 2; col < this.puxel * 3; col++) {
                        this.pixels[row][col] = new Pixel(0, 0, 0, 0);
                    }
                break;
            case Direction.left:
                // -
                for (let row = this.puxel * 2; row < this.puxel * 3; row++)
                    for (let col = 0; col < this.puxel; col++) {
                        this.pixels[row][col] = new Pixel(0, 0, 0, 0);
                    }
                break;
            case Direction.right:
                // -
                for (let row = this.puxel * 2; row < this.puxel * 3; row++)
                    for (let col = this.puxel * 4; col < this.puxel * 5; col++) {
                        this.pixels[row][col] = new Pixel(0, 0, 0, 0);
                    }
                break;
            default:
                break;
        }
    }
}

export function makeCanvasHighRes(c: HTMLCanvasElement) {
    let ctx = c.getContext('2d');
    // finally query the various pixel ratios
    let devicePixelRatio = window.devicePixelRatio || 1;
    let backingStoreRatio = (ctx as any).webkitBackingStorePixelRatio ||
      (ctx as any).mozBackingStorePixelRatio ||
      (ctx as any).msBackingStorePixelRatio ||
      (ctx as any).oBackingStorePixelRatio ||
      (ctx as any).backingStorePixelRatio || 1;
    let ratio = devicePixelRatio / backingStoreRatio;
    // upscale canvas if the two ratios don't match
    if (devicePixelRatio !== backingStoreRatio) {

      let oldWidth = c.width;
      let oldHeight = c.height;
      c.width = Math.round(oldWidth * ratio);
      c.height = Math.round(oldHeight * ratio);
      c.style.width = oldWidth + 'px';
      c.style.height = oldHeight + 'px';
      // now scale the context to counter
      // the fact that we've manually scaled
      // our canvas element
      ctx.scale(ratio, ratio);
    }
  }

export enum Direction {
    top,
    right,
    bottom,
    left
}

export class Pixel {
    R = 0;
    G = 0;
    B = 0;
    A = 0;
    constructor(r: number, g: number, b: number, a: number) {
        this.R = r;
        this.G = g;
        this.B = b;
        this.A = a;
    }
}
