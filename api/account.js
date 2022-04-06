const handler = {};

handler.account = () => {
  const acceptableMethods = ["get", "post", "put", "delete"];

  if (acceptableMethods.includes(data.httpMethod)) {
    console.log("Account: veiksmas leistinas");
  } else {
    console.log("Account: veiksmas neleistinas");
  }
};

export default handler;
