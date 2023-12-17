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

  private captureService = inject(CaptureService);

  async ngAfterViewInit() {
    await this.captureService.startCamera();
    this.videoElement.nativeElement.srcObject =
      this.captureService.getLocalStream();
    this.videoElement.nativeElement.onloadedmetadata = () => {
      this.videoElement.nativeElement.play();
    };
  }
}
