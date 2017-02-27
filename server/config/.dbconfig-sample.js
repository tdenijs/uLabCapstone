/***************************************************************
 * Copyright (c) 2016 Universal Design Lab. All rights reserved.
 *
 * This file is part of uLabCapstone, distibuted under the MIT
 * open source licence. For full terms see the LICENSE.md file
 * included in the root of this project.
 **************************************************************/

// TODO: There should be a way to set up settings for development and production
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
