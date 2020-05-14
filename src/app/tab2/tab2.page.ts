import { Component, OnInit} from '@angular/core';
import { PedidoService } from '../service/pedido.service';
import { NavController, Platform } from '@ionic/angular';

//pdfmake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  pedidos: any[] = [];
  pdfObj = null;
  constructor(
    private service: PedidoService,
    public navCtrl: NavController,
    public plt: Platform,
    public file: File,
    public fileOpener: FileOpener
  ) {}

  ngOnInit(): void {
    this.pedidos = this.service.get();
  }

  deletePed(item: any): void {
    this.service.delete(item);
  }

  createPdf() {
    function buildTableBody(data: any, colums: any) {
      let body: any[] = [];
      body.push(colums);
      data.forEach((row) => {
        let dataRow: any[] = [];
        colums.forEach((column) => {
          dataRow.push(row[column].toString());
        });
        body.push(dataRow);
      });
      return body;
    }
    const docDefinition = {
      content: [
        {text: 'Lista de Pedidos', style: 'header'},
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: [ '*', '*', '*', '*', '*'],
            body: buildTableBody(this.pedidos, ['catalogo', 'pagina', 'codigo', 'color', 'talla'])
          }
        }
      ]
    };
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    this.createPdf();
    if (this.plt.is('capacitor')) {
      this.pdfObj.getBuffer((buffer) => {
        const blob = new Blob([buffer], {type: 'application/pdf'});
        this.file.writeFile(this.file.externalDataDirectory, 'Pedido.pdf', blob, {replace: true}).then(fileEntry => {
          this.fileOpener.open(this.file.externalDataDirectory + 'Pedido.pdf', 'application/pdf');
        });
      });
    } else {
      this.pdfObj.download();
    }
  }

}
