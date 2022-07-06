<template>
  <div>
    <el-form
      :inline="true"
      :key="modalConfig.key ? modalConfig.key : ''"
      ref="formRef"
      :model="modalData"
      :disabled="modalConfig.formEditDisabled"
      :label-width="labelWidth"
    >
      <el-form-item
        v-for="item in modalForm"
        :class="itemClass"
        :label="item.label"
        :key="item.prop"
        :prop="item.prop"
        :rules="filter_rules(item.label, item.rules)"
        :label-width="item.labelWidth"
      >
        <!-- 输入框 -->
        <el-input
          v-if="item.type === 'Input'"
          :style="'width:' + item.width"
          v-model="modalData[item.prop]"
          :placeholder="
            item.placeholder != undefined
              ? item.placeholder
              : '请输入' + item.label
          "
          size="item.size"
          :clearable="item.clearable"
          :disabled="item.disabled && item.disabled(modalData[item.prop])"
          @clear="item.clear && item.clear(modalData[item.prop])"
          @change="
            item.change && item.change(modalData[item.prop], item.params)
          "
          @input="item.input && item.input(modalData[item.prop])"
          @focus="item.focus && item.focus(modalData[item.prop])"
        ></el-input>
        <!-- 下拉框 -->
        <el-select
          :ref="item.ref"
          :style="'width:' + item.width"
          v-if="item.type === 'Select'"
          :multiple="item.multiple"
          :filterable="item.remote"
          :remote="item.remote"
          :remote-method="item.remoteMethod"
          v-model="modalData[item.prop]"
          size="item.size"
          :disabled="item.disabled && item.disabled(modalData[item.prop])"
          @change="
            item.change && item.change(modalData[item.prop], item.params)
          "
          @focus="item.focus && item.focus(modalData[item.prop], item.params)"
        >
          <el-option
            v-if="!item.multiple"
            :label="'请选择' + item.label"
            value=""
          ></el-option>
          <el-option
            v-for="op in item.options"
            :label="item.props ? op[item.props.label] : op.label"
            :value="item.props ? op[item.props.value] : op.value"
            :key="item.props ? op[item.props.value] : op.value"
          ></el-option>
        </el-select>
        <!-- 单选 -->
        <el-radio-group
          :style="'width:' + item.width"
          v-if="item.type === 'Radio'"
          v-model="modalData[item.prop]"
          @change="
            item.change && item.change(modalData[item.prop], item.params)
          "
          :disabled="item.disabled && item.disabled(modalData[item.prop])"
        >
          <el-radio
            v-for="ra in item.radios"
            :label="ra.value"
            :key="ra.value"
            >{{ ra.label }}</el-radio
          >
        </el-radio-group>
        <!-- 单选按钮 -->
        <el-radio-group
          :style="'width:' + item.width"
          v-if="item.type === 'RadioButton'"
          v-model="modalData[item.prop]"
          @change="
            item.change && item.change(modalData[item.prop], item.params)
          "
        >
          <el-radio-button
            v-for="ra in item.radios"
            :label="ra.value"
            :key="ra.value"
            >{{ ra.label }}</el-radio-button
          >
        </el-radio-group>
        <!-- 复选框 -->
        <el-checkbox-group
          :style="'width:' + item.width"
          v-if="item.type === 'Checkbox'"
          v-model="modalData[item.prop]"
          @change="
            item.change && item.change(modalData[item.prop], item.params)
          "
        >
          <el-checkbox
            v-for="ch in item.checkboxs"
            :label="ch.value"
            :key="ch.value"
            >{{ ch.label }}</el-checkbox
          >
        </el-checkbox-group>
        <!-- 级联选择器 -->
        <el-cascader
          :style="{ width: item.width }"
          v-if="item.type === 'Cascader'"
          v-model="modalData[item.prop]"
          :disabled="item.disabled && item.disabled(modalData[item.prop])"
          :options="item.data"
          filterable
          :props="
            Object.assign(item.props ? item.props : {}, {
              expandTrigger: 'hover',
              checkStrictly: false,
            })
          "
        ></el-cascader>
        <!-- 开关 -->
        <el-switch
          :style="{ width: item.width }"
          v-if="item.type === 'Switch'"
          v-model="modalData[item.prop]"
          :active-text="item.activeText || ''"
          :inactive-text="item.inActiveText || ''"
          :active-value="item.activeValue ? item.activeValue : true"
          :inactive-value="item.inActiveValue ? item.inActiveValue : false"
          :disabled="item.disabled && item.disabled(modalData[item.prop])"
        >
        </el-switch>
        <!-- 日期 -->
        <el-date-picker
          :style="'width:' + item.width"
          v-if="item.type === 'Date'"
          v-model="modalData[item.prop]"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="
            item.change && item.change(modalData[item.prop], item.params)
          "
        ></el-date-picker>
        <!-- 日期范围 -->
        <el-date-picker
          :style="'width:' + item.width"
          v-if="item.type === 'DateRange'"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="modalData[item.prop]"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="
            item.change && item.change(modalData[item.prop], item.params)
          "
        ></el-date-picker>
        <!-- 时间 -->
        <el-time-picker
          :style="'width:' + item.width"
          v-if="item.type === 'Time'"
          v-model="modalData[item.prop]"
          format="HH:mm:ss"
          value-format="HH:mm:ss"
          @change="
            item.change && item.change(modalData[item.prop], item.params)
          "
        ></el-time-picker>
        <!-- 时间范围 -->
        <el-time-picker
          :style="'width:' + item.width"
          v-if="item.type === 'TimeRange'"
          v-model="modalData[item.prop]"
          is-range
          format="HH:mm:ss"
          value-format="HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          @change="
            item.change && item.change(modalData[item.prop], item.params)
          "
        ></el-time-picker>
        <!-- 日期时间 -->
        <el-date-picker
          :style="'width:' + item.width"
          v-if="item.type === 'DateTime'"
          type="datetime"
          v-model="modalData[item.prop]"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="item.defaultTime ? item.defaultTime : '00:00:00'"
          :disabled="item.disable && item.disabled(modalData[item.prop])"
          @change="
            item.change && item.change(modalData[item.prop], item.params)
          "
        ></el-date-picker>
        <!-- 日期时间范围 -->
        <el-date-picker
          :style="'width:' + item.width"
          v-if="item.type === 'DateTimeRange'"
          type="datetimerange"
          :picker-options="item.pickerOptions"
          v-model="modalData[item.prop]"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :disabled="item.disable && item.disabled(modalData[item.prop])"
          @change="
            item.change && item.change(modalData[item.prop], item.params)
          "
          :default-time="item.defaultTime"
        ></el-date-picker>
        <!-- 计数器 -->
        <el-input-number
          v-if="item.type === 'InputNumber'"
          v-model="modalData[item.prop]"
          :style="'width:' + item.width"
          :disabled="item.disabled && item.disabled(modalData[item.prop])"
          @change="
            item.change && item.change(modalData[item.prop], item.params)
          "
          :min="item.min"
        ></el-input-number>
        <!-- textarea -->
        <el-input
          v-if="item.type === 'Textarea'"
          type="textarea"
          :autosize="item.rows ? false : true"
          :style="{ width: item.width }"
          :rows="item.rows ? item.rows : 2"
          v-model="modalData[item.prop]"
          :placeholder="'请输入' + item.label"
          size="item.size"
          :disabled="item.disabled && item.disabled(modalData[item.prop])"
          @change="
            item.change && item.change(modalData[item.prop], item.params)
          "
          @input="item.input && item.input(modalData[item.prop])"
          @focus="item.focus && item.focus(modalData[item.prop])"
          :label-width="item.labelWidth"
        ></el-input>
        <fileUpload
          :style="'width:' + item.width"
          v-if="item.type === 'Upload' && modalConfig.show"
          :file-list="modalData[item.prop]"
          :listType="item.listType"
          :isVideo="item.isVideo"
          :fileUrl.sync="modalData[item.fileUrl]"
          :fileList.sync="modalData[item.prop]"
          :accept="item.accept"
          :tips="item.tips"
          :limit="item.limit"
          :readonly="item.readonly"
          :multiple="item.multiple"
          :filesize="item.filesize"
        ></fileUpload>

        <!-- 树 -->
        <el-tree
          v-if="item.type === 'Tree'"
          :data="item.data"
          show-checkbox
          :default-expand-all="defaultexpandall"
          :node-key="item.key"
          :ref="item.ref"
          :default-checked-keys="item.checked"
          highlight-current
          :props="item.props"
        >
        </el-tree>
        <el-divider v-if="item.divider"></el-divider>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    labelWidth: {
      type: String,
      default: "100px",
    },
    itemClass: {
      type: String,
      default: "form_input",
    },
    formRef: {
      type: String,
      default: "formRef",
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
    form: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
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