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

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

var loader = new THREE.OBJLoader();

// load a resource
loader.load(
	// resource URL
	'3d-model.obj',
	// called when resource is loaded
	function ( object ) {
		object.position.z = -2000
		object.position.y = 0
		object.position.x = 0
		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

var renderer = new THREE.WebGLRenderer({alpha: true})
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

var geometry = new THREE.BoxGeometry( 1, 1, 1 )
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
var cube = new THREE.Mesh( geometry, material )
scene.add( cube )

camera.position.z = 10

const light = new THREE.AmbientLight(0x333333)
scene.add(light)

function resizeWindow() {
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)

	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectMatrix()
}

// window.addEventListener('resize', resizeWindow)

function animate() {
	requestAnimationFrame( animate )
	renderer.render( scene, camera )
}
animate()