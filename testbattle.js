const {BattleStream, Teams} = require('./sim'); // adjust path if needed

async function run() {
    const stream = new BattleStream();

    // Print all messages from the battle
    (async () => {
        for await (const output of stream) {
            console.log(output);
        }
    })();

    // Define a simple 1v1 battle
    const team1 = Teams.pack([{
        species: "Pikachu",
        level: 50,
        moves: ["thunderbolt"],
        startingHP: 10,   // <-- our new field
    }]);

    const team2 = Teams.pack([{
        species: "Bulbasaur",
        level: 50,
        moves: ["tackle"],
    }]);

    stream.write(`>start {"formatid":"gen7customgame"}`);
    stream.write(`>player p1 {"name":"Alice","team":"${team1}"}`);
    stream.write(`>player p2 {"name":"Bob","team":"${team2}"}`);
}

run();