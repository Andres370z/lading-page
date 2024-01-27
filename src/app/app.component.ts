import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import Swiper from 'swiper';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'loading-page';
  public myAngularxQrCode: any;
  public qrCodeDownloadLink: SafeUrl = "https://atlanticrebrokers.com/"
  constructor() {
    // assign a value
    this.myAngularxQrCode = 'https://atlanticrebrokers.com/';
  }
  ngOnInit(): void {
    const mySwiper = new Swiper('.swiper-container', {
      // opciones de configuración de Swiper
      slidesPerView: 5,
      spaceBetween: 10,
    })
  }
  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
  enviarWhatsapp(): void {
    // Número de teléfono y mensaje
    const phoneNumber = '+573106993585'; 
    const message = 'Hola, ¿cómo estás, me gustaria mas información sobre tus productos?';

    
    const whatsappLink = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    
    window.location.href = whatsappLink;
  }
  
}

