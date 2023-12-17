import { Inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class StreamingService {
  constructor(private socket: Socket) {}

  stream(localStream: MediaStream) {
    this.socket.emit('start-stream', { type: 'offer', data: localStream });
  }
}
