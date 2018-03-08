mapboxgl.accessToken = 'pk.eyJ1IjoibW9uaWFjIiwiYSI6ImNqZWZnaThueTFmdWEyd2t0cW42bTMwYnAifQ.mIQv6AsUk0iv-CjIGqYbTw'

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/light-v9',
	center: [4.895168, 52.370216],
	zoom: 13
})

// code from the next step will go here!
var geojson = {
	type: 'FeatureCollection',
	features: [{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-77.032, 38.913]
			},
			properties: {
				title: 'Mapbox',
				description: 'Washington, D.C.'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [-122.414, 37.776]
			},
			properties: {
				title: 'Mapbox',
				description: 'San Francisco, California'
			}
		},
		{
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [4.895168, 52.370216]
			},
			properties: {
				title: 'Mapbox',
				description: 'Amsterdam, Netherlands'
			}
		}
	]
}

// add markers to map
geojson.features.forEach(function (marker) {

	// create a HTML element for each feature
	var el = document.createElement('div')
	el.className = 'marker'

	// make a marker for each feature and add to the map
	new mapboxgl.Marker(el)
		.setLngLat(marker.geometry.coordinates)
		.setPopup(new mapboxgl.Popup({
				offset: 25
			}) // add popups
			.setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
		.addTo(map)
})

var loader = new THREE.OBJLoader()
var options = []

loader.load(
	// resource URL
	'./3d-model.obj',
	// called when resource is loaded
	function ( object ) {
		object.rotateX(90)
		object.rotateY(-90)
		object.scale.set(0.25,0.25,0.25)
		threebox.addAtCoordinate(object, [4.895168, 52.370216, 0])

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
)

var threebox = new Threebox(map)
threebox.setupDefaultLights()
// var geometry = new THREE.BoxGeometry( 10, 10, 10 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// threebox.addAtCoordinate(cube, [4.895168, 52.370216, 0])
