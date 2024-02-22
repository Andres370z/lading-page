import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpsService } from '../https.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private registeresquest: HttpsService,
  ) { }
  getUsers(inform:string){
    return  this.registeresquest.GET(`configuracion/usuarios/token/${inform}`)
  }
}
