"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      companyName: "",
      pdfFiles: []
    };
  },
  methods: {
    clearSearchResults() {
      if (!this.companyName) {
        this.pdfFiles = [];
      }
    },
    searchCompany() {
      if (!this.companyName) {
        console.error("Error: Company name cannot be empty");
        return;
      }
      this.pdfFiles = [];
      common_vendor.index.request({
        url: `http://localhost:3000/get-company-info?company=${this.companyName}`,
        method: "GET",
        success: (res) => {
          if (res.data.pdf) {
            const base64Data = res.data.pdf;
            const fileName = `${this.companyName}.pdf`;
            this.decodeAndSavePdf(base64Data, fileName);
          } else {
            console.error("Error: PDF data not found");
          }
        },
        fail: (err) => {
          console.error("Error retrieving PDF:", err);
        }
      });
    },
    decodeAndSavePdf(base64Data, fileName) {
      const binaryString = this.decodeBase64(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const filePath = `${common_vendor.wx$1.env.USER_DATA_PATH}/${fileName}`;
      common_vendor.wx$1.getFileSystemManager().writeFile({
        filePath,
        data: bytes.buffer,
        encoding: "binary",
        success: () => {
          this.pdfFiles.push({ name: fileName, path: filePath });
        },
        fail: (err) => {
          console.error("Error writing file:", err);
        }
      });
    },
    openPdf(file) {
      common_vendor.index.navigateTo({
        url: `/pages/pdf-viewer/pdf-viewer?filePath=${encodeURIComponent(file.path)}`
      });
    },
    decodeBase64(input) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      let str = input.replace(/=+$/, "");
      let output = "";
      if (str.length % 4 === 1) {
        throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
      }
      for (let bc = 0, bs, buffer, i = 0; buffer = str.charAt(i++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
        buffer = chars.indexOf(buffer);
      }
      return output;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o([($event) => $data.companyName = $event.detail.value, (...args) => $options.clearSearchResults && $options.clearSearchResults(...args)]),
    b: $data.companyName,
    c: common_vendor.o((...args) => $options.searchCompany && $options.searchCompany(...args)),
    d: $data.pdfFiles.length > 0
  }, $data.pdfFiles.length > 0 ? {
    e: common_vendor.f($data.pdfFiles, (file, index, i0) => {
      return {
        a: common_vendor.t(file.name),
        b: index,
        c: common_vendor.o(($event) => $options.openPdf(file), index)
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yil224/Documents/HBuilderProjects/mianjing_search/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
