const buildQuery = (data) => {
  if (typeof data === 'string') return data;

  // Create a query array to hold the key/value pairs
  var query = [];

  // Loop through the data object
  for (var key in data) {
    if (data.hasOwnProperty(key) && data[key]) {
      // Encode each key and value, concatenate them into a string, and push them to the array
      let val = data[key];
      if (val instanceof Date) {
        val = val.toISOString();
        console.log(val);
      }
      query.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
    }
  }

  // Join each item in the array with a `&` and return the resulting string
  return query.join('&');
};

export { buildQuery };
