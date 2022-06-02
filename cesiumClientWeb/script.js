const RASTER_TOKEN = '';
const tokenHeader = { 'X-API-KEY': RASTER_TOKEN };

// Setup Cesium viewer first.
const viewer = new Cesium.Viewer('cesiumContainer', { baseLayerPicker: false });

// Remove stock cesium's base layer
viewer.imageryLayers.remove(viewer.imageryLayers.get(0));

viewer.animation.container.style.visibility = 'hidden';
viewer.timeline.container.style.visibility = 'hidden';
viewer.forceResize();

// const provider = new Cesium.WebMapTileServiceImageryProvider({
//     url: new Cesium.Resource({
//       url: `LAYER URL`,
//       /* Don't forget to include the authentication header */
//       headers: tokenHeader,
//     }),
//   })

//   const layer = viewer.imageryLayers.addImageryProvider(provider);

//   viewer.flyTo(layer);


const tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
      url:new Cesium.Resource({
        url: '3d_TILESET',     
        headers: tokenHeader
      })
    })
  );
 
  viewer.flyTo(tileset, { duration: 0 })
  .then(()=> {
    viewer.camera.position = new Cesium.Cartesian3(1339662.456792876, -4649056.358393923, 4143333.324980662);
    viewer.camera.direction = new Cesium.Cartesian3(-0.8640802171411865, -0.407597507677319, -0.29534666085885897);
    viewer.camera.up = new Cesium.Cartesian3(0.14337653309767578, -0.7617546056359903, 0.6318014645038804);
  
  }).finally(()=>{
    const img_3d = document.createElement('img');
    img_3d.src = './images/3d_icon.jpg';
    img_3d.id = 'layerIcon';

    document.querySelector('body').appendChild(img_3d);
  })


