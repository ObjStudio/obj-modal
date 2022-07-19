<template>
  <div>
    <el-form
      :ref="formRef"
      :model="formData"
      v-bind="formConfig"
      label-width="100px"
    >
      <el-form-item
        v-for="item in formCols"
        :key="item.prop"
        :rules="filter_rules(item.label, item.rules)"
        :label="buttonType.indexOf(item.type) != -1 ? null : item.label"
        v-bind="item"
      >
        <!-- jsx 返回jsx数据-->
        <render
          v-if="item.type === 'jsx'"
          :render="item.render && item.render()"
        ></render>
        <!-- 自定义label 返回jsx数据-->
        <render
          name="label"
          v-if="item.renderLabel"
          :render="item.renderLabel()"
        ></render>
        <!-- 输入框 -->
        <el-input
          v-if="item.type === 'Input'"
          :style="'width:' + item.width"
          v-model="formData[item.prop]"
          :placeholder="
            item.placeholder != undefined
              ? item.placeholder
              : '请输入' + item.label
          "
          v-bind="item"
          :disabled="item.disabled && item.disabled(formData[item.prop])"
          v-on="item.event"
        ></el-input>
        <!-- textarea -->
        <el-input
          v-if="item.type === 'Textarea'"
          type="textarea"
          :style="{ width: item.width }"
          v-model="formData[item.prop]"
          :placeholder="'请输入' + item.label"
          v-bind="item"
          v-on="item.event"
          :disabled="item.disabled && item.disabled(formData[item.prop])"
        ></el-input>
        <!-- 下拉框 -->
        <el-select
          v-if="item.type === 'Select'"
          v-model="formData[item.prop]"
          :ref="item.ref"
          :style="'width:' + item.width"
          v-bind="item"
          :disabled="item.disabled && item.disabled(formData[item.prop])"
          v-on="item.event"
        >
          <el-option
            v-if="item.default"
            :label="'请选择' + item.label"
            value=""
          ></el-option>
          <el-option
            v-for="op in item.options"
            :label="op.label"
            :value="op.value"
            :key="op.value"
            :disabled="op.disabled && op.disabled(formData[item.prop])"
          ></el-option>
        </el-select>
        <!-- 单选 -->
        <el-radio-group
          v-if="item.type === 'Radio'"
          v-model="formData[item.prop]"
          :style="'width:' + item.width"
          v-bind="item"
          v-on="item.event"
          :disabled="item.disabled && item.disabled(formData[item.prop])"
        >
          <el-radio
            v-for="ra in item.options"
            :label="ra.value"
            :key="ra.value"
            :disabled="ra.disabled && ra.disabled(formData[item.prop])"
            >{{ ra.label }}</el-radio
          >
        </el-radio-group>
        <!-- 单选按钮 -->
        <el-radio-group
          v-if="item.type === 'RadioButton'"
          :style="'width:' + item.width"
          v-model="formData[item.prop]"
          v-on="item.event"
          v-bind="item"
          :disabled="item.disabled && item.disabled(formData[item.prop])"
        >
          <el-radio-button
            v-for="ra in item.options"
            :label="ra.value"
            :key="ra.value"
            :disabled="ra.disabled && ra.disabled(formData[item.prop])"
            >{{ ra.label }}</el-radio-button
          >
        </el-radio-group>
        <!-- 复选框 -->
        <el-checkbox-group
          v-if="item.type === 'Checkbox'"
          v-model="formData[item.prop]"
          :style="'width:' + item.width"
          v-bind="item"
          v-on="item.event"
          :disabled="item.disabled && item.disabled(formData[item.prop])"
        >
          <el-checkbox
            v-for="ch in item.checkboxs"
            :label="ch.value"
            :key="ch.value"
            :disabled="ch.disabled && ch.disabled(formData[item.prop])"
            >{{ ch.label }}</el-checkbox
          >
        </el-checkbox-group>
        <!-- 级联选择器 -->
        <el-cascader
          :style="{ width: item.width }"
          v-if="item.type === 'Cascader'"
          v-model="formData[item.prop]"
          v-bind="item"
          v-on="item.event"
          :disabled="item.disabled && item.disabled(formData[item.prop])"
        ></el-cascader>
        <!-- 开关 -->
        <el-switch
          v-if="item.type === 'Switch'"
          :style="{ width: item.width }"
          v-model="formData[item.prop]"
          v-bind="item"
          v-on="item.event"
          :disabled="item.disabled && item.disabled(formData[item.prop])"
        >
        </el-switch>
        <!-- 日期选择器 -->
        <!-- 多种时间选择参数详情看element文档 -->
        <el-date-picker
          v-if="item.type === 'Date'"
          v-model="formData[item.prop]"
          :style="'width:' + item.width"
          :type="item.type.toLowerCase()"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-bind="item"
          v-on="item.event"
          :disabled="item.disable && item.disabled(formData[item.prop])"
        ></el-date-picker>
        <!-- 时间选择器 -->
        <el-time-picker
          v-model="formData[item.prop]"
          v-if="item.type === 'Time'"
          :style="'width:' + item.width"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="HH:mm:ss"
          value-format="HH:mm:ss"
          v-bind="item"
          v-on="item.event"
          :disabled="item.disable && item.disabled(formData[item.prop])"
        ></el-time-picker>
        <!-- 时间范围 -->
        <!-- 计数器 -->
        <el-input-number
          v-if="item.type === 'InputNumber'"
          v-model="formData[item.prop]"
          :style="'width:' + item.width"
          v-bind="item"
          v-on="item.event"
          :disabled="item.disabled && item.disabled(formData[item.prop])"
        ></el-input-number>
        <!-- 上传 -->
        <FileUpload
          v-if="item.type === 'Upload'"
          :style="'width:' + item.width"
          v-bind="item"
          v-on="item.event"
          :disabled="item.disabled && item.disabled(formData[item.prop])"
        ></FileUpload>
        <!-- 按钮 -->
        <el-button
          v-if="buttonType.indexOf(item.type) != -1"
          v-bind="item"
          v-on="item.event"
          :disabled="item.disabled && item.disabled(formData[item.prop])"
          @click="item.submit ? globalVerify(item.handle) : item.handle()"
          >{{ item.label }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Render from "./render.vue";
import FileUpload from "./components/fileUpload.vue";
export default {
  components: {
    FileUpload,
    Render,
  },
  props: {
    formRef: {
      type: String,
      default: "formRef",
    },
    formConfig: {
      type: Object,
      default: () => {},
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
    formCols: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      buttonType: [
        "primary",
        "success",
        "warning",
        "danger",
        "info",
        "text",
        "Primary",
        "success",
        "Warning",
        "Danger",
        "Info",
        "Text",
      ],
    };
  },
  methods: {
    // 全局校验
    globalVerify(_fn) {
      this.$refs.formRef.validate((val) => {
        if (val) {
          _fn();
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>