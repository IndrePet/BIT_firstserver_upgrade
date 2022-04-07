const handler = {};

handler.token = (data, callback) => {
  const acceptableMethods = ['get', 'post', 'put', 'delete'];

  if (acceptableMethods.includes(data.httpMethod)) {
    return handler._method[data.httpMethod](data, callback);
  }

  return callback(400, 'Token: veiksmas NEleistinas');
};

handler._method = {};

handler._method.post = (data, callback) => {
  return callback(200, {
    action: 'POST',
    msg: 'Vartotojui isduotas sesijos TOKEN',
  });
};

handler._method.get = (data, callback) => {
  return callback(200, {
    action: 'GET',
    msg: 'Visa info apie sesijos TOKEN',
  });
};

handler._method.put = (data, callback) => {
  return callback(200, {
    action: 'PUT',
    msg: 'TOKEN sekmingai atnaujintas',
  });
};

handler._method.delete = (data, callback) => {
  return callback(200, {
    action: 'DELETE',
    msg: 'TOKEN sekmingai istrintas is sistemos',
  });
};

export default handler;