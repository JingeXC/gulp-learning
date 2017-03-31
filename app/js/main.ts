class drive {
	speed:number;
	kilometres:number;
	do = function():any{
		return this.kilometres / this.speed;
	}
}
interface car{
	price:number,
	height?:number,
	width?:number,
	name?:string,
	drive?:drive;
}
let buyOrNot = function(car:car):boolean{
	if(car.price>16){
		return false;
	}else{
		return true
	}
}
console.log(buyOrNot({price:15}));