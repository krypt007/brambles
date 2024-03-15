'use strict';

import superagent from "superagent";
import path from 'path';
import crypto from 'crypto';
// const { write } = require('fs');

const requestHost = 'apitest.cybersource.com';
const merchantId = 'calstec_1707396640';
const merchantKeyId = 'c28c5029-aad2-48f2-847c-efa16d622a3a';
const merchantSecretKey = 'jjI29fcOb7ZFD0DsUtFbdNeB3BvAQCnanv9XOtVsdKM=';
var jsonPayload = {
        "clientReferenceInformation": {
        "code": "TC50171_3"
        },
        "pointOfSaleInformation": {
        "cardPresent": "false",
        "catLevel": "6",
        "terminalCapability": "4"
        },
        "orderInformation": {
        "billTo": {
            "country": "US",
            "firstName": "John",
            "lastName": "Deo",
            "address1": "901 Metro Center Blvd",
            "postalCode": "40500",
            "locality": "Foster City",
            "administrativeArea": "CA",
            "email": "test@cybs.com"
        },
        "amountDetails": {
            "totalAmount": "22.00",
            "currency": "USD"
        }
        },
        "paymentInformation": {
        "card": {
            "expirationYear": "2031",
            "number": "4111111111111111",
            "securityCode": "123",
            "expirationMonth": "12"
        }
        }
    }
// var payload = '{' +
// 		'	\"clientReferenceInformation\": {' +
// 		'	\"code\": \"TC50171_3\"' +
// 		'	},' +
// 		'	\"processingInformation\": {' +
// 		'	\"commerceIndicator\": \"internet\"' +
// 		'	},' +
// 		'	\"orderInformation\": {' +
// 		'	\"billTo\": {' +
// 		'		\"firstName\": \"john\",' +
// 		'		\"lastName\": \"doe\",' +
// 		'		\"address1\": \"201 S. Division St.\",' +
// 		'		\"postalCode\": \"48104-2201\",' +
// 		'		\"locality\": \"Ann Arbor\",' +
// 		'		\"administrativeArea\": \"MI\",' +
// 		'		\"country\": \"US\",' +
// 		'		\"phoneNumber\": \"999999999\",' +
// 		'		\"email\": \"test@cybs.com\"' +
// 		'	},' +
// 		'	\"amountDetails\": {' +
// 		'		\"totalAmount\": \"10\",' +
// 		'		\"currency\": \"USD\"' +
// 		'	}' +
// 		'	},' +
// 		'	\"paymentInformation\": {' +
// 		'	\"card\": {' +
// 		'		\"expirationYear\": \"2031\",' +
// 		'		\"number\": \"5555555555554444\",' +
// 		'		\"securityCode\": \"123\",' +
// 		'		\"expirationMonth\": \"12\",' +
// 		'		\"type\": \"002\"' +
// 		'	}' +
// 		'	}' +
// 		'}';

var payload = convertToJsonString(jsonPayload);

function convertToJsonString(obj, depth = 0) {
    function stringify(obj, depth) {
        const tab = ' '.repeat(depth * 2);
        if (typeof obj === 'string') {
            return `"${obj}"`;
        } else if (typeof obj === 'object') {
            let result = '{\n';
            let keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                let value = stringify(obj[key], depth + 1);
                result += `${tab}"${key}": ${value}`;
                if (i < keys.length - 1) {
                    result += ',';
                }
                result += '\n';
            }
            result += tab.slice(0, -2) + '}';
            return result;
        } else {
            return String(obj);
        }
    }
    return stringify(obj, depth);
}

function paramToString(param) {
	if (param == undefined || param == null) {
		return '';
	}
	if (param instanceof Date) {
		return param.toJSON();
	}
	return param.toString();
}

function normalizeParams(params) {
	var newParams = {};
	for (var key in params) {
		if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
		var value = params[key];
		if (Array.isArray(value)) {
			newParams[key] = value;
		} else {
			newParams[key] = paramToString(value);
		}
		}
	}
	return newParams;
}

function generateDigest(request) {
	var buffer = Buffer.from(payload, 'utf8');
	const hash = crypto.createHash('sha256');
	hash.update(buffer);
	var digest = hash.digest('base64');
	return digest;
}

function write_log_audit(status) {
	var filename = path.basename(__filename).split(".")[0];
	console.log(`[Sample Code Testing] [${filename}] ${status}`);
}

function getHttpSignature(resource, method, request) {
	var signatureHeader = "";
	var signatureValue = "";

	// KeyId is the key obtained from EBC
	signatureHeader += "keyid=\"" + merchantKeyId + "\"";

	// Algorithm should be always HmacSHA256 for http signature
	signatureHeader += ", algorithm=\"HmacSHA256\"";

	// Headers - list is choosen based on HTTP method. 
	// Digest is not required for GET Method
	if (method === "get") {
		var headersForGetMethod = "host date request-target v-c-merchant-id";
		signatureHeader += ", headers=\"" + headersForGetMethod + "\"";
	}
	else if (method === "post") {
		var headersForPostMethod = "host date request-target digest v-c-merchant-id";
		signatureHeader += ", headers=\"" + headersForPostMethod + "\"";
	}

	var signatureString = 'host: ' + requestHost;

	signatureString += '\ndate: ' + new Date(Date.now()).toUTCString();
	signatureString += '\nrequest-target: ';

	if (method === "get") {
		var targetUrlForGet = "get " + resource;
		signatureString += targetUrlForGet + '\n';
	}
	else if (method === "post") {
		// Digest for POST call
		var digest = generateDigest(payload);

		var targetUrlForPost = "post " + resource;
		signatureString += targetUrlForPost + '\n';

		signatureString += 'digest: SHA-256=' + digest + '\n';
	}

	signatureString += 'v-c-merchant-id: ' + merchantId;

	var data = new Buffer.from(signatureString, 'utf8');

	// Decoding scecret key
	var key = new Buffer.from(merchantSecretKey, 'base64');

	signatureValue = crypto.createHmac('sha256', key).update(data).digest('base64');

	signatureHeader += ", signature=\"" + signatureValue + "\"";

	return signatureHeader;
}


async function processPost() {
    const resource = "/pts/v2/payments/";
    const method = "post";
    const url = 'https://' + requestHost + resource;

    const headerParams = {};
    const contentType = 'application/json;charset=utf-8';
    const acceptType = 'application/hal+json;charset=utf-8';

    const request = superagent(method, url);

    const bodyParam = payload;

    const signature = getHttpSignature(resource, method, request);

    const date = new Date(Date.now()).toUTCString();

    const digest = generateDigest(payload);
    const digestValue = "SHA-256=" + digest;

    console.log("\n -- RequestURL --");
    console.log("\tURL : " + url);
    console.log("\n -- HTTP Headers --");
    console.log("\tContent-Type : application/json;charset=utf-8");
    console.log("\tv-c-merchant-id : " + merchantId);
    console.log("\tDate : " + date);
    console.log("\tHost : " + requestHost);
    console.log("\tSignature : " + signature);
    console.log("\tDigest : " + digestValue);

    headerParams['digest'] = digestValue;
    headerParams['v-c-merchant-id'] = merchantId;
    headerParams['date'] = date;
    headerParams['host'] = requestHost;
    headerParams['signature'] = signature;
    headerParams['User-Agent'] = "Mozilla/5.0";

    // Set header parameters
    request.set(normalizeParams(headerParams));

    // Set request timeout
    request.timeout(60000);
    request.type(contentType);
    request.send(bodyParam);
    request.accept(acceptType);

    try {
        const response = await request;
        const data = response.body || response.text;

        console.log("\n -- Response Message for POST call --");
        console.log("\tResponse Code : " + response['status']);
        console.log("\tv-c-correlation-id : " + response.headers['v-c-correlation-id']);
        console.log("\tResponse Data :");
        console.log(JSON.stringify(data));

        let _status = -1;
        if (response['status'] >= 200 && response['status'] <= 299) {
            _status = 0;
        }

        return { data, response, _status };
    } catch (error) {
        console.error(error);
        return { error };
    }
}


function processGet(callback) {
	var resource = "/reporting/v3/reports?startTime=2024-03-12T00:00:00.0Z&endTime=2024-03-13T23:59:59.0Z&timeQueryType=executedTime&reportMimeType=application/xml";
	var method = "get";
	var statusCode = -1;
	var url = 'https://' + requestHost + resource;

	var headerParams = {};
	var contentType = 'application/json;charset=utf-8';
	var acceptType = 'application/hal+json;charset=utf-8';

	var request = superagent(method, url);

	var signature = getHttpSignature(resource, method, request);

	var date = new Date(Date.now()).toUTCString();

	console.log("\n -- RequestURL --");
	console.log("\tURL : " + url);
	console.log("\n -- HTTP Headers --");
	console.log("\tContent-Type : application/json;charset=utf-8");
	console.log("\tv-c-merchant-id : " + merchantId);
	console.log("\tDate : " + date);
	console.log("\tHost : " + requestHost);
	console.log("\tSignature : " + signature);

	headerParams['v-c-merchant-id'] = merchantId;
	headerParams['date'] = date;
	headerParams['host'] = requestHost;
	headerParams['signature'] = signature;
	headerParams['User-Agent'] = "Mozilla/5.0";

	// Set header parameters
	request.set(normalizeParams(headerParams));

	// Set request timeout
	request.timeout(60000);

	request.type(contentType);

	request.accept(acceptType);

	request.end(function(error, response) {
		var data = response.body;
		if (data == null || (typeof data === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length)) {
			// SuperAgent does not always produce a body; use the unparsed response as a fallback
			data = response.text;
		}

		console.log("\n -- Response Message for GET call --");
		console.log("\tResponse Code : " + response['status']);
		console.log("\tv-c-correlation-id : " + response.headers['v-c-correlation-id']);
		console.log("\tResponse Data :");
		console.log(JSON.stringify(data));

		var _status = -1;
		if (response['status'] >= 200 && response['status'] <= 299) {
			_status = 0;
		}

		callback(error, data, response, _status);
	});

	return request;
}

export default function  processPayment(callback) {
	var statusCodeGet, statusCodePost;
	// HTTP POST REQUEST
	console.log('\n\nSample 1: POST call - CyberSource Payments API - HTTP POST Payment request');
	processPost(function (error, data, response, statusCode) {
		statusCodePost = statusCode;
		if (statusCode == 0) {
			console.log("\nSTATUS : SUCCESS (HTTP Status = " + statusCode + ")");
			return 'STATUS : SUCCESS';
		}
		else {
			console.log("\nSTATUS : ERROR (HTTP Status = " + statusCode + ")");
			return 'STATUS : ERROR';
		}
	});

	// // HTTP GET REQUEST
	// console.log('\n\nSample 2: GET call - CyberSource Reporting API - HTTP GET Reporting request');
	// processGet(function (error, data, response, statusCode) {
	// 	statusCodeGet = statusCode;
	// 	if (statusCode == 0) {
	// 		console.log("\nSTATUS : SUCCESS (HTTP Status = " + statusCode + ")");
	// 	}
	// 	else {
	// 		console.log("\nSTATUS : ERROR (HTTP Status = " + statusCode + ")");
	// 	}
	// });

	// if (statusCodeGet == 0 && statusCodePost == 0) {
	// 	write_log_audit(200);
	// } else {
	// 	write_log_audit(400);
	// }
}

// if (require.main === module) {
// 	processPayment(function () {
// 		console.log('\nStandAlone Http Signature end.');
// 	}, false);
// }

// processPayment()
