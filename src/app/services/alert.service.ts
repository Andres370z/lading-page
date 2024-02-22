import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private jsonConfig: any = {
    title: '',
    text: '',
    icon: '',
    confirmButtonText: 'Aceptar'
  }
  constructor() { }
  success(msj: string, title: string) {
    this.jsonConfig.text = title;
    this.jsonConfig.title = msj;
    this.jsonConfig.icon = 'success';
    Swal.fire(this.jsonConfig);
  }
  error(msj: string, title: string) {
    this.jsonConfig.text = title;
    this.jsonConfig.title = msj;
    this.jsonConfig.icon = 'error';
    Swal.fire(this.jsonConfig);
  }
  convertTextDecrypt(text:string) {   
    return window.atob(text)
  } 

  messagefin() {
    Swal.close();
  }
  loading() {
    Swal.fire({
      title: '',
      imageUrl: 'https://systemresolution.com/assets/img/Cube-1s-200px.gif',
      imageAlt: 'Custom image',
      showConfirmButton: false,
      toast: true
    });
  }
  modalFull(msj: string, title: string){
    Swal.fire({
      title: '<strong></strong>',
      icon: 'info',
      html:
        'You can use <b>bold text</b>, ' +
        '<a href="//sweetalert2.github.io">links</a> ' +
        'and other HTML tags',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down'
    })
  }


}
