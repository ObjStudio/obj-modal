<template>
  <div>
    <el-upload ref="upload" v-bind="$props" style="display: flex">
      <template v-if="drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </template>
      <template v-else-if="listType == 'text' || listType == 'picture'">
        <el-button size="small" type="primary">点击上传</el-button>
      </template>
      <template v-else-if="listType == 'picture-card'">
        <i class="el-icon-plus"></i>
      </template>
    </el-upload>
  </div>
</template>
<script>
export default {
  props: {
    action: {
      type: String,
      default: "",
    },
    headers: {
      type: Object,
      default: () => {},
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Object,
      default: () => {},
    },
    name: {
      type: String,
      default: "file",
    },
    "with-credentials": {
      type: Boolean,
      default: false,
    },
    "show-file-list": {
      type: Boolean,
      default: true,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: "",
    },
    "on-preview": {
      type: Function,
      default: function(file)  {},
    },
    "on-remove": {
      type: Function,
      default: function(file, fileList)  {},
    },
    "on-success": {
      type: Function,
      default: function(response, file, fileList) {
        //上传文件预览方法
        console.log("res", response, file, fileList);
        if (response.code == "200") {
          this.$emit("update:fileUrl", response.url);
          file.url = response.url;
          delete file["response"];
          this.$emit("update:fileList", fileList);
          this.$parent.clearValidate(); //清空父组件的错误信息
        } else {
          if (fileList.length > 0) {
            for (let index = 0; index < fileList.length; index++) {
              const element = fileList[index];
              if ((element.uid = file.uid)) {
                fileList.splice(index, 1);
                break;
              }
            }
          }
          this.$emit("update:fileList", fileList);
          this.commonUtil.showMessage({
            message: this.commonUtil.getMessageFromList("error.upload", null),
            type: this.commonConstants.messageType.error,
          });
        }
      },
    },
    "on-error": {
      type: Function,
      default: function(err, file, fileList) {},
    },
    "on-progress": {
      type: Function,
      default: function(event, file, fileList) {},
    },
    "on-change": {
      type: Function,
      default: function(file, fileList)  {},
    },
    "before-upload": {
      type: Function,
      default: function(file)  {
        const size = file.size / 1024 / 1024;
        if (this.fileSize < size) {
          this.$message.warning(common.getMessageFromList('error.upload.size',[this.fileSize]))
          return false;
        }
        if (
          this.accept == "" ||
          this.accept == "*" ||
          this.accept == "*.*" ||
          this.accept == "image/*"
        ) {
          return true;
        } else {
          let fileSuffix = file.name.substring(file.name.lastIndexOf("."));
          if (
            this.accept.toUpperCase().indexOf(fileSuffix.toUpperCase()) >= 0
          ) {
            return true;
          } else {
           this.$message.warning(common.getMessageFromList("error.upload.type", [
                file.name,this.accept
              ]),)
            return false;
          }
        }
      },
    },
    "before-remove": {
      type: Function,
      default: (file, fileList) => {},
    },
    listType: {
      type: String,
      default: "picture",
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    "http-request": {
      type: Array,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 1,
    },
    "on-exceed": {
      type: Function,
      default: function(files, fileList)  {},
    },
    // 以下是非element原生prop
    fileSize:{
        type:Number,
        default:5
    }
  },
  data() {
    return {};
  },
};
</script>
<style scoped >
</style>