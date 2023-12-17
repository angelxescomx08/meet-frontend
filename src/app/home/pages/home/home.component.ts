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

  public async toggleCapture() {
    if (this.startCapture) {
      this.captureService.stopCamera(this.videoElement.nativeElement);
    } else {
      await this.captureService.startCamera(this.videoElement.nativeElement);
    }
    this.startCapture = !this.startCapture;
  }
}
