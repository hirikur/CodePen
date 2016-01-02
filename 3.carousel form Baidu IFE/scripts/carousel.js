window.onload=function() {
var oImgBox=document.getElementsByTagName("div")[0];
var oImgList=oImgBox.getElementsByTagName("ul")[0];
var aImg=oImgList.getElementsByTagName("img");
var aBtnList=oImgBox.getElementsByTagName("ul")[1];
var aBtn=aBtnList.getElementsByTagName("li");
var timer=null;
var i = 0;
var index = 0;
var isBorder = true;

/*function doMove(node,offset){
	var speed = offfset/10;
	var oldOffsetLeft = node.offsetLeft;
	speed = spped > 0 ? Math.ceil(speed) : Math.floor(speed);
	node.offsetLeft - oldOffsetLsft==offset ? clearInterval(timer):node.style.left=node.offsetLeft+speed+"px";
}*/

function doChange(node,off){
	node.style.left=(-off*aImg[0].offsetWidth)+"px";
}

function next(){
	isBorder ? index++ : index--;
	if(index<=0)
		isBorder=true;
	if(index>=aImg.length-1)
		isBorder=false;
	cutover();
}

function cutover(){
	for(i=0;i<aImg.length;i++){
		aBtn[i].className="";
	}
	aBtn[index].className="active";
	doChange(oImgList,index);
}

setInterval(next,2000);

};