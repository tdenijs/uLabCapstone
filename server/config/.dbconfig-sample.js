// There should be a way to set up settings for development and production
// and using NODE_ENV to determine if in production or development
// But this will do for now.
const dbconfig = {
  hostname: "localhost",
  port    : "5432", // this could be different if you changed default
  dbname  :"ulabdb",
  user    : "", // this is likely postgres
  password: ""
}
module.exports = dbconfig;
