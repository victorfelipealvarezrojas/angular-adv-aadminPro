import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  //variable para identificar si el formulario se envio o no
  public formSubmite = false;
  //creo mi formilario y para ello necesito usar FormBuilder
  public registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    passwordConf: ['', [Validators.required, Validators.minLength(3)]],
    terminos: [false, [Validators.required]]
  }, {
    //validador que retorna una funcion, las refwerencias a validaciones retornan una funcion
    validators: this.passwordIguales('password', 'passwordConf')
  });

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  crearUsuario() {
    this.formSubmite = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(resp => {
      this.router.navigateByUrl('/');
    }, (err) => {
      Swal.fire({
        title: 'Error!',
        text: err.error.mensaje,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    });
  }

  campoNoValido(campo: string): boolean {
    //obtengo el estado del campo segun la validacion requerida dentro de registerForm 
    if (this.registerForm.get(campo).invalid && this.formSubmite) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmite;
  }

  contrasenasValidas() {
    return (this.registerForm.get('password').value != this.registerForm.get('passwordConf').value) && this.formSubmite;
  }

  //esta funcion tiene que retornan una funcion y x eso el return es un arrow function
  passwordIguales(pass: string, conf: string) {
    //la funcion se dispara con el FormGroup que me da acceso a ,los controples del formulario
    //tambien podria ser con el this.registerForm.get('password')
    return (formgroup: FormGroup) => {
      const password = formgroup.get(pass);
      const confirm = formgroup.get(conf);
      if (password.value === confirm.value) {
        password.setErrors(null);
      } else {
        password.setErrors({ noEsIgual: true });
      }
    }
  }

}
