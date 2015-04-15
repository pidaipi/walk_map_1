var myLat = 20;
var myLon = 20;

var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    myLat = position.coords.latitude;
    myLon = position.coords.longitude;
    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=100x100&sensor=false";
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
    // document.getElementById("coords").innerHTML = latlon;


}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}



float newLat = 0;
float newLon = 0;

float test = myLat;

int palette = 6;

Button[]button = new Button[palette];


int mode ;


class Button{
  int x,y;
  int size;
  color bColor;
  color pColor;
  boolean over = false;
  boolean pressed = false;
  
  Button(int xp, int yp, int s, color b, color p){
    x = xp;
    y = yp;
    size = s;      
    bColor = b;
    pColor = p;
  }
  
  void update(){
    if((mouseX>=x)&&(mouseX<=x+size)&&(mouseY>=y)&&(mouseY<=y+size)){
      over = true;
    }else{
      over = false;
    }
  }
  
  boolean press(){
   if (over == true){
     pressed = true;
     return true;
   }else{
     return false;
   }
  }
  
  void release(){
    pressed = false;
  }
  
  void display(){
    if( pressed == true){
      fill(pColor);
    }else{
      fill(bColor);
    }
    noStroke();
    rect(x,y,size,size);
     
  }
}


void setup() {
  size(300, 480);
  background(#82756f);
  
  // test = myLat;
  // console.log(test);

  newLat = map(myLat, 41.84, 41.94, 0, 350);
  newLon= map(myLon, -87.56, -87.7, 0, 300);

  color b = color(#feba7b);
  color p = color(#ee7302);
  // int x = 25; 
  // int y = 25;
  button[0] = new Button(0, 430, 50, b,p);
  button[1] = new Button(50,430,50,#b13c11, #b16411);
  button[2] = new Button(100,430,50,#7a2949, #541c32);
  button[3] = new Button(150,430,50,#335d69, #26464f);
  button[4] = new Button(200, 430, 50,#67a193,#3f675d);
  button[5] = new Button(250,430,50,#0551d0,170);

  smooth();


   

}



int w = #feba7b;

void colorPalette(){
  if(mode==1){
    w=#feba7b;
  }else if (mode==2){
    w=#b13c11;
  }else if (mode == 3){
    w=#7a2949;
  }else if (mode == 4){
    w= #335d69;
  }else if (mode == 5){
    w= #67a193;
  }else if (mode == 6){
    w= #82756f;
  }
}
void dot(){
  getLocation();
  newLat = map(myLat, 41.84, 41.94, 0, 350);
  newLon= map(myLon, -87.56, -87.7, 0, 300);
  // document.getElementById("coords").innerHTML = "Mapped Latitude: " + newLat + "Mapped Longitude: " + newLon;

  // console.log(newLat);
  // console.log(newLon);
  int sc = 20;
  float trX = 137;
  float trY = 141;
  smooth();
  noStroke();
  fill (w);
  translate(-trX*sc+trX, -trY*sc+trY);
  scale(sc);

  ellipse(newLon, newLat,10/sc,10/sc);


  loop();
}

// int m = #ff00ff;
//   // void mouseClicked(){
//   //   if (m == #ff00ff){
//   //     m = 0;
//   //   } else {
//   //     m = #ff00ff;
//   //   }
//   // }

// void magentaDot(){
//   getLocation();
//   newLat = map(myLat, 41.6, 42.0, 0, 300);
//   newLon= map(myLon, -87.56, -87.7, 0, 300);
//   document.getElementById("coords").innerHTML = "Mapped Latitude: " + newLat + "Mapped Longitude: " + newLon;

//   // console.log(newLat);
//   // console.log(newLon);
//   int sc = 10;
//   float trX = 138;
//   float trY = 210;
//   smooth();
//   noStroke();
//   fill (m);
//   pushMatrix();
//   translate(-trX*sc+trX, -trY*sc+trY);
//   scale(sc);
//   ellipse(newLon, newLat,10/sc,10/sc);

//   popMatrix();
//   loop();
// }

void draw() {

  colorPalette();
  manageButton();
  dot();  
  
    scale(-1,1);
  // if (mode == 1){
  //   magentaDot();
  // }
  // rect(250,300,50,50);
  // noFill();
  // stroke(200);
  // strokeWeight(2);
  // strokeJoin(ROUND);
  
}

void manageButton(){
  button[0].update();
  button[1].update();
  button[2].update();
  button[3].update();
  button[4].update();
  button[5].update();
  
  button[0].display();
  button[1].display();  
  button[2].display();
  button[3].display();
  button[4].display();  
  button[5].display();
}

void mousePressed(){
  if (button[0].press() == true){mode = 1;}
  if (button[1].press() == true){mode = 2;}
  if (button[2].press() == true){mode = 3;}
  if (button[3].press() == true){mode = 4;}
  if (button[4].press() == true){mode = 5;}
  if (button[5].press() == true){mode = 6;}

}

void mouseReleased(){
  button[0].release();
  button[1].release();
  button[2].release();
  button[3].release();
  button[4].release();
  button[5].release();
}


