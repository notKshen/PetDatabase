const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`,
    poolMin: 1,
    poolMax: 3,
    poolIncrement: 1,
    poolTimeout: 60
};

// initialize connection pool
async function initializeConnectionPool() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connection pool started');
    } catch (err) {
        console.error('Initialization error: ' + err.message);
    }
}

async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
        await oracledb.getPool().close(10); // 10 seconds grace period for connections to finish
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

initializeConnectionPool();

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);


// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(); // Gets a connection from the default pool 
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

// fetches data from relations in database

async function fetchPettableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT 
            p1.pid,
            p1.pname,
            p7.species,
            p3.age,
            p4.healthCondition,
            p5.adoptionDate,
            p6.arriveDate,
            p9.breed,
            p10.ownerAddress
        FROM 
            Pet1 p1,
            Pet3 p3,
            Pet4 p4,
            Pet5 p5,
            Pet6 p6,
            Pet7 p7,
            Pet9 p9,
            Pet10 p10
        WHERE 
            p1.pid = p3.pid
            AND p1.pid = p4.pid
            AND p1.pid = p5.pid
            AND p1.pid = p6.pid
            AND p1.pid = p7.pid
            AND p1.pid = p9.pid
            AND p1.pid = p10.pid
            `);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchDoctableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Documentation');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchVettableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Veterinarian');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchOwnertableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM POwner');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchApplicationtableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM AdoptionApplication');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchSheltertableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Shelter');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchPurchasesFromtableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM PurchasesFrom');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchDogtableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Dog');
        return result.rows;
    }).catch(() => {
        return [];
    });
}


////

async function fetchSortYoungFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `
            SELECT P1.pid, P1.age, P2.species
            FROM Pet3 P1
            JOIN Pet7 P2 ON P1.pid = P2.pid
            WHERE P1.age <= (
                SELECT AVG(P3.age)
                FROM Pet3 P3
                JOIN Pet7 P4 ON P3.pid = P4.pid
                WHERE P4.species = P2.species
                GROUP BY P4.species
            )
            `
        );
        return result.rows;
    }).catch((err) => {
        console.error('Error fetching data:', err);
        return [];
    });
}


async function insertDemotable(id, name) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Pet1 (pid, pname) VALUES (:id, :name)`,
            [id, name],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function getFilteredColumns(columns) {
    return await withOracleDB(async (connection) => {
      const selectedColumns = columns.map((col) => `${col}`).join(', ');
      const query = `SELECT ${selectedColumns} FROM Dog`;
      const result = await connection.execute(query);
      return result.rows;
    }).catch((err) => {
      console.error('Error during column filtering:', err);
      throw err;
    });
  }

async function updateDemotable(field, oldValue, newValue, petID) {
    return await withOracleDB(async (connection) => {
      let result;
  
      switch (field) {
        case "name":
          result = await connection.execute(
            `UPDATE Pet1 SET pname = :newValue WHERE pname = :oldValue AND pid = :petID`,
            [newValue, oldValue, petID],
            { autoCommit: true }
          );
          break;
  
          case "age":
            result = await connection.execute(
              `
              UPDATE Pet2
              SET age = :newValue
              WHERE age = :oldValue 
              AND age = (
                  SELECT age
                  FROM Pet3
                  WHERE pid = :petID
              )
              `,
              [Number(newValue), Number(oldValue), petID],
              { autoCommit: true }
            );
        
            await connection.execute(
              `UPDATE Pet3 
              SET age = :newValue 
              WHERE age = :oldValue AND pid = :petID`,
              [Number(newValue), Number(oldValue), petID],
              { autoCommit: true }
            );
            break;
        
        case "dietaryRequirements":
            result = await connection.execute(
                `
                UPDATE Pet2
                SET dietaryRequirements = :newValue
                WHERE dietaryRequirements = :oldValue
                AND species = (
                    SELECT species
                    FROM Pet7
                    WHERE pid = :petID
                )
                `,
                [newValue, oldValue, petID],
                { autoCommit: true }
            );
            
            await connection.execute(
                `
                UPDATE Pet11
                SET dietaryRequirements = :newValue
                WHERE dietaryRequirements = :oldValue
                    AND species = (
                    SELECT species
                    FROM Pet7
                    WHERE pid = :petID
                )
                `,
                [newValue, oldValue, petID],
            { autoCommit: true }
        );      
        break;
            

        case "healthCondition":
          result = await connection.execute(
            `UPDATE Pet4 SET healthCondition = :newValue WHERE healthCondition = :oldValue AND pid = :petID`,
            [newValue, oldValue, petID],
            { autoCommit: true }
          );
          break;
  
          case "adoptionDate": 

          let formattedOldDate;
          let formattedNewDate;

            if(oldValue != '') {
                formattedOldDate = new Date(oldValue).toISOString().split('T')[0];
            }
            if(newValue != '') {
                formattedNewDate = new Date(newValue).toISOString().split('T')[0]; 
            }
            
            if(oldValue == '') {
                result = await connection.execute(
                    `UPDATE Pet5 SET adoptionDate = TO_DATE(:newValue, 'YYYY-MM-DD') WHERE pid = :petID`,
                    [formattedNewDate, petID],  
                    { autoCommit: true }  
                );
            }
            else if (newValue == '') {
                result = await connection.execute(
                    `UPDATE Pet5 SET adoptionDate = NULL WHERE adoptionDate = TO_DATE(:oldValue, 'YYYY-MM-DD') AND pid = :petID`,
                    [formattedOldDate, petID],  
                    { autoCommit: true }  
                );
            }
            else {
                result = await connection.execute(
                    `UPDATE Pet5 SET adoptionDate = TO_DATE(:newValue, 'YYYY-MM-DD') WHERE adoptionDate = TO_DATE(:oldValue, 'YYYY-MM-DD') AND pid = :petID`,
                    [formattedNewDate, formattedOldDate, petID],  
                    { autoCommit: true }  
                );
            }

            break;
  
        case "ownerAddress":
            result = await connection.execute(
                // Should be ON UPDATE CASCADE for foreign key
                `UPDATE Pet10 SET ownerAddress = :newValue WHERE ownerAddress = :oldValue AND pid = :petID`,
                [newValue, oldValue, petID],
                { autoCommit: true }
              );
          break;

        case "carePlan":
            result = await connection.execute(
                `
                UPDATE Pet11
                SET carePlan = :newValue
                WHERE carePlan = :oldValue
                    AND species = (
                        SELECT species
                        FROM Pet7
                        WHERE pid = :petID
                        )
                `,
                [newValue, oldValue, petID],
                { autoCommit: true }
              );
          break;
  
        default:
          throw new Error(`Unknown field: ${field}`);
      }
  
      // Return true if rows were updated
      return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
      console.error("Error during update:", err);
      return false;
    });
  }
  

async function countDemotable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT Count(*) FROM Pet1');
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}

async function joinTable(query) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * 
            FROM POwner o, AdoptionApplication a 
            WHERE o.oaddress = a.ownerAddress 
            AND ${query}`
        );

        const rows = result.rows;
        return rows;
    }).catch(() => {
        return null;
    });
}

module.exports = {
    testOracleConnection,
    fetchPettableFromDb,
    fetchDoctableFromDb,
    fetchVettableFromDb,
    fetchOwnertableFromDb,
    fetchApplicationtableFromDb,
    fetchSheltertableFromDb,
    fetchPurchasesFromtableFromDb,
    fetchDogtableFromDb,
    insertDemotable, 
    updateDemotable, 
    countDemotable,
    getFilteredColumns,
    fetchSortYoungFromDb,
};