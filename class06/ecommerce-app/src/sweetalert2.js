// src/sweetalert2.js
import Swal from 'sweetalert2';

export default {
  install: (app, options) => {
    app.config.globalProperties.$swal = Swal;
  }
};
