import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/api/auth/message/users");
      console.log("get users Data", response.data);
      set({ users: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userID) => {
    set({ isMessagesLoading: true });

    try {
      const response = await axiosInstance.get(`/api/auth/message/${userID}`);
      console.log("get messages Data", response.data);
      set({ messages: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    
    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }
    
    try {
      const res = await axiosInstance.post(
        `/api/auth/message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error("Send message error:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },
  
  subscribeToMessages: () => {
    // TODO: Implement socket.io real-time message subscription
     const { socket } = useAuthStore.getState();
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const { selectedUser } = get();
      // Only add message if it's from or to the currently selected user
      const isMessageRelevant = 
        newMessage.senderID === selectedUser?._id || 
        newMessage.receiverID === selectedUser?._id;
      
      if (!isMessageRelevant) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
   
  },
  
  unsubscribeFromMessages: () => {
    // TODO: Implement socket.io real-time message unsubscription
    console.log("Unsubscribe from messages - to be implemented with socket.io");
     const { socket } = useAuthStore.getState();
    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
