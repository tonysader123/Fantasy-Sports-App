// # NHL API

// This provides an [OpenAPI 3.0](https://swagger.io/docs/specification/about/) specification file for the NHL API.

// The bulk of this API has been discovered through [@dword4](https://github.com/dword4) and their [nhlapi](https://github.com/dword4/nhlapi) documentation.

// ## Copyright

// > NHL and the NHL Shield are registered trademarks of the National Hockey League. NHL and NHL team marks are the property of the NHL and its teams. © NHL 2018. All Rights Reserved.

// ## Available endpoints

// | Endpoint | Description |
// | :--- | :--- |
// | `/conferences` | Get all current NHL conferences. |
// | `/conferences/{id}` | Get an NHL conference. |
// | `/divisions` | Get all current NHL divisions. |
// | `/divisions/{id}` | Get an NHL division. |
// | `/draft` | Get round-by-round data for current year's NHL Entry Draft. |
// | `/draft/{year}` | Get round-by-round data for a specific year's NHL Entry Draft. |
// | `/draft/prospects` | Get all NHL Entry Draft prospects. |
// | `/draft/prospects/{id}` | Get an NHL Entry Draft prospect. |
// | `/game/{id}/boxscore` | Get the boxscore for an NHL game. |
// | `/game/{id}/content` | Get editorials, video replays and photo highlights for an NHL game. |
// | `/game/{id}/feed/live` | Get all available data for an NHL game. |
// | `/game/{id}/feed/live/diffPatch` | Get all available data for an NHL game after a specific time. |
// | `/people/{id}` | Get an NHL player. |
// | `/people/{id}/stats` | Get specific statistics for an NHL player. |
// | `/schedule` | Get the NHL game schedule. |
// | `/standings` | Get NHL division standings. |
// | `/standings/{type}` | Get NHL standings for a specific standing type. |
// | `/standingsTypes` | Get all available NHL standing types. |
// | `/statTypes` | Get all available NHL statistic types. |
// | `/teams` | Get all NHL teams. |
// | `/teams/{id}` | Get an NHL team. |
// | `/teams/{id}/roster` | Get an NHL team's roster. |
// | `/teams/{id}/stats` | Get all statistics for an NHL team. |
const fs = require("fs");

const apiURL_TeamRoster = "https://api-web.nhle.com/v1/roster/";

class Player{
    constructor(first, last, ID){
        this.playerName = first;
        this.playerLastName = last;
        this.playerID = ID;
    }

}


let playerList = [];

//get team roster call
function getTeamRoster(team){
    fetch(apiURL_TeamRoster + team + '/current').then((response) => {
        if (response.ok){
            return response.json();
        }else{
            throw new Error('API request Failed');
        }
    })
    .then(data => {
       
        // data.forwards(element => {
        //     playerList.push(new Player(element.firstName, element.lastName, element.id))
        // })
        // data.defensemen.forEach(element => {
        //     playerList.push(new Player(element.firstName, element.lastName, element.id))
        // })
        // data.goalies.forEach(element => {
        //     playerList.push(new Player(element.firstName, element.lastName, element.id))
        // })
        
        //create an array
        for (let i = 0; i< data.forwards.length; i++){
            playerList.push(new Player(data.forwards[i].firstName, data.forwards[i].lastName,data.forwards[i].id));
        }
        for (let i = 0; i< data.defensemen.length; i++){
            playerList.push(new Player(data.defensemen[i].firstName, data.defensemen[i].lastName,data.defensemen[i].id));
        }
        for (let i = 0; i< data.goalies.length; i++){
            playerList.push(new Player(data.goalies[i].firstName, data.goalies[i].lastName,data.goalies[i].id));
        }
        

        console.log(playerList);
        console.log(playerList[0].playerName);
        console.log("Data written successfully");
    })
    .catch(error =>{
        console.error('Error:', error);
    });
}

getTeamRoster('TOR');


