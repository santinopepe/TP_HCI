import { reactive } from 'vue';

export const contactStore = reactive({
  contactos: [
    {
      id: 1,
      nombre: 'Laura Martínez',
      cbu: '000002233445566778899',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    {
      id: 2,
      nombre: 'Carlos Pérez',
      cbu: '00000111222333445566',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    },
    {
      id: 3,
      nombre: 'Lucía Torres',
      cbu: '00000998887776665544',
      avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
    },
  ],
  transferencias: [], // Store transfer details
  addContacto(contacto) {
    contacto.id = this.contactos.length + 1;
    this.contactos.push(contacto);
  },
  getContactoById(id) {
    return this.contactos.find((c) => c.id === parseInt(id)) || {};
  },
  addTransferencia(transferencia) {
    transferencia.id = this.transferencias.length + 1; // Simple ID generation
    this.transferencias.push(transferencia);
    return transferencia.id;
  },
  getTransferenciaById(id) {
    return this.transferencias.find((t) => t.id === parseInt(id)) || {};
  },
});