export class Util {
    static string2ArrayBuffer(str: string) {
        let view = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
            view[i] = str.charCodeAt(i);
        }
        return view.buffer as ArrayBuffer;
    }

    static deepCloneObject<T extends any>(from: T): T {
        if (from == null || typeof from != 'object') return from;
        if (from.constructor != Object && from.constructor != Array) return from;
        if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
            from.constructor == String || from.constructor == Number || from.constructor == Boolean)
            return new from.constructor(from);

        let to = new from.constructor();

        // tslint:disable-next-line:forin
        for (let name in from) {
            to[name] = typeof to[name] == 'undefined' ? this.deepCloneObject(from[name]) : to[name];
        }

        return to;
    }

    static extend(from, to) {
        if (from == null || typeof from != 'object') return from;
        if (from.constructor != Object && from.constructor != Array) return from;
        if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
            from.constructor == String || from.constructor == Number || from.constructor == Boolean)
            return new from.constructor(from);

        to = to || new from.constructor();

        // tslint:disable-next-line:forin
        for (let name in from) {
            to[name] = typeof to[name] == 'undefined' ? this.deepCloneObject(from[name]) : to[name];
        }

        return to;
    }

    static generateUUID() {
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === 'function') {
            d += performance.now();
        }
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            // tslint:disable-next-line:no-bitwise
            return (c == 'x' ? r : (r & 3 | 8)).toString(16);
        });
        return uuid;
    }
}

export class Assert {
    static noString(value: string, errorMsg) {
        if (typeof value !== 'string')
            throw new Error('StringExpectedError: ' + errorMsg)
    }
    static noNumber(value: number, errorMsg) {
        if (typeof value !== 'number')
            throw new Error('NumberExpectedError: ' + errorMsg)
    }
    static noBoolean(value: boolean, errorMsg) {
        if (typeof value !== 'boolean')
            throw new Error('BooleanExpectedError: ' + errorMsg)
    }
    static noObject(value: Object, errorMsg) {
        if (typeof value !== 'object')
            throw new Error('ObjectExpectedError: ' + errorMsg)
        if (Array.isArray(value))
            throw new Error('ObjectAndNotArrayObjectExpectedError: ' + errorMsg)
    }
    static noArray(value: Array<any>, errorMsg) {
        if (!Array.isArray(value))
            throw new Error('ArrayExpectedError: ' + errorMsg)
    }
}

declare global {
    interface Array<T> {
        countOf(predicate: (this: void, value: T, index: number, obj: Array<T>) => boolean): number;
    }
}

Array.prototype.countOf = function <T>(predicate: (this: void, value: T, index: number, obj: Array<T>) => boolean) {
    let count = 0;
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i, this))
            count++;
    }
    return count;
}
