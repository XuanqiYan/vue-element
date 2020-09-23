/*
	过滤输入非法字符
*/
export const _inputValue = (s) => {
	var pattern = new RegExp("[`~!@.#$^&*()=|{}':;',\\[\\]<>/?~！%_+ #￥……&*（）——|{}【】‘；：”“'。，、？]")
	var rs = "";
	for (var i = 0; i < s.length; i++) {
		rs = rs + s.substr(i, 1).replace(pattern, '');
	}
	return rs;
}
//邮箱的格式中@ 和 .是合法字符
export const _email = (s) => {
	var pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\]<>/?~！%_+ #￥……&*（）——|{}【】‘；：”“'。，、？]")
	var rs = "";
	for (var i = 0; i < s.length; i++) {
		rs = rs + s.substr(i, 1).replace(pattern, '');
	}
	return rs;
}

/*
	验证邮箱
*/
export const validate_email  = value => {
	return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)
}
/* 
	验证密码
*/
export const validate_password  = value => {
	return /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/.test(value)
}
/*
	验证code
*/
export const validate_code  = value => {
	return  /^[0-9]{4}$/.test(value)
}


