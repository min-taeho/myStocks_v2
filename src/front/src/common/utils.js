import Xlsx, { utils } from 'xlsx'

export const numberWithCommas = num => {
  if (num) {
    let parts = num.toString().split(".")
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "")
  }
  return
};
export const showDollarWith2Point = num => {
  let _pointLength = 2
  if (num) {
    num = Number(num).toFixed(_pointLength)
    let parts = num.toString().split(".")
    return '$' +  parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "") 
  }
  return
};
export const showRateWith2Point = num => {
  let _pointLength = 2
  if (num) {
    num = Number(num).toFixed(_pointLength)
    let parts = num.toString().split(".")
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "") + '%'
  }
  return
};

export const stringToDateStrWithHyphen = str => {
  if (str) {
    return str.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
  }
  return
};

export const getToday = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  return year + month + day;
};


export const makeExcelFileFromTable = tableId => {
  const excelData = Xlsx.utils.table_to_sheet(document.getElementById(tableId)); // table id를 넣어주면된다
  var workBook = Xlsx.utils.book_new(); // 새 시트 생성 
  Xlsx.utils.book_append_sheet(workBook, excelData, tableId);  // 시트 명명, 데이터 지정
  Xlsx.writeFile(workBook, tableId+'_'+getToday()+'.xlsx'); // 엑셀파일 만듬
};
  
export default {
  numberWithCommas,
  showDollarWith2Point,
  showRateWith2Point,
  stringToDateStrWithHyphen,
  getToday,
  makeExcelFileFromTable
};

  
