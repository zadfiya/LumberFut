const XLSX = require('xlsx');
const path = require('path');
var file_path = path.resolve(__dirname,'../../public/CSV_Files/LumberFut.xlsx' );
const db = require("../DB/db")
const createTableQuery = `CREATE TABLE IF NOT EXISTS stock_data (
  Date TEXT,
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
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

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
  console.log('Table created successfully or already exists.');
  const keys = [ 'Date', 'Open', 'High', 'Low', 'Close', 'AdjClose', 'Volume' ]
        let resultFromDB =    [];
    db.get('SELECT * FROM stock_data LIMIT 1', (err, row) => {
    if (err) {
      return console.error(err.message);
    }

    console.log("value of ",row)
    if(!row)
    {
       jsonData.forEach(async (row) => {
    let placeholders = Object.values(row).map(() => '?').join(',');

    let sql = `INSERT INTO stock_data(${keys.join(',')}) VALUES(${placeholders})`;

   await db.run(sql, Object.values(row), function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row inserted with rowid ${this.lastID}`);
    });
  });
    }
    });


});
}

const getCSVData =  (req,res,next)=>{
    var resultData=[]
      db.all(selectQuery,(err,result)=>{
        if(err)
            return err;

        return res.status(200).json({success:true,message:"Data of Stocks",data:result})
    })
}
module.exports ={readCSVData,getCSVData}