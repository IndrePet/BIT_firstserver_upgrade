const handler = {};

handler.account = (data, callback) => {
  const acceptableMethods = ['get', 'post', 'put', 'delete'];

  if (acceptableMethods.includes(data.httpMethod)) {
    return handler._method[data.httpMethod](data, callback);
  } else {
    return callback(400, 'Account: veiksmas neleistinas');
  }
};

handler._method = {};
handler._method.post = (data, callback) => {
  return callback(200, {
    action: 'POST',
    msg: 'Vartotojo paskyra sukurta sekmingai',
  });
};
handler._method.get = (data, callback) => {
  return callback(200, {
    action: 'GET',
    msg: 'Stai tau visa info apie dominanti vartotoja',
  });
};
handler._method.put = (data, callback) => {
  return callback(200, {
    action: 'PUT',
    msg: 'Vartotojo paskyra atnaujinta sekmingai',
  });
};
handler._method.delete = (data, callback) => {
  return callback(200, {
    action: 'Delete',
    msg: 'Vartotojo paskyra istrinta sekmingai',
  });
};

export default handler;
