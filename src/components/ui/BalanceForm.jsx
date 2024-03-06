import React, {useState} from "react";
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
 
function formatExpires(value) {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/^([2-9])$/g, "0$1")
    .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
    .replace(/^0{1,}/g, "0")
    .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
}


 
export default function BalanceForm() {
  const { countries } = useCountries();
  const [type, setType] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpires, setCardExpires] = useState("");
  const [payStatus, setPayStatus] = useState(1);

  function handleSubmit (e) {
    setPayStatus(2); // Set the payment status to processing

    // Simulate an API call or any asynchronous operation
    setTimeout(() => {
      // Once the operation is complete, set the payment status accordingly
      setPayStatus(3); // Payment successful
    }, 2000); // Simulated delay of 2 seconds

  }
 
  return (
    <div className="flex justify-center w-full align-center h-[90%] border-black p-0">
        <Card className="w-full max-w-[24rem] bg-blue-400 rounded-sm">
            <CardHeader
                color="white"
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
                <Typography variant="h3" color="blue">
                  Cybersource Make Payment
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
                    <form className="mt-6 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
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
        
                        <div className="my-3">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 font-medium "
                        >
                            Card Details
                        </Typography>
        
                        <Input
                            maxLength={19}
                            value={formatCardNumber(cardNumber)}
                            onChange={(event) => setCardNumber(event.target.value)}
                            icon={
                            <CreditCardIcon className="absolute left-0 h-4 w-4 text-blue-gray-300" />
                            }
                            placeholder="0000 0000 0000 0000"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                            className: "before:content-none after:content-none",
                            }}
                        />
                        <div className="my-4 flex items-center gap-4">
                            <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Expires
                            </Typography>
                            <Input
                                maxLength={5}
                                value={formatExpires(cardExpires)}
                                onChange={(event) => setCardExpires(event.target.value)}
                                containerProps={{ className: "min-w-[72px]" }}
                                placeholder="00/00"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                className: "before:content-none after:content-none",
                                }}
                            />
                            </div>
                            <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                CVC
                            </Typography>
                            <Input
                                maxLength={4}
                                containerProps={{ className: "min-w-[72px]" }}
                                placeholder="000"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                className: "before:content-none after:content-none",
                                }}
                            />
                            </div>
                        </div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 font-medium"
                        >
                            Holder Name
                        </Typography>
                        <Input
                            placeholder="John Smith"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                            className: "before:content-none after:content-none",
                            }}
                        />
                        </div>
                        
                            { (payStatus == 1) ? (<Button size="lg" className="bg-blue-300" onClick={handleSubmit}>Pay Now</Button>): (payStatus == 2) ? (<Button size="lg">Processing</Button>): (payStatus == 3) ? (<Button size="lg">Payment Successful</Button>): (<Button size="lg">Error</Button>)}
                        
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