const canvas:any = document.getElementById('main-panel');
const ctx:any = canvas.getContext('2d');
const panelWidth:number=canvas.width=window.innerWidth;
const panelHeight:number =canvas.height=window.innerHeight;
const ballR:number = 100;
let ballArr:any=[];
let xPosition:number;
let outPanel:any= document.querySelector("body");
outPanel.onmousemove=function(e){
	xPosition=e.clientX;
}

interface ballinfo {
	r:number,
	red:number,
	green:number,
	blue:number,
	opacity:number;
	positionX:number,
	positionY:number,
}

class balls implements ballinfo{
	r = Math.floor(Math.random()*50);
	red=Math.floor(Math.random()*255);
	green=Math.floor(Math.random()*255);
	blue = Math.floor(Math.random()*255);
	opacity = Math.floor(Math.random()*10)/10;
	positionX = Math.floor(Math.random()*panelWidth);
	//positionX=xPosition?xPosition:Math.floor(Math.random()*panelWidth);
	//positionY = Math.floor(Math.random()*panelHeight);
	positionY = panelHeight;
	drawBall = function(){
		let color = "rgba("+this.red+","+this.green+","+this.blue+","+this.opacity+")";
		let Y = this.positionY;
		ctx.beginPath();
		ctx.arc(this.positionX,Y,this.r,0,2*Math.PI,true);
		ctx.fillStyle=color;
		ctx.closePath();
		ctx.fill();
	}
}

setInterval(function(){
	var ball = new balls();
	ballArr.push(ball);
	if(ballArr.length>=100){
		ballArr.shift();
	}
},50);

setInterval(function(){
	ctx.clearRect(0,0,panelWidth,panelHeight);
	for(let ball of ballArr){
		if(ball.opacity>0){
			ball.opacity-=0.005;
		}else{
			ball.opacity=0;
		}
		ball.r+=0.6;
		ball.positionY-=5;
		ball.drawBall();
	}
},20)

