var canvas = null;
var ctx = null;
var pressed = false;
var r, g, b;
// generateRandomColor();
var player1= null;
var meta=null;
var direccion= "";
var score=0;
var pause= true;
var Success = false;
var speed=1;
var seg=1;
var paredes = [];
var isaac = new Image();
var piedraH = new Image();
var muro = new Image();
var fondito = new Image();
var salida = new Image();
var limites = new Image();
var mAmbiental = new Audio();
var mSuccess = new Audio();


  
    var seconds = 00; 
    var tens = 00; 
    var appendTens="";
    var appendSeconds="" ;
;


    var Interval ;
  
    iniciarTiempo = function() {
      
      clearInterval(Interval);
       Interval = setInterval(startTimer, 10);
    }
    
      PararTiempo = function() {
         clearInterval(Interval);
    }
      
     
    
    function startTimer () {
      tens++; 
      
      if(tens <= 9){
        appendTens = "0" + tens;
      }
      
      if (tens > 9){
        appendTens = tens;
        
      } 
      
      if (tens > 99) {
        console.log("seconds");
        seconds++;
        appendSeconds = "0" + seconds;
        tens = 0;
        appendTens = "0" + 0;
      }
      
      if (seconds > 9){
        appendSeconds = seconds;
      }
    
    }
    
  

canvas1.addEventListener("click", function(e){
    alert(e.offsetX + ", " + e.offsetY);
});

function getrandom( num){
    return Math.floor(Math.random()*num)
}

function jugador(x,y,w,h,c){
    this.x =x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.c =c;

    this.pintarCuadrado = function(ctx){
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x,this.y,this.w,this.h);
        ctx.strokeRect(this.x,this.y,this.w,this.h);
    }
    this.se_tocan = function (target) { 

        if(this.x < target.x + target.w &&
           this.x + this.w > target.x && 
           this.y < target.y + target.h && 
           this.y + this.h > target.y)
        {
            return true;	 
        }  
         

    };
}

function pared(x,y,w,h,tipo){
    this.x =x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.tipo =tipo; 

    this.pintarPared = function(ctx){
        ctx.fillRect(this.x,this.y,this.w,this.h);
        ctx.strokeRect(this.x,this.y,this.w,this.h);
    }
    this.se_tocan = function (target) { 

        if(this.x < target.x + target.w &&
           this.x + this.w > target.x && 
           this.y < target.y + target.h && 
           this.y + this.h > target.y)
        {
            return true;	 
        }  
         

    };
}


window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        };
}());

document.addEventListener("keydown", function(e){
    console.log(e);
    if(e.key == "w" || e.key =="ArrowUp"){
        //ultraY-=10;
        direccion = "up";
    }
    if(e.key == "s" || e.key =="ArrowDown"){
        //ultraY+=10;
        direccion="down" ;
    }
    if(e.key == "a" || e.key =="ArrowLeft"){
        //ultraX-=10;
        direccion="left";
    }
    if(e.key == "d" || e.key =="ArrowRight"){
        //ultraX+=10;
        direccion="right";

    }
    if(e.keyCode == 32 ){
        //ultraX+=10;
        //pause= (pause)?false:true;
        if (pause == true) {
            iniciarTiempo();
            pause = false;
        } else {
            pause = true;
            PararTiempo();
        }

    }
    
});

window.addEventListener("load",run,false);

function run(){
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d")
    player1 = new jugador(67,73,17,17,"red"); 
    meta = new jugador(707, 670,30,30,"green");
    meta2 = new jugador(306, 63,30,30,"green");
    isaac.src = "img/isaac.png";
    fondito.src = "img/fondo.png";
    muro.src = "img/pared.png";
    salida.src = "img/trampilla.png";
    limites.src = "img/limite.png";

    mSuccess.src = "music/DepthsBelow.mp3";
    mAmbiental.src = "music/Tomes.mp3";

    //tipo 1= vert  | tipo 2= hori  | tipo 3= limite
    //limites
    paredes[0] = new pared(54, 54,692,10,3);
    paredes[1] = new pared(54, 54,10, 656,3);
    paredes[2] = new pared(740,54,10,656,3);
    paredes[3] = new pared(57, 710,692, 10,3);
    //paredes
    paredes[4] = new pared(97, 55,10,70,1);
    paredes[5] = new pared(60, 160,130, 10,2);
    paredes[6] = new pared(134, 90,10, 80,2);
    paredes[7] = new pared(134, 90,100, 10,2);
    paredes[8] = new pared(227, 90,10, 80,2);
    paredes[9] = new pared(286, 58,10, 80,2);
    paredes[10] = new pared(288, 128,40, 10,2);
    paredes[11] = new pared(228, 166,70, 10,2);
    paredes[12] = new pared(323, 129,10, 70,2);
    paredes[13] = new pared(290, 171,10, 70,2);
    paredes[14] = new pared(324, 193,62, 10,2);    
    paredes[15] = new pared(255, 230,50, 10,2);
    paredes[16] = new pared(340, 231,10, 50,2);
    paredes[17] = new pared(377, 195,10, 50,2);
    paredes[17] = new pared(342, 273,40, 10,2);
    paredes[18] = new pared(380, 197,10, 40,2);
    paredes[19] = new pared(380, 234,40, 10,2);
    paredes[20] = new pared(377, 274,10, 170,2);
    paredes[21] = new pared(411, 234,10, 100,2);
    paredes[22] = new pared(413, 324,50, 10,2);
    paredes[23] = new pared(456, 325,10, 215,2);
    paredes[24] = new pared(426, 400,40, 10,2);
    paredes[25] = new pared(377, 366,50, 10,2);
    paredes[26] = new pared(377, 440,50, 10,2);
    paredes[27] = new pared(340, 475,117, 10,2);
    paredes[28] = new pared(340, 311,10, 164,2);
    paredes[29] = new pared(295, 231,50, 10,2);  
    paredes[30] = new pared(135, 200,90, 10,2);
    paredes[31] = new pared(185, 126,10, 80,2);
    paredes[32] = new pared(220, 203,10, 80,2);  
    paredes[33] = new pared(220, 274,80, 10,2);
    paredes[34] = new pared(159, 311, 185, 10,2);
    paredes[35] = new pared(185, 254,10, 260,2);
    paredes[36] = new pared(125,201,10, 158,2);
    paredes[37] = new pared(125, 272,40, 10,2);
    paredes[38] = new pared(91, 350, 70, 10,2);
    paredes[39] = new pared(155, 351,10, 120,2);  
    paredes[40] = new pared(155, 509,195, 9 ,2);
    paredes[41] = new pared(100, 460,60, 10 ,2);
    paredes[42] = new pared(120, 466,10, 40 ,2);
    paredes[43] = new pared(155, 510,10, 40 ,2);
    paredes[44] = new pared(92, 540,115, 10 ,2);
    paredes[45] = new pared(85, 504,10, 46 ,2);
    paredes[46] = new pared(59, 422,62, 10 ,2); 
    paredes[47] = new pared(120, 395,10, 37 ,2);
    paredes[48] = new pared(85, 351,10, 38 ,2);
    paredes[49] = new pared(59, 314,40, 10 ,2);
    paredes[50] = new pared(90, 252,40, 10 ,2); 
    paredes[51] = new pared(90, 222,10, 40 ,2);  
    paredes[52] = new pared(306, 380,40, 10 ,2);  
    paredes[53] = new pared(190, 389,90, 10 ,2);
    paredes[54] = new pared(270, 344,10, 100 ,2);
    paredes[55] = new pared(230, 344,80, 10 ,2);
    paredes[56] = new pared(270, 438,40, 10 ,2);
    paredes[57] = new pared(231, 475,110, 10 ,2);
    paredes[58] = new pared(231, 442,10, 40 ,2);
    paredes[59] = new pared(59, 572,50, 9 ,2);
    paredes[60] = new pared(138, 550,10, 50 ,2);
    paredes[61] = new pared(94, 601,150, 10 ,2);
    paredes[62] = new pared(94, 601,10, 40 ,2);
    paredes[63] = new pared(94, 636,50, 10 ,2);
    paredes[64] = new pared(61, 670,40, 10 ,2);
    paredes[65] = new pared(137, 637,10, 50 ,2);
    paredes[66] = new pared(181, 637,10, 75 ,2);
    paredes[67] = new pared(181, 637,200, 10 ,2);
    paredes[68] = new pared(380, 637,10, 50 ,2);
    paredes[69] = new pared(345, 677,10, 35 ,2);
    paredes[70] = new pared(312, 677,40, 10,2);
    paredes[71] = new pared(277, 637,10, 50 ,2);
    paredes[72] = new pared(244, 670,10, 40 ,2);
    paredes[73] = new pared(211, 637,10, 50 ,2);
    paredes[74] = new pared(193, 574,10, 35 ,2);
    paredes[75] = new pared(277, 569,10, 75 ,2);
    paredes[76] = new pared(238, 568,48, 10 ,2);
    paredes[77] = new pared(239, 540,10, 30 ,2);
    paredes[78] = new pared(239, 540,70, 5 ,2);
    paredes[79] = new pared(308, 540,10, 30 ,2);    
    paredes[80] = new pared(342, 511,10, 90 ,2);
    paredes[81] = new pared(311, 597,120, 10 ,2);
    paredes[82] = new pared(425, 597,10, 80 ,2);
    paredes[83] = new pared(425, 673,80, 10 ,2);
    paredes[84] = new pared(504, 624,10, 60 ,2);
    paredes[85] = new pared(468, 624,40, 10 ,2);
    paredes[86] = new pared(466, 597,10, 50 ,2);
    paredes[87] = new pared(390, 564,10, 40 ,2);
    paredes[88] = new pared(514, 643,60, 10 ,2);
    paredes[89] = new pared(568, 643,10, 30 ,2);
    paredes[90] = new pared(568, 669,50, 10 ,2);
    paredes[91] = new pared(608, 620,10, 50 ,2);
    paredes[92] = new pared(608, 615,95, 9 ,2);
    paredes[93] = new pared(697, 590,10, 34 ,2);
    paredes[94] = new pared(654, 645,10, 65 ,2);
    paredes[95] = new pared(654, 645,50, 10 ,2);
    paredes[96] = new pared(622, 590,10, 30 ,2);
    paredes[97] = new pared(510, 580,155, 10 ,2);  
    paredes[98] = new pared(554, 581,10, 40 ,2);
    paredes[99] = new pared(387, 530,70, 10 ,2);
    paredes[100] = new pared(387, 508,10, 30 ,2);
    paredes[101] = new pared(428, 566,50, 10 ,2); 
    paredes[102] = new pared(510, 531,60, 10 ,2);
    paredes[103] = new pared(510, 497,10, 43 ,2);
    paredes[104] = new pared(510, 487,100, 10 ,2);
    paredes[105] = new pared(601, 486,10, 55 ,2);
    paredes[106] = new pared(603, 531,30, 10 ,2); 
    paredes[107] = new pared(631, 531,10, 50 ,2);
    paredes[108] = new pared(665, 545, 80, 10 ,2);
    paredes[109] = new pared(665, 458, 10, 90 ,2);
    paredes[110] = new pared(700, 514,10,40,2);
    paredes[111] = new pared(566, 448,140,10,2);
    paredes[112] = new pared(642, 487,30,10,2);
    paredes[113] = new pared(526, 403,10,90,2);
    paredes[114] = new pared(496, 403,140,10,2);
    paredes[115] = new pared(460, 446,40,10,2);
    paredes[116] = new pared(696, 326,10,128,2);
    paredes[117] = new pared(635, 357,10,55,2);
    paredes[118] = new pared(675, 402,20,10,2);
    paredes[119] = new pared(637, 373,40,10,2);
    paredes[118] = new pared(637, 326,70,10,2);
    paredes[119] = new pared(418, 271,100,10,2);
    paredes[120] = new pared(492, 276,10,40,2);
    paredes[121] = new pared(492, 276,10,40,2);
    paredes[122] = new pared(450, 272,10,30,2);
    paredes[123] = new pared(500, 340,100,10,2);
    paredes[124] = new pared(585, 380,10,25,2);
    paredes[125] = new pared(545, 340,10,40,2);  
    paredes[126] = new pared(461, 370,40,10,2);
    paredes[127] = new pared(359, 57,10,100,2);
    paredes[128] = new pared(596, 290,150,10,2);
    paredes[129] = new pared(586, 290,10,30,2);
    paredes[130] = new pared(547, 118,10,230,2);
    paredes[131] = new pared(547, 224,100,10,2);
    paredes[132] = new pared(647, 224,10,70,2);
    paredes[133] = new pared(551, 256,70,10,2);  
    paredes[134] = new pared(411, 193,10,70,2);
    paredes[135] = new pared(411, 193,80,10,2);
    paredes[136] = new pared(480, 155,10,40,2);
    paredes[137] = new pared(458, 240,99,10,2);  
    paredes[138] = new pared(411, 118,145,10,2);
    paredes[139] = new pared(488, 170,35,10,2);
    paredes[140] = new pared(445, 155,35,10,2);
    paredes[141] = new pared(411, 118,10,50,2);
    paredes[142] = new pared(446, 60,10,30,2);
    paredes[143] = new pared(505, 95,10,30,2);
    paredes[144] = new pared(560, 60,10,30,2);
    paredes[145] = new pared(560, 80,40,10,2);
    paredes[146] = new pared(600, 80,10,70,2);
    paredes[147] = new pared(555, 179,70,10,2);
    paredes[148] = new pared(602, 141,70,10,2);
    paredes[149] = new pared(603, 110,40,10,2);
    paredes[150] = new pared(668, 57,10,50,2);
    paredes[151] = new pared(674, 197,70,10,2);
    paredes[152] = new pared(650, 253,55,10,2);
    paredes[153] = new pared(704, 224,10,39,2);
    paredes[154] = new pared(670, 104,40,10,2);
    paredes[155] = new pared(705, 106,10,50,2);


    pintarCuadrado();
}



function pintarCuadrado(){
    window.requestAnimationFrame(pintarCuadrado);
    ctx.drawImage(fondito, 0, 0,800,800);
    ctx.fillStyle="white";
    ctx.font="30px Arial";
    ctx.fillText("TIEMPO= " +appendSeconds +":"+ appendTens  ,30,30);

    
    //player1.pintarCuadrado(ctx);
    //meta.pintarCuadrado(ctx);

    ctx.drawImage(isaac,player1.x,player1.y,player1.w,player1.h);
    ctx.drawImage(salida,meta.x,meta.y,meta.w,meta.h);
    ctx.drawImage(salida, meta2.x,meta2.y,meta2.w,meta2.h)
    for (var index = 0; index < paredes.length; index++) {
        //paredes[index].pintarCuadrado(ctx);
        //tipo 1= vert  | tipo 2= hori 
            ctx.drawImage(muro, paredes[index].x,paredes[index].y,paredes[index].w,paredes[index].h)
     
    }
    for (var index = 0; index < paredes.length; index++) {
        if (paredes[index].tipo == 3) {
            ctx.drawImage(muro, paredes[index].x,paredes[index].y,paredes[index].w,paredes[index].h)
        } 
    }
    

    
        if(pause){
            if (Success == false ) {
                ctx.fillStyle ="rgba(0,0,0,0.5)";
                ctx.fillRect(0,0,800,800);
        
                ctx.fillStyle = "white";
                ctx.fillText("P A U S E",300,350);
                mAmbiental.pause();
           } else{
                ctx.fillStyle ="rgba(0,0,0,0.5)";
                ctx.fillRect(0,0,800,800);

                ctx.fillStyle = "white";
                ctx.fillText("S U C C E S S",300,350);
                PararTiempo();
                mAmbiental.pause();
           }

        }else{
    
            if (Success ==true) {
                ctx.fillStyle ="rgba(0,0,0,0.5)";
                ctx.fillRect(0,0,800,800);
    
                ctx.fillStyle = "white";
                ctx.fillText("S U C C E S S",300,350);
                PararTiempo();
                mAmbiental.pause();
                
            } else {
                update();
                mAmbiental.play();
            }
            
        }
    
    


}


function update(){ 
    if(direccion=="up"){
        player1.y -=speed;
        
    }
    if(direccion=="down"){
        player1.y+=speed;
        
    }
    if(direccion=="left"){
        player1.x -=speed;
        
    }
    if(direccion=="right"){
        player1.x +=speed;
        
    }



    if(player1.se_tocan(meta)){
        
        meta.x = getrandom(600);
        meta.y = getrandom(600);
        Success= (Success)?false:true;
        mSuccess.play();
        score +=1;

    }
    if(player1.se_tocan(meta2)){
        
        meta.x = getrandom(600);
        meta.y = getrandom(600);
        Success= (Success)?false:true;
        mSuccess.play();
        score +=1;

    }

    for (var i = 0; i< paredes.length; i++) {
        if(player1.se_tocan(paredes[i])){
            if(direccion=="up"){
                player1.y +=speed;
    
            }
            if(direccion=="down"){
                player1.y-=speed;
    
            }
            if(direccion=="left"){
                player1.x +=speed;
                
            }
            if(direccion=="right"){
                player1.x -=speed;
                
            }
        }
        
    }
 
}

