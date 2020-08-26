const puppeteer = require('puppeteer');
const fs = require('fs').promises;

let page;
let browser;
const projectName = '1.Ticket Manager My Test';
describe(projectName, () => {
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    })

    test('tests if the add new ticket add a ticket to the data.jason (Work on server running!)', async () => {
        const data = await fs.readFile('../server/data.json')
        const Json = JSON.parse(data);
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('#modalButton', { visible: true });
        const openmodalButton = await page.$('#modalButton');
        await openmodalButton.click();
        await page.waitForSelector('#titleInput', { visible: true });
        await page.type('#titleInput', 'Test title');
        await page.type('#contentInput', 'Test content');
        await page.type('#emailInput', 'Test@email.com');
        await page.type('#labelsInput', 'Test1,Test2');
        const submitBtn = await page.$('#submitNewTicket');
        await submitBtn.click();

        setTimeout(async () => {
            const updatedData = await fs.readFile('../server/data.json')
            const parsedUpdatedData = JSON.parse(updatedData);
            const firstItem = parsedUpdatedData[0];

            expect(parsedUpdatedData.length).toBe(Json.length + 1);
            expect(firstItem.title).toBe('Test title');
            expect(firstItem.content).toBe('Test content');
            expect(firstItem.userEmail).toBe('Test@email.com');
            expect(firstItem.labels[0]).toBe('Test1');
            expect(firstItem.labels[1]).toBe('Test2');
        }, 2000);
    }, 25000)

    test('tests if the done/undone buttons marke right (Work on server running!)', async () => {
        const data = await fs.readFile('../server/data.json');
        const Json = JSON.parse(data);
        const currentState = Json[0].done;
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.checkButton', { visible: true });
        let openDoneButton = await page.$('.checkButton');
        await openDoneButton.click();

        setTimeout(async() => {
            const data1 = await fs.readFile('../server/data.json')
            const Json1 = JSON.parse(data1);
            const updatedState = Json1[0].done;
            expect(updatedState === !currentState).toBe(true);

            
            await page.goto('http://localhost:3000/');
            await page.waitForSelector('.checkButton', { visible: true });
            openDoneButton = await page.$('.checkButton');
            await openDoneButton.click();
            
            setTimeout(async () => {
                
            const data2 = await fs.readFile('../server/data.json')
            const Json2 = JSON.parse(data2);
            const updatedState2 = Json2[0].done;
            
            
            expect(updatedState2 === currentState).toBe(true);
        }, 2000);
        }, 2000);



    }, 25000)


})
