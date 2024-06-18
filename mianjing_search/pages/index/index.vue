<template>
    <view>
        <input type="text" v-model="companyName" placeholder="  Enter company name" @input="clearSearchResults"/>
        <button @click="searchCompany">Search</button>
        <view v-if="pdfFiles.length > 0" class="pdf-list">
            <view v-for="(file, index) in pdfFiles" :key="index" @click="openPdf(file)" class="pdf-item">
                <image src="/static/pdf-icon.png" mode="aspectFit" class="pdf-icon"/>
                <text class="pdf-text">{{ file.name }}</text>
            </view>	
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            companyName: '',
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
                console.error('Error: Company name cannot be empty');
                return;
            }

            // Clear previous search results
            this.pdfFiles = [];

            uni.request({
				url: `http://localhost:3000/get-company-info?company=${this.companyName}`,
				method: 'GET',
				success: (res) => {
					if (res.statusCode === 200 && res.data.length > 0) {
						res.data.forEach(file => {
							this.decodeAndSavePdf(file.data, file.fileName);
						});
					} else {
						console.error('Error: No matching files found');
					}
				},
				fail: (err) => {
					console.error('Error retrieving PDF:', err);
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
            const filePath = `${wx.env.USER_DATA_PATH}/${fileName}`;
            wx.getFileSystemManager().writeFile({
                filePath,
                data: bytes.buffer,
                encoding: 'binary',
                success: () => {
                    this.pdfFiles.push({ name: fileName, path: filePath });
                },
                fail: (err) => {
                    console.error('Error writing file:', err);
                }
            });
        },
		
        openPdf(file) {
            uni.navigateTo({
                url: `/pages/pdf-viewer/pdf-viewer?filePath=${encodeURIComponent(file.path)}`
            });
        },
		
        decodeBase64(input) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            let str = input.replace(/=+$/, '');
            let output = '';

            if (str.length % 4 === 1) {
                throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
            }
            for (let bc = 0, bs, buffer, i = 0; (buffer = str.charAt(i++)); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
                buffer = chars.indexOf(buffer);
            }
            return output;
        }
    }
};
</script>


<style>
.pdf-list {
    display: flex;
    flex-direction: column;
    padding: 10px;
}

.pdf-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
}

.pdf-icon {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}

.pdf-text {
    font-size: 16px;
    color: #333;
    flex: 1;
}
</style>