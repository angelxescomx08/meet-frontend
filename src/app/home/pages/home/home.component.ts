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
import { StreamingService } from '../../../video-streaming/services/streaming.service';

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
  private streamingService = inject(StreamingService);

  async ngAfterViewInit() {}

  async toggleCapture() {
    this.startCapture = !this.startCapture;
    if (this.startCapture) {
      this.captureService.stopCamera(this.videoElement.nativeElement);
      this.streamingService.stopStream();
    } else {
      await this.captureService.startCamera(this.videoElement.nativeElement);
      this.streamingService.stream(this.captureService.getLocalStream()!);
    }
  }
}
