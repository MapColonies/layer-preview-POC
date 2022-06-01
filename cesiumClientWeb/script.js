const RASTER_TOKEN = 'TOKEN';
const tokenHeader = { 'X-API-KEY': RASTER_TOKEN };

// Setup Cesium viewer first.
const viewer = new Cesium.Viewer('cesiumContainer', { baseLayerPicker: false });

// Remove stock cesium's base layer
viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
viewer.imageryLayers.addImageryProvider

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

  viewer.flyTo(tileset)
