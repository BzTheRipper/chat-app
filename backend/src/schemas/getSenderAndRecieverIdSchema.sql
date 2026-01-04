SELECT textMessages FROM messages
WHERE
    (senderId = ? AND receiverId = ?)
    OR
    (senderId = ? AND receiverId = ?)
ORDER BY created_at ASC;