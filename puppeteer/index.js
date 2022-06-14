const fs = require("fs/promises");
const puppeteer = require("puppeteer");

(async function() {
    const browser = await puppeteer.launch({
        args: [
          '--disable-web-security',
        ]});
    const page = await browser.newPage();
    try{
        await page.setViewport({ width: 800, height: 800});
        // await page.goto('http://localhost:4000/?url=/mock/tileset_1/tileset.json&type=3d');
        await page.goto('http://localhost:4000/?url=https://3d.ofek-air.com/3d/Jeru_Old_City_Cesium/ACT/Jeru_Old_City_Cesium_ACT.json&type=3d');
        await page.waitForSelector('#layerIcon');
        const cesiumElem = await page.$('#cesiumContainer');
        await fs.mkdir('./puppeteer/screenshots', { recursive: true });
        await cesiumElem.screenshot({ path: './puppeteer/screenshots/raster.png' });
        await browser.close();
    }catch(e) {
        console.error(e);
        await browser.close();
    }
})()