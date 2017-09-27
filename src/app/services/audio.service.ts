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

    private _isPlaying = false;
    get isPlaying() { return this._isPlaying; }

    private _volume = 1;
    get volume() { return this.volume; }
    set volume(value: number) { this._volume = this.gain.gain.value = value; }

    private _muted = false;
    get muted() {
        return this._muted;
    };

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
        this._isPlaying = false;
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
        this._isPlaying = true;
    }

    pause() {
        if (this.mainSource.buffer) {
            this.mainSource.stop();
            this._isPlaying = false;
            this.timePlayed += this.context.currentTime - this.mainStarted;
        }
    }

    stop() {
        if (this.mainSource.buffer) {
            this.mainSource.stop();
            this._isPlaying = false;
            this.mainStarted = 0;
        }
    }

    toggleMute() {
        this._muted = !this._muted;
        if (this._muted)
            this.gain.gain.value = 0;
        else
            this.volume = this._volume;
        return this._muted;
    }

}
