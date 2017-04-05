const panel:any = document.getElementById("main-panel");
const ctx:any = panel.getContext('2d');
const width:number = panel.width = window.innerWidth;
const height:number = panel.height = window.innerHeight;
const backgroundColor:string="rgba(0,0,0,1)";

let starArr:any=[];


interface starPro{
	pointQuantity:number;
	point:any[];
	color:any;
	r:number;
}
class star implements starPro{
	pointQuantity:number=20;//Math.floor(Math.random()*20)+2;
	point=new Array();
	color:any;
	r:number;
	constructor(){
		for(let i=0;i<this.pointQuantity;i++){
			this.point[this.point.length]=[Math.floor(Math.random()*width),Math.floor(Math.random()*height)];
		}
		this.color=`rgb(${Math.floor(Math.random()*155)+100},${Math.floor(Math.random()*155)+100},${Math.floor(Math.random()*155)+100})`;
		this.r=Math.floor(Math.random()*5)+1;
	}
	drawArc=function(points:any=this.point){
		for(let point of points){
			ctx.beginPath();
			ctx.arc(point[0],point[1],this.r,0,Math.PI*2,true);
			ctx.closePath();
			ctx.fillStyle=this.color;
			ctx.fill();
		}
	}
	animate=function(){
		for(let i=0;i< this.point.length;i++){
			var xh=this.point[i][0]-width/2;
			var yh=this.point[i][1]-height/2;
			if(xh>0 && yh>0){
				this.point[i][0]+=yh/xh;
				this.point[i][1]+=xh/yh;
			}else if(xh<0 && yh<0){
				this.point[i][0]-=yh/xh;
				this.point[i][1]-=xh/yh;
			}else if(xh<0 && yh>0){
				this.point[i][0]+=yh/xh;
				this.point[i][1]-=xh/yh;
			}else{
				this.point[i][0]-=yh/xh;
				this.point[i][1]+=xh/yh;
			}
		}
		
		this.drawArc(this.point);
	}
}


setInterval(function(){
	var Star = new star();
	starArr.push(Star);
	if(starArr.length>20){
		starArr.shift();
	}
},20);

setInterval(function(){
	ctx.clearRect(0,0,width,height);
	(function(){
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(0,height);
		ctx.lineTo(width,height);
		ctx.lineTo(width,0)
		ctx.fillStyle=backgroundColor;
		ctx.fill();
	})();
	for(let star of starArr){
		star.animate();
	}
},20)