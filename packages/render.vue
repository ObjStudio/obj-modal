<!--
 * @Author: chenkangxu
 * @Date: 2022-05-19 14:48:25
 * @LastEditTime: 2022-07-18 18:37:43
 * @LastEditors: 陈伟亮 1186723967@qq.com
 * @Description: 
 * @Github: 
-->
<script>
export default {
  name: "custom-render",
  props: {
    //渲染函数
    render:{
      type:[Object],
      default:()=>{}
    }
  },
  render(){
    return this.render
  },
};
</script>