const config = {
  mongoURI: process.env.mongoURI ? process.env.mongoURI : "",

  // example: https://raw.githubusercontent.com/officialpiyush/modmail-plugins/master/plugins.json
  pluginsJSON: process.env.pluginsJSON ? process.env.pluginsJSON : "",

  port: process.env.PORT ? process.env.PORT : 3000,

  // In the format officialpiyush/modmail-plugins
  repo: "",
};

export default config;
