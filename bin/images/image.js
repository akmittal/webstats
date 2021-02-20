const puppeteer = require('puppeteer');
const fastify = require('fastify')()

let browser, page

function getImageType(mime) {
    switch (mime) {
        case 'image/png':
            return "png";
        case 'image/jpeg':
            return "jpeg"
        case 'image/gif':
            return "gif"
        case 'image/avif':
            return "avif"
        case 'image/svg+xml':
            return "svg"
        case 'image/webp':
            return "webp"
    }
}
const start = async () => {
    try {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        process.on('SIGTERM', async () => {
            await browser.close();
            page.close()
        })
        await fastify.listen(4000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
fastify.get('/:domain', async (request, reply) => {
    const result = [];
    page.on('requestfinished', (request) => {
        const res = request.response();
        if (res && res.headers()["content-type"] && res.headers()["content-type"].startsWith("image/")) {
            result.push({
                url: request.url(), size: parseInt(res.headers()["content-length"]
                ), type: getImageType(res.headers()["content-type"])
            })
        }
    });
    page.on('load', () => {
        reply.send(result)
    })
    const res = await page.goto(request.params.domain);
})
start()
