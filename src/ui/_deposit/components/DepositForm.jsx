import React, {useState} from "react";
import { Buffer } from 'buffer'; if (!window.Buffer) {   window.Buffer = Buffer; };
import { useCountries } from "use-react-countries";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

import { toast } from 'sonner'
import { useForm, useController } from 'react-hook-form';
import axios from "axios";

function formatCardNumber(value) {
  const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = val.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];
 
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
 
  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}

function formatCardNumber2(numberStr) {
    return numberStr
      .replace(/\W/gi, "")
      .replace(/(.{4})/g, "$1 ")
      .substring(0, 19);
  }
 
function formatExpires(value) {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/^([2-9])$/g, "0$1")
    .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
    .replace(/^0{1,}/g, "0")
    .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
}
 
export default function DepositForm() {
  const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm();

  const { countries } = useCountries();
  const [type, setType] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpires, setCardExpires] = useState("");
  const [payStatus, setPayStatus] = useState(1);

  const [apiResponse, setApiResponse] = useState('');

  const processPayment = async (requestData) => {
    console.log(JSON.stringify(requestData));
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
            "email": requestData.email
          },
          "amountDetails": {
            "totalAmount": requestData.orderAmount,
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

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data
    };    

    await fetch('https://brambles-express-gzwsdj55u-marastreams.vercel.app/api/cybersource', options)
    .then(response => response.json())
    .then(data => {
        console.log(JSON.stringify(data));
        setApiResponse('successful fetch API Call');
        toast.success(JSON.stringify(data));
    })
    .catch(error => console.error(error));
  };


  function _handleSubmit (e) {
    setPayStatus(2); // Set the payment status to processing

    // Simulate an API call or any asynchronous operation
    setTimeout(() => {
      // Once the operation is complete, set the payment status accordingly
      setPayStatus(3); // Payment successful
    }, 2000); // Simulated delay of 2 seconds

  }

  const onSubmit = async (formData) => {
    setValue("cardNumber", cardNumber)
    toast.info(JSON.stringify(formData)); 
    await processPayment(formData);
    toast.success('Payment successful: '+ payStatus);
    toast.info('Payment info: '+ apiResponse);  
    reset();
    // setModal(!modal);
  };
 
  return (
    <div className="flex justify-center w-full align-center h-[90vh] border-black p-0 overflow-scroll">
        <Card className="w-full max-w-[24rem] bg-blue-200 rounded-sm">
            <CardHeader
                color="brown"
                floated={false}
                shadow={false}
                className="m-0 grid place-items-center px-4 py-2 text-center"
            >
                <div className="mb-4 h-10 p-2 text-white">
                {type === "card" ? (
                    <CreditCardIcon className="h-10 w-10 text-blue" />
                ) : (
                    <img alt="paypal " className="w-14 " src="https://docs.material-tailwind.com/icons/paypall.png" />
                )}
                </div>
                <Typography variant="h2" color="blue" className="">
                 <div className="flex bg-blue-500/50 p-1 rounded-md w-full justify-between font-bold">Make Payment</div>
                </Typography>
            </CardHeader>
            <CardBody>
                <Tabs value={type} className="overflow-visible">
                <TabsHeader className="relative z-0 ">
                    <Tab value="card" onClick={() => setType("card")} className="hover:cursor-pointer hover:border-b-black hover:border-b-2">
                    Pay with Card
                    </Tab>
                    <Tab value="paypal" onClick={() => setType("paypal")} className="hover:cursor-pointer hover:border-b-black hover:border-b-2">
                    Pay with PayPal
                    </Tab>
                </TabsHeader>
                <TabsBody
                    className="!overflow-x-hidden !overflow-y-visible"
                    animate={{
                    initial: {
                        x: type === "card" ? 400 : -400,
                    },
                    mount: {
                        x: 0,
                    },
                    unmount: {
                        x: type === "card" ? 400 : -400,
                    },
                    }}
                >
                    <TabPanel value="card" className="p-0">
                    <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                <label className="block mb-1 text-sm text-left font-medium text-[#404040]" htmlFor="email">Your Email:</label>
                            </Typography>
                            <input className="col-span-3 bg-blue-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@mail.com"
                                {...register('email', {
                                    required: 'email is required',
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Please enter a valid email',
                                    },
                                })}
                            />
                            <p className="block col-span-4 text-xs text-violet-800">{errors.email && errors.email.message}</p>
                        </div>
        
                        <div className="my-1">
                        <div>
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium ">
                            <label className="block mb-1 text-sm text-left font-medium text-[#303030]" htmlFor="cardNumber">Card Details:</label>
                            </Typography>

                            <input className="col-span-3 bg-blue-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="0000 0000 0000 0000"
                                // value={formatCardNumber(cardNumber)}
                                // onChange={(event) => setCardNumber(event.target.value)}
                                onChange={(e) => {
                                    cardNumber.onChange(formatCardNumber2(e.target.value));
                                }}
                                onBlur={cardNumber.onBlur}
                                value={cardNumber.value}
                                ref={cardNumber.ref}
                                inputMode="numeric"
                                {...register('cardNumber', {
                                    required: 'Card No is required',
                                    minLength: {
                                        value: 16,
                                        message: 'Min length is 16',
                                    },
                                    maxLength: {
                                        value: 19,
                                        message: 'Max length is 19',
                                    },
                                    pattern: {
                                        value: /^\d{4}(?:\s\d{4}){3}$/, 
                                        message: 'Please enter a valid card number',
                                    },
                                })}
                            />
                            <p className="block col-span-4 text-xs text-violet-800">{errors.cardNumber && errors.cardNumber.message}</p>
                        </div>

                        <div className="my-4 flex items-center gap-4">                        
                        <div>
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                <label className="block mb-1 text-sm text-left font-medium text-[#303030]" htmlFor="cardExpires">Expires:</label>
                            </Typography>
                            <input className="col-span-3 bg-blue-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:!border-t-gray-900 block min-w-[72px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="00/00"
                                {...register('cardExpires', {
                                    required: 'Card Expiry required',
                                    minLength: {
                                        value: 5,
                                        message: 'Min length is 5',
                                    },
                                    maxLength: {
                                        value: 5,
                                        message: 'Max length is 5',
                                    },
                                })}
                            />
                            <p className="block col-span-4 text-xs text-violet-800">{errors.cardExpires && errors.cardExpires.message}</p>
                        </div>
                        <div>
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            <label className="block mb-1 text-sm text-left font-medium text-[#303030]" htmlFor="cardCvc">CVC:</label>
                        </Typography>
                        <input className="col-span-3 bg-blue-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:!border-t-gray-900 block min-w-[72px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="000"
                                {...register('cardCvc', {
                                    required: 'CVC required',
                                    minLength: {
                                        value: 3,
                                        message: 'Min length is 3',
                                    },
                                    maxLength: {
                                        value: 4,
                                        message: 'Max length is 4',
                                    },
                                    pattern: {
                                        value: /[0-9]{3}/,
                                        message: "Must be 3 digits",
                                    },
                                })}
                            />
                            <p className="block col-span-4 text-xs text-violet-800">{errors.cardCvc && errors.cardCvc.message}</p>
                        </div>
                        </div>
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            <label className="block mb-1 text-sm text-left font-medium text-[#303030]" htmlFor="cardHolderName">Holder Name:</label>
                        </Typography>
                        <input className="col-span-3 bg-blue-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John Smith"
                            {...register('cardHolderName', {
                                required: 'Full name is required',
                                pattern: {
                                    value: /^[A-Z][a-z]+ [A-Z][a-z]+$/,
                                    message: 'Full name is required',
                                }
                            })}
                        />
                        <p className="block col-span-4 text-xs text-violet-800">{errors.cardHolderName && errors.cardHolderName.message}</p>
                        </div>
                        
                        <div>
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium ">
                            <label className="block mb-1 text-sm text-left font-medium text-[#303030]" htmlFor="orderAmount">Amount in USD:</label>
                            </Typography>

                            <input className="col-span-3 bg-blue-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="0.00"
                                {...register('orderAmount', {
                                    required: 'Amount is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Min amount is 10',
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                            <p className="block col-span-4 text-xs text-violet-800">{errors.orderAmount && errors.orderAmount.message}</p>
                        </div>
                        
                            {/* { (payStatus == 1) ? (<Button size="lg" type="submit" className="bg-blue-300" onClick={handleSubmit}>Pay Now</Button>): (payStatus == 2) ? (<Button size="lg">Processing</Button>): (payStatus == 3) ? (<Button size="lg">Payment Successful</Button>): (<Button size="lg">Error</Button>)} */}
                        <button type="submit" className="w-full text-white bg-[#101A28] hover:bg-[#1A2C38] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Pay Now</button>
                        
                        <Typography
                        variant="small"
                        color="gray"
                        className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
                        >
                        <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are
                        secure and encrypted
                        </Typography>
                    </form>
                    </TabPanel>
                    <TabPanel value="paypal" className="p-0">
                    <form className="mt-12 flex flex-col gap-4">
                        <div>
                        <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="mb-4 font-medium"
                        >
                            Personal Details
                        </Typography>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 font-medium"
                        >
                            Your Email
                        </Typography>
                        <Input
                            type="email"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                            className: "before:content-none after:content-none",
                            }}
                        />
                        </div>
        
                        <div className="my-6">
                        <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="mb-4 font-medium"
                        >
                            Billing Address
                        </Typography>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 font-medium"
                        >
                            Country
                        </Typography>
                        <Select
                            placeholder="USA"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                            className: "before:content-none after:content-none",
                            }}
                            menuProps={{ className: "h-48" }}
                        >
                            {countries.map(({ name, flags }) => (
                            <Option key={name} value={name}>
                                <div className="flex items-center gap-x-2">
                                <img
                                    src={flags.svg}
                                    alt={name}
                                    className="h-4 w-4 rounded-full object-cover"
                                />
                                {name}
                                </div>
                            </Option>
                            ))}
                        </Select>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mt-4 -mb-2 font-medium"
                        >
                            Postal Code
                        </Typography>
                        <Input
                            placeholder="0000"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                            className: "before:content-none after:content-none",
                            }}
                            containerProps={{ className: "mt-4" }}
                        />
                        </div>
                        <Button size="lg">pay with paypal</Button>
                        <Typography
                        variant="small"
                        color="gray"
                        className="flex items-center justify-center gap-2 font-medium opacity-60"
                        >
                        <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are
                        secure and encrypted
                        </Typography>
                    </form>
                    </TabPanel>
                </TabsBody>
                </Tabs>
            </CardBody>
        </Card>
    </div>
  );
}