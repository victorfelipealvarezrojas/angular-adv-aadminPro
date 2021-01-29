import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //variable para identificar si el formulario se envio o no
  public auth2: any;

  //creo mi formilario y para ello necesito usar FormBuilder
  public loginForm: FormGroup = this.formBuilder.group({
    email: [localStorage.getItem('user-name') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    recuerdame: [false]
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private NgZone: NgZone//me perfite trabajar enrutamientos con elementos que no eprtenecen a angula como lo es GoogleSignIn
  ) { }

  ngOnInit(): void {
    //para poder visualizar el login de google necesito ejecutar este metodo
    this.renderButton();
  }

  logunUsuario() {

    if (this.loginForm.invalid) {
      return;
    };

    //subscripcion(observable) al servicio login
    this.usuarioService.loginUsuario(this.loginForm.value).subscribe(resp => {

      if (this.loginForm.get('recuerdame').value) {
        localStorage.setItem('user-name', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('user-name');
      }

      this.router.navigateByUrl('/');

    }, (err) => {
      Swal.fire({
        title: 'Error!',
        text: err.error.mensaje,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    });
  };

  //metodo render que me permite trabajar con el login de google y es gatiollado desde el ngOnInit
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  };

  //funciones para implementar el login de google
  async startApp() {
      await this.usuarioService.googleInit().then(resultado=>{
        //necesito la instancia de auth2 en attachSignin los cuales estan dentro del servicio usuarioService,
        //en este caso la obtengo del resolve de la promesa googleInit
        //this.auth2 = this.usuarioService.auth2;
        this.auth2 = resultado;
        this.attachSignin(document.getElementById('my-signin2'));
      });
  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token).subscribe(resp =>
          //utilizo ngZone xq este componnete esta fuera de angular y angular pierde el foco en la redireccion
          this.NgZone.run(()=>{
            this.router.navigateByUrl('/')
          })
        );
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  };

}
