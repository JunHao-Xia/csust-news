'use strict';

exports.main = async (event, context) => {
	let appid = "wx776ecb8ff83988c9";//你自己的appid
	let secret = "327e0c23b140626de00cda933dada46a";//你自己的appsecret
	let url =
	"https://api.weixin.qq.com/sns/jscode2session?appid=" +
	appid +
	"&secret=" +
	secret +
	"&js_code=" +
	event.code +
	"&grant_type=authorization_code";
	let res = await uniCloud.httpclient.request(
		url ,// 请求路径,
		{
			dataType:"json"
		}
	);
	
	return res.data.openid
}
