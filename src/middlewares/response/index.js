const { handleError } = require("../../utils/error");

exports.wrapHandlerModule = (module) => {
  try {
    const moduleArr = Object.entries(module);
    const updatedFuncArr = moduleArr.map(([name, func]) => {
      return { [name]: requestResponseWrapper(func, name) };
    });
    return updatedFuncArr.reduce((acc, item) => {
      acc = { ...acc, ...item };
      return acc;
    }, {});
  } catch (error) {
    throw Error(JSON.stringify({ status: 500, message: error }));
  }
};

const requestResponseWrapper = (handler, name) => async (req, res) => {
  const url = `${req.baseUrl}${req.url}`;
  const body = {
    ...req.body,
    status: req.body.status ? !!req.body.status : null,
    otherStatus: req.body.status
      ? typeof req.body.status !== "boolean"
        ? req.body.status
        : null
      : null,
  };
  try {
    const response = await handler({
      body: req.body,
      query: req.query,
      user: req.user,
      headers: req.headers,
      params: req.params,
    });

    res.status(response.status).send({
      success: response.success,
      data: response.data,
      message: response.message,
    });
  } catch (error) {
    const { status, message } = IsJsonString(error.message)
      ? JSON.parse(error.message)
      : error;
    handleError(res, status, message);
  }
};

const IsJsonString = (str) => {
  try {
    if (!str) return;
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
