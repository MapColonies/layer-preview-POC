const RASTER_TOKEN = '';
const tokenHeader = { 'X-API-KEY': RASTER_TOKEN };
const URL_PARAM = 'url';
const PRODUCT_TYPE_PARAM = 'type';
const PRODUCT_TYPE_RASTER = 'raster';
const PRODUCT_TYPE_3D = '3d';

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

const render3DTileset = () => {
  const tileset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url: new Cesium.Resource({
            url,
            headers: tokenHeader
          })
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

// --------

// Setup Cesium viewer first.
const viewer = new Cesium.Viewer('cesiumContainer', { baseLayerPicker: false });

// Remove stock cesium's base layer
viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
viewer.scene.globe.baseColor = Cesium.Color.WHITE;

viewer.animation.container.style.visibility = 'hidden';
viewer.timeline.container.style.visibility = 'hidden';
viewer.forceResize();

const url = getParameterByName(URL_PARAM);
const productType = getParameterByName(PRODUCT_TYPE_PARAM);

switch (productType) {
  case PRODUCT_TYPE_3D: {
    render3DTileset()
            .then(() => {
              viewer.camera.zoomIn(50);
            })
            .finally(() => {
              appendIconByProductType(PRODUCT_TYPE_3D);
            });

    break;
  }
  case PRODUCT_TYPE_RASTER: {
    renderRasterLayer()
            .then(() => {
              viewer.camera.zoomIn(50);
            })
            .finally(() => {
              appendIconByProductType(PRODUCT_TYPE_RASTER);
            });
    break;
  }

  default:
    break;
}
