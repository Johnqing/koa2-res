/**
 * UUID
 * @param len
 * @param radix
 * @returns {string}
 */
function uuid(len, radix) {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	const uuid = [];
	radix = radix || chars.length;

	if (len) {
		// Compact form
		for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	} else {
		// rfc4122, version 4 form
		let r;

		// rfc4122 requires these characters
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';

		// Fill in random data.  At i==19 set the high bits of clock sequence as
		// per rfc4122, sec. 4.1.5
		for (let i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random()*16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}

	return uuid.join('');
}
/**
 * 统一处理返回结果
 * @param ctx
 * @param data [code, message, data]
 */
const res = (ctx, data) => {
	ctx.body = {
		data: data[2],
		status: {
			code: data[0],
			msg: data[1]
		}
	}
};


module.exports = async (ctx, next) => {
	ctx.context_key = uuid(16, 32);
	ctx.success = (ctx, data, code = 200, msg = 'OK') => {
		res(ctx, [code, msg, data]);
	};
	ctx.fail = (ctx, data, code = 400, msg = 'ERROR') =>{
		res(ctx, [code, msg, data]);
	};
	await next();
};
