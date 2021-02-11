const createError =  require('http-errors');


//404 handler
const fourOhFour = (req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "A 404 Error Occured!  The webpage could not be found!";
    res.render('page-not-found', {err, title: "404.  Page Not Found"});
}

//Global Error Handler
const globalError = (err, req, res, next) => {
    if (err.status === 404) {
        res.render('page-not-found', {err, title: "404.  Page Not Found"});  
    } else {
        err.status = err.status || 500;
        err.message = err.message || "A Server Error Occurred!";
        console.log(`Error Status: ${err.status}`, `Error Message: ${err.message}`);      
        res.render('error', {err});
        return err;
    }
}

module.exports = {fourOhFour, globalError};