const config = {
    mongoURI: process.env.mongoURI ? process.env.mongoURI : "mongodb://url-c:01234url@ds115874.mlab.com:15874/url",
    // tslint:disable-next-line: max-line-length
    pluginsJSON: process.env.pluginsJSON ? process.env.pluginsJSON : "https://raw.githubusercontent.com/officialpiyush/modmail-plugins/master/plugins.json",

    port: process.env.PORT ? process.env.PORT : 3000,

    // In the format officialpiyush/modmail-plugins
    repo: "",
};

export default config;
