// Lamda function for retrieving player info

const https = require("https");

exports.getPlayerInfo = async (event) => {
    let { httpMethod, path } = event;

    console.log("Received player retrieve request: ", JSON.stringify(event));

    let playerData = getPlayerInfoPromise();

    let finalResponse = await playerData
        .then(result => {
            console.log("got this success from the promise>>" + JSON.stringify(result));

            let successResponse = {
                statusCode: 200,
                body: result
            }

            return successResponse;
        })
        .catch(result => {
            console.log("got this error from the promise>>" + result);
            let errorResponse = {
                error: "Get player info error"
            }

            return JSON.stringify(errorResponse);
        })


    console.log("this is the final response>>" + JSON.stringify(finalResponse))

    return finalResponse;
};

getPlayerInfoPromise = () => {
    return new Promise((resolve, reject) => {
        const options = {
            // host: "na1.api.riotgames.com",
            // path: "/lol/summoner/v4/summoners/by-name/Wuri",
            // method: "GET",
            headers: {
                "X-Riot-Token": "RGAPI-fc66061b-f78f-4269-b317-e2449d49d321"
            }
        }

        // const request = https.request(options, response => {
        //     console.log("response status>>" + res.statusCode);
        //     resolve(response)
        // });

        const request = https.get("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Wuri", options, response => {
            console.log("response status>>" + response.statusCode);
            console.log("headers>>" + JSON.stringify(response.headers));
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
                resolve(chunk)
            });
        })

        request.on("error", error => {
            console.error(error)
            reject("Failed")
        });
    });
}