const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.SAMPLE_TABLE;

exports.putUserInfoHandler = async (event) => {
    const { body, httpMethod, path } = event;
    if (httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${httpMethod} method.`);
	}
	console.log('received:', JSON.stringify(event));

	const params = {
        TableName: tableName,
        Item: JSON.parse(body)
	};
	
	await docClient.put(params).promise();

	const response = {
        statusCode: 200,
        body,
    };

    console.log(`response from: ${path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}