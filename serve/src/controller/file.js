
const Base = require('./base.js');
const path = require('path');
const fs = require('fs');

module.exports = class extends Base{

    // 上传文件
    async uploadAction() {
        const file = think.extend({}, this.file('file'));

		//保存文件的路径
		let savepath ='/workdata/admin/upload_img/';
		let filepath = file.path; //文件路径
	    let filename = file.name; //文件名
		console.log(filename);
		let suffix = filename.substr(filename.lastIndexOf('.') + 1); //文件后缀
		let timestmp=new Date().getTime();
		let newfilename = timestmp.toString()+Math.random().toString(36).substr(2) + '.' + suffix;

		//读文件
        let datas = fs.readFileSync(filepath);
        //写文件
        fs.writeFileSync(savepath + newfilename, datas);

        let url = 'http://192.168.1.81:10010/upload_img/'+ newfilename;
        return this.json({url: url});
    }

};
