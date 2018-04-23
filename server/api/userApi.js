var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

//连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
	if(typeof ret === 'undefined') {
		res.send('err')
	} else {
		//		res.json(ret);
		res.send('ok')
	}
};

// 增加用户接口
router.post('/addUser', (req, res) => {
	var sql_name = $sql.user.select_name
	var sql = $sql.user.add;
	var params = req.body;
	console.log(params);
	conn.query(sql_name, params.username, function(err, result) {
		if(err) {
			console.log(err)
		}
		if(result[0] === undefined) {
			conn.query(sql, [params.username, params.password], function(err, result) {
				if(err) {
					console.log(err)
				}
				if(result) {
					jsonWrite(res, result)
				}
			})
		} else {
			res.send('-1') //当前注册username与数据库重复时，data返回-1
		}
	})

});

//用户登录接口，查询用户名与密码是否匹配
router.post('/selectUser', (req, res) => {
	var sql_name = $sql.user.select_name;
	var sql_password = $sql.user.select_password;
	var params = req.body;
	conn.query(sql_name, params.username, function(err, result) {
		console.log(result);
		if(err) {
			console.log(err)
		}
		if(result[0] === undefined) {
			res.send('-1') //查询不出username，data返回-1
		} else {
			if(result[0].username === 'admin') { //查询是不是admin账户
				
					if(result[0].password === params.password) {
						res.send('admin') //admin账户，data返回 0
					} else {
						res.send('0');//username正确后，password错误，data返回 0
					}
				
			} else {
				
					if(result[0].password === params.password) {
						jsonWrite(res, result); 
					} else {
						res.send('0');//username正确后，password错误，data返回 0
					}
				
			}
		}

	})
});

//查询所有用户接口
router.get('/viewUser', (req, res) => {
	var sql = $sql.user.view;
	var params = req.body;
	conn.query(sql, params.username, function(err, result) {
		if(err) {
			console.log(err)
		}
		if(result.length > 0) {
			res.send(result);
		}
	})
});
module.exports = router;