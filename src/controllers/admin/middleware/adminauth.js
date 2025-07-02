
export const isAdminAuthticated = (req,res,next)=>{

    if(!req.session.adminId){
        throw new ApiError(401,"Unauthorized request");
    }

    next()

}



export const protectedRoute = (req,res)=>{

     if (req.session.adminId) {
    return res.status(200).json({ loggedIn: true });
  }
  return res.status(401).json({ loggedIn: false });
}