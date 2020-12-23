
const jwt = require('jsonwebtoken');
const secret = 'duyasiudgi-apply-sdyuBdiausTfd';


module.exports = class extends think.Service {

    init() {
        super.init();
    }

    sign_generateToken(data) {
        return jwt.sign(data, secret, { expiresIn: '24h' });
    }

    parseToken(token) {
        try {
            return jwt.verify(token, secret);
        }catch(err) {
            return {is_err:1}
        }
    }
};
