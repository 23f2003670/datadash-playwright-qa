const { chromium } = require('playwright');

(async () => {
  const seeds = [5,6,7,8,9,10,11,12,13,14];
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);
    await page.waitForSelector('table');

    const numbers = await page.$$eval('table td', cells =>
      cells.map(cell => Number(cell.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += sum;
  }

  console.log("TOTAL_SUM:", grandTotal);
  await browser.close();
})();
