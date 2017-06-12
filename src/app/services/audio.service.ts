import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Util } from '../lib/util';

@Injectable()
export class AudioService {

    private mainSourceEnded = new Subject();
    onMainSourceEnded = this.mainSourceEnded.asObservable();

    private context: AudioContext;
    private mainSource: AudioBufferSourceNode;
    private mainBuffer: AudioBuffer;
    private gain: GainNode;

    private mainStarted = 0;
    private timePlayed = 0;

    get volume() { return this.gain.gain.value; }
    set volume(value: number) { this.gain.gain.value = value; }

    constructor() {
        this.context = new AudioContext();
        this.gain = this.context.createGain();
        this.gain.connect(this.context.destination);
    }

    private initNewMainSource() {
        if (this.mainSource) {
            this.mainSource.stop();
            this.mainSource.disconnect();
            this.mainSource.removeEventListener('ended', this.mainEndedListner);
        }
        this.mainSource = this.context.createBufferSource();
        this.mainSource.connect(this.gain);
        if (!this.mainBuffer) throw new Error('You need to pass a buffer when none is set');
        this.mainSource.buffer = this.mainBuffer;

        this.mainSource.addEventListener('ended', this.mainEndedListner);
    }

    mainEndedListner = () => {
        this.mainSourceEnded.next();
    }

    async loadBuffer(data: ArrayBuffer | string) {
        if (data) {
            if (typeof data === 'string') {
                data = Util.string2ArrayBuffer(data);
            }
            this.mainBuffer = await this.context.decodeAudioData(data);
        }
    }

    async play(data?: ArrayBuffer | string) {
        if (data) await this.loadBuffer(data);
        this.initNewMainSource();
        this.mainSource.start(this.mainStarted = this.context.currentTime, this.timePlayed);
    }

    pause() {
        if (this.mainSource.buffer) {
            this.mainSource.stop();
            this.timePlayed += this.context.currentTime - this.mainStarted;
        }
    }

    stop() {
        if (this.mainSource.buffer) {
            this.mainSource.stop();
            this.mainStarted = 0;
        }
    }

}
