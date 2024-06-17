<template>
    <view>
        <web-view v-if="pdfUrl" :src="pdfUrl"></web-view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            pdfUrl: ''
        };
    },
    onLoad(options) {
        if (options.filePath) {
            this.pdfUrl = decodeURIComponent(options.filePath);
        }
    }
};
</script>
