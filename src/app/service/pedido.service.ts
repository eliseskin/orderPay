import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  pedidos: any[] = [];

  constructor() { }

  removeItemFromArr( arr: any, item: any ) {
    const i = arr.indexOf( item );
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
  }

  get(): any {
    return this.pedidos;
  }

  save(pedido: any) {
    this.pedidos.push(pedido);
  }

  delete(item: any) {
    this.removeItemFromArr(this.pedidos, item);
    return this.pedidos;
  }

}
