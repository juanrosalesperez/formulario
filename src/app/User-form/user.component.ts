import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { User } from '../model/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  // LA MEJOR MANERA PARA CAMBIAR LOS VALORES DEL INPUT ---- OPCION 2
  @Input() set user(value: User) {
    // SE CREA UNA FUNCION PRIVADA PARA REALIZAR LA ACCION
    this.setUser(value);
  }

  // CREAMOS UN EVENTO
  @Output() guardarClick = new EventEmitter<User>(false);

  userForm: FormGroup;
  closeResult = '';

  // CAMPOS ESPECIALES FORMULARIO
  paises: string[] = [
    'Afganistán',
    'Albania',
    'Alemania',
    'Andorra',
    'Angola',
    'Antigua y Barbuda',
    'Arabia Saudita',
    'Argelia',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaiyán',
    'Bahamas',
    'Bangladés',
    'Barbados',
    'Baréin',
    'Bélgica',
    'Belice',
    'Benín',
    'Bielorrusia',
    'Birmania',
    'Bolivia',
    'Bosnia y Herzegovina',
    'Botsuana',
    'Brasil',
    'Brunéi',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Bután',
    'Cabo Verde',
    'Camboya',
    'Camerún',
    'Canadá',
    'Catar',
    'Chad',
    'Chile',
    'China',
    'Chipre',
    'Ciudad del Vaticano',
    'Colombia',
    'Comoras',
    'Corea del Norte',
    'Corea del Sur',
    'Costa de Marfil',
    'Costa Rica',
    'Croacia',
    'Cuba',
    'Dinamarca',
    'Dominica',
    'Ecuador',
    'Egipto',
    'El Salvador',
    'Emiratos Árabes Unidos',
    'Eritrea',
    'Eslovaquia',
    'Eslovenia',
    'España',
    'Estados Unidos',
    'Estonia',
    'Etiopía',
    'Filipinas',
    'Finlandia',
    'Fiyi',
    'Francia',
    'Gabón',
    'Gambia',
    'Georgia',
    'Ghana',
    'Granada',
    'Grecia',
    'Guatemala',
    'Guyana',
    'Guinea',
    'Guinea ecuatorial',
    'Guinea-Bisáu',
    'Haití',
    'Honduras',
    'Hungría',
    'India',
    'Indonesia',
    'Irak',
    'Irán',
    'Irlanda',
    'Islandia',
    'Islas Marshall',
    'Islas Salomón',
    'Israel',
    'Italia',
    'Jamaica',
    'Japón',
    'Jordania',
    'Kazajistán',
    'Kenia',
    'Kirguistán',
    'Kiribati',
    'Kuwait',
    'Laos',
    'Lesoto',
    'Letonia',
    'Líbano',
    'Liberia',
    'Libia',
    'Liechtenstein',
    'Lituania',
    'Luxemburgo',
    'Madagascar',
    'Malasia',
    'Malaui',
    'Maldivas',
    'Malí',
    'Malta',
    'Marruecos',
    'Mauricio',
    'Mauritania',
    'México',
    'Micronesia',
    'Moldavia',
    'Mónaco',
    'Mongolia',
    'Montenegro',
    'Mozambique',
    'Namibia',
    'Nauru',
    'Nepal',
    'Nicaragua',
    'Níger',
    'Nigeria',
    'Noruega',
    'Nueva Zelanda',
    'Omán',
    'Países Bajos',
    'Pakistán',
    'Palaos',
    'Panamá',
    'Papúa Nueva Guinea',
    'Paraguay',
    'Perú',
    'Polonia',
    'Portugal',
    'Reino Unido',
    'República Centroafricana',
    'República Checa',
    'República de Macedonia',
    'República del Congo',
    'República Democrática del Congo',
    'República Dominicana',
    'República Sudafricana',
    'Ruanda',
    'Rumanía',
    'Rusia',
    'Samoa',
    'San Cristóbal y Nieves',
    'San Marino',
    'San Vicente y las Granadinas',
    'Santa Lucía',
    'Santo Tomé y Príncipe',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leona',
    'Singapur',
    'Siria',
    'Somalia',
    'Sri Lanka',
    'Suazilandia',
    'Sudán',
    'Sudán del Sur',
    'Suecia',
    'Suiza',
    'Surinam',
    'Tailandia',
    'Tanzania',
    'Tayikistán',
    'Timor Oriental',
    'Togo',
    'Tonga',
    'Trinidad y Tobago',
    'Túnez',
    'Turkmenistán',
    'Turquía',
    'Tuvalu',
    'Ucrania',
    'Uganda',
    'Uruguay',
    'Uzbekistán',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Yibuti',
    'Zambia',
    'Zimbabue',
  ];
  default_pais: string = 'España';

  comunidades = [
    'Andalucía',
    'Aragón',
    'Canarias',
    'Cantabria',
    'Castilla y León',
    'Castilla-La Mancha',
    'Cataluña',
    'Ceuta',
    'Comunidad Valenciana',
    'Comunidad de Madrid',
    'Extremadura',
    'Galicia',
    'Islas Baleares',
    'La Rioja',
    'Melilla',
    'Navarra',
    'País Vasco',
    'Principado de Asturias',
    'Región de Murcia',
  ];
  provincias: string[];
  tipoPersona: number;
  extranjero: number;

  constructor(private fb: FormBuilder, private modalService: NgbModal) {
    this.userForm = fb.group({
      // PONEMOS VALIDATORS PARA REQUERIR PARAMETROS
      nombre: [''],
      apellido: [''],
      email: ['', [Validators.required, Validators.email]],
      documento: ['', Validators.required],
      tipo: ['', Validators.required],
      sociedad: [''],
      calle: [''],
      numero: [''],
      planta: [''],
      puerta: [''],
      comunidad: [''],
      provincia: [''],
      pueblo: [''],
      pais: [''],
    });
    this.userForm.controls['pais'].setValue(this.default_pais, {
      onlySelf: true,
    });
    this.userForm.controls['tipo'].setValue;
    this.userForm.controls['comunidad'].setValue;
    this.userForm.controls['provincia'].setValue;
  }

  ngOnInit(): void {}
  guardar() {
    Swal.fire({
      title: 'Usuario!',
      text: 'Has creado un usuario',
      icon: 'success',
      confirmButtonText: 'Cerrar',
    });

    // GUARDAMOS EL VALOR DEL FORMULARIO
    const form = new User(this.userForm.value);

    this.guardarClick.emit(form);
  }

  // FUNCION PRIVADA
  private setUser(value: User) {
    this.userForm.patchValue(value);
  }

  // DESPLEGABLE MODAL
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          this.guardar();
        },
        (reason) => {
          this.closeResult = `Dismissed`;
        }
      );
  }

  // SELECTOR DE TIPO DE PERSONA
  selectTipo(item) {
    if (item == 1) {
      this.tipoPersona = 1;
    }
    if (item == 0) {
      this.tipoPersona = 0;
    }
  }

  // SELECTOR DE COMUNIDAD
  selectComunidad(comunidadId) {
    if (comunidadId == 'Andalucía') {
      this.provincias = [
        'Almería',
        'Cádiz',
        'Córdoba',
        'Granada',
        'Huelva',
        'Jaén',
        'Málaga',
        'Sevilla',
      ];
    }
    if (comunidadId == 'Aragón') {
      this.provincias = ['Huesca', 'Teruel', 'Zaragoza'];
    }
    if (comunidadId == 'Canarias') {
      this.provincias = ['Las Palmas', 'Santa Cruz de Tenerife'];
    }
    if (comunidadId == 'Cantabria') {
      this.provincias = ['Cantabria'];
    }
    if (comunidadId == 'Castilla y León') {
      this.provincias = [
        'Ávila',
        'Burgos',
        'León',
        'Palencia',
        'Salamanca',
        'Segovia',
        'Soria',
        'Valladolid',
        'Zamora',
      ];
    }
    if (comunidadId == 'Castilla-La Mancha') {
      this.provincias = [
        'Albacete',
        'Ciudad Real',
        'Cuenca',
        'Guadalajara',
        'Toledo',
      ];
    }
    if (comunidadId == 'Cataluña') {
      this.provincias = ['Barcelona', 'Girona', 'Lleida', 'Tarragona'];
    }
    if (comunidadId == 'Ceuta') {
      this.provincias = ['Ceuta'];
    }
    if (comunidadId == 'Comunidad Valenciana') {
      this.provincias = ['Alicante', 'Castellón', 'Valencia'];
    }
    if (comunidadId == 'Comunidad de Madrid') {
      this.provincias = ['Madrid'];
    }
    if (comunidadId == 'Extremadura') {
      this.provincias = ['Badajoz', 'Cáceres'];
    }
    if (comunidadId == 'Galicia') {
      this.provincias = ['A Coruña', 'Lugo', 'Ourense', 'Pontevedra'];
    }
    if (comunidadId == 'Islas Baleares') {
      this.provincias = ['Baleares'];
    }
    if (comunidadId == 'La Rioja') {
      this.provincias = ['La Rioja'];
    }
    if (comunidadId == 'Melilla') {
      this.provincias = ['Melilla'];
    }
    if (comunidadId == 'Navarra') {
      this.provincias = ['Navarra'];
    }
    if (comunidadId == 'País Vasco') {
      this.provincias = ['Álava', 'Guipúzcoa', 'Vizcaya'];
    }
    if (comunidadId == 'Principado de Asturias') {
      this.provincias = ['Asturias'];
    }
    if (comunidadId == 'Región de Murcia') {
      this.provincias = ['Murcia'];
    }
  }
}
