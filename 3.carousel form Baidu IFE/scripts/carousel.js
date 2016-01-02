function carousel(){
	var oImgBox = document.getElementsByTagName("div")[0];
	var oImgList = oImgBox.getElementsByTagName("ul")[0];
	var aImg = oImgList.getElementsByTagName("img");
	var aBtnList = oImgBox.getElementsByTagName("ul")[1];
	var aBtn = aBtnList.getElementsByTagName("li");
	var timer = null;
	var autoTimer = null;
	var i = 0;
	var index = 0;
	var isBorder = true;

	function doMove(node,off){
		var target = -off*aImg[0].offsetWidth;
		var speed = (target-node.offsetLeft)/10;
		var oldOffsetLeft = node.offsetLeft;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		node.offsetLeft == target ? clearInterval(timer):node.style.left = node.offsetLeft+speed+"px";
	}

	function startMove(node,off){
		clearInterval(timer);
		timer = setInterval(function(){
			doMove(node,off);
		},30)
	}

	function doChange(node,off){
		node.style.left = (-off*aImg[0].offsetWidth)+"px";
	}

	function next(){
		if(index<=0)
			isBorder=true;
		if(index>=aImg.length-1)
			isBorder = false;
		isBorder ? index++ : index--;
		show();
	}

	function show(){
		for(i=0;i<aImg.length;i++){
			aBtn[i].className = "";
		}
		aBtn[index].className = "active";
		//doChange(oImgList,index);
		startMove(oImgList,index);
	}

	autoTimer=setInterval(next,2000);

	for(i=0;i<aBtn.length;i++){
		aBtn[i].int = i;
		aBtn[i].onclick = function(){
			index=this.int;
			show();
		}
	}

	oImgBox.onmouseover = function(){
		clearInterval(autoTimer);
	}

	oImgBox.onmouseout = function(){
		autoTimer=setInterval(next,2000);
	}
}

function addLoadEvent(func){
	var oldOnload = window.onload;
	if (typeof oldOnload != "function"){
		window.onload = func;
	} else{
		window.onload = function(){
			oldOnload();
			func();
		}
	}
}

addLoadEvent(carousel);