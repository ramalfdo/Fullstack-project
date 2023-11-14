import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  listenOrderPlaced(): Observable<string> {
    return this.socket.fromEvent('order-placed');
  }
}



