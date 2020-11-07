// Lamda function for retrieving player info

exports.getPlayerInfo = async (event) => {
    let { httpMethod, path } = event;

    console.log("Received player retrieve request: ", JSON.stringify(event));

    let response = {
        statusCode: 200,
        body: {
            "name":"weiming",
            "summonerId":"weimotheninja"
        }
    }

    return response
};