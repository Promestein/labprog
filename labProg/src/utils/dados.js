export const loadData = (url, filtros, columns) => {
    let api_url = process.env.API_URL + url;
    for (let i = 0; i < filtros.length; i++) {
      if (filtros[i].length > 1) {
        api_url += "/" + filtros[i].join("&");
      } else {
        api_url += "/" + filtros[i];
      }
    }
    return api_url;
  };

  export const transformData = (data, columns, filtros) => {
    let rows = [];
    for (let i = 0; i < data.length; i++) {
      let row = {};
      for (let j = 0; j < data[0].length; j++) {
        row[columns[j].name] = data[i][j];
      }
      rows.push(row);
    }
    return rows;
  };
