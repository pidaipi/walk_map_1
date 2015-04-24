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

static final float OFFSET = 1e-3;
 
static final float round10(float f, float c) {
  return round(f/10.0 - c) * 10.0;
}

void setup() {
  size(300, 480);
  background(#eee5da);
  
  // test = myLat;
  // console.log(test);

  newLat = map(myLat, 41.84, 41.94, 0, 350);
  newLon= map(myLon, -87.56, -87.7, 0, 300);

  color b = color(#cfeedb);
  color p = color(#97dab1);
  // int x = 25; 
  // int y = 25;
  button[0] = new Button(0, 430, 50, b,p);
  button[1] = new Button(50, 430, 50, #aacdb7,#7ab18e);
  button[2] = new Button(100,430,50,#cb2d60, #8c1f42);
  button[3] = new Button(150,430,50,#e98365, #df4d22);
  button[4] = new Button(200,430,50,#dfd931, #dfae31);
  button[5] = new Button(250,430,50,#0551d0,170);

  smooth();


   

}



int w = #cfeedb;

void colorPalette(){
  if(mode==1){
    w=#aacdb7;
  }else if (mode==2){
    w=#cfeedb;
  }else if (mode == 3){
    w=#cb2d60;
  }else if (mode == 4){
    w= #e98365;
  }else if (mode == 5){
    w= #dfd931;
  }else if (mode == 6){
    w= #eee5da;
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
  float trX = round10(newLon, OFFSET);
  float trY = round10(newLat, OFFSET);
  smooth();
  noStroke();
  fill (w);
  translate(-trX*sc+trX, -trY*sc+trY);
  scale(sc);

  ellipse(newLon, newLat,15/sc,15/sc);


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


