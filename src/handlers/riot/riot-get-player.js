// Lamda function for retrieving player info

exports.getPlayerInfo = async (event) => {
    let { httpMethod, path } = event;

    console.log("Received player retrieve request: ", JSON.stringify(event));

    responseBody = {
        name: "weiming",
        summonerId: "weimotheninja"
    }

    let response = {
        statusCode: 200,
        body: JSON.stringify(responseBody)
    }

    return response
};