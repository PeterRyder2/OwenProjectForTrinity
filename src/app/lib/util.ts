
export class Util {
    static string2ArrayBuffer(str: string) {
        let view = new Uint8Array(str.length);
        for (var i = 0; i < str.length; i++) {
            view[i] = str.charCodeAt(i);
        }
        return view.buffer;
    }
}