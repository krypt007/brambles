import React, {useEffect, useState} from "react";
import { auth } from "../../../lib/firebase";
import { findUser, createUser } from "../../../lib/services/firestore";
// import { doc, getDoc } from "firebase/firestore";

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

import BillingInfo from "./BillingInfo";

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

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
 
export default function DepositForm() {
  const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
  const user = auth.currentUser;

  const { countries } = useCountries();
  const [type, setType] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpires, setCardExpires] = useState("");
  const [payStatus, setPayStatus] = useState(1);

  const [billingInfo, setBillingInfo] = useState({});

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

    await fetch('https://brambles-express-y9nfduoid-marastreams.vercel.app/api/cybersource', options)
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

  const cardPaymentSubmit = async (formData) => {
    setValue("cardNumber", cardNumber)
    toast.info(JSON.stringify(formData)); 
    await processPayment(formData);
    toast.success('Payment successful: '+ payStatus);
    reset();
    // setModal(!modal);
  };

  // Sample code to test modal functionality
  const [hasBillingInfo, setHasBillingInfo] = useState(false);

  const handleAddBillingInfo = async (formData) => {
   try {
        setValue("userId", `${user.uid}`)
        // toast.info("Submitting Billing Information");
        let newUser = await createUser(formData);
        refreshPage()
        toast.success(`New user added ${newUser.id}`);
        setHasBillingInfo(true);

        // await setEmail(formData.email);
        // Implement your authentication logic here
        // For demonstration purpose, simply checking if both fields are filled
        // if (email) {
        //     toast.info(formData.email);
        //   setHasBillingInfo(true);
        // } else {
        //   toast.error('no email error', JSON.stringify(formData));
        // }
   } catch (error) {
      // toast.error('no email catch error');
      Navigate("/")
   }
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const handleLogout = () => {
    setHasBillingInfo(false);
  };

  // End of Sample Code

  // Fetch Billing Information
  useEffect( () => {
    findUser(user.uid)
    .then((user) => {
        if(isEmptyObject(user)){
            toast.error("No user billing info");
        }else{
            setBillingInfo(user);
            setHasBillingInfo(true);
        }
    })
    .catch((err) => {})
    toast.info(`Logged in user: ${ user.email}`);
  },[]);
 
  return (
    <div className="flex justify-center w-full align-center h-[90vh] border-black p-0 overflow-scroll">
    {!hasBillingInfo && (
      <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
        
        <form onSubmit={handleSubmit(handleAddBillingInfo)} className="max-w-md mx-auto p-4 border border-gray-800 rounded">
            <div className="text-white p-2 w-full text-center font-bold rounded-md bg-gray-600">Enter Your Billing Information</div>
            <div className="flex p-3 bg-black>" />

            
            <input id="userId" type="hidden" value={user.id}  {...register('userId')}   disabled={true} />

            <div className="mb-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input id="country" type="text" 
                {...register("country", {
                    required: 'Country is required',
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Please enter a valid country name',
                    },
                  }
                )} 
                className="mt-1 p-2 border border-gray-700 rounded w-full" />
                {errors.country && ( <span className="text-red-500 text-xs">{errors.country.message}</span>)}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input id="firstName" type="text" 
                {...register("firstName", {
                    required: 'Firstname is required',
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Please enter a valid name',
                    },
                })} 
                className="mt-1 p-2 border border-gray-700 rounded w-full" />
                {errors.firstName && ( <span className="text-red-500 text-xs">{errors.firstName.message}</span>)}
                </div>
                <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input id="lastName" type="text" 
                {...register("lastName", {
                    required: 'lastName is required',
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Please enter a valid name',
                    },
                })} 
                className="mt-1 p-2 border border-gray-700 rounded w-full" />
                {errors.lastName && ( <span className="text-red-500 text-xs">{errors.lastName.message}</span>)}
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="address1" className="block text-sm font-medium text-gray-700">Address</label>
                <input id="address1" type="text" 
                {...register("address1",{
                    required: 'address1 is required',
                    minLength:{
                        value: 2,
                        message: 'Please enter a valid address'
                    },
                })} 
                className="mt-1 p-2 border border-gray-700 rounded w-full" />
                {errors.address1 && ( <span className="text-red-500 text-xs">{errors.address1.message}</span>)}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input id="postalCode" type="text" {...register("postalCode")} className="mt-1 p-2 border border-gray-700 rounded w-full" />
                </div>
                <div className="mb-4">
                <label htmlFor="locality" className="block text-sm font-medium text-gray-700">Locality</label>
                <input id="locality" type="text" {...register("locality")} className="mt-1 p-2 border border-gray-700 rounded w-full" />
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="administrativeArea" className="block text-sm font-medium text-gray-700">Administrative Area</label>
                <input id="administrativeArea" type="text" {...register("administrativeArea")} className="mt-1 p-2 border border-gray-700 rounded w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" type="email" 
                {...register("email", {
                    required: 'email is required',
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please enter a valid email',
                    },
                })} 
                className="mt-1 p-2 border border-gray-700 rounded w-full" />
                {errors.email && ( <span className="text-red-500 text-xs">{errors.email.message}</span>)}
            </div>
            <button type="submit" className="bg-gray-900 text-white py-1 px-4 w-full rounded hover:bg-gray-700 hover:cursor-pointer">Submit</button>
        </form>
      </div>
    )}
    {hasBillingInfo && (
      <div className="flex justify-center w-full align-center h-[90vh] border-black p-0 overflow-scroll gap-2">
        <div className="flex w-full justify-center">
            <Card className="w-full max-w-[24rem] bg-gray-800 rounded-sm">
                <CardHeader
                    color="blue"
                    floated={true}
                    shadow={false}
                    className="m-0 grid place-items-center min-h-[10vh] px-4 py-1 text-center bg-gray-900/30 object-contain"
                >
                    <div className="mb-1 mt-1 h-8 p-2 text-blue-200">
                        {type === "card" ? (
                            <CreditCardIcon className="h-8 w-8 text-blue" />
                        ) : (
                            <img alt="paypal " className="w-14 " src="https://docs.material-tailwind.com/icons/paypall.png" />
                        )}
                    </div>
                    <Typography variant="h5" color="blue" className="bg-[#404040] p-1 rounded-md">
                        <div className="flex bg-[#404040]/50 p-1 rounded-md w-full justify-between font-bold">Make Payment</div>
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
                        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit(cardPaymentSubmit)}>
                            <div>
                                <Typography variant="small" color="white" className="mb-2 font-medium">
                                    <label className="block mb-1 text-sm text-left font-medium text-gray-200" htmlFor="email">Your Email:</label>
                                </Typography>
                                <input className="col-span-3 bg-gray-700 border border-gray-600 text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@mail.com"
                                    {...register('email', {
                                        required: 'email is required',
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Please enter a valid email',
                                        },
                                    })}
                                />
                                <p className="block col-span-4 text-xs px-2 text-purple-100">{errors.email && errors.email.message}</p>
                            </div>
            
                            <div className="my-1">
                            <div>
                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium ">
                                <label className="block mb-1 text-sm text-left font-medium text-gray-200" htmlFor="cardNumber">Card Details:</label>
                                </Typography>

                                <input className="col-span-3 bg-gray-700 border border-gray-600 text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                <p className="block col-span-4 px-2 text-xs text-purple-100">{errors.cardNumber && errors.cardNumber.message}</p>
                            </div>

                            <div className="my-4 flex items-center gap-4">                        
                            <div>
                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                    <label className="block mb-1 text-sm text-left font-medium text-gray-200" htmlFor="cardExpires">Expires:</label>
                                </Typography>
                                <input className="col-span-3 bg-gray-700 border border-gray-600 text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:!border-t-gray-900 block min-w-[72px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                <p className="block col-span-4 text-xs px-2 text-purple-100">{errors.cardExpires && errors.cardExpires.message}</p>
                            </div>
                            <div>
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                <label className="block mb-1 text-sm text-left font-medium text-gray-200" htmlFor="cardCvc">CVC:</label>
                            </Typography>
                            <input className="col-span-3 bg-gray-700 border border-gray-600 text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:!border-t-gray-900 block min-w-[72px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                <p className="block col-span-4 text-xs px-2 text-purple-100">{errors.cardCvc && errors.cardCvc.message}</p>
                            </div>
                            </div>
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                <label className="block mb-1 text-sm text-left font-medium text-gray-200" htmlFor="cardHolderName">Holder Name:</label>
                            </Typography>
                            <input className="col-span-3 bg-gray-700 border border-gray-600 text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="John Smith"
                                {...register('cardHolderName', {
                                    required: 'Full name is required',
                                    pattern: {
                                        value: /^[A-Z][a-z]+ [A-Z][a-z]+$/,
                                        message: 'Full name is required',
                                    }
                                })}
                            />
                            <p className="block col-span-4 text-xs px-2 text-purple-100">{errors.cardHolderName && errors.cardHolderName.message}</p>
                            </div>
                            
                            <div>
                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium ">
                                <label className="block mb-1 text-sm text-left font-medium text-gray-200" htmlFor="orderAmount">Amount in USD:</label>
                                </Typography>

                                <input className="col-span-3 bg-gray-700 border border-gray-600 text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                <p className="block col-span-4 text-xs px-2 text-purple-100">{errors.orderAmount && errors.orderAmount.message}</p>
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
                                color="white"
                                className="mb-4 font-medium"
                            >
                                Personal Details
                            </Typography>
                            <Typography
                                variant="small"
                                color="white"
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
                                color="white"
                                className="mb-4 font-medium"
                            >
                                Billing Address
                            </Typography>
                            <Typography
                                variant="small"
                                color="white"
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
                                color="white"
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

        <div className="w-[50vh] p-2">
            <div className="w-full bg-gray-900 p-2 font-bold text-sm">Your Billing Info</div>
            <BillingInfo data={billingInfo} />
        </div>
      </div>
    )}
  </div>
    
  );
}