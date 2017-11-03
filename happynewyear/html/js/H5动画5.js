(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [
		{name:"H5动画5_atlas_", frames: [[0,0,928,255],[0,1187,520,55],[0,257,589,341],[0,600,490,373],[492,600,467,319],[591,257,408,121],[492,921,491,264],[0,975,466,175],[591,380,119,156]]}
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



(lib.树 = function() {
	this.spriteSheet = ss["H5动画5_atlas_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.txt1 = function() {
	this.spriteSheet = ss["H5动画5_atlas_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.txt2 = function() {
	this.spriteSheet = ss["H5动画5_atlas_"];
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.txt3 = function() {
	this.spriteSheet = ss["H5动画5_atlas_"];
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.右山 = function() {
	this.spriteSheet = ss["H5动画5_atlas_"];
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.右云 = function() {
	this.spriteSheet = ss["H5动画5_atlas_"];
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.左山 = function() {
	this.spriteSheet = ss["H5动画5_atlas_"];
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.左云 = function() {
	this.spriteSheet = ss["H5动画5_atlas_"];
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.旗子 = function() {
	this.spriteSheet = ss["H5动画5_atlas_"];
	this.gotoAndStop(8);
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


(lib.txt1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.txt1_1, new cjs.Rectangle(0,0,520,55), null);


(lib.补间17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt3();
	this.instance.parent = this;
	this.instance.setTransform(-245,-186.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-245,-186.5,490,373);


(lib.补间16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt3();
	this.instance.parent = this;
	this.instance.setTransform(-245,-186.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-245,-186.5,490,373);


(lib.补间15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt2();
	this.instance.parent = this;
	this.instance.setTransform(-294.5,-170.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-294.5,-170.5,589,341);


(lib.补间14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt2();
	this.instance.parent = this;
	this.instance.setTransform(-294.5,-170.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-294.5,-170.5,589,341);


(lib.补间13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.左云();
	this.instance.parent = this;
	this.instance.setTransform(-233,-87.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-233,-87.5,466,175);


(lib.补间12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.左云();
	this.instance.parent = this;
	this.instance.setTransform(-233,-87.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-233,-87.5,466,175);


(lib.补间11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.右云();
	this.instance.parent = this;
	this.instance.setTransform(-204,-60.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-204,-60.5,408,121);


(lib.补间10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.右云();
	this.instance.parent = this;
	this.instance.setTransform(-204,-60.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-204,-60.5,408,121);


(lib.补间9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.旗子();
	this.instance.parent = this;
	this.instance.setTransform(-59.5,-78);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.5,-78,119,156);


(lib.补间8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.旗子();
	this.instance.parent = this;
	this.instance.setTransform(-59.5,-78);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.5,-78,119,156);


(lib.补间6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.树();
	this.instance.parent = this;
	this.instance.setTransform(-464,-127.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-464,-127.5,928,255);


(lib.补间5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt1();
	this.instance.parent = this;
	this.instance.setTransform(-260,-27.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-260,-27.5,520,55);


(lib.补间4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.右山();
	this.instance.parent = this;
	this.instance.setTransform(-233.5,-159.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-233.5,-159.5,467,319);


(lib.补间3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.右山();
	this.instance.parent = this;
	this.instance.setTransform(-233.5,-159.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-233.5,-159.5,467,319);


(lib.补间2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.左山();
	this.instance.parent = this;
	this.instance.setTransform(-245.5,-132);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-245.5,-132,491,264);


(lib.补间1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.左山();
	this.instance.parent = this;
	this.instance.setTransform(-245.5,-132);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-245.5,-132,491,264);


(lib.元件2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.树();
	this.instance.parent = this;
	this.instance.setTransform(-464,-127.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-464,-127.5,928,255);


(lib.元件6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.补间15("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(294.5,170.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.元件6, new cjs.Rectangle(0,0,589,341), null);


(lib.元件5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.txt1_1();
	this.instance.parent = this;
	this.instance.setTransform(260,27.5,1,1,0,0,0,260,27.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.元件5, new cjs.Rectangle(0,0,520,55), null);


(lib.元件4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.元件2("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(464,127.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.元件4, new cjs.Rectangle(0,0,928,255), null);


(lib.元件2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.补间6("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(464,127.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.元件2_1, new cjs.Rectangle(0,0,928,255), null);


(lib.元件1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.补间5("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(260,27.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.元件1, new cjs.Rectangle(0,0,520,55), null);


// stage content:
(lib.H5动画5 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// txt3.png
	this.instance = new lib.补间16("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(1419,349.3);
	this.instance._off = true;

	this.instance_1 = new lib.补间17("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(771.1,338.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},140).to({state:[{t:this.instance_1}]},20).to({state:[{t:this.instance_1}]},20).wait(20));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(140).to({_off:false},0).to({_off:true,x:771.1,y:338.8},20).wait(40));

	// txt2.png
	this.instance_2 = new lib.补间14("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(1434.5,358.5);
	this.instance_2._off = true;

	this.instance_3 = new lib.补间15("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(758.5,322.5);
	this.instance_3._off = true;

	this.instance_4 = new lib.元件6();
	this.instance_4.parent = this;
	this.instance_4.setTransform(1449.9,322.5,1,1,0,0,0,294.5,170.5);
	this.instance_4.alpha = 0.34;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},79).to({state:[{t:this.instance_3}]},21).to({state:[{t:this.instance_3}]},19).to({state:[{t:this.instance_4}]},21).wait(60));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(79).to({_off:false},0).to({_off:true,x:758.5,y:322.5},21).wait(100));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(79).to({_off:false},21).to({startPosition:0},19).to({_off:true,regX:294.5,regY:170.5,x:1449.9,alpha:0.34,mode:"independent"},21).wait(60));

	// txt1.png
	this.instance_5 = new lib.元件1();
	this.instance_5.parent = this;
	this.instance_5.setTransform(581,435.5,1,1,0,0,0,260,27.5);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.instance_6 = new lib.txt1_1();
	this.instance_6.parent = this;
	this.instance_6.setTransform(581,435.5,1,1,0,0,0,260,27.5);
	this.instance_6._off = true;

	this.instance_7 = new lib.元件5();
	this.instance_7.parent = this;
	this.instance_7.setTransform(581,435.5,1,1,0,0,0,260,27.5);
	this.instance_7.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_5}]},19).to({state:[{t:this.instance_6}]},20).to({state:[{t:this.instance_6}]},20).to({state:[{t:this.instance_7}]},20).wait(121));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(19).to({_off:false},0).to({_off:true,alpha:1},20).wait(161));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(19).to({_off:false},20).wait(20).to({_off:true,alpha:0},20).wait(121));

	// 树.png
	this.instance_8 = new lib.元件2_1("synched",0);
	this.instance_8.parent = this;
	this.instance_8.setTransform(579,508.5,1,1,0,0,0,464,127.5);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.instance_9 = new lib.元件2("synched",0);
	this.instance_9.parent = this;
	this.instance_9.setTransform(579,508.5);
	this.instance_9.alpha = 0.969;
	this.instance_9._off = true;

	this.instance_10 = new lib.元件4();
	this.instance_10.parent = this;
	this.instance_10.setTransform(579,508.5,1,1,0,0,0,464,127.5);
	this.instance_10.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_8}]},19).to({state:[{t:this.instance_8}]},20).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).wait(121));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(19).to({_off:false},0).to({loop:false},20).wait(1).to({alpha:0.051},0).wait(1).to({alpha:0.102},0).wait(1).to({alpha:0.141},0).wait(1).to({alpha:0.199},0).wait(1).to({alpha:0.238},0).wait(1).to({alpha:0.289},0).wait(1).to({alpha:0.34},0).wait(1).to({alpha:0.391},0).wait(1).to({alpha:0.441},0).wait(1).to({alpha:0.48},0).wait(1).to({alpha:0.531},0).wait(1).to({alpha:0.578},0).wait(1).to({alpha:0.629},0).wait(1).to({alpha:0.68},0).wait(1).to({alpha:0.73},0).wait(1).to({alpha:0.77},0).wait(1).to({alpha:0.82},0).wait(1).to({alpha:0.871},0).wait(1).to({alpha:0.922},0).to({_off:true},1).wait(141));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(59).to({_off:false},0).wait(1).to({alpha:0.922},0).wait(1).to({alpha:0.871},0).wait(1).to({alpha:0.82},0).wait(1).to({alpha:0.77},0).wait(1).to({alpha:0.73},0).wait(1).to({alpha:0.68},0).wait(1).to({alpha:0.629},0).wait(1).to({alpha:0.578},0).wait(1).to({alpha:0.531},0).wait(1).to({alpha:0.48},0).wait(1).to({alpha:0.441},0).wait(1).to({alpha:0.391},0).wait(1).to({alpha:0.34},0).wait(1).to({alpha:0.289},0).wait(1).to({alpha:0.238},0).wait(1).to({alpha:0.199},0).wait(1).to({alpha:0.141},0).wait(1).to({alpha:0.102},0).wait(1).to({alpha:0.051},0).to({_off:true},1).wait(121));

	// 左山.png
	this.instance_11 = new lib.补间1("synched",0);
	this.instance_11.parent = this;
	this.instance_11.setTransform(-240.5,429);

	this.instance_12 = new lib.补间2("synched",0);
	this.instance_12.parent = this;
	this.instance_12.setTransform(408.5,403);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({_off:true,x:408.5,y:403},19).wait(181));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).to({_off:false},19).wait(40).to({startPosition:0},0).to({x:192.1},20).wait(121));

	// 旗子.png
	this.instance_13 = new lib.补间8("synched",0);
	this.instance_13.parent = this;
	this.instance_13.setTransform(431,413.3);
	this.instance_13._off = true;

	this.instance_14 = new lib.补间9("synched",0);
	this.instance_14.parent = this;
	this.instance_14.setTransform(487.5,230);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(19).to({_off:false},0).to({_off:true,x:487.5,y:230},20).wait(161));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(19).to({_off:false},20).wait(20).to({startPosition:0},0).to({x:271.1},20).wait(121));

	// 左云.png
	this.instance_15 = new lib.补间12("synched",0);
	this.instance_15.parent = this;
	this.instance_15.setTransform(-227,289.5);
	this.instance_15._off = true;

	this.instance_16 = new lib.补间13("synched",0);
	this.instance_16.parent = this;
	this.instance_16.setTransform(217,289.5);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(19).to({_off:false},0).to({_off:true,x:217},20).wait(161));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(19).to({_off:false},20).wait(20).to({startPosition:0},0).to({x:201.4,y:281.7},20).wait(121));

	// 右山.png
	this.instance_17 = new lib.补间3("synched",0);
	this.instance_17.parent = this;
	this.instance_17.setTransform(1388.5,369.5);

	this.instance_18 = new lib.补间4("synched",0);
	this.instance_18.parent = this;
	this.instance_18.setTransform(736.5,338.5);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).to({_off:true,x:736.5,y:338.5},19).wait(181));
	this.timeline.addTween(cjs.Tween.get(this.instance_18).to({_off:false},19).wait(40).to({startPosition:0},0).to({x:1407.3},20).wait(121));

	// 右云.png
	this.instance_19 = new lib.补间10("synched",0);
	this.instance_19.parent = this;
	this.instance_19.setTransform(1338,307.5);
	this.instance_19._off = true;

	this.instance_20 = new lib.补间11("synched",0);
	this.instance_20.parent = this;
	this.instance_20.setTransform(927,307.5);
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(19).to({_off:false},0).to({_off:true,x:927},20).wait(161));
	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(19).to({_off:false},20).wait(20).to({startPosition:0},0).to({x:1597.8},20).wait(121));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(84,533.5,2108,351);
// library properties:
lib.properties = {
	width: 1140,
	height: 647,
	fps: 24,
	color: "#070707",
	opacity: 0.00,
	webfonts: {},
	manifest: [
		{src:"images/H5动画5_atlas_.png", id:"H5动画5_atlas_"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;