import de.fhpotsdam.unfolding.*;
import de.fhpotsdam.unfolding.geo.*;
import de.fhpotsdam.unfolding.utils.*;
import de.fhpotsdam.unfolding.providers.Microsoft;

UnfoldingMap map;

void setup() {
  size(800, 600);
  map = new UnfoldingMap(this, new Microsoft.AerialProvider());
  MapUtils.createDefaultEventDispatcher(this, map);
  
  Location chicagoLocation = new Location(41.86, -87.63);
  map.zoomAndPanTo(chicagoLocation, 12);
  float maxPanningDistance = 30; // in km
  map.setPanningRestriction(chicagoLocation, maxPanningDistance);
  map.setTweening(true);

}


void draw() {
    map.draw();
    Location chicago = map.getLocation(mouseX, mouseY);
    fill(0);
    text(chicago.getLat() + "," + chicago.getLon(), mouseX, mouseY);
    ellipse(mouseX,mouseY,20,20);
    loop();
}





