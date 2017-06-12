import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'snscg-audio-testing-realm',
  templateUrl: './audio-testing-realm.component.html',
  styleUrls: ['./audio-testing-realm.component.scss']
})
export class AudioTestingRealmComponent implements OnInit {

  activeAudioFile: File;
  activeAudioBuffer: ArrayBuffer;

  constructor(private audio: AudioService) { }

  ngOnInit() {
  }

  addFile(e) {
    let file = e.target.files[0] as File;
    this.activeAudioFile = file;
    let reader = new FileReader();
    reader.onload = (loadedFile: any) => {
      this.activeAudioBuffer = loadedFile.target.result as ArrayBuffer;
      this.audio.loadBuffer(this.activeAudioBuffer);
    };
    reader.readAsArrayBuffer(file);
  }

  play() {
    if (this.activeAudioBuffer)
      this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.stop();
  }

  setVolume(value: number) {
    this.audio.volume = value;
  }

}
