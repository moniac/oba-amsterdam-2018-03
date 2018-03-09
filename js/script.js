import {ObjectLoader, JSONLoader} from './three.module.js'

mapboxgl.accessToken = 'pk.eyJ1IjoibW9uaWFjIiwiYSI6ImNqZWZnaThueTFmdWEyd2t0cW42bTMwYnAifQ.mIQv6AsUk0iv-CjIGqYbTw'

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/light-v9',
	center: [4.895168, 52.370216],
	zoom: 20
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

var loader = new THREE.ObjectLoader()
// THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() )
var options = []
var threebox = new Threebox(map)
threebox.setupDefaultLights()

var onProgress = function ( xhr ) {
	if ( xhr.lengthComputable ) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log( Math.round(percentComplete, 2) + '% downloaded' );
	}
};
var onError = function ( xhr ) { 
	console.log( xhr );
};

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('./models/obj/')
mtlLoader.load( '3d-model.mtl', function( materials ) {
	materials.preload();
	var models = './models/obj/3d-model.json'
	// objLoader.setMaterials( materials );
	loader.load( './models/obj/apartment-house.json', function ( object ) {
		object.scale.set( 0.05, 0.05, 0.05 )
		object.rotateX( ( Math.PI / 180 ) * 90 )
		object.rotateY( ( Math.PI / 180 ) * -180 )
		object.castShadow = true
		object.receiveShadow = true
		
		threebox.addAtCoordinate(object, [4.895168, 52.370216, 1] )
		
	}, onProgress, onError);
}, onProgress, onError);