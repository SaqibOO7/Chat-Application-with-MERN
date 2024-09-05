import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try{

        const loggedInUserId = req.user._id;        //our id

        //this statement means -> find all the user except ourself and in users don't select passwords
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers);

    } catch(error){
        console.error("Error in getUserSidebar:", error.message)
        res.status(500).json({error: "Internal server error"});
    }
}