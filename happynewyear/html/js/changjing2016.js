// JavaScript Document

/*场景2016*/
winW = ((document.documentElement.clientWidth > document.documentElement.clientHeight) ? document.documentElement.clientWidth : document.documentElement.clientHeight);
winH = ((document.documentElement.clientWidth < document.documentElement.clientHeight) ? document.documentElement.clientWidth : document.documentElement.clientHeight);
//绘制对象(绘图区)
renderer = new THREE.WebGLRenderer({
	//抗锯齿
	antialias: true,
	//设置透明第一步
	alpha: true
});
//绘制区清屏
renderer.setClearColor(0xffffff);
//设置透明第二步
renderer.setClearAlpha(0.0);
//renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(winW, winH);

//创建3D场景
var scene = new THREE.Scene();

//加载图片
var shengjing = new THREE.TextureLoader().load("images/shengjing.png");
var dibanT = new THREE.TextureLoader().load("images/diban.png");
var qianLT = new THREE.TextureLoader().load("images/qiang_l.jpg");
var qianRT = new THREE.TextureLoader().load("images/qiang_r.jpg");

//最深处墙
var PlaneGeometry = new THREE.PlaneGeometry(1130, 640, 10, 10); //平面材质
var PlaneMaterial = new THREE.MeshLambertMaterial({
	map: shengjing,
	color: 0xffffff,
	//平面两面显示side: THREE.DoubleSide,
	//使用线框wireframe: true
});
//尺寸与材质合成平面
var Plane = new THREE.Mesh(PlaneGeometry, PlaneMaterial);
//平面空间位置
Plane.position.set(0, 0, -2987);
scene.add(Plane);

//绘制平面
//平面尺寸
var tianGeometry = new THREE.PlaneGeometry(1130, 3000, 10, 10); //平面材质
var tianMaterial = new THREE.MeshLambertMaterial({
	color: 0xfdfbeb
});
//尺寸与材质合成平面
var tian = new THREE.Mesh(tianGeometry, tianMaterial);
//平面空间位置
tian.position.set(0, 320, 1500);
tian.rotation.set(90 * Math.PI / 180, 0, 0);
//将平面插入场景
Plane.add(tian);

//绘制平面
//平面尺寸
var dibanGeometry = new THREE.PlaneGeometry(1130, 3000, 10, 10); //平面材质
var dibanMaterial = new THREE.MeshLambertMaterial({
	map: dibanT,
	color: 0xffffff,
	//使用线框wireframe: true
});
//尺寸与材质合成平面
var diban = new THREE.Mesh(dibanGeometry, dibanMaterial);
//平面空间位置
diban.position.set(0, -320, 1500);
diban.rotation.set(-90 * Math.PI / 180, 0, 0);
//将平面插入场景
Plane.add(diban);

//绘制平面
//平面尺寸
var qianLGeometry = new THREE.PlaneGeometry(3000, 640, 10, 10); //平面材质
var qianLMaterial = new THREE.MeshLambertMaterial({
	map: qianLT,
	color: 0xffffff,
	transparent: true,
	side: THREE.DoubleSide,
	//平面两面显示side: THREE.DoubleSide,
	//使用线框wireframe: true
});
//尺寸与材质合成平面
var qianL = new THREE.Mesh(qianLGeometry, qianLMaterial);
//平面空间位置
qianL.position.set(-565, 0, 1500);
qianL.rotation.set(0, 90 * Math.PI / 180, 0);
//将平面插入场景
Plane.add(qianL);

var qianRGeometry = new THREE.PlaneGeometry(3000, 640, 10, 10); //平面材质
var qianRMaterial = new THREE.MeshLambertMaterial({
	map: qianRT,
	color: 0xffffff,
	transparent: true,
	side: THREE.DoubleSide,
	//使用线框wireframe: true
});
//尺寸与材质合成平面
var qianR = new THREE.Mesh(qianRGeometry, qianRMaterial);
//平面空间位置
qianR.position.set(565, 0, 1500);
qianR.rotation.set(0, 90 * Math.PI / 180, 0);
//将平面插入场景
Plane.add(qianR);
var imgAll = [];
var txtAll = [];
var imgT, txtT, AllGeometry, AllMaterial1, AllMaterial2;
for(var i = 0; i < 25; i++) {
	var j = i + 1;
	imgT = new THREE.TextureLoader().load("images/yue_" + j + "_img.png");
	txtT = new THREE.TextureLoader().load("images/yue_" + j + "_t.png");
	AllGeometry = new THREE.PlaneGeometry(1130, 640, 10, 10); //平面材质
	AllMaterial1 = new THREE.MeshLambertMaterial({
		map: imgT,
		color: 0xffffff,
		transparent: true,
		side: THREE.DoubleSide,
		//使用线框wireframe: true
	});
	imgAll[i] = new THREE.Mesh(AllGeometry, AllMaterial1);
	imgAll[i].position.set(0, 0, 3000 - i * 100);
	Plane.add(imgAll[i]);
	AllMaterial2 = new THREE.MeshLambertMaterial({
		map: txtT,
		color: 0xffffff,
		transparent: true,
		side: THREE.DoubleSide,
		//使用线框wireframe: true
	});
	txtAll[i] = new THREE.Mesh(AllGeometry, AllMaterial2);
	txtAll[i].position.set(0, 0, 3000 - i * 100);
	Plane.add(txtAll[i]);
}

//坐标轴
//scene.add(new THREE.AxisHelper(100));

//创建透视相机
var camera = new THREE.PerspectiveCamera(150, winW / winH, 1, 3500);
//相机位置
camera.position.set(0, 0, 100);
//相机朝向
camera.lookAt(scene.position);

//创建环境光
var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
//创建聚光灯光源
//var spotLight = new THREE.SpotLight(0xFFFFFF, 0.1);
//spotLight.position.set(0, 0, 4000);
//spotLight.target = imgAll[0];
//scene.add(spotLight);

//将绘制区加入页面
document.getElementById('content_2016').appendChild(renderer.domElement);

//将场景和相机插入绘制区
renderer.render(scene, camera);

//修改为动画渲染场景到镜头
var planeV = 2;

function render() {
	if((Plane.position.z + planeV) <= -600 && (Plane.position.z + planeV) >= -2988) {
		requestAnimationFrame(render);
		Plane.position.z += planeV;
	} else {
		jing2016off();
	}
	renderer.render(scene, camera);
}
//调用render方法
//render();

$('#jing_2016').swipeUp(function(e) {
	planeV = 2;
	//e.stopPropagation();
});
$('#jing_2016').swipeDown(function(e) {
	planeV = -2;
	//e.stopPropagation();
});
var pvrPlaneV = 0;
$('#jing_2016').tap(function(e) {
	var pV = planeV;
	planeV = pvrPlaneV;
	pvrPlaneV = pV;
	//e.stopPropagation();
});
console.log('rgpenuiing');
/*场景2016*/
function jing2016() {
	//调用render方法
	render();
};