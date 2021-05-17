const sendErrorResponse = async (res, content, message, status) => {
    status = !status ? 400 : status;
    let data = {};
    data['success'] =  false;
    data['message'] =  message;
    data['data'] =  content;
    res.status(status).json(data);
};

const sendSuccessResponse = async (res, content, message) => {
    let data = {};
    data['success'] =  true;
    data['message'] =  message;
    data['data'] =  content;
    res.status(200).json(data);
};

const handleError = (err, res) => {
    if (res) {
        const msg = typeof err === 'string' ? err : 'SOMETHING_WENT_WRONG';
        return sendErrorResponse(res, {}, msg);
    } else {
        return {error: err};
    }
};

module.exports = {
    sendErrorResponse,
    sendSuccessResponse,
    handleError
};