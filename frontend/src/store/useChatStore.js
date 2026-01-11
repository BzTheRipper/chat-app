import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("messages/users");
            set({ users: res.data });
        } catch (err) {
            toast.error(err.response.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (err) {

        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        try {
            console.log(messageData);
            const { selectedUser } = get();
            console.log(selectedUser)

            const res = await axiosInstance.post(
                `/messages/send/${selectedUser.user_id}`,
                messageData
            );

            set((state) => ({
                messages: [...state.messages, res.data]
            }));

        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send message");
        }
    },


    setSelectedUser: (selectedUser) => set({ selectedUser })
    
}))