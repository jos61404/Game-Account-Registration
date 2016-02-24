var http = require('http');
var request = require('request');
//載入加密模組
var crypto = require('crypto'); 
//載入檔案系統模組
var fs = require('fs');

// 設定 ///
var gmail = '@gmail.com';       // 信箱種類 //
var hgmail= '';   // 備用信箱 //
var password = '';      // 密碼 //
var UserName = '';         // 名字 // 
var Year = '';              // 西元年 //
var Month = '';                // 月 //
var Day = '';                  // 日 //
var Filename = '';           // 檔案名稱//
var freq = '';                 // 執行次數 //

// 設定 成功後回傳資料 // 
var good = '<script type="text/javascript" language="javascript">   top.document.location.href = "/index.aspx";</script>';

// 註冊資料 //
fs.appendFile(
	'./'+Filename+'.txt', 
	"信箱種類: "+gmail+'\n'+"密碼: "+password+'\n'+"名字: "+UserName+'\n'+"西元年: "+Year+" 月: "+Month+" 日: "+Day+'\n'+"執行次數: "+freq+'\n'+"---------------以下帳號---------------\n"
);

// 迴圈開始 //
for(var o=0;o<freq;o++){

	//  帳號 // 
	var randomString = crypto.randomBytes(64).toString('hex').substr(0, 8);
	randomString = randomString + gmail;

	// 電話 //
	var maxNum = 99999999;
	var minNum = 0;
	for(var i=1;i<=99;i++){  
		Phone = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
		Phone = '09'+Phone;
	};  

	request.post({
		url: 'https://gf2.gameflier.com/account/aloneregister_tw.aspx',
		form: {
			__VIEWSTATE:"/wEPDwUKMTIyNTYzMjE3NGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgYFB1NleE1hbGUFB1NleE1hbGUFCVNleEZlbWFsZQUJU2V4RmVtYWxlBQ1SdWxlQWdyZWVtZW50BQtFUGFwZXJDaGVjax90cGFG6XjKSn/9/Qn70dD/waDu",
	        __EVENTVALIDATION:"/wEWEgL34viaBgKSufQdAuPr0P8PArqijOYOAvCkgOgEAoeymN0FAtGB2q8DAs3vx7wIAtv94NAGApuz0/cCAr3RmZYPApu9tPgCAvrU6cQBAoT59csOAp6dxHsC8aa3owoC7Nus9Q0CjOeKxgamewbKuhTUoo/mWhflGZATpmXZYg==",
			Game:'',
			Source:"G0000",
			NewUserArea:"TW",
			NewUserAccount: randomString,
			NewUserPassword: password,
			VerifyPassword: password,
			NewUserPhone: Phone,
			NewUserName: UserName,
			SexMale: checked = "true",
			Birth_Year: Year,
			Birth_Month: Month,
			Birth_Day: Day,
			NewUserMail: hgmail,
			EPaperCheck: checked = "true",
			RuleAgreement: checked = "true",
			Button1: style="display: none;" 
		}
	}, function (err, httpResponse, body) {
		if (err) { return console.log("錯誤") };

	    if (body == good ){
	    	console.log(body);
	        fs.appendFile('./'+Filename+'.txt', "帳號: "+randomString+" 電話: "+Phone +'\n', function (err) {
	        }); 
	    };
	});
	    fs.readFile('./'+Filename+'.txt', 'utf-8', function(err,data) {
	    	console.log(data);
	    });
};