const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

// gets table contents from databases
router.get('/pettable', async (req, res) => {
    const tableContent = await appService.fetchPettableFromDb();
    res.json({data: tableContent});
});

router.get('/doctable', async (req, res) => {
    const tableContent = await appService.fetchDoctableFromDb();
    res.json({data: tableContent});
});

router.get('/vettable', async (req, res) => {
    const tableContent = await appService.fetchVettableFromDb();
    res.json({data: tableContent});
});

router.get('/ownertable', async (req, res) => {
    const tableContent = await appService.fetchOwnertableFromDb();
    res.json({data: tableContent});
});

router.get('/applicationtable', async (req, res) => {
    const tableContent = await appService.fetchApplicationtableFromDb();
    res.json({data: tableContent});
});


router.get('/shelterTable', async (req, res) => {
    const tableContent = await appService.fetchSheltertableFromDb();
    res.json({data: tableContent});
});

router.get('/purchasesfromtable', async (req, res) => {
    const tableContent = await appService.fetchPurchasesFromtableFromDb();
    res.json({data: tableContent});
});

router.get('/suppliertable', async (req, res) => {
    const tableContent = await appService.fetchSuppliertableFromDb();
    res.json({data: tableContent});
});


router.get('/dogtable', async (req, res) => {
    const tableContent = await appService.fetchDogtableFromDb();
    res.json({data: tableContent});
});


////
router.get('/sortYoungPet', async (req, res) => {
    const tableContent = await appService.fetchSortYoungFromDb();
    res.json({data: tableContent});
});

router.post("/insert-doctable", async (req, res) => {
    const { pid, vetcon, id, ddesc, ddate } = req.body;
    const insertResult = await appService.insertDoctable(pid, vetcon, id, ddesc, ddate);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post('/filter-columns', async (req, res) => {
    const { columns } = req.body;
    try {
        const filteredData = await appService.getFilteredColumns(columns);
        res.json({ success: true, data: filteredData });
    } catch (error) {
        console.error('Error filtering columns:', error);
        res.status(500).json({ success: false });
    }
});

router.post("/update-demotable", async (req, res) => {
    const { field, oldValue, newValue, petID } = req.body;  
    const updateResult = await appService.updateDemotable(field, oldValue, newValue, petID);
  
    if (updateResult) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  });

router.get('/count-demotable', async (req, res) => {
    const tableCount = await appService.countDemotable();
    if (tableCount >= 0) {
        res.json({ 
            success: true,  
            count: tableCount
        });
    } else {
        res.status(500).json({ 
            success: false, 
            count: tableCount
        });
    }
});

router.post("/join-table", async (req, res) => {
    const { query } = req.body;
    const joinResult = await appService.joinTable(query);
    if (joinResult != null) {
        res.json({ success: true, data: joinResult });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get("/having-query", async (req, res) => {
    const havingResult = await appService.havingQuery();
    res.json({data: havingResult});
});

router.get("/divide-query", async (req, res) => {
    const divideResult = await appService.divideQuery();
    res.json({data: divideResult});
});

////


router.get('/trainertable', async (req, res) => {
    const tableContent = await appService.fetchTrainertableFromDb();
    res.json({ data: tableContent });
});

router.post('/selectedpettable', async (req, res) => {
    const { queryString } = req.body;
    const tableContent = await appService.fetchSelectedPettableFromDb(queryString);
    // how to determine whether it succeeds
    if (tableContent != null) {
        res.json({ success: true, data: tableContent });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post('/selectedsheltertable', async (req, res) => {
    const { queryString } = req.body;
    const tableContent = await appService.fetchSelectedSheltertableFromDb(queryString);
    if (tableContent != null) {
        res.json({ success: true, data: tableContent });
    } else {
        res.status(500).json({ success: false });
    }
});

router.delete('/delete-trainer', async (req, res) => {
    const { trainerContact } = req.body;
    const deleteResult = await appService.deleteTrainer(trainerContact);

    if (deleteResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/avg-age-group-by-species', async (req, res) => {
    const tableContent = await appService.avgAgeGroupBySpecies();
    if (tableContent.length > 0) {
        res.json({
            success: true,
            data: tableContent
        });
    } else {
        res.status(500).json({
            success: false
        });
    }
});


module.exports = router;