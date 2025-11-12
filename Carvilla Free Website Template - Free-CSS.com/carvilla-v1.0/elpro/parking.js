var w,h;
var parklock = false;
var parklist = [0,0,0,0,0,0,0,0,0,0];
var queueitems = 0; // initially its 0

function setupparkingmanager(){
    w = document.getElementById('parkingspace').offsetWidth;
    h = document.getElementById('parkingspace').offsetHeight;

    // creating Animations -- important part

    var anim = document.createElement('style');
    var rule1 = document.createTextNode('@-webkit-keyframes carrr-park {'+
        'from { transform: rotate(270deg) }'+
        '80% { transform: rotate(270deg) translate(0px,-'+w+'px) }'+
        '90% { transform: rotate(270deg) translate(0px,-'+w+'px) rotate(90deg) }'+
        'to { transform: rotate(270deg) translate(0px,-'+w+'px) rotate(90deg) translate(0px,-'+h*.25+'px)}'+
        '}');
    anim.appendChild(rule1);
    var rule2 = document.createTextNode('@-webkit-keyframes carrr-bottom {'+
        'from { transform: rotate(270deg) }'+
        '80% { transform: rotate(270deg) translate(0px,-'+w+'px) }'+
        '90% { transform: rotate(270deg) translate(0px,-'+w+'px) rotate(90deg) }'+
        'to { transform: rotate(270deg) translate(0px,-'+w+'px) rotate(90deg) translate(0px,'+h*.25+'px)}'+
        '}');
    anim.appendChild(rule2);
    var rule3 = document.createTextNode('@-webkit-keyframes carrr-exit-top {'+
        'from { transform: rotate(270deg) translate(0px,-'+w+'px) rotate(90deg) translate(0px,-'+h*.25+'px) }'+
        '80% { transform: rotate(270deg) translate(0px,-'+w+'px) rotate(90deg) translate(0px,-'+h*.25+'px) translate(0px,'+h*.25+'px)}'+
        '90% { transform: rotate(270deg) translate(0px,-'+w+'px) rotate(90deg) translate(0px,-'+h*.25+'px) translate(0px,'+h*.25+'px) rotate(90deg)}'+
        'to { transform: rotate(270deg) translate(0px,-'+w+'px) rotate(90deg) translate(0px,-'+h*.25+'px) translate(0px,'+h*.25+'px) rotate(90deg) translate(0px,-'+w+'px)}'+
        '}');
    anim.appendChild(rule3);
    var rule4 = document.createTextNode('@-webkit-keyframes carrr-exit-bottom {'+
        'from { transform: rotate(270deg) translate(0px,-'+w+'px) rotate(90deg) translate(0px,'+h*.25+'px) }'+
        '80% { transform: rotate(270deg) translate(0px,-'+w+'px) rotate(90deg) translate(0px,'+h*.25+'px) translate(0px,-'+h*.25+'px)}'+
        '90% { transform: rotate(270deg) translate(0px,-'+w+'px) rotate(90deg) translate(0px,'+h*.25+'px) translate(0px,-'+h*.25+'px) rotate(90deg)}'+
        'to { transform: rotate(270deg) translate(0px,-'+w+'px) rotate(90deg) translate(0px,'+h*.25+'px) translate(0px,-'+h*.25+'px) rotate(90deg) translate(0px,-'+w+'px)}'+
        '}');
    anim.appendChild(rule4);
    document.getElementById('parkingspace').appendChild(anim);
}

function updatequeue(){
    for(i=1;i<=5;i++){
        if(i<=queueitems){
            document.getElementById('queue'+i.toString()).src = 'carrr.png';
        }else{
            document.getElementById('queue'+i.toString()).src = 'carrrfaded.png';
        }
    }
}



function queuecheck(slot){
    if(queueitems > 0){
        queueitems = queueitems - 1;
        updatequeue();
        carrrenter(slot);
    }
}

function carrrexit(slot){
    if(!parklock){
        parklist[slot] = 0;
        console.log(parklist)
        parklock = true;
        document.getElementById('slot'+(slot+1).toString()).style.background = 'rgb(27,118,19)';
        if(slot <= 4)
        document.getElementById('carrr'+(slot).toString()).style.animation = 'carrr-exit-top 2s both';
        else
        document.getElementById('carrr'+(slot).toString()).style.animation = 'carrr-exit-bottom 2s both';
        setTimeout(function(){document.getElementById('carrr'+(slot).toString()).remove();parklock=false;queuecheck(slot)},2000)
    }
}

function generatenewcarrr(slot){
    var space = document.getElementById('parkingspace');
    let img = document.createElement('img');
    img.src = 'carrr.png';
    img.className = 'new-carrr-origin';
    img.style.width = (w*.8) * .1 + 'px';
    img.id = 'carrr'+slot.toString();
    space.appendChild(img)
}


function carrrenter(slot){
    if(!document.getElementById('carrr'+(slot).toString()) && !parklock){
        parklist[slot] = 1;
        console.log(parklist)
        parklock = true;
        generatenewcarrr(slot);
        document.getElementById('slot'+(slot+1).toString()).style.background = 'rgb(146,18,18)';
        if(slot !=4 && slot != 9)
        document.getElementById('carrr'+(slot).toString()).style.right = (-w+(w*.1)+(((5 - (slot+1)%5))*((w*.8)*.2))+((w*.8)*.05))+'px'
        else
        document.getElementById('carrr'+(slot).toString()).style.right = (-w+(w*.1)+((w*.8)*.05))+'px';
        if(slot <= 4)
        document.getElementById('carrr'+(slot).toString()).style.animation = 'carrr-park 2s both';
        else
        document.getElementById('carrr'+(slot).toString()).style.animation = 'carrr-bottom 2s both';
        setTimeout(function(){parklock = false;},2000)
    }
    else{
        carrrexit(slot)
    }
}