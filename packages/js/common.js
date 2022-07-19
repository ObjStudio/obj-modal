/*
 * @Author: 陈伟亮 1186723967@qq.com
 * @Date: 2022-07-07 17:36:00
 * @LastEditors: 陈伟亮 1186723967@qq.com
 * @LastEditTime: 2022-07-07 18:09:36
 * @FilePath: \objectStudio\obj-form\packages\js\common.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const common = {};
import MSG_LIST from './message.js'
/**
 *判断是否是数字
 *
 **/
common.isRealNum = function (val) {
  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
  if (val === "" || val == null) {
    return false;
  }
  if (!isNaN(val)) {
    //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,   //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
    return true;
  } else {
    return false;
  }
};
/**
 * @description: 获取错误消息
 * @param msgid 消息的key
 * @param msgParams 消息参数
 * @return:
 * @author: caiyang
 */
common.getMessageFromList = function (msgid, msgParams) {
  let msg = MSG_LIST[msgid];
  // if ($.trim(msg) == "") {
  //     msg = msgid + "[该消息不存在。]";
  //     return msg;
  // }
  if (msgParams != null) {
    for (var i = 0; i < msgParams.length; i++) {
      msg = msg.replace("{" + i + "}", msgParams[i]);
    }
  }
  return msg;
};
export default common;
