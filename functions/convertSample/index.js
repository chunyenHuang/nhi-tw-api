const fetch = require('node-fetch');
const XLSX = require('xlsx')

exports.handler = async (event) => {
    let startedAt = Date.now();
    const returnResult = {
        time: {
            download: 0,
            buffer: 0,
            parse: 0,
        },
        data: {}
    };

    // 特約藥局配送口罩名單下載
    const fileUrl = `http://ws.nhi.gov.tw/Download.ashx?u=LzAwMS9VcGxvYWQvMjkyL2NrZmlsZS9iNjlhY2Y0Yy0yNzE1LTQxNzEtODBlMS1jODAwYTVhNGJmYTIueGxzeA%3d%3d&n=MTA5MDIxMC3nibnntITol6XlsYDphY3pgIHlj6PnvanlkI3llq4o6KiINjI4MeWutikt5Yqg6Ki76KiYLnhsc3g%3d&icon=.xlsx`;

    const res = await fetch(fileUrl);
    returnResult.time.download = Date.now() - startedAt;
    startedAt = Date.now();

    const buffer = await res.buffer();
    returnResult.time.buffer = Date.now() - startedAt;
    startedAt = Date.now();

    const workbook = XLSX.read(buffer, {
        type: 'buffer'
    });
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
        range: 1, // start at row 2
    })
    returnResult.time.parse = Date.now() - startedAt;
    returnResult.data = data;

    const response = {
        statusCode: 200,
        body: JSON.stringify(returnResult),
    };
    return response;
}
