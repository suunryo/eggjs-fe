// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './main.css'
import axios from 'Axios'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(iView)

Vue.config.productionTip = false

Vue.prototype.axios = function(arg) {

    let url = arg.url;
    let type = arg.type || 'get';
    let data = arg.data || {};

    let config = {};
    config.url = url;
    config.method = type;
    if(type == 'post'){
        config.data = data;
    }else{
        config.params = data
    }
    config.headers = {
        'x-csrf-token': this.$cookies.get('csrfToken')
    }

    return new Promise((resolve, reject) => {
        axios(config).then(response => {
            console.log(response.data);
            if (response.data.code == 200) {
                resolve(response.data);
            } else {
                reject(response.data);
            }
        }).catch(error => {
            throw error
        });
    })
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})