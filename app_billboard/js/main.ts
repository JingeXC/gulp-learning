import {box} from './model';
const canvas:any = document.querySelector("#main-panel");
const ctx:any = canvas.getContext("2d");

const panelWidth= canvas.width=window.innerWidth;
const panelHeight = canvas.height=400;

const letterArr:any[]=[];


interface pointProtype {
	r:number;
	red:number;
	blue:number;
	green:number;
	opacity:number;
	radius:number;
	positionx:number;
	positiony:number;
}
class point implements pointProtype{
	r=10;
	red=0;
	blue=0;
	green=0;
	opacity=1;
	radius=Math.PI*2;
	positionx:number;
	positiony:number;
	constructor(){
		
	}
	drawPoint(){
		ctx.beginPath();
		ctx.arc(this.positionx,this.positiony,this.r,0,this.radius,true);
		ctx.fillStyle=`rgba(${this.red},${this.green},${this.blue},${this.opacity})`;
		ctx.closePath();
		ctx.fill();
	}
	animation(){
		//this.opacity-=0.01;
		this.positionx-=5;
		this.drawPoint();
	}
}
class letters{
	pointArr:any[]=[];
	private text:any;
	constructor(){
		
	}
	drawLetter(le:string){
		const letterBox = new box();
		let wordArr = le.toUpperCase().split("");
		let toWord = letterBox[wordArr[0]];
		for(let j=1;j<wordArr.length;j++){
			for(let i=0;i<letterBox[wordArr[j]].length;i++){
				let createLetter = new box();
				let num:any = createLetter[wordArr[j]][i];
				toWord[i]=toWord[i].concat(num);
			}
		}
		this.text= toWord;
		
		for(let i=0;i<this.text.length;i++){
			for(let j=0;j<this.text[i].length;j++){
				if(this.text[i][j]===1){
					let points = new point();
					points.positionx=(j+1)*26+panelWidth;
					points.positiony=(i+1)*26;
					this.pointArr.push(points);
				}
			}
		}
		for(let item of this.pointArr){
			item.drawPoint();
		}
	}
	showAnim(){
		for(let item of this.pointArr){
			item.animation();
		}
	}
}


let showContent:string="enter words";
const button:any = document.querySelector(".button");
let timer:any;
button.onclick=function(){
	clearInterval(timer);
	const input:any = document.querySelector("#words");
	let inputWord:string = input.value;
	showContent=inputWord;
	interStart();
}
const start=function(){
	let letter = new letters();
	letter.drawLetter(showContent);
	if(letterArr.length>=3){
		letterArr.shift();
	}
	letterArr.push(letter);
}
const interStart = function(){
	start()
	timer =setInterval(function(){
		start();
	},12000);
}

interStart();

setInterval(()=>{
	ctx.clearRect(0,0,panelWidth,panelHeight);
	for(let item of letterArr){
		item.showAnim();
	}
},20);



//自动滚动文字
//const text:string[]=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
//let index=-1;
// setInterval(()=>{
// 	let letter = new letters();
// 	letterArr.push([letter,index++]);
// 	letterArr[letterArr.length-1][0].drawLetter(text[index%26]);
// 	console.log(letterArr[letterArr.length-1][1]);
// 	if(letterArr.length>=3){
// 		letterArr.shift();
// 	}
// },1000);

// setInterval(()=>{
// 	ctx.clearRect(0,0,panelWidth,panelHeight);
// 	for(let item of letterArr){
// 		item[0].showAnim();
// 	}
// },20);


//输入显示

// const button:any = document.querySelector(".button");
// let timer:any;
// button.onclick=function(){
// 	clearInterval(timer);
// 	let elem:any=document.querySelector("#words");
// 	let word:string=elem.value;
	
	
// 	let letter = new letters();
// 	if(!word){
// 		word="ERROR";
// 	}
// 	letter.drawLetter(word);
// 	timer=setInterval(()=>{
// 		ctx.clearRect(0,0,panelWidth,panelHeight);
// 		letter.showAnim();
// 		// for(let item of letterArr){
// 		// 	item[0].showAnim();
// 		// }
// 		if(letter.pointArr[0].opacity<0){
// 			clearInterval(timer);
// 		}
// 	},20);
// }


