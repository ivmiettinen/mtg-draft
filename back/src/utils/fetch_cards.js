const fetch = require('node-fetch');
const { pipeline } = require('stream');
const util = require('util');
const fs = require('fs');
const sleep = require('sleep-promise');
const dateFormat = require('dateformat');

const allCardsUri = "https://c2.scryfall.com/file/scryfall-bulk/oracle-cards/oracle-cards-20200906090610.json";

const mapIdToName = (data) => {
    const res = {};
    data.forEach(card => {
        res[card['id']] = `${card['name']} (${card['set']})`;
    })
    return res;
}

const fetchAllCardData = async (arrayOfSetAbbreviations, outputDir, verbose) => {
    const maybeLog = (str) => {
        if (verbose) {
            console.log(str);
        }
    }
    maybeLog(`Going to fetch data for sets ${arrayOfSetAbbreviations} and write results to directory '${outputDir}'`)
    maybeLog(`Fetching data from ${allCardsUri}`);
    const response = await fetch(allCardsUri);
    const json = await response.json().then(json => {
        maybeLog("Fetched data");
        return json;
    })
    const writeFile = util.promisify(fs.writeFile);
    const streamPipeline = util.promisify(pipeline);
    const filteredData = filterToIncludeSets(json, arrayOfSetAbbreviations);
    const imageUrisBySet = fetchImageUris(filteredData, "border_crop");
    const nameById = mapIdToName(filteredData);

    // Scryfall wants us to add a 50-100 ms delay between requests sent to server
    // But we'll ignore it for now.
    const waitTimeInMs = 50;

    maybeLog(`There are altogether ${filteredData.length} cards to fetch`);
    fs.mkdirSync(outputDir, {"recursive": true});
    const startTime = new Date();
    const setResults = Object.keys(imageUrisBySet).map(set => {
        const dataForSet = imageUrisBySet[set];
        const basePath = `${outputDir}/${set}`;
        fs.mkdirSync(basePath, {"recursive": true});
        const imagePromises = dataForSet.map(async (idAndUri) => {

            const { id, uri } = idAndUri;
            const path = `${basePath}/${id}.jpg`;
            if (verbose) {
                const name = nameById[id];
                maybeLog(`Fetching image for ${name} from ${uri}`);
            }
            await sleep(waitTimeInMs);
            const response = await fetch(uri);
            if (response.ok) {
                return streamPipeline(response.body, fs.createWriteStream(path))
            } else {
                return Promise.reject(Error(`Unable to fetch for ${id}, response ${response.statusText}`));
            }
        })
        return Promise.all(imagePromises);
    })
    return Promise.all(setResults).then(() => {
        maybeLog(`Took ${new Date() - startTime} ms`);
        const jsonFileName = `${outputDir}/results_${dateFormat(new Date(), "yyyy-mm-dd_HH-MM-ss")}.json`;
        return writeFile(jsonFileName, JSON.stringify(filteredData, null, 2))
    }).then(() => {
        maybeLog(`Fetched and wrote images for ${arrayOfSetAbbreviations}`);
    });
}

const filterToIncludeSets = (data, arrayOfSetAbbreviations) => {
    const setOfSetAbbreviations = new Set(arrayOfSetAbbreviations);
    return data.filter(v => setOfSetAbbreviations.has(v['set']));
}

const fetchImageUris = (data, imageKey) => {
    const res = {};
    data.forEach(card => {
        const mtgSet = card['set'];
        const imageUri = card["image_uris"][imageKey];
        const uuid = card['id'];
        if (!res.hasOwnProperty(mtgSet)) res[mtgSet] = [];
        res[mtgSet].push({"id": uuid, "uri": imageUri});
    });
    return res;
}

exports.filterToIncludeSets = filterToIncludeSets;
exports.fetchAllCardData = fetchAllCardData;
