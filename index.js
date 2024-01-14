require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");


async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./README.template.md"))
    ).toString("utf-8");

    const office_quote = await (
        await fetch("https://zenquotes.io/api/random")
    ).json();

    console.log(office_quote);

    const quoteData = office_quote[0];
    const quoteText = quoteData.q;
    const author = quoteData.a;

    console.log("Quote:", quoteText);
    console.log("Author:", author);


    const readme = readmeTemplate
        .replace("{office_quote}", quoteText)
        .replace("{office_character}", author)

    await fs.writeFile("README.md", readme);
}

main();