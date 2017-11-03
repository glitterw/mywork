// JavaScript Document
$(function() {
	//三类总量
	var sanleiznFn = function() {
		$("#sanleizn").css('width', 0);
		setTimeout(function() {
			$("#sanleizn").css('width', '');
		}, 1000);
	};
	setInterval(sanleiznFn, 3000);
	//月度变化量
	var yue = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
	var yuedbhFn = function(index) {
		$(".yuedu").attr('class', 'yuedu yue_' + index).find('i').html(yue[index - 1]);
		if(index > 6) {
			$(".yuedu").addClass('yue_transform');
		}
		$(".yuedu_shijian span").removeClass('on')
		$(".yuedu_shijian span").eq(3 - Math.floor((index - 1) / 3)).addClass('on');
		$("#shegnshu_span").html(parseInt(Math.random() * 10000));
		$("#zixun_span").html(parseInt(Math.random() * 10000));
		$("#jubao_span").html(parseInt(Math.random() * 10000));
	};
	var yue_i = 1;
	yuedbhFn(yue_i);
	yue_i++;
	setInterval(function() {
		yuedbhFn(yue_i);
		yue_i++;
		if(yue_i == 13) {
			yue_i = 1;
		}
	}, 3000);

	//13区趋势
	var qusi_Fn = function() {
		var gequV = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
		var path_d = "M0,0 0,-130 0,130 0,0 ";
		var path2_d = "M";
		for(var i = 0, len = gequV.length; i < 13; i++) {
			var iV = gequV[i] * 132;
			var iX = i * 32;
			iV = parseInt(iV * (0.5 - Math.random()) * 2);
			path_d = path_d + iX + ',' + iV + ' ';
			path2_d = path2_d + iX + ',' + iV + ' ';
		}
		path_d = path_d + '384,0Z';
		//console.log(path_d);
		$("#qusi_path").attr("d", path_d);
		$("#qusi_path2").attr("d", path2_d);
	};
	setInterval(qusi_Fn, 2000);

	//中央立体地图//
	var camera, scene, renderer, directionalLight;
	var sign = [];
	var ii = 0,
		jj = -18,
		iiB = true;
	var canvasW = 1100,
		canvasH = 900;

	init();
	animate();

	function init() {
		//绘制对象(绘图区)
		renderer = new THREE.WebGLRenderer({
			//抗锯齿
			antialias: true,
			//设置透明第一步
			alpha: true
		});
		//绘制区清屏
		renderer.setClearColor(0x24262c);
		//设置透明第二步
		renderer.setClearAlpha(0.0);
		//renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(canvasW, canvasH);

		//创建3D场景
		scene = new THREE.Scene();

		//绘制平面
		//平面尺寸
		var planeGeometry = new THREE.BoxGeometry(canvasH * 2, 1, canvasH * 2); //平面材质
		var planeMaterial = new THREE.MeshBasicMaterial({
			color: 0xf0f0f0,
			//使用线框wireframe: true
		});
		//尺寸与材质合成平面
		var plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.position.set(0, -22, 0);
		//scene.add(plane);

		//坐标轴
		//scene.add(new THREE.AxisHelper(400));

		var crateTexture = new THREE.TextureLoader().load("img/quanqu.png");
		//插入武汉地图
		var points = map_All;
		var mesh = new THREE.Mesh(svg2_5D(points, 1), new THREE.MeshLambertMaterial({
			map: crateTexture,
			color: 0x666666,
			wireframe: false,
		}));

		//mesh.vertices所有顶点
		//mesh.faces所有面

		mesh.rotation.set(90 * Math.PI / 180, 0, 0);
		mesh.scale.set(1.5, 1.5, 1.0)
		mesh.position.set(-400, -2, -300);

		//地图承接阴影
		mesh.receiveShadow = true;

		//将武汉地图插入场景
		scene.add(mesh);

		//插入武汉地图2
		var points = map_All;
		var mesh2 = new THREE.Mesh(svg2_5D(points, 20), new THREE.MeshPhongMaterial({
			color: 0x2b2e36,
			wireframe: false
		}));

		mesh2.rotation.set(90 * Math.PI / 180, 0, 0);
		mesh2.scale.set(1.5, 1.5, 1.0)
		mesh2.position.set(-400, -3, -300);

		//将武汉地图插入场景
		scene.add(mesh2);

		//创建立方体
		function cubeFn(W, H, T, color0x, pX, pZ) {
			var cubeGeometry = new THREE.BoxGeometry(W, T, H);
			var cubeMaterial = new THREE.MeshLambertMaterial({
				color: color0x

			});
			var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
			cube.rotation.set(0, 0 * Math.PI / 180, 0);
			cube.position.set(pX || 0, T * .5, pZ || 0);

			//立方体阴影
			cube.castShadow = true;

			//将立方体插入场景
			scene.add(cube);
		};
		//		for(var i = 0; i < 20; i++) {
		//			cubeFn(20, 20, 200 * Math.random(), 0x54a8ff * Math.random(), 400 * Math.random() - 200, 400 * Math.random() - 200);
		//		};
		var aZB = [];
		var randomFn = function() {
			var zb = {};
			var zbB = true;
			zb.x = Math.round((600 * Math.random() - 250) / 20) * 20;
			zb.z = Math.round((0.7 * zb.x - 110 * Math.random() + 40) / 20) * 20;
			for(var i = 0, len = aZB.length; i < len; i++) {
				if((zb.x == aZB[i].x) && (zb.z == aZB[i].z)) {
					zbB = false;
				}
			}
			if(zbB) {
				aZB.push(zb);
			} else {
				randomFn();
			}
		};
		for(var i = 0; i < 40; i++) {
			randomFn();
		};
		for(var i = 0, len = aZB.length; i < len; i++) {
			var color = 'hsl(190, 60% ,' + Math.round(52 - 30 * Math.random()) + '%)';
			var T = 120 * Math.random() + 10;
			aZB[i].color = color;
			aZB[i].T = T;
			cubeFn(20, 20, T, color, aZB[i].x, aZB[i].z);
		};
		//2d8898
		cubeFn(20, 20, 200, 0xca4735, -250, -210);
		cubeFn(20, 20, 170, 0xca4735, 350, 210);

		cubeFn(20, 20, 160, 0xca4735, -170, 100);
		cubeFn(20, 20, 20, 0x2d8898, -210, 110);
		cubeFn(20, 20, 80, 0x2d8898, -190, 130);
		cubeFn(20, 20, 60, 0x2d8898, -210, 90);

		cubeFn(20, 20, 140, 0xca4735, 300, -140);
		cubeFn(20, 20, 20, 0x2d8898, 340, -150);
		cubeFn(20, 20, 90, 0x2d8898, 310, -180);
		cubeFn(20, 20, 50, 0x2d8898, 290, -160);

		//加载图片
		var Png1Texture = new THREE.TextureLoader().load("img/huan_1.png");
		var Png2Texture = [];
		for(var i = 0; i < 13; i++) {
			var Png2TextureO = new THREE.TextureLoader().load("img/" + (i + 1) + ".png");
			Png2Texture.push(Png2TextureO);
		};
		//绘制文字
		function fontFn(Text) {
			var canvas = document.createElement('canvas');
			canvas.width = 650;
			canvas.height = 140;
			var ctx = canvas.getContext('2d');
			ctx.fillStyle = "#fd664b";
			ctx.font = "normal bold 100px Arial";
			ctx.fillText(Text, 0, 120);
			return canvas;
		}
		//广告牌
		function signFn(x, y, z, Xr, Yr, Zr, qu) {
			//绘制底座
			var signGeometry = new THREE.PlaneGeometry(17, 17);
			var signMaterial = new THREE.MeshBasicMaterial({
				map: Png1Texture,
				color: 0xffffff,
				transparent: true,
				opacity: 0.4
			});
			var sign = new THREE.Mesh(signGeometry, signMaterial);
			sign.position.set((x || 0), (y || 0), (z || 0));
			var Xr0 = (Xr || 0) * Math.PI / 180;
			var Yr0 = (Yr || 0) * Math.PI / 180;
			var Zr0 = (Zr || 0) * Math.PI / 180;
			sign.rotation.set(Xr0, Yr0, Zr0);
			//绘制牌子
			var sign2Geometry = new THREE.PlaneGeometry(5.0, 29.4);
			var sign2Material = new THREE.MeshBasicMaterial({
				map: Png2Texture[0],
				color: 0xffffff,
				transparent: true,
				side: THREE.DoubleSide,
			});
			var i = 0;
			var timeI = 60;
			var timeFn = function() {
				setTimeout(function() {
					i = i % 13 + 1;
					if(i > 6) {
						timeI = 100
					} else {
						timeI = 60
					};
					sign2Material.map = Png2Texture[i];
					timeFn();
				}, timeI);
			}
			timeFn();

			var sign2 = new THREE.Mesh(sign2Geometry, sign2Material);
			sign2.rotation.set(90 * Math.PI / 180, 0, 0);
			sign2.position.set(0, 0, 14.7);
			sign.add(sign2);
			sign.scale.set(10, 10, 10);

			//绘制文字
			var sign3Geometry = new THREE.PlaneGeometry(10, 2.2);
			//加载canvas贴图
			var textQu = new THREE.Texture(fontFn(qu));
			//加载canvas贴图后处理为纹理(贴图);
			textQu.needsUpdate = true;

			var sign3Material = new THREE.MeshBasicMaterial({
				map: textQu,
				color: 0xffffff,
				transparent: true,
				side: THREE.DoubleSide,
			});
			var sign3 = new THREE.Mesh(sign3Geometry, sign3Material);
			sign3.position.set(0, 17, 0);
			sign2.add(sign3);

			scene.add(sign);
			return sign;
		};
		sign.push(signFn(-250, 0, -210, -90, 0, 0, "江夏区 1800件"));
		sign.push(signFn(350, 1, 210, -90, 0, 0, "武昌区 1300件"));
		sign.push(signFn(-170, 2, 100, -90, 0, 0, "江汉区 1600件"));
		sign.push(signFn(300, 3, -140, -90, 0, 0, "蔡甸区 110件"));
		//坐标轴
		//scene.add(new THREE.AxisHelper(400));
		/////

		////

		//正交相机
		camera = new THREE.OrthographicCamera(canvasW / -2, canvasW / 2, canvasH / 2, canvasH / -2, -500, 1000);
		camera.position.set(200, 150, 200);
		camera.left = canvasW / -2;
		camera.right = canvasW / 2;
		camera.top = canvasH / 2;
		camera.bottom = canvasH / -2;

		//创建环境光
		var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
		scene.add(ambientLight);

		//创建平行光
		directionalLight = new THREE.DirectionalLight(0xffffff, .9);
		directionalLight.position.set(0.18, 0.94, 0.54);
		//平行光应用阴影
		directionalLight.castShadow = true;
		directionalLight.target = scene; //创建一个目标点对象,目标点对象是一个Object3D对象.
		//

		directionalLight.shadow.camera.near = -500;
		//shadowCameraNear属性,正交投影立方体近端,定义一个范围(正交投影立方体),不计算在范围之外的物体的阴影,near默认是50
		directionalLight.shadow.camera.far = 1000;
		//shadowCameraFar属性,正交投影立方体远端,定义一个范围(正交投影立方体),不计算在范围之外的物体的阴影,far默认是5000

		directionalLight.shadow.camera.left = canvasW / -2;
		//shadowCameraLeft属性,正交投影立方体左端,定义一个范围(正交投影立方体),不计算在范围之外的物体的阴影,left默认是500
		directionalLight.shadow.camera.right = canvasW / 2;
		//shadowCameraRight属性,正交投影立方体右端,定义一个范围(正交投影立方体),不计算在范围之外的物体的阴影,right默认是500
		directionalLight.shadow.camera.top = canvasH / 2;
		//shadowCameraTop属性,正交投影立方体上端,定义一个范围(正交投影立方体),不计算在范围之外的物体的阴影,top默认是500
		directionalLight.shadow.camera.bottom = canvasH / -2;
		//shadowCameraBottom属性,正交投影立方体下端,定义一个范围(正交投影立方体),不计算在范围之外的物体的阴影,Bottom默认是500

		scene.add(directionalLight);

		//创建平行光2
		directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
		directionalLight2.position.set(0.18, 0.94, 0.54);
		scene.add(directionalLight2);

		//场景应用阴影
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		//将绘制区加入页面
		document.getElementById('zhongxin3D').appendChild(renderer.domElement);

		window.addEventListener('resize', onWindowResize, false);

	}

	function onWindowResize() {

		camera.left = canvasW / -2;
		camera.right = canvasW / 2;
		camera.top = canvasH / 2;
		camera.bottom = canvasH / -2;
		//更新投影阵列
		//camera.updateProjectionMatrix();
		renderer.setSize(canvasW, canvasH);

	}

	function animate() {

		requestAnimationFrame(animate);

		render();

	}

	function render() {

		var timer = Date.now() * 0.0002;

		camera.position.x = Math.cos(timer) * 200;
		camera.position.z = Math.sin(timer) * 200;
		camera.lookAt(scene.position);

		directionalLight.position.x = Math.cos(timer * 2) * 0.35;
		directionalLight.position.y = 0.94;
		directionalLight.position.z = Math.sin(timer * 2) * 0.35;
		directionalLight.position.normalize();

		directionalLight2.position.x = Math.cos(timer) * 0.35;
		directionalLight2.position.y = 0.94;
		directionalLight2.position.z = Math.sin(timer) * 0.35;
		directionalLight2.position.normalize();

		sign[0].rotation.z = -timer + 90 * Math.PI / 180;
		sign[1].rotation.z = -timer + 90 * Math.PI / 180;
		sign[2].rotation.z = -timer + 90 * Math.PI / 180;
		sign[3].rotation.z = -timer + 90 * Math.PI / 180;
		addremoveSign();
		renderer.render(scene, camera);
	}
	//删除几何体,释放内存
	//sign[0].geometry.dispose();
	//sign[0].material.dispose();
	//scene.remove(sign[0]);
	sign[0].children[0].position.z = -18;
	sign[1].children[0].position.z = -18;
	sign[2].children[0].position.z = -18;
	sign[3].children[0].position.z = -18;
	scene.remove(sign[1]);
	scene.remove(sign[2]);
	scene.remove(sign[3]);

	function addremoveSign() {
		if(jj >= 26) {
			iiB = false;
		};
		if(jj < -18) {
			scene.remove(sign[ii]);
			iiB = true;
			ii = (ii + 1) % 4;
			scene.add(sign[ii]);
		};
		if(iiB) {
			jj = jj + 0.2;
			if(sign[ii].material.opacity < 1.0) {
				sign[ii].material.opacity = sign[ii].material.opacity + 0.03;
			}
		};
		if(!iiB) {
			jj = jj - 0.2;
			if(sign[ii].material.opacity > 0.4) {
				sign[ii].material.opacity = sign[ii].material.opacity - 0.03;
			}
		};
		if(jj > 14.7) {
			sign[ii].children[0].position.z = 14.7;
		} else {
			sign[ii].children[0].position.z = jj;
		}
	};

	//立体地图结束//

});