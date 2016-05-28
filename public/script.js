var cams = [];
var camElm = []

var camIndex = [];
var numCams = 9;
var searchIndex = 0;

$(document).ready(function(){


    $.getJSON('/cams', function(data){
        cams = data.markers;

        /*for(var i=0;i<cams.length;i++){
            if(cams[i].icon != 'images/camera2.png'){
                camIndex.push(i);
                console.log(cams[i]);
                if(camIndex.length == numCams){
                    break;
                }
            }

        }*/

        for(var i=0;i<numCams;i++){
            findCam(i);
        }

        updateImages();
        //console.log(data.markers);
        setInterval(updateImages, 800)
    })

    for(var i=0;i<numCams;i++){
        var img = $('<img>');
        img.css({
            width: '33%',
            height: '33%'
        })
        img.appendTo($('body'));
        camElm.push(img)
    }
})

function findCam(index){
    var searchCamIndex = searchIndex;
    searchIndex ++;

    checkCam(searchCamIndex, function(d){
        console.log(index,d);
        if(d){
            camIndex.push(searchCamIndex);
        } else {
            findCam(index);
        }
    })
}

function checkCam(cam, cb){
    var imgUrl = '/image?query='+cams[cam].id+'&math='+Math.random();

    var myImg = new Image();
    myImg.src = imgUrl;
    var context = document.getElementById('canvas').getContext('2d');
    myImg.onload = function(){

        context.drawImage(myImg, 0, 0);
        var data = context.getImageData(100,0, 150, 1).data;

        var avg = [0,0,0];
        for(var i=0;i<data.length;i+=4){
            avg[0] += data[i];
            avg[1] += data[i+1];
            avg[2] += data[i+2];
        }
        avg[0] /= data.length/4;
        avg[1] /= data.length/4;
        avg[2] /= data.length/4;
        if(avg[0] == 0 && avg[1] == 0 && avg[2] == 0){
            cb(false);
        } else if(avg[0] == 231 && avg[1] == 230 && avg[2] == 228){
            cb(false);
        } else {
            console.log(avg);
            cb(true);
        }
    }
}
function updateImages(){

    for(var i=0;i<numCams;i++){
        if(camIndex.length > i){
            var imgUrl = 'http://207.251.86.238/cctv'+cams[camIndex[i]].id+'.jpg?math='+Math.random();
            camElm[i].attr('src',imgUrl)
        }


    }




}
