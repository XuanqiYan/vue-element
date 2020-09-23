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


