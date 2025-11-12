const axios = require('axios');
const base64 = require('base-64');

const key = "rzp_test_cs2T3LqYVViiiO";
const secret = "u5uSgJRrcqVCmdQtCtO88HYE";
const accNo = "2323230084914927";

const credentials = `${key}:${secret}`;
const encodedCredentials = base64.encode(credentials);

// create contact 
async function createContact() {

    let data = JSON.stringify({
        "name": "Gaurav Kumar",
        "email": "gauravkumar@example.com",
        "contact": 9123456789,
        "type": "employee",
        "reference_id": "Acme Contact ID 12345",
        "notes": {
            "random_key_1": "Make it so.",
            "random_key_2": "Tea. Earl Grey. Hot."
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.razorpay.com/v1/contacts',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
        },
        data: data
    };

    let res = await axios.request(config);
    console.log(res.data, "contact");
    return res.data;
}

async function createdFundAccount(conact_id) {
    let data = JSON.stringify({
        "contact_id": `${conact_id}`,
        "account_type": "bank_account",
        "bank_account": {
            "name": "Gaurav Kumar",
            "ifsc": "HDFC0009107",
            "account_number": "50100102283912"
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.razorpay.com/v1/fund_accounts',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
        },
        data: data
    };

    const res = await axios.request(config);
    console.log(res.data, "fund account ");
    return res.data;
}

async function makePayment(fund_id) {
    let data = JSON.stringify({
        "account_number": accNo,
        "fund_account_id": fund_id,
        "amount": 1000,
        "currency": "INR",
        "mode": "IMPS",
        "purpose": "refund",
        "queue_if_low_balance": true,
        "reference_id": "Acme Transaction ID 12345",
        "narration": "Acme Corp Fund Transfer",
        "notes": {
            "notes_key_1": "Tea, Earl Grey, Hot",
            "notes_key_2": "Tea, Earl Grey… decaf."
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.razorpay.com/v1/payouts',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
        },
        data: data
    };

    try {
        const res = await axios.request(config);
        console.log(res.data, "payemnt");
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}

async function composite() {
    let data = JSON.stringify({
        "account_number": accNo,
        "amount": 100,
        "currency": "INR",
        "mode": "NEFT",
        "purpose": "refund",
        "fund_account": {
            "account_type": "bank_account",
            "bank_account": {
                "name": "Gaurav Kumar",
                "ifsc": "HDFC0001234",
                "account_number": "1121431121541121"
            },
            "contact": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9876543210",
                "type": "employee",
                "reference_id": "Acme Contact ID 12345",
                "notes": {
                    "notes_key_1": "Tea, Earl Grey, Hot",
                    "notes_key_2": "Tea, Earl Grey… decaf."
                }
            }
        },
        "queue_if_low_balance": true,
        "reference_id": "Acme Transaction ID 12345",
        "narration": "Acme Corp Fund Transfer",
        "notes": {
            "notes_key_1": "Beam me up Scotty",
            "notes_key_2": "Engage"
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.razorpay.com/v1/payouts',
        headers: {
            'X-Payout-Idempotency': '',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
        },
        data: data
    };

    const res = await axios.request(config);
    console.log(res.status);
    return res.data;

}

async function main() {
    //let contact_data = await createContact();
    //console.log(contact_data);
    //let fund_data = await createdFundAccount(contact_data.id);
    //console.log(fund_data);
    //let payment_data = await makePayment(fund_data.id);
    // console.log(payment_data);
    let payment_composit_data = await composite();
    console.log(payment_composit_data, "payment_composit_data");
}

main()