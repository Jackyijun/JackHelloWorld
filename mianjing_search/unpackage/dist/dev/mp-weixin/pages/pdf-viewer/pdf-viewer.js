"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      pdfUrl: ""
    };
  },
  onLoad(options) {
    if (options.filePath) {
      this.pdfUrl = decodeURIComponent(options.filePath);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.pdfUrl
  }, $data.pdfUrl ? {
    b: $data.pdfUrl
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yil224/Documents/HBuilderProjects/mianjing_search/pages/pdf-viewer/pdf-viewer.vue"]]);
wx.createPage(MiniProgramPage);
