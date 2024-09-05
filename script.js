// Initialize the map
var map = L.map('map', {
    minZoom: -5,
    maxZoom: 5,
    center: [0, 0],
    zoom: 0
});

// Load the house floor plan as an image layer
var bounds = [
    [0, 0],
    [500, 500]
]; // Adjust size based on your image
var image = L.imageOverlay('house-plan.jpg', bounds).addTo(map);

// Set view to the bounds of the image
map.fitBounds(bounds);

// Coordinates for the points
const points = {
    livingRoom: [75, 280],
    kitchen: [62, 300],
    bedroom: [40, 400],
    mainDoor: [30, 230]
};

// Add markers for the points
var livingRoomMarker = L.marker(points.livingRoom).addTo(map).bindPopup('Living Room');
var kitchenMarker = L.marker(points.kitchen).addTo(map).bindPopup('Kitchen');
var bedroomMarker = L.marker(points.bedroom).addTo(map).bindPopup('Bedroom');
var mainDoorMarker = L.marker(points.mainDoor).addTo(map).bindPopup('Main Door');

// Custom routes between points (example: from Living Room to Kitchen)
const routes = {
    livingRoomToKitchen: [
        points.livingRoom,
        [70, 290], // Waypoint 1 (hallway)
        [65, 295], // Waypoint 2 (corner)
        points.kitchen
    ],
    bedroomToMainDoor: [
        points.bedroom,
        [45, 350], // Waypoint 1 (near hallway)
        [35, 270], // Waypoint 2 (hallway corner)
        points.mainDoor
    ]
    // Add more custom routes as needed
};

// Event listener for the button click to show the route
document.getElementById('show-route').addEventListener('click', function () {
    var startPoint = document.getElementById('start-point').value;
    var endPoint = document.getElementById('end-point').value;

    // Remove any existing route from the map
    if (window.routeLine) {
        map.removeLayer(window.routeLine);
    }

    // Check if both start and end points are selected
    if (startPoint && endPoint && startPoint !== endPoint) {
        var startCoordinates = points[startPoint];
        var endCoordinates = points[endPoint];

        // Check for custom routes or fallback to straight line
        var customRouteKey = startPoint + 'To' + endPoint.charAt(0).toUpperCase() + endPoint.slice(1);
        var routeCoordinates = routes[customRouteKey] || [startCoordinates, endCoordinates];

        // Draw the polyline (route) with waypoints or a straight line
        window.routeLine = L.polyline(routeCoordinates, {
            color: 'blue',
            weight: 5
        }).addTo(map);

        // Fit the map bounds to show the entire route
        map.fitBounds(window.routeLine.getBounds());
    } else {
        alert('Please select different starting and destination points.');
    }
});