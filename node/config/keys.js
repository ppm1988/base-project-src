dbPassword = 'mongodb+srv://<USERNAME>:'+ encodeURIComponent('<PASSWORD>') + '@<CLUSTER_NAME>.mongodb.net/test?retryWrites=true';

module.exports = {
    mongoURI: dbPassword
};
