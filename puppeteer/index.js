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
        // await page.goto('http://localhost:4000/?url=https://mapproxy-int-mapproxy-route-libot-integration.apps.v0h0bdx6.eastus.aroapp.io//wmts/demo_area_1-Orthophoto/libotGrid/%7BTileMatrix%7D/%7BTileCol%7D/%7BTileRow%7D.png/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicmVzb3VyY2VUeXBlcyI6WyJyYXN0ZXIiLCJkZW0iLCJ2ZWN0b3IiLCIzZCJdLCJkIjpbInJhc3RlciIsImRlbSIsInZlY3RvciIsIjNkIl0sImlhdCI6MTUxNjIzOTAyMn0.eGlm2er5oJUCOqNWA8bgi1QXoTSvtXD8lvRxcnN0BKY&type=raster');
        await page.waitForSelector('#layerIcon');
        const cesiumElem = await page.$('#cesiumContainer');
        await fs.mkdir('./puppeteer/screenshots', { recursive: true });
        await cesiumElem.screenshot({ path: './puppeteer/screenshots/model.png' });
        await browser.close();
    }catch(e) {
        console.error(e);
        await browser.close();
    }
})()