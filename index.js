const puppeteer = require('puppeteer');

const run = async () => {
	try {
		const browser = await puppeteer.launch({ headless : false });
        const page = await browser.newPage();
		const url = 'https://seibro.or.kr/websquare/control.jsp?w2xPath=/IPORTAL/user/company/BIP_CNTS01042V.xml&menuNo=286';

        await page.goto(url, { waitUntil : "networkidle2" });
		// await page.waitForNavigation();
		await page.click('#image1');
		// grabbing team data
		const selector = '#grid1_body_table';
		await page.waitForSelector(selector);	
		const data = await page.$eval('#grid1_column339 > nobr', (element) => element.textContent);
		console.log(data);
        await browser.close()
	} catch (e) {
		console.log(e);
	}
}

run();
