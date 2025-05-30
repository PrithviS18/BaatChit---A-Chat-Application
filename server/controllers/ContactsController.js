import Message from "../models/MessagesModel.js";
import User from "../models/UserModel.js";

export const searchContacts = async (request, response, next) => {
  try {
    console.log("hello");
    const { searchTerm } = request.body;
    if (searchTerm === undefined || searchTerm === null) {
      response.status(400).send("Search Term is required.")
    }

    const sanitizedSearchTerm = searchTerm.replace(/[.*+?${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(sanitizedSearchTerm, "i");

    const contacts = await User.find({
      $and: [{ _id: { $ne: request.userId } }, {
        $or: [{ firstName: regex }, { lastName: regex }, { username: regex }]
      }],
    })
    console.log(contacts);
    return response.status(200).json({ contacts });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
}


export const getAllContacts = async (request, response, next) => {
  try {
    const userId = request.userId;

    const messages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }]
    });


    //Map to store latest timestamp per chat partner
    const latestMessageMap = new Map();

    messages.forEach((msg) => {
      const otherUserId = msg.sender.toString() === userId
        ? msg.recipient?.toString()
        : msg.sender?.toString();

      if (!otherUserId) return;

      const currentTimestamp = new Date(msg.timeStamp);

      if (
        !latestMessageMap.has(otherUserId) ||
        currentTimestamp > latestMessageMap.get(otherUserId)
      ) {
        latestMessageMap.set(otherUserId, currentTimestamp);
      }
    });

    // Step 3: Fetch user details
    const userIds = Array.from(latestMessageMap.keys());

    const users = await User.find({
      _id: { $in: userIds },
    }).select("-password"); // exclude password

    // Step 4: Sort users by last message timestamp
    const sortedUsers = users.sort((a, b) => {
      const timeA = latestMessageMap.get(a._id.toString());
      const timeB = latestMessageMap.get(b._id.toString());
      return timeB - timeA; // descending order (most recent first)
    });

    return response.status(200).json({ users: sortedUsers });


  } catch (error) {
    console.log(error);
    return response.status(500).send("Internal server error");
  }
}