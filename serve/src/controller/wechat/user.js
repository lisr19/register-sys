//正式公众号
const wxappid = 'wx39af48c6b647';//appid  
const wxappsecret='925a9b0e4aecc95e2c449f4747474';//wxappsecret


module.exports = class extends think.Controller {
    //获取用户信息调起登录
	 async loginAction() {
		 let code=this.get('code');
		 let url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + wxappid + "&secret=" + wxappsecret + "&code=" + code + "&grant_type=authorization_code";
		 let data = await rp(url);
		 let openid=JSON.parse(data).openid;
		 if(!think.isEmpty(openid)){
			 return this.success(openid);
		 }else{
			 return this.fail(100,'无法获取微信用户信息');
		 }
	 }
    
}