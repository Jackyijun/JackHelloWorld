<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		
		<view>{{ name }}</view> <!-- return my name from api -->
		<button @click="fetchMessage">Get Hello World</button>
		<view>{{ message }}</view> <!-- return Hello World from api when click the above button -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				message: ''
			}
		},
		mounted() { // place to perform actions that require the DOM to be fully loaded, such as fetching data from an API 
		    this.fetchName(); // Call API after all DOM is mounted
		},
		methods: { // place to store custom funtions
			fetchMessage() {
			      uni.request({
			        url: 'http://localhost:3000/api/hello', 
			        method: 'GET',
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
			      uni.request({
			        url: 'http://localhost:3000/api/myname', 
			        method: 'GET',
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
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
