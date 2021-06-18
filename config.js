const carColumnOrderMapping = {
  "UUID": 0,
  "VIN": 1,
  "MAKE": 2,
  "MODEL": 3,
  "MILEAGE": 4,
  "YEAR": 5,
  "PRICE": 6,
  "ZIPCODE": 7,
  "CREATEDATE": 8,
  "UPDATEDATE": 9
}
const carColumnFileMapping = {
  "UUID": null,
  "VIN": null,
  "MAKE": null,
  "MODEL": null,
  "MILEAGE": null,
  "YEAR": null,
  "PRICE": null,
  "ZIPCODE": null,
  "CREATEDATE": null,
  "UPDATEDATE": null
}
let columnsConfig = false
function filterCSV(csvColumns) {
    
        let rowData = new Array(10).fill("");
        if(!columnsConfig) {
            csvColumns.forEach((csvColumn, index) => {
                csvColumn = csvColumn.toUpperCase().replace(/\s/g, '');
               
                if(csvColumn in carColumnOrderMapping) {
                    carColumnFileMapping[csvColumn] = index
                    rowData[carColumnOrderMapping[csvColumn]] = csvColumn
                }
            })
            
            columnsConfig = true
        } else {
            let indexes = Object.values(carColumnFileMapping)
            let cols = Object.keys(carColumnFileMapping)
            csvColumns.forEach((columnData, index) => {
                if(indexes.includes(index)) {
                    const currentCol = indexes.indexOf(index)
                    const col = cols[currentCol]
                    rowData[carColumnOrderMapping[col]] = columnData
                }
                
            })
        }
        return rowData
    }

  module.exports = { filterCSV }