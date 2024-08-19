<template>
  <div v-loading="loading">
    <el-form
      :ref="formRef"
      :model="formData"
      v-bind="{ formConfig }"
      :label-width="labelWidth"
    >
      <template v-for="item in _formCols">
        <!-- jsx 返回jsx数据-->
        <render
          v-if="item.type === 'jsx-out'"
          :render="item.render && item.render(formData)"
          :key="item.prop + item.type"
        ></render>
        <el-form-item
          v-else
          :key="item.prop"
          :rules="filter_rules(item.label, item.rules)"
          :label="buttonType.indexOf(item.type) != -1 ? null : item.label"
          v-bind="item"
        >
          <!-- jsx 返回jsx数据-->
          <render
            v-if="item.type === 'jsx'"
            :render="item.render && item.render(formData)"
          ></render>
          <!-- 自定义label 返回jsx数据-->
          <render
            name="label"
            v-if="item.renderLabel"
            :render="item.renderLabel(formData)"
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
            v-on="item.event"
            :disabled="disabled(item)"
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
            :disabled="disabled(item)"
          ></el-input>
          <!-- 下拉框 -->
          <el-select
            v-if="item.type === 'Select'"
            v-model="formData[item.prop]"
            :ref="item.ref"
            :style="'width:' + item.width"
            v-bind="item"
            v-on="item.event"
            :disabled="disabled(item)"
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
              :disabled="disabled(op)"
            ></el-option>
          </el-select>
          <!-- 单选 -->
          <el-radio-group
            v-if="item.type === 'Radio'"
            v-model="formData[item.prop]"
            :style="'width:' + item.width"
            v-bind="item"
            v-on="item.event"
            :disabled="disabled(item)"
          >
            <el-radio
              v-for="ra in item.options"
              :label="ra.value"
              :key="ra.value"
              :disabled="disabled(ra)"
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
            :disabled="disabled(item)"
          >
            <el-radio-button
              v-for="ra in item.options"
              :label="ra.value"
              :key="ra.value"
              :disabled="disabled(ra)"
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
            :disabled="disabled(item)"
          >
            <el-checkbox
              v-for="ch in item.checkboxs"
              :label="ch.value"
              :key="ch.value"
              :disabled="disabled(ch)"
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
            :disabled="disabled(item)"
          ></el-cascader>
          <!-- 开关 -->
          <el-switch
            v-if="item.type === 'Switch'"
            :style="{ width: item.width }"
            v-model="formData[item.prop]"
            v-bind="item"
            v-on="item.event"
            :disabled="disabled(item)"
          >
          </el-switch>
          <!-- 日期选择器 -->
          <!-- 多种时间选择参数详情看element文档 -->
          <el-date-picker
            v-if="dateType.indexOf(item.type) != -1"
            v-model="formData[item.prop]"
            :style="'width:' + item.width"
            :type="item.type"
            v-bind="{
              format: 'yyyy-MM-dd',
              'value-format': 'yyyy-MM-dd',
              ...item,
            }"
            v-on="item.event"
            @change="(val) => dateProxy(item, val)"
            :disabled="disabled(item)"
          ></el-date-picker>
          <!-- 时间选择器 -->
          <el-time-picker
            v-model="formData[item.prop]"
            v-if="item.type === 'Time'"
            :style="'width:' + item.width"
            v-bind="{
              format: 'yyyy-MM-dd',
              'value-format': 'yyyy-MM-dd',
              ...item,
            }"
            v-on="item.event"
            :disabled="disabled(item)"
          ></el-time-picker>
          <!-- 时间范围 -->
          <!-- 计数器 -->
          <el-input-number
            v-if="item.type === 'InputNumber'"
            v-model="formData[item.prop]"
            :style="'width:' + item.width"
            v-bind="item"
            v-on="item.event"
            :disabled="disabled(item)"
          ></el-input-number>
          <!-- 上传 -->
          <FileUpload
            v-if="item.type === 'Upload'"
            :style="'width:' + item.width"
            v-bind="item"
            v-on="item.event"
            :disabled="disabled(item)"
          ></FileUpload>
          <!-- 按钮 -->
          <el-button
            v-if="buttonType.indexOf(item.type) != -1"
            v-bind="item"
            v-on="item.event"
            :disabled="disabled(item)"
            @click="item.submit ? globalVerify(item.handle) : item.handle()"
            >{{ item.label }}</el-button
          >
        </el-form-item>
      </template>
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
    loading: {
      type: Boolean,
      default: false,
    },
    labelWidth: {
      default: "100px",
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
      dateType: [
        "year",
        "month",
        "date",
        "dates",
        "week",
        "datetime",
        "datetimerange",
        "daterange",
        "monthrange",
      ],
    };
  },
  computed: {
    _formCols() {
      return this.formCols.filter((item) => item.show != false);
    },
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
    //disabled 布尔变量与正常变量适配
    disabled(item) {
      if (typeof item.disabled == "boolean") {
        return item.disabled;
      } else {
        return item?.disabled?.();
      }
    },
    dateProxy(item, val) {
      if (!val && item.type == "datetimerange") {
        this.formData[item.prop] = [];
        item?.change?.([]);
      } else {
        item?.change?.(val);
      }
    },
    validate(...args) {
      return this.$refs[this.formRef].validate(...args);
    },
    resetFields(...args) {
      return this.$refs[this.formRef].resetFields(...args);
    },
    clearValidate(...args) {
      return this.$refs[this.formRef].clearValidate(...args);
    },
    validateField(...args) {
      return this.$refs[this.formRef].validateField(...args);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>