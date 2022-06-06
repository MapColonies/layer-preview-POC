const RASTER_TOKEN = '';
const tokenHeader = { 'X-API-KEY': RASTER_TOKEN };

// Setup Cesium viewer first.
const viewer = new Cesium.Viewer('cesiumContainer', { baseLayerPicker: false });

// Remove stock cesium's base layer
// viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
viewer.scene.globe.baseColor = Cesium.Color.WHITE

viewer.animation.container.style.visibility = 'hidden';
viewer.timeline.container.style.visibility = 'hidden';
viewer.forceResize();

// const provider = new Cesium.WebMapTileServiceImageryProvider({
//     url: new Cesium.Resource({
      
//       url: `LAYER URL`,
//       /* Don't forget to include the authentication header */
//       // headers: tokenHeader,
//     }),
//   })

//   const layer = viewer.imageryLayers.addImageryProvider(provider);


const tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
      url:new Cesium.Resource({
        url: '/mock/tileset_1/tileset.json',     
        // headers: tokenHeader
      })
    })
  );
 
  viewer.flyTo(tileset, { duration: 0 })
  .then(()=> {
    viewer.camera.zoomIn(80)
  }).finally(()=>{
    const img_3d = document.createElement('img');
    img_3d.src = './images/3d_icon.jpg';
    img_3d.id = 'layerIcon';

    document.querySelector('body').appendChild(img_3d);
  })


