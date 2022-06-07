const fs = require("fs/promises");
const puppeteer = require("puppeteer");

(async function() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{
        await page.setViewport({ width: 1200, height: 600});
        await page.goto('http://localhost:4000/?url=/mock/tileset_1/tileset.json&type=3d');
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