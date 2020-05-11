import { Component } from '@angular/core';
import { PedidoService } from '../service/pedido.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  pedido: any = {};

  constructor(private service: PedidoService) {

  }

  savePed(): void {
    this.service.save(this.pedido);
    this.pedido = {};
  }

}
