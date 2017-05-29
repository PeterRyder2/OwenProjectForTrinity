import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AudioService {

  private mainSourceEnded = new Subject();
  onMainSourceEnded = this.mainSourceEnded.asObservable();

  context: AudioContext;
  mainSource: AudioBufferSourceNode;

  constructor() {
    this.context = new AudioContext();
    this.initMainSource();
  }

  private initMainSource() {
    this.mainSource = this.context.createBufferSource();
    this.mainSource.onended = () => {
      this.mainSourceEnded.next();
      this.initMainSource();
    }
  }

  async play(data: ArrayBuffer | string) {
    if (typeof data === 'string') {
      data = this.str2ab(data);
    }

    let buffer = await this.context.decodeAudioData(data)
    this.mainSource.buffer = buffer;
    this.mainSource.connect(this.context.destination);
    this.mainSource.start(this.context.currentTime);
  }

  stop() {
    if (this.mainSource.buffer)
      this.mainSource.stop();
  }

  str2ab(str: string) {

    let view = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
      view[i] = str.charCodeAt(i);
    }
    return view.buffer;
  }

}
