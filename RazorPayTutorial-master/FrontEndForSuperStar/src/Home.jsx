import React, { useEffect, useState } from "react";
//import { Box, Stack } from "@chakra-ui/react";
import Card from "./Card";
import axios from "axios";
import { Box, Button, Image, Text } from "@chakra-ui/react";
// import { Razorpay } from "razorpay";

const Home = () => {
  let [packages, setPackages] = useState([]);
  let [key, setKey] = useState("");
  let [dbOrder, setDbOrder] = useState(null);
  let [razorPayOrder, setRazorPayOrder] = useState(null);
  let baseUrl = "https://api-dev.superstarr.co/api/v1";
  //let baseUrl = "http://localhost:3000/api/v1"

  let token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOiI2NTlmNzc2YjBhODZmMzk2OGI5Mjg5YjQiLCJ1c2VyX25hbWUiOiJnYXVyYXZAZ21haWwuY29tIiwibmFtZSI6IlN1cGVyU3RhciNjODQ5MjU2Iiwic3VwZXJzdGFyX2lkIjoxMDAwMDUsImxvZ2luX3R5cGUiOiJVIn0sImlhdCI6MTcxNzc1MDEzMywiZXhwIjoxNzIwMzQyMTMzfQ.f1czyqvhUqMJYqhi3xbWb9dfd0Dm70wP1c2jPVRfV-8";

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: baseUrl + "/packages/get-packages",
          headers: {
            Authorization: token,
          },
        };

        let data = await axios.request(config);
        console.log(data.data.data);

        //console.log(packages, "packages---");
        // let packs = data.data.data;

        //setPackages(data.data.data[0].packages);

        for (let pack of data.data.data) {
          console.log(pack, "--pack---");
          if (pack._id != "Monthly") {
            let packages = pack.packages;
            setPackages(pack.packages);
            console.log("monthly selected", pack.packages);
          }
        }

        console.log(packages, "packages");

        let config2 = {
          method: "get",
          maxBodyLength: Infinity,
          url: baseUrl + "/coins-payment/get-payment-key",
          headers: {
            Authorization: token,
          },
        };

        let keyData = await axios.request(config2);
        setKey(keyData.data.data);
        console.log(key, "key");
      } catch (err) {
        // Handle errors if any
        console.log(err);
      }
    };

    fetchPackages();
  }, []);

  const paymentHandler = async (resp) => {
    try {
      let data = JSON.stringify({
        razorpay_payment_id: resp.razorpay_payment_id,
        razorpay_signature: resp.razorpay_signature,
        razorpay_order_id: resp.razorpay_order_id,
        db_order_id: dbOrder._id,
      });

      console.log(data, "payments Data");

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: baseUrl + "/coins-payment/verify-payment",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };

      let paymentRes = await axios.request(config);
      console.log(paymentRes);
      if (paymentRes.status == 200) {
        alert("Payment successful!");
      } else {
        alert("Payment failed!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleButtonClick = async (ele) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/coins-payment/initiate-order/${ele._id}`,
      headers: {
        Authorization: token,
      },
    };

    let data = await axios.request(config);
    // console.log(data);
    setDbOrder(data.data.data.dbOrder);
    console.log(dbOrder, "db order ");
    setRazorPayOrder(data.data.data.razorPayOrder);
    console.log(razorPayOrder, "razorpay order ");

    const options = {
      key,
      amount: razorPayOrder.amount,
      currency: razorPayOrder.currencyCode,
      name: "Mangesh Balkawade",
      description: "Tutorial of RazorPay",
      image: "https://avatars.githubusercontent.com/u/25058652?v=4",
      order_id: razorPayOrder.id,
      //callback_url: "http://localhost:4000/api/paymentverification",
      handler: paymentHandler,
      prefill: {
        name: "Mangesh Balkawade",
        email: "mangesh balkawade ",
        contact: "12345566",
      },
      notes: razorPayOrder.notes,
      theme: {
        color: "#121212",
      },
      modal: {
        ondismiss: function () {
          console.log("payment failed");
          alert("Payment failed!");
        }
      }
    };

    console.log(options);
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <Box>
      {packages.map((ele) => (
        <Box
          key={ele.index}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="4"
          mb="4"
        >
          <Image src={ele.iconsImagesUrl[0]} alt="Card Image" />
          <Text mt="4">Amount: {ele.finalAmount}</Text>
          <Button mt="4" onClick={() => handleButtonClick(ele)}>
            Click Me
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default Home;
