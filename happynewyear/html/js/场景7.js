(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [
		{name:"场景7_atlas_", frames: [[917,645,208,208],[0,359,1137,284],[306,851,583,50],[1137,0,360,353],[1449,661,563,95],[1822,472,142,160],[306,645,298,204],[1449,472,371,187],[1139,472,308,234],[606,645,309,178],[1139,355,819,115],[1560,758,264,115],[0,872,264,62],[0,645,304,225],[0,0,1135,357],[1127,844,226,96],[1127,708,263,134],[1499,0,319,306],[1392,758,166,198],[1820,0,183,304]]}
];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:



(lib.一亿 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.小图标群 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.成功 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.地球 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib._1010 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib._20 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib._200 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib._3000 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.电脑 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib._5 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.line = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.line1 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.line2 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.数据框 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.txt1 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.txt2 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.txt3 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.奖状 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.人群 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.路灯 = function() {
	this.spriteSheet = ss["场景7_atlas_"];
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.路灯_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.路灯();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.路灯_1, new cjs.Rectangle(0,0,183,304), null);


(lib.txt1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.txt1_1, new cjs.Rectangle(0,0,1135,357), null);


(lib.补间36 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.数据框();
	this.instance.parent = this;
	this.instance.setTransform(-152,-112.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-152,-112.5,304,225);


(lib.补间35 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.数据框();
	this.instance.parent = this;
	this.instance.setTransform(-152,-112.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-152,-112.5,304,225);


(lib.补间34 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.成功();
	this.instance.parent = this;
	this.instance.setTransform(-291.5,-25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291.5,-25,583,50);


(lib.补间33 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.成功();
	this.instance.parent = this;
	this.instance.setTransform(-291.5,-25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291.5,-25,583,50);


(lib.补间32 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.一亿();
	this.instance.parent = this;
	this.instance.setTransform(-104,-104);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-104,-104,208,208);


(lib.补间31 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.一亿();
	this.instance.parent = this;
	this.instance.setTransform(-104,-104);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-104,-104,208,208);


(lib.补间29 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._3000();
	this.instance.parent = this;
	this.instance.setTransform(-185.5,-93.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-185.5,-93.5,371,187);


(lib.补间27 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._5();
	this.instance.parent = this;
	this.instance.setTransform(-154.5,-89);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-154.5,-89,309,178);


(lib.补间26 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._200();
	this.instance.parent = this;
	this.instance.setTransform(-149,-102);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-149,-102,298,204);


(lib.补间25 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._200();
	this.instance.parent = this;
	this.instance.setTransform(-149,-102);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-149,-102,298,204);


(lib.补间24 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._20();
	this.instance.parent = this;
	this.instance.setTransform(-71,-80);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71,-80,142,160);


(lib.补间23 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._20();
	this.instance.parent = this;
	this.instance.setTransform(-71,-80);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71,-80,142,160);


(lib.补间22 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.地球();
	this.instance.parent = this;
	this.instance.setTransform(-180,-176.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-180,-176.5,360,353);


(lib.补间21 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt2();
	this.instance.parent = this;
	this.instance.setTransform(-113,-48);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-113,-48,226,96);


(lib.补间20 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt3();
	this.instance.parent = this;
	this.instance.setTransform(-131.5,-67);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-131.5,-67,263,134);


(lib.补间19 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.人群();
	this.instance.parent = this;
	this.instance.setTransform(-83,-99);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-83,-99,166,198);


(lib.补间18 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.地球();
	this.instance.parent = this;
	this.instance.setTransform(-180,-176.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-180,-176.5,360,353);


(lib.补间17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt2();
	this.instance.parent = this;
	this.instance.setTransform(-113,-48);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-113,-48,226,96);


(lib.补间16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt3();
	this.instance.parent = this;
	this.instance.setTransform(-131.5,-67);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-131.5,-67,263,134);


(lib.补间15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.人群();
	this.instance.parent = this;
	this.instance.setTransform(-83,-99);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-83,-99,166,198);


(lib.补间14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.地球();
	this.instance.parent = this;
	this.instance.setTransform(-180,-176.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-180,-176.5,360,353);


(lib.补间13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.地球();
	this.instance.parent = this;
	this.instance.setTransform(-180,-176.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-180,-176.5,360,353);


(lib.补间12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt2();
	this.instance.parent = this;
	this.instance.setTransform(-113,-48);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-113,-48,226,96);


(lib.补间11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt2();
	this.instance.parent = this;
	this.instance.setTransform(-113,-48);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-113,-48,226,96);


(lib.补间10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt3();
	this.instance.parent = this;
	this.instance.setTransform(-131.5,-67);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-131.5,-67,263,134);


(lib.补间9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt3();
	this.instance.parent = this;
	this.instance.setTransform(-131.5,-67);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-131.5,-67,263,134);


(lib.补间8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.人群();
	this.instance.parent = this;
	this.instance.setTransform(-83,-99);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-83,-99,166,198);


(lib.补间7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.人群();
	this.instance.parent = this;
	this.instance.setTransform(-83,-99);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-83,-99,166,198);


(lib.下图标群 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.小图标群();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.下图标群, new cjs.Rectangle(0,0,1137,284), null);


(lib.奖状_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.奖状();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.奖状_1, new cjs.Rectangle(0,0,319,306), null);


(lib.line_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.line();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.line_1, new cjs.Rectangle(0,0,819,115), null);


(lib.line2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.line2();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.line2_1, new cjs.Rectangle(0,0,264,62), null);


(lib.line1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.line1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.line1_1, new cjs.Rectangle(0,0,264,115), null);


(lib.电脑_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.电脑();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.电脑_1, new cjs.Rectangle(0,0,308,234), null);


(lib.补间4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.路灯_1();
	this.instance.parent = this;
	this.instance.setTransform(-329.9,33.5,1,1,0,0,0,91.5,152);

	this.instance_1 = new lib.txt1_1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,-6.9,1,1,0,0,0,567.5,178.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-567.5,-185.4,1135,370.9);


(lib.补间3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.路灯_1();
	this.instance.parent = this;
	this.instance.setTransform(-329.9,33.5,1,1,0,0,0,91.5,152);

	this.instance_1 = new lib.txt1_1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,-6.9,1,1,0,0,0,567.5,178.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-567.5,-185.4,1135,370.9);


// stage content:
(lib.无标题1 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// 下图标群
	this.instance = new lib.下图标群();
	this.instance.parent = this;
	this.instance.setTransform(570.5,791.8,1,1,0,0,0,568.5,142);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:571,y:497.8},19).wait(25).to({x:1727,y:507.8},15).to({_off:true},1).wait(261));

	// txt1
	this.instance_1 = new lib.补间3("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(569.5,-183.4);

	this.instance_2 = new lib.补间4("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(572.5,186.7);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,x:572.5,y:186.7},19).wait(302));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},19).to({startPosition:0},25).to({x:-577.4,y:187.5},15).to({_off:true},1).wait(261));

	// 人群.png
	this.instance_3 = new lib.补间7("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(-92,375);
	this.instance_3._off = true;

	this.instance_4 = new lib.补间8("synched",0);
	this.instance_4.parent = this;
	this.instance_4.setTransform(370,375);
	this.instance_4._off = true;

	this.instance_5 = new lib.补间15("synched",0);
	this.instance_5.parent = this;
	this.instance_5.setTransform(370,375);
	this.instance_5._off = true;

	this.instance_6 = new lib.补间19("synched",0);
	this.instance_6.parent = this;
	this.instance_6.setTransform(-92,375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3}]},60).to({state:[{t:this.instance_4}]},19).to({state:[{t:this.instance_5}]},21).to({state:[{t:this.instance_6}]},19).to({state:[]},1).wait(201));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(60).to({_off:false},0).to({_off:true,x:370},19).wait(242));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(60).to({_off:false},19).to({_off:true},21).wait(221));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(79).to({_off:false},21).to({_off:true,x:-92},19).wait(202));

	// 电脑
	this.instance_7 = new lib.电脑_1();
	this.instance_7.parent = this;
	this.instance_7.setTransform(570,322.5,1,1,0,0,0,154,117);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(119).to({_off:false},0).to({alpha:1},10).wait(30).to({alpha:0.039},20).to({_off:true},1).wait(141));

	// 奖状
	this.instance_8 = new lib.奖状_1();
	this.instance_8.parent = this;
	this.instance_8.setTransform(570,322.5,1,1,0,0,0,159.5,153);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(180).to({_off:false},0).to({alpha:1},9).wait(30).to({alpha:0},20).to({_off:true},1).wait(81));

	// 5.png
	this.instance_9 = new lib.补间27("synched",0);
	this.instance_9.parent = this;
	this.instance_9.setTransform(1309.5,335);
	this.instance_9._off = true;

	this.instance_10 = new lib._5();
	this.instance_10.parent = this;
	this.instance_10.setTransform(1148,223);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_9}]},180).to({state:[{t:this.instance_9}]},19).to({state:[{t:this.instance_9}]},20).to({state:[{t:this.instance_10}]},20).to({state:[]},1).wait(81));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(180).to({_off:false},0).to({x:872.5},19).to({startPosition:0},20).to({_off:true,x:1148,y:223},20).wait(82));

	// 3000.png
	this.instance_11 = new lib.补间29("synched",0);
	this.instance_11.parent = this;
	this.instance_11.setTransform(-196.5,339.5);
	this.instance_11._off = true;

	this.instance_12 = new lib._3000();
	this.instance_12.parent = this;
	this.instance_12.setTransform(-383,242);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_11}]},180).to({state:[{t:this.instance_11}]},19).to({state:[{t:this.instance_11}]},20).to({state:[{t:this.instance_12}]},20).to({state:[]},1).wait(81));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(180).to({_off:false},0).to({x:208.5},19).to({startPosition:0},20).to({_off:true,x:-383,y:242},20).wait(82));

	// line
	this.instance_13 = new lib.line_1();
	this.instance_13.parent = this;
	this.instance_13.setTransform(562.5,345.5,1,1,0,0,0,409.5,57.5);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(180).to({_off:false},0).to({alpha:1},19).wait(20).to({y:343.5,alpha:0},20).to({_off:true},1).wait(81));

	// 20.png
	this.instance_14 = new lib.补间23("synched",0);
	this.instance_14.parent = this;
	this.instance_14.setTransform(-87,462);
	this.instance_14._off = true;

	this.instance_15 = new lib.补间24("synched",0);
	this.instance_15.parent = this;
	this.instance_15.setTransform(166,462);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(119).to({_off:false},0).to({_off:true,x:166},21).wait(19).to({_off:false,x:-87},20).to({_off:true},1).wait(141));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(119).to({_off:false},21).wait(19).to({startPosition:0},0).to({_off:true,x:-87},20).wait(142));

	// 200.png
	this.instance_16 = new lib.补间25("synched",0);
	this.instance_16.parent = this;
	this.instance_16.setTransform(1301,308);
	this.instance_16._off = true;

	this.instance_17 = new lib.补间26("synched",0);
	this.instance_17.parent = this;
	this.instance_17.setTransform(956,308);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(119).to({_off:false},0).to({_off:true,x:956},21).wait(19).to({_off:false,x:1301},20).to({_off:true},1).wait(141));
	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(119).to({_off:false},21).wait(19).to({startPosition:0},0).to({_off:true,x:1301},20).wait(142));

	// line2
	this.instance_18 = new lib.line2_1();
	this.instance_18.parent = this;
	this.instance_18.setTransform(297.2,395,1,1,0,0,0,132.2,31);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(119).to({_off:false},0).to({regX:132,x:297,alpha:1},21).wait(19).to({regX:132.2,x:297.2,alpha:0},20).to({_off:true},1).wait(141));

	// line1
	this.instance_19 = new lib.line1_1();
	this.instance_19.parent = this;
	this.instance_19.setTransform(828.1,317.6,1,1,0,0,0,132,57.5);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(119).to({_off:false},0).to({alpha:0.961},21).wait(19).to({alpha:0},20).to({_off:true},1).wait(141));

	// txt3.png
	this.instance_20 = new lib.补间9("synched",0);
	this.instance_20.parent = this;
	this.instance_20.setTransform(-144.5,181);
	this.instance_20._off = true;

	this.instance_21 = new lib.补间10("synched",0);
	this.instance_21.parent = this;
	this.instance_21.setTransform(274.5,181);
	this.instance_21._off = true;

	this.instance_22 = new lib.补间16("synched",0);
	this.instance_22.parent = this;
	this.instance_22.setTransform(274.5,181);
	this.instance_22._off = true;

	this.instance_23 = new lib.补间20("synched",0);
	this.instance_23.parent = this;
	this.instance_23.setTransform(-187.5,181);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_20}]},60).to({state:[{t:this.instance_21}]},19).to({state:[{t:this.instance_22}]},21).to({state:[{t:this.instance_23}]},19).to({state:[]},1).wait(201));
	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(60).to({_off:false},0).to({_off:true,x:274.5},19).wait(242));
	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(60).to({_off:false},19).to({_off:true},21).wait(221));
	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(79).to({_off:false},21).to({_off:true,x:-187.5},19).wait(202));

	// txt2.png
	this.instance_24 = new lib.补间11("synched",0);
	this.instance_24.parent = this;
	this.instance_24.setTransform(1259,440);
	this.instance_24._off = true;

	this.instance_25 = new lib.补间12("synched",0);
	this.instance_25.parent = this;
	this.instance_25.setTransform(869,440);
	this.instance_25._off = true;

	this.instance_26 = new lib.补间17("synched",0);
	this.instance_26.parent = this;
	this.instance_26.setTransform(869,440);
	this.instance_26._off = true;

	this.instance_27 = new lib.补间21("synched",0);
	this.instance_27.parent = this;
	this.instance_27.setTransform(1619,440);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_24}]},60).to({state:[{t:this.instance_25}]},19).to({state:[{t:this.instance_26}]},21).to({state:[{t:this.instance_27}]},19).to({state:[]},1).wait(201));
	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(60).to({_off:false},0).to({_off:true,x:869},19).wait(242));
	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(60).to({_off:false},19).to({_off:true},21).wait(221));
	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(79).to({_off:false},21).to({_off:true,x:1619},19).wait(202));

	// 地球.png
	this.instance_28 = new lib.补间13("synched",0);
	this.instance_28.parent = this;
	this.instance_28.setTransform(1335,324.5);
	this.instance_28._off = true;

	this.instance_29 = new lib.补间14("synched",0);
	this.instance_29.parent = this;
	this.instance_29.setTransform(582,324.5);
	this.instance_29._off = true;

	this.instance_30 = new lib.补间18("synched",0);
	this.instance_30.parent = this;
	this.instance_30.setTransform(582,324.5);
	this.instance_30._off = true;

	this.instance_31 = new lib.补间22("synched",0);
	this.instance_31.parent = this;
	this.instance_31.setTransform(1332,324.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_28}]},60).to({state:[{t:this.instance_29}]},19).to({state:[{t:this.instance_30}]},21).to({state:[{t:this.instance_31}]},19).to({state:[]},1).wait(201));
	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(60).to({_off:false},0).to({_off:true,x:582},19).wait(242));
	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(60).to({_off:false},19).to({_off:true},21).wait(221));
	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(79).to({_off:false},21).to({_off:true,x:1332},19).wait(202));

	// 一亿.png
	this.instance_32 = new lib.补间31("synched",0);
	this.instance_32.parent = this;
	this.instance_32.setTransform(1297,368);
	this.instance_32._off = true;

	this.instance_33 = new lib.补间32("synched",0);
	this.instance_33.parent = this;
	this.instance_33.setTransform(732,358);
	this.instance_33._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(240).to({_off:false},0).to({_off:true,x:732,y:358},18).wait(42).to({_off:false,x:1297,y:368},19).to({_off:true},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(240).to({_off:false},18).wait(42).to({startPosition:0},0).to({_off:true,x:1297,y:368},19).wait(2));

	// 成功.png
	this.instance_34 = new lib.补间33("synched",0);
	this.instance_34.parent = this;
	this.instance_34.setTransform(1440.5,497);
	this.instance_34._off = true;

	this.instance_35 = new lib.补间34("synched",0);
	this.instance_35.parent = this;
	this.instance_35.setTransform(570.5,497);
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(240).to({_off:false},0).to({_off:true,x:570.5},18).wait(42).to({_off:false,x:1440.5},19).to({_off:true},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(240).to({_off:false},18).wait(42).to({startPosition:0},0).to({_off:true,x:1440.5},19).wait(2));

	// 数据框.png
	this.instance_36 = new lib.补间35("synched",0);
	this.instance_36.parent = this;
	this.instance_36.setTransform(-194.9,282.5);
	this.instance_36._off = true;

	this.instance_37 = new lib.补间36("synched",0);
	this.instance_37.parent = this;
	this.instance_37.setTransform(570,282.5);
	this.instance_37._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(240).to({_off:false},0).to({_off:true,x:570},18).wait(42).to({_off:false,x:-194.9},19).to({_off:true},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(240).to({_off:false},18).wait(42).to({startPosition:0},0).to({_off:true,x:-194.9},19).wait(2));

	// 1010.png
	this.instance_38 = new lib._1010();
	this.instance_38.parent = this;
	this.instance_38.setTransform(273,247);
	this.instance_38._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(258).to({_off:false},0).to({_off:true},42).wait(21));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(572,-46.4,1137,1302.7);
// library properties:
lib.properties = {
	width: 1140,
	height: 645,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"images/场景7_atlas_.png", id:"场景7_atlas_"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;