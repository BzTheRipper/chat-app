CREATE TABLE IF NOT EXISTS messages(
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    text TEXT,
    image TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_sender
        FOREIGN KEY (senderId)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    
    CONSTRAINT fk_reciever
        FOREIGN KEY (receiverId)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);