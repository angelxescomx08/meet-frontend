import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CaptureService } from '../../../video-streaming/services/capture.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  public startCapture: boolean = false;
  private captureService = inject(CaptureService);

  async ngAfterViewInit() {}

  async startCamera() {
    await this.captureService.startCamera();
    this.videoElement.nativeElement.srcObject =
      this.captureService.getLocalStream();
    this.videoElement.nativeElement.onloadedmetadata = () => {
      this.videoElement.nativeElement.play();
    };
  }

  stopCamera() {
    if (!this.captureService.getLocalStream()) {
      return;
    }
    const tracks = this.captureService.getLocalStream()?.getTracks();
    tracks?.forEach((track) => {
      track.stop();
    });
    this.videoElement.nativeElement.srcObject = null;
    this.captureService.getLocalStream();
  }

  public async toggleCapture() {
    if (this.startCapture) {
      this.stopCamera();
    } else {
      await this.startCamera();
    }
    this.startCapture = !this.startCapture;
  }
}
