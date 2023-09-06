//External Lib Import
import exportFromJSON from 'export-from-json';

const exportDataJson = (data, fileName, type) => {
  const newArr = data.map((i) =>
    Object.assign(
      {},
      ...(function _flatten(o) {
        return [].concat(...Object.keys(o).map((k) => (typeof o[k] === 'object' ? _flatten(o[k]) : { [k]: o[k] })));
      })(data)
    )
  );

  if (type === 'csv') {
    const exportType = exportFromJSON.types.csv;
    return exportFromJSON({ data: newArr, fileName, exportType });
  } else if (type === 'xls') {
    const exportType = exportFromJSON.types.xls;
    return exportFromJSON({ data: newArr, fileName, exportType });
  }
};

export default exportDataJson;
