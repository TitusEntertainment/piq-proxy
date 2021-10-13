const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const config = require('../config.json');

const app = express();
const port = 3001;

app.use(express.json());

router.use(async (req, res) => {
    if (config.piqIpAdresses.includes(req.headers["x-forwarded-for"])) {
        const data = await axios.post(`${config.merchantUrl}${req.url}`, { ...req.body })
        console.log(data.data);
        return res.status(200).send(data.data);
    }

    console.log(req.body);
    req.pipe(`https://api.paymentiq.io/paymentiq${req.url}`);

});

app.use(router);

app.listen(port, () => console.log(`Listening on port ${port}`))