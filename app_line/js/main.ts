const panel:any = document.getElementById("main-panel");
const ctx:any = panel.getContext('2d');
const width:number = panel.width = window.innerWidth;
const height:number = panel.height = window.innerHeight;
const lineWidth:number=0.3;
const backgroundColor:string ="rgba(0,0,0,1)";
const linePoints:number = 30;
const lineAmount:number = 30;
const createTime:number = 500;
const blurWidth:number = 50;

let lineArr:any=[];


interface linePro{
	pointQuantity:number;
	startPointX:number;
	startPointY:number;
	point:any[];
	color:any;
}
class line implements linePro{
	pointQuantity:number=Math.floor(Math.random()*linePoints)+2;
	startPointX:number=Math.floor(Math.random()*width);
	startPointY:number=Math.floor(Math.random()*height);
	point=new Array();
	color:any;
	constructor(){
		for(let i=0;i<this.pointQuantity;i++){
			this.point[this.point.length]=[Math.floor(Math.random()*width),Math.floor(Math.random()*height)];
		}
		this.color=`rgb(${Math.floor(Math.random()*155)+100},${Math.floor(Math.random()*155)+100},${Math.floor(Math.random()*155)+100})`;
	}
	drawLine=function(startX:number=this.startPointX,startY:number=this.startPointY,point:any=this.point){
		ctx.beginPath();
		ctx.moveTo(startX,startY);
		for(let i = 0;i<this.pointQuantity;i++){
			ctx.lineTo(point[i][0],point[i][1]);
		}
		ctx.closePath();
		ctx.strokeStyle=this.color;
		ctx.shadowColor="white";
		ctx.shadowBlur=blurWidth;
		ctx.lineWidth=lineWidth;
		ctx.stroke();
	}
	animate=function(){
		for(let i=0;i<this.point.length;i++){
			switch (i%4) {
				case 0:
					this.point[i][0]+=5;
					this.point[i][1]+=5;
					break;
				case 1:
					this.point[i][0]-=5;
					this.point[i][1]+=5;
					break;
				case 2:
					this.point[i][0]+=5;
					this.point[i][1]-=5;
					break;
				case 3:
					this.point[i][0]-=5;
					this.point[i][1]-=5;
					break;
			}
		}
		if(this.startPointX>width/2){
			this.startPointX++;
		}else{
			this.startPointX--;
		}
		if(this.startPointY>height/2){
			this.startPointY++;
		}else{
			this.startPointY--;
		}
		this.drawLine(this.startPointX,this.startPointY,this.point);
	}
}


setInterval(function(){
	var Line = new line();
	lineArr.push(Line);
	if(lineArr.length>lineAmount){
		lineArr.shift();
	}
},createTime);

setInterval(function(){
	ctx.clearRect(0,0,width,height);
	(function(){
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(0,height);
		ctx.lineTo(width,height);
		ctx.lineTo(width,0)
		ctx.strokeStyle=backgroundColor;
		ctx.fill();
	})();
	for(let line of lineArr){
		line.animate();
	}
},20)