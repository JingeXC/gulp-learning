//const Sscale:number=window.devicePixelRatio;
const canvas:any = document.getElementById("main-panel");
const ctx:any = canvas.getContext("2d");

const showBar:any=document.querySelector("#show");
let showWord:string="";

const screenWidth:number=canvas.width = window.innerWidth//*Sscale;
const screenHeight:number = canvas.height = window.innerHeight//*Sscale;

let lines:any[]=[];
let alpha:number=0;
let beta:number=0;
let gamma:number =0;

let betaArr:any[]=[];
let gammaArr:any[]=[];

//----------------------------
if((<any>window).DeviceOrientationEvent){
	window.addEventListener('deviceorientation',function(e){
		alpha= e.alpha;
		beta= e.beta;
		gamma= e.gamma;
	})
}

class startLines{
	positionx:number =-200;
	positiony:number =0;
	r:number = Math.floor(Math.random()*(Math.sqrt(screenHeight*screenHeight+screenWidth*screenWidth)-400))+400;
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
		let speG:number=0;
		let speB:number=0;
		if(gammaArr[gammaArr.length-1] && gammaArr[gammaArr.length-10]){
			speG= parseInt(gammaArr[gammaArr.length-1])-parseInt(gammaArr[gammaArr.length-10]);
		}
		if(betaArr[betaArr.length-1] && betaArr[betaArr.length-10]){
			speB= parseInt(betaArr[betaArr.length-1])-parseInt(betaArr[betaArr.length-10]);
		}
		//showWord=`x:${this.positionx},y:${this.positiony},gamma:${gamma},beta:${beta}--${speG}---${speB}`;
		

		if(gammaArr.length>10){
			if(speG<0 && this.positionx>=-250){
				this.positionx-=2;
			}else if(speG>0 && this.positionx<=-150){
				this.positionx+=2;
			}else{
				this.positionx;
			}
		}
		if(betaArr.length>10){
			if(speB<0 && this.positiony >= -50){
				this.positionx-=2;
			}else if(speB>0 && this.positiony <=50){
				this.positionx+=2;
			}else{
				this.positionx;
			}
		}
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
		if(lines[i].startRadio>Math.PI*3/4){
			lines = recovery(lines,i);
		}
	}
	if(lines.length>80){
		lines.shift();
	}
},200)

setInterval(()=>{
	betaArr.push(beta);
	gammaArr.push(gamma);
	if(betaArr.length>30){
		betaArr.shift();
		gammaArr.shift();
	}
	//showBar.innerHTML=showWord+`  lastB:${betaArr[betaArr.length-1]} lastG:${gammaArr[gammaArr.length-1]}`;
	ctx.clearRect(0,0,screenWidth,screenHeight);


	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(0,screenHeight);
	ctx.lineTo(screenWidth,screenHeight);
	ctx.lineTo(screenWidth,0)
	ctx.fillStyle="#222222";
	ctx.closePath();
	ctx.fill();
	// ctx.font ="72pt Calibri";
	// ctx.fillStyle = "#F1C410";
	// ctx.fillText("杭州",50,200);

	for(let item of lines){
		item.animate();
	}
},1000/60);




