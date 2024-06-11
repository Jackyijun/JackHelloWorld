"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      name: "",
      message: ""
    };
  },
  mounted() {
    this.fetchName();
  },
  methods: {
    // place to store custom funtions
    fetchMessage() {
      common_vendor.index.request({
        url: "http://localhost:3000/api/hello",
        method: "GET",
        success: (res) => {
          this.message = res.data;
          console.log(this.message);
        },
        fail: (err) => {
          console.error(err);
        }
      });
    },
    fetchName() {
      common_vendor.index.request({
        url: "http://localhost:3000/api/myname",
        method: "GET",
        success: (res) => {
          this.name = res.data;
          console.log(this.name);
        },
        fail: (err) => {
          console.error(err);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.name),
    b: common_vendor.o((...args) => $options.fetchMessage && $options.fetchMessage(...args)),
    c: common_vendor.t($data.message)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yil224/Documents/HBuilderProjects/HelloWorldUniApp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
