import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CaptureService {
  private localStream: MediaStream | null = null;

  async startLocalStream() {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  }

  async startCamera(video: HTMLVideoElement) {
    await this.startLocalStream();
    video.srcObject = this.localStream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }

  stopCamera(video: HTMLVideoElement) {
    if (!this.localStream) {
      return;
    }
    const tracks = this.localStream?.getTracks();
    tracks?.forEach((track) => {
      track.stop();
    });
    video.srcObject = null;
    this.localStream = null;
  }

  getLocalStream() {
    return this.localStream;
  }
}
