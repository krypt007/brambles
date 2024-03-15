const axios = require('axios');

const processPayment = async (requestData) => {
    // const url = 'https://brambles-express-gy4o57x1o-marastreams.vercel.app/api/cybersource';
    // const bodyParams = JSON.stringify({
    //   "clientReferenceInformation": {
    //     "code": "TC50171_8"
    //   },
    //   "processingInformation": {
    //     "commerceIndicator": "internet"
    //   },
    //   "orderInformation": {
    //     "billTo": {
    //       "lastName": "Doe",
    //       "address2": "Address 2",
    //       "address1": "1 Market St",
    //       "postalCode": "94105",
    //       "locality": "san francisco",
    //       "administrativeArea": "CA",
    //       "country": "US",
    //       "phoneNumber": "4158880000",
    //       "company": "Visa",
    //       "email": "test@cybs.com"
    //     },
    //     "amountDetails": {
    //       "totalAmount": "82.21",
    //       "currency": "USD"
    //     }
    //   },
    //   "paymentInformation": {
    //     "card": {
    //       "expirationYear": "2031",
    //       "number": "4111111111111111",
    //       "securityCode": "123",
    //       "expirationMonth": "12"
    //     }
    //   }
    // });

    // try {
    //   const responseData = await axios.post(url, bodyParams)
    //   // console.log(responseData);
    //   console.log(responseData.status, responseData.data)
      
    //   // const responseData = await response.json();
    //   // setApiResponse(JSON.stringify(responseData.data));
    // } catch (error) {
    //   console.error('Error:', error);
    //   // setApiResponse('Error occurred. Please try again later.');
    // }
    let data = JSON.stringify({
      "clientReferenceInformation": {
        "code": "TC50171_7"
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
          "totalAmount": "72.00",
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
    });
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://brambles-express-gy4o57x1o-marastreams.vercel.app/api/cybersource',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
  
    axios.request(config).then((response) => { console.log(JSON.stringify(response.data))}).catch((error) => { console.log(error)});
  };

  



  processPayment()