"use strict";

function updateCoords(e){
	pointerX=(e.clientX||e.touches[0].clientX)-canvasEl.getBoundingClientRect().left,
	pointerY=(e.clientY||e.touches[0].clientY)-canvasEl.getBoundingClientRect().top;
}

function setParticuleDirection(e,a0,edge,id){
	var t=2*id*Math.PI,a=64,n;
	if(edge>=3){
		n=a/Math.cos(t%(2*Math.PI/edge)-Math.PI/edge);
		return{
			x:e.x+n*Math.cos(t+a0),
			y:e.y+n*Math.sin(t+a0)
		};
	}
	else{
		n=a/Math.cos(t%Math.PI/2-Math.PI/4);
		return{
			x:e.x+n*Math.cos(t),
			y:e.y+n*Math.sin(t)
		};
	}
}

function createParticule(e,t,a0,edge,id){
	var a={};
	a.x=e,
	a.y=t,
	a.color=colors[anime.random(0,colors.length-1)],
	a.radius=16,
	a.endPos=setParticuleDirection(a,a0,edge,id),
	a.draw=function(){
		ctx.beginPath(),
		ctx.arc(a.x,a.y,a.radius,0,2*Math.PI,!0),
		ctx.fillStyle=a.color,
		ctx.fill()
	};
	return a;
}

function createCircle(e,t){
	var a={};
	a.x=e,
	a.y=t,
	a.color="#000000",
	a.radius=0,
	a.alpha=64,
	a.lineWidth=32,
	a.draw=function(){
		ctx.globalAlpha=a.alpha,
		ctx.beginPath(),
		ctx.arc(a.x,a.y,a.radius,0,2*Math.PI,!0),
		ctx.lineWidth=a.lineWidth,
		ctx.strokeStyle=a.color,
		ctx.stroke(),
		ctx.globalAlpha=1
	};
	return a;
}

function renderParticule(e){
	for(var t=0;t<e.animatables.length;t++)
		e.animatables[t].target.draw();
}

function animateParticules(e,t){
	var a=createCircle(e,t),n=[],edge=edges[anime.random(0,edges.length-1)],a0=Math.random(0,2*Math.PI);
	for(var i=0;i<numberOfParticules;i++)
		n.push(createParticule(e,t,a0,edge,i/numberOfParticules));
	anime.timeline().add({
		targets:n,
		x:function(e){return e.endPos.x},
		y:function(e){return e.endPos.y},
		radius:0.1,
		duration:1800,
		easing:"easeOutExpo",
		update:renderParticule
	}).add({
		targets:a,
		radius:40,
		lineWidth:0,
		alpha:{
			value:0,
			easing:"linear",
			duration:1800
		},
		duration:1800,
		easing:"easeOutExpo",
		update:renderParticule,offset:0
	});
}

function debounce(e,t){
	var a;
	return function(){
		var n=this,i=arguments;
		clearTimeout(a),
		a=setTimeout(function(){e.apply(n,i)},t)
	};
}

var canvasEl=document.querySelector(".fireworks");

if(canvasEl){
	var
	ctx=canvasEl.getContext("2d"),
	numberOfParticules=256,
	pointerX=0,
	pointerY=0,
	tap="mousedown",
	colors=["#000000"],
	edges=[3,4,5,6,7,8,9,10,-1],
	setCanvasSize=debounce(
		function(){
			canvasEl.width=2*window.innerWidth,
			canvasEl.height=2*window.innerHeight,
			canvasEl.style.width=window.innerWidth+"px",
			canvasEl.style.height=window.innerHeight+"px",
			canvasEl.getContext("2d").scale(2,2)
		},
		500
	),
	render=anime({
		duration:1/0,
		update:function(){ctx.clearRect(0,0,canvasEl.width,canvasEl.height)}
	});
	document.addEventListener(
		tap,
		function(e){
			"sidebar"!==e.target.id&&
			"toggle-sidebar"!==e.target.id&&
			"A"!==e.target.nodeName&&
			"IMG"!==e.target.nodeName&&(
				render.play(),
				updateCoords(e),
				animateParticules(pointerX,pointerY)
			)
		},
		!1
	),
	setCanvasSize(),
	window.addEventListener("resize",setCanvasSize,!1);
}
