
(async () => {
    const browser = await puppeteer.launch({ headless : false });
    const page = await browser.newPage();
    const url = 'https://seibro.or.kr/websquare/control.jsp?w2xPath=/IPORTAL/user/company/BIP_CNTS01042V.xml&menuNo=286';

    await page.goto(url, { waitUntil : "networkidle2" });
    // await page.waitForNavigation();
    await page.click( "#image1" );
    // grabbing team data
    const selector = '#grid1_cell_0_3'
    data = await page.$eval(selector, (element) => element.textContent);

    console.log(data);
    // const result = await page.evaluate(() => {

    //         const grabFromRow = (row, id) => row
    //           .querySelector(`#${id}`) // grab the TD
    //           .innerText                        // grab the text
    //           .trim()                           // remove spaces

    //         // defining selector
    //         const TEAM_ROW_SELECTOR = 'tr.grin_body_row'

    //         // array to store data
    //         const data = []

    //         const dataRows = document.querySelectorAll(TEAM_ROW_SELECTOR)

    //         // looping over each team row
    //         for(const tr of dataRows){
    //                 data.push({
    //                   col1: grabFromRow(tr, 'grid1_cell_0_0'),
    //                   col2: grabFromRow(tr, 'grid1_cell_0_1'),
    //                   col3: grabFromRow(tr, 'grid1_cell_0_2'),
    //                   col4: grabFromRow(tr, 'grid1_cell_0_3')
    //                  })
    //         }

    //         return data
    // })

    // saving the data as JSON
    // const fs = require('fs')

    // fs.writeFile(
    //         './result.json',
    //         JSON.stringify(result, null, 2)
    // )

    await browser.close()

})();