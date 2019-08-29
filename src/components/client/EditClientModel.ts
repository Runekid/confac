import { EditClientModel } from './ClientModels';
import { EditConfigModel } from "../config/EditConfigModel";
import { getNumeric } from '../util';

export function getNewClient(config: EditConfigModel): EditClientModel {
  return {
    _id: '',
    slug: '',
    active: true,
    name: '',
    address: '',
    city: '',
    telephone: '',
    btw: '',
    invoiceFileName: '{date:YYYY-MM} {nr:4} - {clientName}',
    rate: {
      type: config.defaultInvoiceLineType,
      hoursInDay: 8,
      value: 0,
      description: '',
    },
    attachments: [],
    extraFields: config.defaultExtraClientFields.slice(),
    defaultExtraInvoiceFields: config.defaultExtraClientInvoiceFields.slice(),
    notes: '',
    defaultInvoiceDateStrategy: config.defaultInvoiceDateStrategy,
  };
}


export function searchClientFor(client: EditClientModel, input: string): boolean {
  const text = input.toLowerCase().trim();
  if ((`${client.name} ${client.address} ${client.city}`).toLowerCase().includes(text)) {
    return true;
  }

  const numericText = getNumeric(text);
  if (numericText) {
    const numericBtw = getNumeric(client.btw);
    const numericTelephone = getNumeric(client.telephone);
    if (numericText === numericBtw || numericText === numericTelephone) {
      return true;
    }
  }

  return false;
}


// Used by the ClientModal
export const requiredClientProperties = [
  {key: 'name', cols: 8},
  {key: 'btw'},
  {key: 'address'},
  {key: 'city'},
  {key: 'telephone'},
  {forceRow: true},
  {key: 'contact', cols: 6},
  {key: 'contactEmail', cols: 6},
];

export const defaultClientProperties = [{
  key: 'name',
}, {
  key: 'slug',
  updateOnly: true,
}, {
  key: 'btw',
}, {
  key: 'address',
}, {
  key: 'city',
}, {
  key: 'telephone',
}, {
  key: 'contact',
}, {
  key: 'contactEmail',
},];
