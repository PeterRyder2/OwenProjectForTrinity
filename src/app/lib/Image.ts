export class BaseImage {

    pixels: Pixel[][];

    constructor(width: number, height: number) {
        this.pixels = [];
        for (let i = 0; i < height; i++) {
            this.pixels[i] = [];
            for (let j = 0; j < width; j++) {
                this.pixels[i][j] = new Pixel(50, 178, 50, 55);
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
    constructor(width: number, height: number, size = 0.5) {
        super(width, height);
        this.drawCard(size);
    }

    drawCard(size: number) {
        let offset = Math.round((this.pixels[0].length - this.pixels[0].length * size) / 2);
        console.log(offset, this.pixels[0].length - offset * 2)
        for (let row = Math.round(this.pixels.length / 2); row < this.pixels.length; row++)
            for (let col = offset; col < this.pixels[row].length - offset; col++) {
                this.pixels[row][col] = new Pixel(0, 0, 0, 255);
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
