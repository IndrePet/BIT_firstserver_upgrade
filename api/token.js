const handler = {};

handler.token = (data, callback) => {
  const acceptableMethods = ['get', 'post', 'put', 'delete'];

  if (acceptableMethods.includes(data.httpMethod)) {
    console.log('token: veiksmas leistinas');
  } else {
    console.log('token: veiksmas neleistinas');
  }
};

export default handler;
