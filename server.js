var fs = require("fs");
var url = require("url");
var http = require("http");

// const SESSION_DATA = {};// 定义一个全局的对象用于存储session

//利用回调函数的异步特性，封装node的读、写操作
function read(file,cb){
	fs.readFile(file,"utf8",(err,data)=>{
		if(err || data.length==0){
			cb([]);
		}else{
			cb(JSON.parse(data));
		}
	});
}
function write(file,data,cb){
	fs.writeFile(file,JSON.stringify(data),"utf8",cb);
}


var app = http.createServer((req,res)=>{
	let {pathname,query} = url.parse(req.url,true);// 注意url.parse的用法和req.url的使用

	//跨域处理
	res.setHeader("Access-Control-Allow-Origin","http://localhost:8080");//带cookie的话，不能写*
	res.setHeader("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,X-Requested-With,xToken");
	res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
	res.setHeader("X-Powered-By","3.2.1");
	res.setHeader("Access-Control-Allow-Credentials", true); //允许带 cookie
	

	if (pathname === '/favicon.ico') return;
	if(req.method=="OPTIONS"){
		return res.end();
	}

	//设置cookie过期时间
	const setCookieTime = () => {
		let da=new Date();
		da.setTime( da.getTime() + 24*60*60*1000 ) //一天后过期
		return da.toUTCString() //将 1598789234953这种格式的转换成=> "Sat, 29 Aug 2020 12:06:33 GMT"
	}
	if(req.method=="POST" && pathname=="/login"){
		res.setHeader("Content-Type","application/json;charset=utf8");
		//post请求 获取表单数据
		var obj = null;
		var currentData = "";
		req.on("data",function(data){
			currentData += data;
		});
		req.on("end",()=>{//body.toString()后再decodeURI(字串)，再JSON.parse(dataString)即可得到js对象形式
			currentData = currentData.toString();
			currentData = decodeURI(currentData);
			obj = JSON.parse(currentData);
			if(!Object.keys(obj).length)return res.end(JSON.stringify({code:0,msg:"请输入用户名和密码!"}));
			if(!obj.username)return res.end(JSON.stringify({code:0,msg:"用户名不能为空!"}));
			if(!obj.password)return res.end(JSON.stringify({code:0,msg:"密码不能为空!"}));
			setTimeout(function(){
				console.log(obj.toString());
				read("./data/users.json",function (users){
					users = users.filter(item=>item.username==obj.username);//filter找到了，就会返回数组形式，找不到则返回[]
					if(users.length===0)return res.end(JSON.stringify({code:0,msg:"用户不存在"}));
					let user = users.find(item=>item.password===obj.password);//find找到了直接返回项（只会找一个，为最先找到的），找不到直接返回undefined
					function success(){
						let userId = `${user.username}_${Date.now()}_${Math.random()}`;
						res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${setCookieTime()};`);
						return res.end(JSON.stringify({code: 1,msg: "登录成功"}));
					}
					user ? success() : res.end(JSON.stringify({code:0,msg:"密码错误"}));
				});
			},100);
		});
		return;
	}

	//解析cookie接口: 前端操作cookie，后端操作session(比较安全，直接操作cookie不安全)
	// if(pathname ==='/login_test' && req.method==='GET'){
	// 	res.setHeader("Content-Type","application/json;charset=utf8");
	// 	req.cookie={};
	// 	let cookieStr= req.headers.cookie||''; //获取请求头中的cookie 这种格式 pgv_pvid=6783597573; RK=WIZEuhS2UH; 
	// 	//cookie解析过程：
	// 	cookieStr.split(";").forEach(item=>{ //item => pgv_pvid=6783597573
	// 	  if(!item) return 
	// 	  const arr=item.split("=")
	// 	  req.cookie[ arr[0].trim() ]=arr[1].trim() //注意去除空格 不然后端设置不能修改cookie会不生效
	// 	});//经过如上的解析后我们便将cookie中的键值信息以对象的形式存入到了req.cookie中，后文中我们使用cookie信息便直接到req.cookie中去取得了
	// 	let userId = req.cookie.userid;
	// 	let expires = req.cookie.expires;
	// 	if(Object.keys(req.session.userId).length){
	// 		if(req.session.userId===userId && req.session.expires===expires){
	// 			res.end(JSON.stringify({code:1,message: `解析cookie成功,值为${req.session.userid}`,userId:req.session.userid}));
	// 		}else{
	// 			res.end("登录已失效")
	// 		}
	// 	}else{
	// 		res.end( JSON.stringify({ code:0,message:'未成功解析cookie' }) )
	// 	}
	// }


	if(req.method=="GET" && pathname=="/sliders"){
		read("./data/sliders.json",function (banners){
			res.setHeader("Content-Type","application/json;charset=utf8");
			return res.end(JSON.stringify(banners));// 写完一个接口，记得一定要return
		});
	}
	// if(pathname=="/hot"){
	// 	read("./data/books.json",function (books){
	// 		let hotBooks = books.filter(item=>item.isHot);//筛选出热门标志的图书
	// 		res.setHeader("Content-Type","application/json;charset=utf8");
	// 		return res.end(JSON.stringify(hotBooks));
	// 	})
	// }
	// if(pathname=="/collected"){
	// 	read("./data/books.json",function (books){
	// 		let collectedBooks = books.filter(item=>item.collected);//筛选出已收藏标志的图书
	// 		res.setHeader("Content-Type","application/json;charset=utf8");
	// 		return res.end(JSON.stringify(collectedBooks));
	// 	})
	// }
	let id = query.id;
	if(pathname=="/books"){
		switch(req.method){
			case("GET")://查
				if(!isNaN(id)){//查单个
					read("./data/books.json",function (books){
						// console.log(books);
						let book = books.find(item=>item.bookId==id);//数组find方法返回的是符合条件的项内容，没找到则返回undefined
						if(!book)book = {};
						res.setHeader("Content-Type","application/json;charset=utf8");
						res.end(JSON.stringify(books));
					})
				}else{//查全部
					read("./data/books.json",function (books){
						res.setHeader("Content-Type","application/json;charset=utf8");
						res.end(JSON.stringify(books.reverse()));
					})
				}
			break;
			// 增和改，都需要用到req.on,req.on得到的数据要使用的话得先JSON.parse一下
			case("POST"):{  //增
				let str = "";//eslint词法作用域报错-->外部加花括号限制作用域
				req.on("data",chunk=>{str+=chunk});
				req.on("end",()=>{
					let book = JSON.parse(str);//先拿到前端要求新增的数据样子，在读原数据，根据原数据的长度给这个样子货加对应的bookId，再push进去，最后写入即可
					read("./data/books.json",function (books){
						book.bookId = books.length ? books[books.length-1].bookId + 1 : 1;
						books.push(book);
						write("./data/books.json",books,function (){
							res.end(JSON.stringify(book));//把新增的项内容返给前端
						})
					});
				})
			}
			break;
			case("PUT")://改
				if(id){
					//先用字符串拼接req.on里边的data,在req.end里边拿到内存里的需要更新的那个数据，再用原数据比对找到那个需要更新的替换掉，最后重新全部写入文件里
					let str = "";
					req.on("data",chunk=>{str+=chunk});
					req.on("end",()=>{
						let book = JSON.parse(str);//拿到了前端要求改的数据
						read("./data/books.json",function (books){
							books = books.map(item=>item.bookId==id ? book : item);//找到相同的替换掉，其他项正常返回
							write("./data/books.json",books,function (){
								res.end(JSON.stringify(books));//返回给前端所有的数据（含更新的）
							})
						});
					})
				}
			break;
			case("DELETE")://删
			if(id){
				read(function (books){
					books = books.filter(item=>item.bookId!==id);//过滤掉和要删的那个id不相等的，就是删除操作
					write("./data/books.json",books,()=>{
						res.end(JSON.stringify({}));//返回给前端一个空对象，说明删除成功了！
					})
				})
			}
			break;
		}
		return;
	}
	
});
var port = 3000;
app.listen(port,()=>{
	console.log("server is running on " + port + "！");
})
