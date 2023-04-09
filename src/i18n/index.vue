<template>
	<view class="pageBox">
		<!-- <view class="rz">
			<image src="@/static/rz/rz.jpg" mode="widthFix"></image>
		</view> -->
		<!--<view class="rzTop">
			 <view class="rzTopbj">
				<view>Dragon</view>
				<view>Chinese</view>
			</view>
			<view class="rzTopBox">
				<view class="rzTopBoxLeft">
					<view class="rzTopBoxLeftOne">入驻NFT·赋能品牌</view>
					<view class="rzTopBoxLeftTwo">人人都是</view>
					<view class="rzTopBoxLeftThree">数字</view>
					<view class="rzTopBoxLeftFour">艺术家</view>
					<view class="rzTopBoxLeftFive">
						<u-icon name="arrow-downward" color="#fff" size="36"></u-icon>
					</view>
				</view>
				<view class="rzTopBoxRight">
					<image mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="kpYq" style="margin-top: 30rpx;">
			<view class="kpYqTop">
				<view class="kpYqTopv">
					诚邀：自由IP创作者
				</view>
			</view>
			<view class="kpYqBtn">
				<view class="kpYqBtnOne">
					<view>
						<image></image>
					</view>
					<view>
						已获授权可商用的作品
					</view>
				</view>
				<view class="kpYqBtnOne">
					<view>
						<image></image>
					</view>
					<view>
						游戏、漫画、手工品等原创作品
					</view>
				</view>
				<view class="kpYqBtnOne">
					<view>
						<image></image>
					</view>
					<view>
						文字、图片、音乐、视频作品
					</view>
				</view>
			</view>
		</view>

		<view class="kpYq">
			<view class="kpYqTop">
				<view class="kpYqTopv">
					诚邀：企业实体衍生品
				</view>
			</view>
			<view class="kpYqBtn">
				<view class="kpYqBtnOne">
					<view>
						<image></image>
					</view>
					<view>
						实物产品数字化探索、转型
					</view>
				</view>
				<view class="kpYqBtnOne">
					<view>
						<image></image>
					</view>
					<view>
						博物馆、艺术馆、图书馆发行作品
					</view>
				</view>
				<view class="kpYqBtnOne">
					<view>
						<image></image>
					</view>
					<view>
						非遗传承人作品
					</view>
				</view>
			</view>
		</view>
		<view class="rzts">
			如需申请入驻，请根据实际情况填写信息,
			提交申请后，将会有工作人员联系您！
		</view>
		<view class="sqr">
			<view :class="xzDw==1?'sqrXz':'sqrWxz'" @click="xzDw=1">
				<view>
					<image></image>
				</view>
				<view>企业/单位</view>
			</view>
			<view :class="xzDw==2?'sqrXz':'sqrWxz'" @click="xzDw=2">
				<view>
					<image></image>
				</view>
				<view>个人创作者</view>
			</view>
		</view> -->
		<view class="rzOneTop">
			<image src="@/static/rz/db.png" mode="widthFix"></image>
		</view>
		<template v-if="sjfwShow">
		<view class="rzTwoTop">
			<view class="rzTwoTopOne">{{$t('中文1')}}</view>
			<view class="rzTwoTopTwo">
				<view @click="xzDw=1">
					<image src="@/static/rz/yxzdw.png" v-if="xzDw==1"></image>
					<image src="@/static/rz/wxzdw.png" v-else></image>
				</view>
				<view @click="xzDw=2">
					<image src="@/static/rz/yxzgr.png" v-if="xzDw==2"></image>
					<image src="@/static/rz/wxzgr.png" v-else></image>
				</view>
			</view>
		</view>
		<view class="rzForm" v-if="xzDw==1">
			<view class="rzFormTil">
				{{$t('中文2')}}
			</view>
			<view class="rzFormInput">
				<input type="text" v-model="gs.sqrmc" :auto-blur="true" :cursor-spacing="40" @focus="plFocus" @blur="plBlur" />
			</view>
			<view class="rzFormTil">
				{{$t('中文3')}}
			</view>
			<view class="rzFormInput">
				<input type="text" v-model="gs.gsqc" :auto-blur="true" :cursor-spacing="40" @focus="plFocus" @blur="plBlur" />
			</view>
			<view class="rzFormTil">
				{{$t('中文4')}}
			</view>
			<view class="rzFormInput">
				<input type="text" v-model="gs.jyfw" :auto-blur="true" :cursor-spacing="40" @focus="plFocus" @blur="plBlur" />
			</view>
			<view class="rzFormTil">
				{{$t('中文5')}}
			</view>
			<view class="rzFormInput">
				<input type="text" v-model="gs.lxfs" :auto-blur="true" :cursor-spacing="40" @focus="plFocus" @blur="plBlur" />
			</view>
		</view>
		<view class="rzForm" v-if="xzDw==2">
			<view class="rzFormTil">
				{{$t('rz.label5')}}
			</view>
			<view class="rzFormInput">
				<input type="text" v-model="gr.sqrmc" :auto-blur="true" :cursor-spacing="40" @focus="plFocus" @blur="plBlur" />
			</view>
			<view class="rzFormTil">
				{{$t('rz.label6')}}
			</view>
			<view class="rzFormInput">
				<input type="text" v-model="gr.lxfs" :auto-blur="true" :cursor-spacing="40" @focus="plFocus" @blur="plBlur" />
			</view>
			<view class="rzFormTil">
				{{$t('rz.label7')}}
			</view>
			<view class="rzFormInput">
				<input type="text" v-model="gr.cshy" :auto-blur="true" :cursor-spacing="40" @focus="plFocus" @blur="plBlur" />
			</view>
		</view>
		<view class="rzAnn">
			<view @click="goSubmit">{{$t('rz.label8')}}</view>
		</view>
		<view  :style="{
			height:inputBottom+'px',
			width:'100px'
		}"></view>
		</template>
		<template  v-else>
			<view class="sjfwBoxTwoTwo">
				<view>
					<view>
						<u-icon name="checkmark" size="36" color="#202430"></u-icon>
					</view>
					<!-- <image></image> -->
					<!-- <u-icon name="checkmark-circle-fill" size="58" color="#B7FE02"></u-icon> -->
				</view>
				<view>
					{{$t('rz.label9')}}
				</view>
			</view>
		</template>
		<tc :show="true" :cent="cent" ref="tcBox"></tc>
		<tabbar current="2" v-if="showTab"></tabbar>
		<loginProp ref="loginProp"></loginProp>
	</view>
</template>

<script>
	import tabbar from "@/components/tabbar/tabbar.vue"
	import tc from "@/components/tc.vue"
	import {
		EvtNftMerchantEntry_add_Api
	} from "@/api/ruzhu.js"
	import loginProp from "@/components/loginProp.vue"
	import {
		getUserInfoApi
	} from "@/api/my.js"
	export default {
		components: {
			tc,
			tabbar,
			loginProp
		},
		data() {
			return {
				xzDw:1,
				gs:{
					sqrmc:"",
					gsqc:"",
					jyfw:"",
					lxfs:""
				},
				gr:{
					sqrmc:"",
					lxfs:"",
					cshy:"",
				},
				cent:this.$t('rz.label10'),
				inputBottom:"",
				plShow:false,
				sjfwShow:true,
				userInfo:"",
				showTab:true,
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo');
			let settleType = uni.getStorageSync('settleType')||'';
			this.sjfwShow=settleType == 1?false:true;
			console.log(this.sjfwShow)
		},
		onReady() {
			uni.hideTabBar()
		},
		onShow() {
			this.showTab=true;
			this.gs={
				sqrmc:"",
				gsqc:"",
				jyfw:"",
				lxfs:""
			};
			this.gr={
				sqrmc:"",
				lxfs:"",
				cshy:"",
			};
			uni.hideTabBar()
		},
		onPullDownRefresh() {
			let t=this;
			this.gs={
				sqrmc:"",
				gsqc:"",
				jyfw:"",
				lxfs:""
			};
			this.gr={
				sqrmc:"",
				lxfs:"",
				cshy:"",
			};
			this.getUserInfo();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onHide() {
			this.showTab=false;
		},
		methods: {
			plFocus(e){
				console.log(e)
				this.plShow=true;
				this.inputBottom = e.detail.height - 50;
			},
			plBlur(){
				this.inputBottom = 0;
				this.plShow=false;
			},
			goSubmit(){
				let data={};
				// 手机号验证
				var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
				if (!this.checkLogin()) {
					this.$refs.loginProp.open()
					return false;
				}


				// 商家
				if(this.xzDw==1){
					if(!this.gs.sqrmc){
						this.cent=this.$t('rz.label11')
						this.$refs.tcBox.tcShow()
						return
					}
					if(!this.gs.gsqc){
						this.cent=this.$t('rz.label12')
						this.$refs.tcBox.tcShow()
						return
					}
					if(!this.gs.jyfw){
						this.cent=this.$t('rz.label13')
						this.$refs.tcBox.tcShow()
						return
					}
					if(!this.gs.lxfs){
						this.cent=this.$t('rz.label14')
						this.$refs.tcBox.tcShow()
						return
					}
					if (!reg_tel.test(this.gs.lxfs)) {
						this.cent=this.$t('rz.label15')
						this.$refs.tcBox.tcShow()
						return
					}
					data={
						type:1,
						applicant_name:this.gs.sqrmc,
						company:this.gs.gsqc,
						position:this.gs.jyfw,
						phone:this.gs.lxfs,
					}
				}else{
					if(!this.gr.sqrmc){
						this.cent=this.$t('rz.label16')
						this.$refs.tcBox.tcShow()
						return
					}
					if(!this.gr.cshy){
						this.cent=this.$t('rz.label17')
						this.$refs.tcBox.tcShow()
						return
					}
					if(!this.gr.lxfs){
						this.cent=this.$t('rz.label18')
						this.$refs.tcBox.tcShow()
						return
					}
					if (!reg_tel.test(this.gr.lxfs)) {
						this.cent=this.$t('rz.label19')
						this.$refs.tcBox.tcShow()
						return
					}
					data={
						type:0,
						applicant_name:this.gr.sqrmc,
						phone:this.gr.lxfs,
						position:this.gr.cshy,
					}
				}
				EvtNftMerchantEntry_add_Api(data).then(res=>{
					console.log(res)
					// this.cent='提交成功，工作人员将在48小时内，联系您！'
					// this.$refs.tcBox.tcShow()
					this.sjfwShow = false;
					this.getUserInfo();
					this.gs={
						sqrmc:"",
						gsqc:"",
						jyfw:"",
						lxfs:""
					};
					this.gr={
						sqrmc:"",
						lxfs:"",
						cshy:"",
					}
					uni.setStorageSync('settleType', 1);
				}).catch(err=>{
					console.log(err)
				})

			},
			getUserInfo() {
					let data = {

					}
					uni.showLoading({
						title: this.$t('rz.label20'),
						mask: true
					})
					getUserInfoApi(data).then(res => {
						uni.hideLoading()
						console.log(res, "用户信息")
						this.userInfo = res.data
						uni.setStorageSync('userInfo', res.data);
					}).catch(err => {
						uni.hideLoading()
					})
				},

		}
	}
</script>

<style>

</style>
<style lang="scss" scoped>
	.rz {
		width: 100%;

		image {
			width: 100%;
		}
	}

	.pageBox {
		// background: #202430;
		min-height: 100vh;
		background: url("@/static/rz/bj.png") no-repeat top;
		background-size: cover;
	}

	.rzTop {
		position: relative;
		height: 800rpx;

		.rzTopbj {
			padding: 30rpx;
			display: flex;
			justify-content: end;
			align-items: center;

			>view {
				display: flex;
				align-items: center;
				font-weight: bold;
				width: 250rpx;
				font-size: 290rpx;
				transform: rotateZ(90deg);
				// color: rgba(255,255,255,0.5);
				font-family: Alibaba PuHuiTi;
				font-weight: bold;
				color: #565F76;
				opacity: 0.2;
				line-height: 300rpx;
			}
		}

		.rzTopBox {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			border: 2rpx solid #fff;
			z-index: 9;
			display: flex;
			align-items: center;
			padding: 30rpx;

			.rzTopBoxLeft {
				margin-right: 30rpx;

				>view:nth-of-type(1) {
					margin-top: 82rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					margin-bottom: 27rpx;
				}

				>view:nth-of-type(2) {
					font-size: 72rpx;
					font-family: Alibaba PuHuiTi;
					font-weight: bold;
					color: #FFFFFF;
					margin-bottom: 12rpx;
				}

				>view:nth-of-type(3) {
					font-size: 150rpx;
					font-family: Alibaba PuHuiTi;
					font-weight: bold;
					color: #B7FE02;
					margin-bottom: 13rpx;
				}

				>view:nth-of-type(4) {
					font-size: 100rpx;
					font-family: Alibaba PuHuiTi;
					font-weight: bold;
					color: #B7FE02;
					margin-bottom: 52rpx;
				}

				>view:nth-of-type(5) {

					width: 74rpx;
					height: 74rpx;
					background: #B7FE02;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

			.rzTopBoxRight {
				flex: 1;

				image {
					width: 100%;
					border: 2rpx solid #fff;
				}
			}
		}
	}

	.kpYq {
		margin: 0 53rpx 27rpx;
		background: #3c4660;
		padding: 140rpx 38rpx 38rpx;
		box-sizing: border-box;
		position: relative;

		.kpYqTop {
			position: absolute;
			top: 13rpx;
			left: 0;
			background: #B7FE02;

			>view {
				padding: 0 30rpx;
				height: 80rpx;
				display: flex;
				align-items: center;

				position: relative;
			}

			.kpYqTopv:before {
				content: '';
				position: absolute;
				top:0;
				right: -80rpx;
				width: 0px;
				height: 0px;
				border-right: 80rpx solid transparent;
				border-top: 80rpx solid #B7FE02;
			}
		}
		.kpYqBtn{
			.kpYqBtnOne{
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				>view:nth-of-type(1){
					margin-right: 20rpx;
					image{
						width: 30rpx;
						height: 30rpx;
						border: 2rpx solid #fff;
					}
				}
				>view:nth-of-type(2){
					font-size: 25rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}

			}
		}
	}
	.rzts{
		font-size: 29rpx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #FFFFFF;
		padding: 53rpx 108rpx;
	}
	.sqr{
		display: flex;
		align-items: center;
		justify-content: center;
		// margin-bottom: 72rpx;
		>view:first-child{
			margin-right: 54rpx;
		}
		&Wxz{
			width: 168rpx;
			height: 168rpx;
			background: rgba(183,254,2,0);
			border: 2rpx solid #FFFFFF;
			border-radius: 18rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			>view:nth-of-type(1){
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 82rpx;
					height: 83rpx;
					border: 2rpx solid #fff;
				}
			}
			>view:nth-of-type(2){
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #FFFFFF;
				margin-top: 14rpx;
			}
		}

		&Xz{
			width: 168rpx;
			height: 168rpx;
			background: #B7FE02;
			border-radius: 18rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			>view:nth-of-type(1){
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 82rpx;
					height: 83rpx;
					border: 2rpx solid #2B303F;
				}
			}
			>view:nth-of-type(2){
				margin-top: 14rpx;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #2B303F;
			}
		}
	}
	.rzForm{
		padding:54rpx 110rpx;
		&Til{
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #868C9F;
			margin-bottom: 11rpx;
		}
		&Input{
			height: 62rpx;
			background: rgba(183,254,2,0);
			border: 1rpx solid #868C9F;
			border-radius: 31rpx;
			padding: 0 20rpx;
			margin-bottom: 27rpx;
			input{
				width: 100%;
				height: 100%;
				border: none;
				background: none;
				color: #fff;
				font-size: 18rpx;
			}
		}
	}
	.rzAnn{
		padding: 54rpx 121rpx;
		>view{


			height: 62rpx;
			background: #B7FE02;
			border-radius: 31rpx;
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #2B303F;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.rzOneTop{
		margin-left: 50rpx;
		padding-top:calc(var(--status-bar-height) + 30rpx);
		image{
			width: 100%;
		}
	}
	.rzTwoTop{
		.rzTwoTopOne{
			width: 500rpx;
			margin: 0 auto;
			text-align: center;
			font-size: 29rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #FFFFFF;
			margin-bottom: 55rpx;
		}
		.rzTwoTopTwo{
			display: flex;
			align-items: center;
			justify-content: center;
			>view:nth-of-type(1){
				margin-right: 54rpx;
			}
			image{
				width: 168rpx;
				height: 168rpx;
			}
		}
	}
	.sjfwBoxTwoTwo {
			padding: 30rpx 40rpx;

			>view:nth-of-type(1) {
				margin-bottom: 36rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				>view {
					width: 105rpx;
					height: 105rpx;
					background: #B7FE02;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				image {
					width: 105rpx;
					height: 105rpx;
					background: #B7FE02;
					border-radius: 50%;
				}
			}

			>view:nth-of-type(2) {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				text-align: center;
				color: #FFFFFF;
			}
		}

</style>
