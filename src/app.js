const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const config = require('../config.json');

const app = express();
const port = config.port || 3001;

app.use(express.json());

router.use(async (req, res) => {
    if (config.piqIpAdresses.includes(req.headers["x-forwarded-for"])) {
        const data = await axios.post(`${config.merchantUrl}${req.url}`, { ...req.body });
        if (data.status !== 200) {
            return res.status(data.status).send(data.data);
        }
        console.log(req.url, data.data);
        return res.status(200).send(data.data);
    }
    console.log(`You're doing something odd kiddo IP ${req.headers["x-forwarded"]} isn't configured in config.json`);
});

app.use(router);

app.listen(port, () => console.log(`Listening on port ${port}`))