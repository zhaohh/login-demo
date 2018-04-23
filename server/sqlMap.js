//sql语句
var sqlMap = {
	user:{
		add:'insert into user(username,password) values(?,?)',
		view:'SELECT username from user',//查询所有用户
		select_name:'SELECT * from user where username = ?',//查询username
		select_password:'SELECT * from user where username = ? and password = ?'//查询password
	}
}
module.exports = sqlMap;
