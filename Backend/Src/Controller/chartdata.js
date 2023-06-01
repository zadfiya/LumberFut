const XLSX = require('xlsx');
const path = require('path');
var file_path = path.resolve(__dirname,'../../public/CSV_Files/LumberFut.xlsx' )
const createTableQuery = `
CREATE TABLE IF NOT EXISTS stocks (
  Date TEXT,
  Open REAL,
  High REAL,
  Low REAL,
  Close REAL,
  AdjClose REAL,
  Volume REAL
)`;

const readCSVData = (req,res,next)=>{
    const workbook = XLSX.readFile(file_path);

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    res.status(200).json(jsonData);
  //   fs.createReadStream(file_path)
  // .pipe(csv())
  // .on('data', (row) => {
  //   console.log(row);
  // })
  // .on('end', () => {
  //   console.log('CSV file successfully processed');
  // });
}

const saveDataDB = ()=>{

}

module.exports ={readCSVData}