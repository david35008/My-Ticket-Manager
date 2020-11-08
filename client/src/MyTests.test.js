const puppeteer = require('puppeteer');
const nock = require('nock');
const useNock = require('nock-puppeteer');

const mockData = [
    {
        id: 'dd63145f-6340-5fa7-8619-2f44dbf63fd7',
        title: 'help me',
        content: 'pls i have been trying to run code on a dynamic page but it is not working, i need help pls. thanks',
        userEmail: 'rotif@suob.sh',
        creationTime: 1514809791415,
        labels: ['Corvid', 'Api']
    },
];
const updatedData = [
    {
        id: '55fe723d-78f9-408d-858f-44a3543fe680',
        title: 'Test title',
        content: 'Test content',
        userEmail: 'Test@email.com',
        creationTime: 1514809791415,
        labels: ['Test1', 'Test2']
    },
    {
        id: 'dd63145f-6340-5fa7-8619-2f44dbf63fd7',
        title: 'help me',
        content: 'pls i have been trying to run code on a dynamic page but it is not working, i need help pls. thanks',
        userEmail: 'rotif@suob.sh',
        creationTime: 1514809791415,
        labels: ['Corvid', 'Api'],
        done: true
    },
];

let page;
let browser;
const projectName = '1.Ticket Manager My Test';
describe(projectName, () => {
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        useNock(page, ['http://localhost:3000/api']);
    })
    afterAll(async () => {
        await browser.close();
    });

    test('tests if the done/undone buttons marke right', async () => {
        const getAllTicketsMock = await nock('http://localhost:3000/', { allowUnmocked: true })
            .get('/api/tickets')
            .query(() => true)
            .reply(200, mockData);

        const getDoneButtonReply = await nock('http://localhost:3000/', { allowUnmocked: true })
            .post('/api/tickets/dd63145f-6340-5fa7-8619-2f44dbf63fd7/done')
            .reply(200, { updated: true });

        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.checkButton', { visible: true });
        let openDoneButton = await page.$('.checkButton');
        const firstDoneButtonValue = (await openDoneButton.getProperty('innerHTML'))._remoteObject.value;
        mockData[0].done = true;
        await openDoneButton.click();
        await timeout(2000);
        await page.$$('.ticket');
        await timeout(2000);
        const updatedButton = await page.$('.checkButton');
        const secondDoneButtonValue = (await updatedButton.getProperty('innerHTML'))._remoteObject.value;
        expect(secondDoneButtonValue).toBe(firstDoneButtonValue);
    }, 30000)

    test('tests if the add new ticket add a ticket to the data.jason', async () => {

        await nock('http://localhost:3000/', { allowUnmocked: true })
            .get('/api/tickets')
            .query(() => true)
            .once()
            .reply(200, mockData);

            await nock('http://localhost:3000/', { allowUnmocked: true })
            .get('/api/tickets')
            .query(() => true)
            .once()
            .reply(200, updatedData);

        await nock('http://localhost:3000/', { allowUnmocked: true })
            .post('/api/tickets/')
            .reply(200);

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
        await timeout(2000);
        const afterAddingElements = await page.$$('.ticket');
        expect(afterAddingElements.length).toBe(2);
    }, 25000)
})

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
