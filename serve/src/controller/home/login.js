const Base = require('./base.js');

module.exports = class extends Base {
    //登录
    async loginAction(){
        let data = this.post();
        let account_password = think.md5(data.password);
        let account_info = await think.model('su_account')
            .where({'account':data.account, 'password':account_password})
            .find();
        if (think.isEmpty(account_info)){
            return this.fail(100,'登录失败');
        } else{
            const jwt = think.service('jwt');
            let token = jwt.sign_generateToken({
                id: account_info.id,
                name: account_info.account,
            });
            let data = {
                'id':account_info.id,
                'account':account_info.account,
                'token':token
            };
            return this.success(data);
        }
    }
};
