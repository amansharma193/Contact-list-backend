const pagination=(model)=>{
  return async(req,res,next)=>{
    const filter = req.body || {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {previous:false,next:false};

    if (endIndex < await model.countDocuments(filter).exec()) {
      results.next = true;
    }
    
    if (startIndex > 0) {
      results.previous = true;
    }
    try {
      results.results = await model.find(filter).limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }

  }
}

export default pagination;