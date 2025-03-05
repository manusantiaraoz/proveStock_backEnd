
import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

const styles: StyleDictionary = {
  header: {
    fontSize: 14,
    font: 'Roboto',
    bold: true,
    color: '#521651',
  },
  subHeader: {
    fontSize: 12,
    font: 'Roboto',
    bold: true,
    color: '#130c11',
  },
  productDetail: {
    fontSize: 12,
    font: 'Roboto',
    color: '#0a0a0a',
  },
};

interface TableContent {
  widths: string[];
  body: any[][];
}

interface ContentItem {
  text?: string;
  style?: string;
  marginBottom?: number;
  table?: TableContent;
  alignment?: string;
  marginTop?: number;
  layout?: any; // Añadimos layout como propiedad opcional
}

export const budgetPrinter = async (presupuesto: any): Promise<TDocumentDefinitions> => {
  const { detail, totalAmount, createdAt } = presupuesto;
  const { name: userName, phone: userPhone, address: userAddress, email: userEmail } = presupuesto.user;
  const { name: clientName, lastName: clientLastName, address: clientAddress, dni: clientDni, email: clientEmail } = presupuesto.client;
  const lineaProduct = presupuesto.productLine;
  const fecha = `${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`

  const tableBody = [
    [
      { text: 'Producto', style: 'productDetail' },
      { text: 'Cantidad', style: 'productDetail' },
      { text: 'Precio Unitario', style: 'productDetail' },
      { text: 'total', style: 'productDetail' },
    ],
  ];
  for (const elem of lineaProduct) {
    const quantity = elem.quantity;
    const unitPrice = elem.unit_price;
    const totalPrice = elem.total_price;
    const productName = elem.product.name;


    tableBody.push([
      { text: `${productName}`, style: 'productDetail' },
      { text: `${quantity}`, style: 'productDetail' },
      { text: `${unitPrice}`, style: 'productDetail' },
      { text: `${totalPrice}`, style: 'productDetail' },
    ]);
  }
  const contenido: ContentItem[] = [
    {
      table: {
        widths: ['*', '*'],
        body: [
          [
            {
              text: `${userName}\n ${userAddress}\n consultas:\n email: ${userEmail}\n cel: ${userPhone}`,
              style: 'header',
              alignment: 'left',
            },
            {
              text: `Sr/Sra:\n ${clientName} ${clientLastName}\nDNI: ${clientDni} \n direccion: ${clientAddress}\n email: ${clientEmail}`,
              style: 'subHeader',
              alignment: 'left',
            },
          ],
        ],
      },
     
    },
    {
      text: ' detalle:',
      marginTop: 5,
      marginBottom: 10,
    },
    {
      table: {
        widths: ['*', 'auto', 'auto', 'auto'],
        body: tableBody,
      },
      layout: 'lightHorizontalLines', // layout para la primer tabla
    }, 
    {
      text: `total General ${totalAmount}`,
      alignment: 'right',
      marginTop: 10,
      style: 'subHeader',
    },
    {
      text: `observaciones: ${detail} `,
      alignment: 'center',
      marginTop: 4,
      style: 'subHeader',
    },
    {
      text: ` presupuesto sin IVA, valido por 15 dias a partir de ${fecha} `,
      alignment: 'left',
      marginTop: 10,
      style: 'subHeader',
    },
    
  ];

  return {
    defaultStyle: {
      fontSize: 12,
      font: 'Arial',
      characterSpacing: -0.7,
      color: '#43484C',
    },
    pageSize: 'A4',
    pageMargins: [30, 25],
    content: contenido as any,
    styles: styles,
    background:(currentPage, pageSize) => {
      return {
        canvas: [
          {
            type: 'rect',
            x: 30, // Margen izquierdo
            y: 25, // Margen superior
            w: pageSize.width - 60, // Ancho de la página menos los márgenes
            h: pageSize.height - 50, // Alto de la página menos los márgenes
            lineWidth: 1, // Ancho del borde
            lineColor: '#000', // Color del borde (negro en este caso)
          },
        ],
      };
    },
  };
};
