
const removeIdFromBody = (req, res, next) => {

    delete req.body.id;
    next();
};

export { removeIdFromBody };
