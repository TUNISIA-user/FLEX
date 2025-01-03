

app.post("/accesMessage/:id", async (req, res) => {
    try {
        const { userId, txt, imgUser, imgProfile } = req.body;

        // Check if a chat exists between the two users
        let isChat = await ChatTalking.findOne({
            users: { $all: [req.params.id, userId] }
        });

        if (isChat) {
            // If the chat exists, push the new message
            isChat.messages.push({
                imgUser: imgUser,
                senderId: userId,
                content: txt,
                timestamp: new Date(),
                imgProfile: imgProfile,
            });

            await isChat.save(); // Save the updated chat

            // Fetch all messages after adding the new message
            const allMessages = await ChatTalking.findOne({ users: { $all: [req.params.id, userId] } });

            // Emit updated messages to both users
            io.to(req.params.id).emit('updatedMessages', allMessages.messages); // Emit to the recipient
            io.to(userId).emit('updatedMessages', allMessages.messages); // Emit to the sender
            return res.json(allMessages); // Return the updated chat
        } else {
            // If the chat does not exist, create a new chat
            const newChat = new ChatTalking({
                users: [req.params.id, userId],
                messages: [{
                    imgUser: imgUser,
                    senderId: userId,
                    content: txt,
                    timestamp: new Date(),
                    imgProfile: imgProfile,
                }],
            });

            await newChat.save(); // Save the new chat
            // Emit new chat messages to both users
            io.to(req.params.id).emit('updatedMessages', newChat.messages); // Emit to the recipient
            io.to(userId).emit('updatedMessages', newChat.messages); // Emit to the sender
            return res.json(newChat); // Return the newly created chat
        }

    } catch (error) {
        console.log(`This Error by ${error}`); // Log the error
        res.status(404).json({ message: error.message || "An error occurred" }); // Send a 404 response with the error message
    }
});



// 

const playEvent = (userId) => {
    // Emit play event to the user
    io.to(userId).emit('playEvent', { message: 'It\'s your turn to play!' });
};

// Example of usage in your logic
playEvent(req.params.id); // Notify the recipient
playEvent(userId); // Notify the sender


