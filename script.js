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
var image = L.imageOverlay('IUBMap.png', bounds).addTo(map);

// Set view to the bounds of the image
map.fitBounds(bounds);

// Coordinates for points
const points = {
    yourPosition: [40, 320],
    auditorium: [63, 408],
    multipurposeHall: [74, 410],
    informationDesk: [70, 385],
    lobby: [78, 395],
    admissionOffice: [41, 377],
    helloCenter: [82, 350],
    dosaOffice: [79, 260],
    souvenirShop: [79, 245],
    jolilShop: [77, 231],
    proctorOffice: [74, 231],
    washroom: [82, 226],
    foodCourt: [81, 209],
    swimmingPool: [73, 155],
    dmkBuilding: [55, 130],
    jubileeBuilding: [68, 80],
    securityBox: [42, 298],
    HealthCenter: [82, 277]
};

// Add marker for "Your Position"
L.marker(points.yourPosition, {
        title: 'Your Position'
    })
    .addTo(map)
    .bindPopup('Your Position')
    .openPopup(); // Automatically open the popup when the map loads

// Add markers for the other points
Object.keys(points).forEach(function (key) {
    if (key !== 'yourPosition') {
        L.marker(points[key]).addTo(map).bindPopup(key.replace(/([A-Z])/g, ' $1').trim());
    }
});

// Custom route example with waypoints
const customRouteauditorium = [
    points.yourPosition,
    [45, 320],
    [45, 388], 
    [50, 388], 
    [70, 388], 
    [70, 408], 
    points.auditorium // Final destination
];
const customRouteMultipurposeHall = [
    points.yourPosition,
    [45, 320],
    [45, 388], 
    [50, 388], 
    [70, 388], 
    [70, 408], 
    points.multipurposeHall // Final destination
];

// Routes between points
const routes = {
    yourPositionToAuditorium: customRouteauditorium,
    yourPositionToMultipurposeHall: customRouteMultipurposeHall,
    yourPositionToInformationDesk: [points.yourPosition, points.informationDesk],
    yourPositionToLobby: [points.yourPosition, points.lobby],
    yourPositionToAdmissionOffice: [points.yourPosition, points.admissionOffice],
    yourPositionToHelloCenter: [points.yourPosition, points.helloCenter],
    yourPositionToDosaOffice: [points.yourPosition, points.dosaOffice],
    yourPositionToSouvenirShop: [points.yourPosition, points.souvenirShop],
    yourPositionToJolilShop: [points.yourPosition, points.jolilShop],
    yourPositionToProctorOffice: [points.yourPosition, points.proctorOffice],
    yourPositionToWashroom: [points.yourPosition, points.washroom],
    yourPositionToFoodCourt: [points.yourPosition, points.foodCourt],
    yourPositionToSwimmingPool: [points.yourPosition, points.swimmingPool],
    yourPositionToDmkBuilding: [points.yourPosition, points.dmkBuilding],
    yourPositionToJubileeBuilding: [points.yourPosition, points.jubileeBuilding],
    yourPositionToSecurityBox: [points.yourPosition, points.securityBox],
    yourPositionToHealthCenter: [points.yourPosition, points.HealthCenter]
    // Add more routes as needed
};

// Event listener for the button click to show the route
document.getElementById('show-route').addEventListener('click', function () {
    var endPoint = document.getElementById('end-point').value;

    // Remove any existing route from the map
    if (window.routeLine) {
        map.removeLayer(window.routeLine);
    }

    // Check if the end point is selected
    if (endPoint) {
        var customRouteKey = 'yourPositionTo' + endPoint.charAt(0).toUpperCase() + endPoint.slice(1);
        var routeCoordinates = routes[customRouteKey];

        // Draw the polyline (route) with waypoints or a straight line
        window.routeLine = L.polyline(routeCoordinates, {
            color: 'blue',
            weight: 5
        }).addTo(map);

        // Fit the map bounds to show the entire route
        map.fitBounds(window.routeLine.getBounds());
    } else {
        alert('Please select a destination point.');
    }
});