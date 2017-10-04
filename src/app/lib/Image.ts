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
        let l = this.pixels.length - 1;
        for (let i = 0; i < this.pixels.length; i++)
            for (let j = 0; j < this.pixels[i].length; j++) {
                data.data[(i * l + i + j) * 4] = this.pixels[i][j].R;
                data.data[(i * l + i + j) * 4 + 1] = this.pixels[i][j].G;
                data.data[(i * l + i + j) * 4 + 2] = this.pixels[i][j].B;
                data.data[(i * l + i + j) * 4 + 3] = this.pixels[i][j].A;
            }
        return data;
    }
}

export class VisionTestImage extends BaseImage {

    constructor(width: number, height: number) {
        super(width, height);
    }

    drawC(direction: Direction) {
        switch (direction) {
            case 0:
                // -
                for (let i = 0; i < this.pixels.length; i++)
                    for (let j = 0; j < this.pixels[i].length; j++) {
                        if (i > 9 && j > 9 && i < 90 && j < 100)
                            this.pixels[i][j] = new Pixel(0, 0, 0, 0);
                        else
                            this.pixels[i][j] = new Pixel(0, 0, 0, 255);
                    }
                break;
            case 1:
                // -
                for (let i = 0; i < this.pixels.length; i++)
                    for (let j = 0; j < this.pixels[i].length; j++) {
                        if (i > 9 && j > 9 && i < 90 && j < 100)
                            this.pixels[i][j] = new Pixel(0, 0, 0, 0);
                        else
                            this.pixels[i][j] = new Pixel(0, 0, 0, 255);
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
