/*
 * @Author: 陈伟亮 1186723967@qq.com
 * @Date: 2022-07-06 21:09:56
 * @LastEditors: 陈伟亮 1186723967@qq.com
 * @LastEditTime: 2022-07-07 19:02:51
 * @FilePath: \objectStudio\obj-form\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import objForm from './packages/obj-form.vue';
import objModal from './packages/obj-modal.vue'
import filter_rules from './packages/js/validate'
export default {
    install: function (Vue) {
        Vue.component('objModal', objModal);
        Vue.component('objForm', objForm);
        
        Vue.prototype.filter_rules=filter_rules
    }
}