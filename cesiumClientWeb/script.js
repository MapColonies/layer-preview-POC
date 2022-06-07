const RASTER_TOKEN = '';
const tokenHeader = { 'X-API-KEY': RASTER_TOKEN };
const URL_PARAM = 'url';
const PRODUCT_TYPE_PARAM = 'type';
const PRODUCT_TYPE_RASTER = 'raster';
const PRODUCT_TYPE_3D = '3d';
const MAX_APPROPRIATE_ZOOM_KM = 2;


// Setup Cesium viewer first.
const viewer = new Cesium.Viewer('cesiumContainer', { baseLayerPicker: false });
const ellipsoid = viewer.scene.mapProjection.ellipsoid;

// Remove stock cesium's base layer
viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
viewer.scene.globe.baseColor = Cesium.Color.WHITE;

viewer.animation.container.style.visibility = 'hidden';
viewer.timeline.container.style.visibility = 'hidden';
viewer.forceResize();

// Helpers

const getParameterByName = name => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
  });

  return params[name];
};

const appendIconByProductType = productType => {
  let iconClassName;

  switch (productType) {
    case PRODUCT_TYPE_3D:
      iconClassName = 'mc-icon-Map-3D';
      break;
    case PRODUCT_TYPE_RASTER:
      iconClassName = 'mc-icon-Map-Raster';
      break;
    default:
      iconClassName = 'mc-icon-Map-Raster';
      break;
  }

  const iconSpan = document.createElement('span');
  iconSpan.classList.add(iconClassName);
  iconSpan.id = 'layerIcon';

  document.querySelector('body').appendChild(iconSpan);
};

const getExtentRect = () => {
  const rect = new Cesium.Rectangle();
  const computedExtentRect = viewer.camera.computeViewRectangle(viewer.scene.globe.ellipsoid, rect);

  return computedExtentRect;
}

const getExtentSize = () => {
  const extent = getExtentRect(); 
  const NE = Cesium.Cartographic.toCartesian(Cesium.Rectangle.northeast(extent));
  const SW = Cesium.Cartographic.toCartesian(Cesium.Rectangle.southwest(extent));

  return Cesium.Cartesian3.distance(NE, SW) / 1000 // To get KM distance;

}

const getCameraHeight = () => {
  const height = ellipsoid.cartesianToCartographic(viewer.camera.position).height;
  
  return Math.floor(height * 0.001); // KM
}

const setCameraToProperHeightAndPos = () => {
  const cameraPosCartographic = ellipsoid.cartesianToCartographic(viewer.camera.position);

  if(getCameraHeight() > MAX_APPROPRIATE_ZOOM_KM) {
    cameraPosCartographic.height = MAX_APPROPRIATE_ZOOM_KM * 1000; // Convert to meters
  }

  viewer.camera.position = ellipsoid.cartographicToCartesian(cameraPosCartographic);
}

// --------

const url = getParameterByName(URL_PARAM);
const productType = getParameterByName(PRODUCT_TYPE_PARAM);

console.log(url, productType);

const render3DTileset = () => {
  const tileset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url: new Cesium.Resource({
            url,
            headers: tokenHeader
          })
          // url: Cesium.IonResource.fromAssetId(75343)
        })
    );

  return viewer.flyTo(tileset, { duration: 0 });
};

const renderRasterLayer = () => {
  const provider = new Cesium.WebMapTileServiceImageryProvider({
    url: new Cesium.Resource({
      url,
      headers: tokenHeader
    })
  });

  const layer = viewer.imageryLayers.addImageryProvider(provider);

  return viewer.flyTo(layer, { duration: 0 });
};




// Render products

switch (productType) {
  case PRODUCT_TYPE_3D: {
    render3DTileset()
            .then(() => {
              setCameraToProperHeightAndPos()
            })
            .finally(() => {
              appendIconByProductType(PRODUCT_TYPE_3D);
            });

    break;
  }
  case PRODUCT_TYPE_RASTER: {
    renderRasterLayer()
            .then(() => {
              // viewer.camera.zoomIn(50);
            })
            .finally(() => {
              appendIconByProductType(PRODUCT_TYPE_RASTER);
            });
    break;
  }

  default:
    break;
}

// --------