require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");


async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./README.template.md"))
    ).toString("utf-8");

    const request = require('request');
    var category = 'movies';
    request.get({
    url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
    headers: {
        'X-Api-Key': 'O/9pb/n+fo54jsYcGxmOBQ==SQBJEjCTSPe51ECK'
    },
    }, function(error, response, body) {
    if(error) return console.error('Request failed:', error);
    else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
    else console.log(body)
    });

    const readme = readmeTemplate
        .replace("{office_quote}", body)
        //.replace("{office_character}", body)

    await fs.writeFile("README.md", readme);
}

main();