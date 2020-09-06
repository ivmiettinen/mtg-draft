const { fetchAllCardData } = require('./fetch_cards');
const argv = require('yargs')
    .scriptName("fetch-cards")
    .usage('$0 --set set1 --set set2 --dir output_dir --verbose')
    .array('set')
    .boolean('verbose')
    .demandOption(['set'])
    .argv;

fetchAllCardData(argv.set, argv.output_dir || 'data', argv.verbose).then(() => {
    process.exit(0);
}).catch(error => {
    console.error(error);
    process.exit(1);
})
