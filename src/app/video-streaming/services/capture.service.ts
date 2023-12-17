import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CaptureService {
  private localStream!: MediaStream;

  async startCamera() {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  }

  getLocalStream() {
    return this.localStream;
  }
}
