import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StreamingService implements OnDestroy {
  private id: string = '';
  private intervalSuscription: Subscription | null = null;
  constructor(private socket: Socket) {
    this.id = crypto.randomUUID();
  }
  ngOnDestroy(): void {
    this.stopStream();
  }

  stream(localStream: MediaStream) {
    this.intervalSuscription = interval(1000).subscribe(() => {
      const tracks = localStream.getTracks();
      this.socket.emit('start-stream', {
        tracks,
        id: this.id,
      });
    });
  }

  stopStream() {
    this.intervalSuscription?.unsubscribe();
  }
}
