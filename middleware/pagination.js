// pagination middleware for sending in parts to reduce data size and improving efficiency
const pagination=(model)=>{
  // returning middleware function to be called before main function
  return async(req,res,next)=>{

    // in case of any filter prvided in the request (Like contact searching api) otherwise it will be empty object
    const filter = req.body || {};
    // page whose data will be returned
    const page = parseInt(req.query.page) || 1;
    // limit per page 
    const limit = parseInt(req.query.limit) || 10;
    // index from where to start picking contacts
    const startIndex = (page - 1) * limit;
    // index till we have to pick contacts
    const endIndex = page * limit;

    // result object to return at the end
    const results = {previous:false,next:false};

    // for indicating that next data is present or not in response
    if (endIndex < await model.countDocuments(filter).exec()) {
      results.next = true;
    }
    
    // for indicating that previous data is present or not in response
    if (startIndex > 0) {
      results.previous = true;
    }
    try {
      // getting data by aplying filters of limit, skip and data matching
      results.results = await model.find(filter).limit(limit).skip(startIndex).exec();
      // adding result in response object
      res.paginatedResults = results;
      // moving to our main function
      next();
    } catch (e) {
      // if caught any error then it will be handled here
      res.status(500).json({ message: e.message });
    }

  }
}

export default pagination;