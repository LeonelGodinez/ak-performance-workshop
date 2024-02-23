const express = require('express');
const compression = require('compression')
const app = express();
app.use(compression({level: 9}))
const apicache = require('apicache');
let cache = apicache.middleware;
app.use(cache('5 minutes'));


const heavyCollection = Array.from({ length: 100000 }, (_, i) => ({ id: i, name: `Item ${i}` }));


app.get('/api/heavy-data', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = heavyCollection//.slice(startIndex, endIndex);

    res.json({
        totalItems: heavyCollection.length,
        page,
        limit,
        data: paginatedData,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});