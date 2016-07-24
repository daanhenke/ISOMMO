small = document.getElementById("smallCanv");
smallCon = small.getContext("2d");

big = document.getElementById("bigCanv");
bigCon = big.getContext("2d");

var img = new Image();
img.src = "../images/tests/grass.png";
img.onload = anim;

function anim()
{
    smallCon.imageSmoothingEnabled = false;
    smallCon.mozImageSmoothingEnabled = false;
    smallCon.oImageSmoothingEnabled = false;
    smallCon.webkitImageSmoothingEnabled = false;

    smallCon.clearRect(0, 0, 128, 128);
    smallCon.drawImage(img, 64, 64);

    smallCon.fillStyle = "#FF0000";
    smallCon.fillText("Hello", 5, 20, 128);

    bigCon.imageSmoothingEnabled = false;
    bigCon.mozImageSmoothingEnabled = false;
    bigCon.oImageSmoothingEnabled = false;
    bigCon.webkitImageSmoothingEnabled = false;

    bigCon.clearRect(0, 0, 256, 256);
    bigCon.drawImage(small, 0, 0, 256, 256);


}