<template >
  <div>
    <el-dialog
      v-drag="enableDrag"
      :close-on-click-modal="false"
      v-bind="modalConfig"
      v-on="modalEvent"
      :visible.sync="modalConfig.show"
    >
      <div v-loading="loading" :style="{height}">
        <slot name="dialog__content">
          <slot name="dialog__before"></slot>
          <obj-form
            ref="objForm"
            :formData="modalData"
            :formCols="modalCols"
            :formConfig="modalConfig"
          />
          <slot name="dialog__after"></slot>
        </slot>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button
          v-for="item in modalHandles"
          :key="item.prop"
          v-bind="item"
          v-on="item.event"
          :disabled="item.disabled && item.disabled(modalData[item.prop])"
          @click="item.submit ? $refs.objForm.globalVerify(item.handle) : item.handle()"
          >{{ item.label }}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import objForm from "./obj-form.vue";
import directives from './js/directives'
export default {
  directives,
  components: { objForm },
  props: {
    height: {
      type: String,
      default: null,
    },
    /**
     * 是否可推拽
     */
    enableDrag: {
      type: Boolean,
      default: true,
    },
    modalConfig: {
      type: Object,
      default: () => {},
    },
    modalCols: {
      type: Array,
      default: () => [],
    },
    modalData: {
      type: Object,
      default: () => {},
    },
    modalEvent: {
      type: Object,
      default: () => {},
    },
    modalHandles: {
      type: Array,
      default: () => [],
    },
    loading:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    validate(...args){
      return this.$refs.objForm.validate(...args)
    },
    resetFields(...args){
      return this.$refs.objForm.resetFields(...args)
    },
    clearValidate(...args){
      return this.$refs.objForm.clearValidate(...args)
    },
    validateField(...args){
      return this.$refs.objForm.validateField(...args)
    }
  }
};
</script>
<style >
</style>