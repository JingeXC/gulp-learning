// window.requestAnimationFrame=(function(){
// 	return window.requestAnimationFrame ||
// 			window.webkitRequestAnimationFrame ||
// 			window.mozRequestAnimationFrame ||
// 			function(callback){
// 				window.setTimeout(callback,1000/60);
// 			}
// })
const canvas:any = document.getElementById("main-panel");
const ctx:any = canvas.getContext("2d");

const screenWidth:number=canvas.width = window.innerWidth;
const screenHeight:number = canvas.height = window.innerHeight;

let lines:any[]=[];

class startLines{
	positionx:number =-200;
	positiony:number =0;
	r:number = Math.floor(Math.random()*(screenWidth-250))+250;
	startRadio:number=-(Math.random()*Math.PI/8+Math.PI/8);
	endRadio:number=0;
	red:number=Math.floor(Math.random()*155)+100;
	green:number=Math.floor(Math.random()*155)+100;
	blue:number=Math.floor(Math.random()*155)+100;
	//opacity:number=Math.floor(Math.random()*10)/10;
	opacity:number=1;
	lineWidth:number=Math.floor(Math.random()*6)+2;
	speed:number = (Math.random()*Math.PI+Math.PI)/this.r;
	constructor(){
	}
	drawStart(){

		let color = `rgba(${this.red},${this.green},${this.blue},${this.opacity})`;
		ctx.beginPath();
		ctx.lineWidth= this.lineWidth;
		ctx.arc(this.positionx,this.positiony,this.r,this.startRadio,this.endRadio);
		ctx.strokeStyle=color;
		ctx.stroke();
	}
	animate(){
		this.startRadio+=this.speed;
		this.endRadio+=this.speed;
		this.drawStart();
	}
}

function recovery(arr,index){
	var tempArr:any[]=[];
	for(var i=0;i<arr.length;i++){
		if(i!=index){
			tempArr.push(arr[i]);
		}
	}
	return tempArr;
}
setInterval(function(){
	var starLine = new startLines();
	lines.push(starLine);
	starLine.drawStart();
	for(let i=0;i<lines.length;i++){
		if(lines[i].startRadio>Math.PI){
			lines = recovery(lines,i);
		}
	}
},200)

setInterval(()=>{
	ctx.clearRect(0,0,screenWidth,screenHeight);

	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(0,screenHeight);
	ctx.lineTo(screenWidth,screenHeight);
	ctx.lineTo(screenWidth,0)
	ctx.strokeStyle="#222222";
	ctx.closePath();
	ctx.fill();

	for(let item of lines){
		item.animate();
	}
},1000/60);