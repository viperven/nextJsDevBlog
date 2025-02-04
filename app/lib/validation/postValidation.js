import validator from 'validator';

export const validatePost = ({ content, image }) => {
    let customError = new Error();

    if (!content || !image) {
        customError.message = "Content and image is required";
        customError.statusCode = 400;
        throw customError;
    }

    if (!validator.isURL(image)) {
        customError.message = "Invalid URL image url";
        customError.statusCode = 400;
        throw customError;
    }

};
