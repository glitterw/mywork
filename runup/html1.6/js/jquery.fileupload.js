/*请使用jquery_1.11.1*/

$(function(){

	 $.fn.uploadFile = function(option) {
		 	var _self = this;
		 	var fileid,xhr,cobj;
		 	var fileFormats = [];

		 	//清除文件
			var clear = function(id){
		       	var obj = document.getElementById(id) ; 
		         //obj.outerHTML=obj.outerHTML;
		         
		         if(!!document.all) {
		        	 obj.select();
		             document.execCommand("delete");
		         } else {
		        	 obj.value = '';
		         }
			}

			
			var file = {
				unitSize:1024 * 1024,//1M
				maxSize:1024 * 1024 * 10,
				defualtSize:1024 * 1024,//1M
				getSize:function(cSize){//文件大小计算
					var _this = this,fileSize = 0;
					if (cSize > _this.defualtSize){
						fileSize = (Math.round(cSize * 100 /_this.defualtSize) / 100).toString() + 'MB';
					}else{
						fileSize = (Math.round(cSize * 100 / 1024) / 100).toString() + 'KB';
					}
					return fileSize;
				},
				I:"image",
				M:"movie",
				V:"voice",
				T:"text",
				images:["png","jpg","bmp","gif","jpeg"],
				voice:["mp3","wav","ogg","mov"],
				movie:["mp4","webm","ogg"],	
				text:["xls","xlsx","csv"],			
				isImage:function(path){
					var flag = false;
					var suffix = path.substring(path.lastIndexOf('.') + 1);
					if(this.images.indexOf(suffix) > -1){
						flag = true;
					}
					return flag;
				},
				isUploadValid:function(type,value){
					var _this = this;
					var obj = {};
					var msg = "";
					var flag = true;
					if(!value){
						msg = "文件格式错误！";
						flag = false;
					}else{
						var suffix = value.substring(value.lastIndexOf('.') + 1);
						suffix = suffix.toLowerCase();
						if(type == _this.I){
							if(_this.images.indexOf(suffix) <= -1){
								msg = "不支持该文件格式，请重新上传";
								flag = false;
							}
						}else if(type == _this.M){
							if(_this.movie.indexOf(suffix) <= -1){
								msg = "不支持该文件格式，请重新上传";
								flag = false;
							}
						}else if(type == _this.V){
							if(_this.voice.indexOf(suffix) <= -1){
								msg = "不支持该文件格式，请重新上传";
								flag = false;
							}
						}else if(type == _this.T){
							if(_this.text.indexOf(suffix) <= -1){
								msg = "不支持该文件格式，请重新上传";
								flag = false;
							}
						}else{
							msg = "文件格式错误！";
							flag = false;
						}
					}
					obj.msg = msg;
					obj.flag = flag;
					return obj;
				},
				isAllValid:function(value){
					var _this = this;
					var obj = {};
					var msg = "";
					var flag = true;
					if(!value){
						msg = "文件格式错误！";
						flag = false;
					}else{
						var suffix = value.substring(value.lastIndexOf('.') + 1);
						if((_this.images.indexOf(suffix) <= -1) &&
								(_this.movie.indexOf(suffix) <= -1) &&
								(_this.voice.indexOf(suffix) <= -1) &&
								(_this.text.indexOf(suffix) <= -1) ){
							msg = "不支持该文件格式，请重新上传";
							flag = false;
						}

					}
					obj.msg = msg;
					obj.flag = flag;
					return obj;
				},
				//获取压缩版的图片
				small:function(imageurl){
					if(!imageurl){
						return "";
					}
					var prefix = imageurl.substring(0,imageurl.lastIndexOf("."));
					var suffix  = imageurl.substring(imageurl.lastIndexOf("."),imageurl.length);
					return prefix + "_small" + suffix;
				}
			};
			
			//文件格式列表
			var fileFormatList = function(){
				fileFormats.push({name:file.I,value:"image/*"});
				fileFormats.push({name:file.M,value:"video/*"});
				fileFormats.push({name:file.V,value:"audio/*"});
				fileFormats.push({name:file.T,value:".xls,.doc,.txt,.pdf"});
			}
			
			var getFileAccept = function(type){
				var value = "";
				for(var i = 0 ;i < fileFormats.length;i++){
					if(fileFormats[i].name == type){
						value = fileFormats[i].value;
					}
				}
				return value;
			}
			
			//accept 转换  例如格式 ".xls,.doc,.txt,.pdf"
			var acceptTranslated = function(list){
				var _list = [];
				if(list){
					for(var i = 0; i < list.length;i++){
						_list.push("."+list[i]);
					}
				}
				return _list.join(",");
			} 
			
			var fileSelected = function(option){
				fileid = option.id;
				var isvalid = true;
				var type = option.type || file.I;
				var files = document.getElementById(option.id).files;
				if(files != undefined  && files && files.length  > 0){
					var fileObj = files[0];
				
					if(fileObj &&  fileObj.size > 0){
						
						if(typeof option.customValid === 'function'){//自定义验证
							var reslt =  option.customValid (fileObj.name);
							
							if(!reslt.flag){
								clear(fileid);
								option.error(reslt.msg);
								return false;
							}
							
							isvalid = true;
						}
	
						if(isvalid && type.toLowerCase() != "all"){
							var reslt = file.isUploadValid(type,fileObj.name);
							if(!reslt.flag){
								clear(fileid);
								option.error(reslt.msg);
								return false;
							}
						}else if(isvalid && type.toLowerCase() == "all"){
							var reslt = file.isAllValid(fileObj.name);
							if(!reslt.flag){
								clear(fileid);
								option.error(reslt.msg);
								return false;
							}
						}
						
						if(option.limitsize){//文件上限
							file.maxSize = file.unitSize * option.limitsize;
						}
						
						if(fileObj.size > file.maxSize){//原始大小比较
							 clear(fileid);
							 
							 option.error(option.limitsizeMsg || "文件大小已超过总上限");
							 return false;
						}
						console.log("start...");
						upload(option.id);
						return false;
					}else{
						clear(fileid);
						option.error("文件异常或格式不支持");
						return false;
					}
				}else{
					option.error("当前浏览器无法兼容上传功能，推荐使用火狐或谷歌浏览器。");
					return false;
				}
			}
			
			var upload = function(id){
				
				if(!option.url){
					throw new Error("请配置url"); 
					return false;
				}
				
			    var fd = new FormData();
			    fd.append("Filedata", document.getElementById(id).files[0]);
			    //追加传参
			    if(option.data){
			    	for(key in option.data){
			    		fd.append(key,option.data[key]);
			    	}
			    }

			    if(window.XMLHttpRequest){
			    	xhr= new XMLHttpRequest();
			    }else{
			    	xhr= new ActiveXObject("Microsoft.XMLHTTP");
			    }
			    xhr.upload.addEventListener("progress", uploadProgress, false);
			    xhr.addEventListener("load", uploadComplete, false);
			    xhr.addEventListener("error", uploadFailed, false);
			    xhr.addEventListener("abort", uploadCanceled, false);
			    xhr.open("POST", option.url,true);//修改成自己的接口
			    xhr.send(fd);
			}
			
			var uploadProgress = function(evt){
				option.progress(evt); 
			}
			
			var uploadComplete = function(evt){
				clear(fileid);
				option.success(evt);
			}
			
			var uploadFailed = function(evt){
				clear(fileid);
				option.error("上传文件时出现错误");
			}
			
			var uploadCanceled = function(evt){
				clear(fileid);
				option.error("上传已被用户或浏览器取消");
			}
			
			//创建对象			
			fileFormatList();

			cobj = $('<input />', { 
				id: option.id, 
				name: 'file',        
				type: 'file'
					//,
				//accept:getFileAccept(option.type),
			}).css("display","none").appendTo($(_self));
			
			
	        $("#"+option.id).on("change",function(){
	        	fileSelected(option);
	        });
	        
	        
		    $(option.triggerObj).on("click", function() {
		     	$("#"+option.id).trigger("click");
		     });

	 }

})