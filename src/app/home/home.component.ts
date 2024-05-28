import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import Swiper from 'swiper';
import { base64StringToBlob } from 'blob-util';
import VCard from 'vcard-creator'
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/general/auth.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'loading-page';
  fileName = '';
  public view: boolean = false
  public customerUrl: any;
  public customerDetail: any;
  public myAngularxQrCode: any;
  public qrCodeDownloadLink: SafeUrl = "https://card.systemresolution.com/home/"
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _https: AuthService,
    private alert: AlertService,
    private router: Router
  ) {

    this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
      let token = parametros.get("id");
      if (token != null) {
        this.getCustomerDetail(token)
        console.log(token, 'este es token')
      } else {
        token = "1";
        this.getCustomerDetail(token)
      }
    })
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

  private vCardCreator(item: any) {
    console.log(item)
    this.fileName = item.name + '.vcf'
    const vCard = new VCard();
    vCard
      // Add personal data
      .addName(item.name, item.lastName)
      // Add work data
      .addCompany('Atlantic Rebrokers')
      .addJobtitle(item.name + ' ' + item.jobTitle)
      .addRole(item.jobTitle)
      .addEmail(item.email)
      .addPhoneNumber(item.telephone, 'WORK')
      .addAddress(item.shippingAddress)
      .addURL('https://atlanticrebrokers.com/')
    return vCard.toString()
  }


  private blobable(item: any): Blob {
    const contentType = 'application/pgp-keys';
    const base64 = window.btoa(this.vCardCreator(item));
    return base64StringToBlob(base64, contentType);
  }
  public regularBrowser(): void {
    const blob = this.blobable(this.customerDetail);
    const a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = this.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  getCustomerDetail(item: string) {
    this.alert.loading();
    this._https.getUsers(item).then((resulta: any) => {
      this.customerDetail = resulta
      this.myAngularxQrCode = 'https://card.systemresolution.com/home/' + btoa(this.customerDetail.id);
      this.customerUrl = 'https://card.systemresolution.com/home/' + item;
      this.alert.messagefin();
      console.log('one ', this.customerDetail)
    }).catch((err: any) => {
      console.log(err)
      this.alert.error("Error", "Usuario no existe");
    });
  }

  sendMail() {
    console.log('trabajando')
    const email = this.customerDetail.email
    window.location.href = `mailto:${email}`

  }
  sendWhatsApp() {
    const phone = this.customerDetail.telephone;
    const message = `Buen%20día,%20${this.customerDetail.name}%20estoy%20interesado%20en...`;
    const urlFin = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.location.href = urlFin;
  }



  dowloadImg() {
    this.alert.loading()
    this.showCard();
    html2canvas(this.screen.nativeElement).then(canvas => {
      canvas.toBlob(async blob => {
        if (!blob) {
          console.error('Se daño');
          return;
        }
        // convertir a un blob
        const file = new File([blob], 'card-atlantic.png', { type: 'image/png' });

        // si no soporta el navegador
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: `Hola soy ${this.customerDetail.name}`,
              text: 'Codigo qr',
              files: [file]
            });
            console.log('Ok');
          } catch (error) {
            console.error('se dañó otra vez', error);
          }
        } else {
          console.error('El navegador no soporta');
          this.downloadFile(file);

        }
      }, 'image/png');


    });
    this.hideCard()
    this.alert.messagefin()

  }
  downloadFile(file: File) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  // Método para mostrar la tarjeta
showCard() {
  this.screen.nativeElement.style.display = 'block';
}

// Método para ocultar la tarjeta
hideCard() {
  this.screen.nativeElement.style.display = 'none';
}
}
