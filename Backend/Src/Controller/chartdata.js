const XLSX = require('xlsx');
const path = require('path');
var file_path = path.resolve(__dirname,'../../public/CSV_Files/LumberFut.xlsx' );
const db = require("../DB/db")
const createTableQuery = `CREATE TABLE IF NOT EXISTS stock_data (
  Date DATE,
  Open REAL,
  High REAL,
  Low REAL,
  Close REAL,
  AdjClose REAL,
  Volume REAL
)`;

const selectQuery = `Select * From stock_data`;
const readCSVData = async ()=>{
    const workbook = XLSX.readFile(file_path);

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    let jsonData = XLSX.utils.sheet_to_json(worksheet,{ cellDates: true });
    jsonData = jsonData.map(row => {
      const dateObj = XLSX.SSF.parse_date_code(row['Date']);
      //row['Date'] = new Date(dateObj.y, dateObj.m - 1, dateObj.d);
      row['Date'] = `${dateObj.y}-${dateObj.m}-${dateObj.d}`;
      Object.keys(row).forEach(key => {
        if (row[key] === "-") {
          row[key] = 0;
        }
      });
      return row;
    });

    // jsonData = jsonData.filter(row => {
    //   return !Object.values(row).includes("-");
    // });
    //console.log(jsonData)

   await saveDataDB((jsonData));
    //return jsonData;
    //res.status(200).json(jsonData);
  //   fs.createReadStream(file_path)
  // .pipe(csv())
  // .on('data', (row) => {
  //   console.log(row);
  // })
  // .on('end', () => {
  //   console.log('CSV file successfully processed');
  // });
}

const saveDataDB = (jsonData)=>{
    db.run(createTableQuery, async (err) => {
  if (err) {
    console.error(err.message);
  }
  
  const keys = [ 'Date', 'Open', 'High', 'Low', 'Close', 'AdjClose', 'Volume' ]
    db.get('SELECT * FROM stock_data LIMIT 1', (err, row) => {
    if (err) {
      return console.error(err.message);
    }

    if(!row)
    {
      console.log('Cell value Reloaded');
      jsonData.forEach(async (row) => {
    let placeholders = Object.values(row).map(() => '?').join(',');

    let sql = `INSERT INTO stock_data(${keys.join(',')}) VALUES(${placeholders})`;

   await db.run(sql, Object.values(row), function(err) {
      if (err) {
        return console.error(err.message);
      }
      //console.log(`Row inserted with rowid ${this.lastID}`);
    });
  });
    }
    });


});
}

const getCSVData =  (req,res,next)=>{
    
      db.all(selectQuery,(err,result)=>{
        if(err)
        {
          console.log(err);
          res.status(500).json({success:false,message:err})
        }

        return res.status(200).json({success:true,message:"Data of Stocks",data:result})
    })
}


const truncatTable = (req,res) =>{
  db.serialize(() => {
    db.run('DELETE FROM stock_data', (err) => {
      if (err) {

        console.error(err.message);
        res.status(500),json({success:false,message:err.message})
      }
      db.run('VACUUM', (err) => {
        if (err) {
          console.error(err.message);
        }
        
      });
      res.status(200).json({success:true,message:"Table Truncate successfully"})
    });
  
    
  });
}
module.exports ={readCSVData,getCSVData,truncatTable}