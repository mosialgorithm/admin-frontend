import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// =============================================================
// import "../plugins/bootstrap/css/bootstrap.min.css"
import "../plugins/font-awesome/css/font-awesome.min.css"
import "../dist/css/adminlte.min.css"
import "../plugins/iCheck/flat/blue.css"
import "../plugins/morris/morris.css"
// import "../plugins/jvectormap/jquery-jvectormap-1.2.2.css"
import "../plugins/datepicker/datepicker3.css"
import "../plugins/daterangepicker/daterangepicker-bs3.css"
import "../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css"
import "../dist/css/bootstrap-rtl.min.css"
import "../dist/css/google-font.css"
import "../dist/css/custom-style.css"
// --------------------------------------------------------------------
import "../plugins/jquery/jquery.min.js"
// import "../plugins/bootstrap/js/bootstrap.bundle.min.js"
// import "../plugins/morris/morris.min.js"
// import "../plugins/sparkline/jquery.sparkline.min.js"
// import "../plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"
// import "../plugins/jvectormap/jquery-jvectormap-world-mill-en.js"
// import "../plugins/knob/jquery.knob.js"
// import "../plugins/daterangepicker/daterangepicker.js"
// import "../plugins/datepicker/bootstrap-datepicker.js"
// import "../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"
// import "../plugins/slimScroll/jquery.slimscroll.min.js"
import "../plugins/fastclick/fastclick.js"
// import "../dist/js/adminlte.js"
// import "../dist/js/pages/dashboard.js"
// import "../dist/js/demo.js"


// ================= Sweet Alert ========================
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
};
// =======================================================

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// ===================== Image Uploading ===================================
// =========================================================================

createApp(App).use(store).use(router)
.use(VueSweetalert2, options)
.component('QuillEditor', QuillEditor)
.mount('#app')
