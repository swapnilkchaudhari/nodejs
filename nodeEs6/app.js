//import request from 'requests';
const axios = require('axios');
let crypto = require("crypto");

let helloWorld = "Hello World!";
console.log(helloWorld);
console.log(`${helloWorld} this is some ES6 JavaScript code`);

/*let promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() * 100 < 50) {
				reject(new Error("You are in below 50%"))
			} else {
				resolve("You are in above 50%")
			}
		}, 2000)
	})
	.then((value) => {
		consol`e.log(`Resolved: ${value}`)
	})
	.catch((error) => {
		console.log(`Rejected: ${error}`)
	})*/

/*axios.post("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-03")
	.then((response) => {
		//let parsedResponse = JSON.parse(response)
		//console.log('Success: ',response.data);
		console.log('Data: ', response.data);
		console.log('Status:', response.status);
	})
	.catch(error => {
		console.log(`error: ${error}`)
	})*/
let paramsRaw = buildVersionCheckParams()

let key = crypto.randomBytes(20).toString('hex').substring(0, 32)
let iv = crypto.randomBytes(10).toString('hex').substring(0, 16)
let data = buildVersionCheckParams() //"The prominent ridge of emission featured in this vivid skyscape is designated IC 5067."
console.log('requestPlain', data)
let encryptedText = encryptText('aes-256-cbc', key, iv, data);
let requestPayload = buildRequestPayload(encryptedText, key, iv)
console.log('requestPayload', requestPayload)
let decryptedText = decryptText('aes-256-cbc', key, iv, encryptedText);
console.log('requestPayloadDecrypted', decryptedText)

// let requestConfig = {
// 	//method: 'post',
//        //url: "https://mist-dev.api-hdfclife.com/employees/version-check",
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'api-version': '2'
// 	},
// 	data: requestPayload
// }
let headers = {
	'Content-Type': 'application/json',
	'api-version': '2'
}
axios.post("https://mist-dev.api-hdfclife.com/employees/version-check", requestPayload, headers)
	.then(response => {
		console.log("response.data.data.token", response.data.data.token)
		console.log("response.data.data.iv", response.data.data.iv)
		console.log("response.data.data.payload", response.data.data.payload)
		let decryptedText = decryptText('aes-256-cbc', response.data.data.token, response.data.data.iv, response.data.data.payload);
		console.log('decryptedText', decryptedText)
	})
	.catch(error => {
		console.log("Error on server", error)
	})

//let decryptedText = decryptText('aes-256-cbc', key, iv, encryptedText);


// axios({
//         method: 'post',
//         url: 'https://mist-dev.api-hdfclife.com/employees/version-check',
//         data: { ...requestPayload },
//         headers: {'Content-Type': 'application/json', 'api-version': '2'}
//     })
//     .then(response =>  {
//     	console.log("response.data.data.token",response.data.data.token)
//     	console.log("response.data.data.iv",response.data.data.iv)
//     	console.log("response.data.data.payload",response.data.data.payload)
//         let decryptedText = decryptText('aes-256-cbc', response.data.data.token, response.data.data.iv, response.data.data.payload);
// 		console.log('decryptedText', decryptedText)
//     })
//     .catch(e => {
//         console.log("Error on server", e)
//     });


function buildRequestPayload(encryptedText, key, salt) {
	let payloadJson = {
		"iv": salt,
		"token": key,
		"payload": encryptedText
	}
	return payloadJson
	/*let stringPayload = JSON.stringify(payloadJson)
	return stringPayload*/
}

function buildVersionCheckParams() {
	let versionData = {
		"verId": "3.0.12.4",
		"osType": "A",
		"imeiNo": "871e9b080bd1a944"//Xiomi A1
	}
	let stringRequestParams = JSON.stringify(versionData)
	return stringRequestParams
}

/*function encrypt(key, data) {
	let dataBytes = aesjs.utils.utf8.toBytes(data);
	let paddedData = aesjs.padding.pkcs7.pad(dataBytes)
	var aesCbc = new aesjs.ModeOfOperation.cbc(new Uint8Array(key));
	let excryptedRawData = aesCbc.encrypt(paddedData);
	var hexEncryptedData = aesjs.utils.hex.fromBytes(encryptedData);
	return hexEncryptedData;
}*/

function encryptText(cipher_alg, key, iv, text) {
	//let crypto = require("crypto");
	var cipher = crypto.createCipheriv(cipher_alg, key, iv);

	//encoding = "base64" || "binary";
	var result = cipher.update(text, "utf8", 'hex');
	result += cipher.final('hex');

	return result;
}

function decryptText(cipher_alg, key, iv, text) {

	key = key.substring(0, 32)
	iv = iv.substring(0, 16)
	var decipher = crypto.createDecipheriv(cipher_alg, key, iv);

	//encoding = "base64" || "binary";
	var result = decipher.update(text, 'hex','utf8');
	result += decipher.final('utf8');

	return result;
}

/*response=JSON.parse('{"d":{"results":[{"__metadata":{"id":"http://172.17.2.70:8000/sap/opu/odata/SAP/ZLOGIN_SRV_05/loginSet(\'00010044\')","uri":"http://172.17.2.70:8000/sap/opu/odata/SAP/ZLOGIN_SRV_05/loginSet(\'00010044\')","type":"ZLOGIN_SRV_05.login"},"EvPernr":"00010044","Name":"Payal Mehrotra","msgTyp":"S","message":"Login successful.","lockFlag":"U","GoalFlag":"X","AbscFlag":"","EmpStat":"X","PersInfoFlag":"X","clockin_time":"","clockout_time":"","flsFlag":"","salesFlag":"","bhrFlag":""}]}}');
console.log(response.d.results[0])*/