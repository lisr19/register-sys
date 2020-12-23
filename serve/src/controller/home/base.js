module.exports = class extends think.Controller {
  async __before() {
    let host_url = this.ctx.url;
    if(host_url === '/home/login/login') {
        console.log('pass host');
    }else {
        let token = this.header('authorization');
        const jwt = think.service('jwt'); 
        if (token) {
            let data = await jwt.parseToken(token);
            if (!think.isEmpty(data)) {
                this.account_info = data;
            } else {
                return this.fail('获取用户信息失败,请重新登录');
            }
        }else {
            return this.fail(100,'token不存在，请重新登录')
        }
    }
  }
};