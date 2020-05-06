export class User {
  nombre: string;
  apellido: string;
  email: string;
  documento: string;
  tipo: string;
  sociedad: string;
  calle: string;
  numero: number;
  planta: number;
  puerta: string;
  comunidad: string;
  provincia: string;
  pueblo: string;
  pais: string;

  constructor(item?: any) {
    this.nombre = item?.nombre ? item.nombre : '';
    this.apellido = item?.apellido ? item.apellido : '';
    this.email = item?.email ? item.email : '';
    this.documento = item?.documento ? item.documento : '';
    this.tipo = item?.tipo ? item.tipo : '';
    this.sociedad = item?.sociedad ? item.sociedad : '';
    this.calle = item?.calle ? item.calle : '';
    this.numero = item?.numero ? item.numero : '';
    this.planta = item?.planta ? item.planta : '';
    this.puerta = item?.puerta ? item.puerta : '';
    this.comunidad = item?.comunidad ? item.comunidad : '';
    this.provincia = item?.provincia ? item.provincia : '';
    this.pueblo = item?.pueblo ? item.pueblo : '';
    this.pais = item?.pais ? item.pais : '';
  }
}
