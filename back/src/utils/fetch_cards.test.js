
const { filterToIncludeSets } = require('./fetch_cards');
const fs = require('fs');

const scryfall_json = JSON.parse(fs.readFileSync('./fixtures/a_few_cards.json', 'utf8'));

test('filtering by set abbrevations works', async () => {
    const cards = filterToIncludeSets(scryfall_json, ["war", "rna"]);
    const card_names = cards.map(c => c['name']);
    ["Pteramander", "Ravnica at War"].forEach(name => expect(card_names).toContain(name));
})