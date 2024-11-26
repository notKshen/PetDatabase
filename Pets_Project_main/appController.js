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

router.get('/dogtable', async (req, res) => {
    const tableContent = await appService.fetchDogtableFromDb();
    res.json({data: tableContent});
});




router.post("/initiate-demotable", async (req, res) => {
    const initiateResult = await appService.initiateDemotable();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
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

module.exports = router;