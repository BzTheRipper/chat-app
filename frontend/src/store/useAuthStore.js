import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLogginIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (err) {
            console.log("Error in frontend/src/store/useAuthStore, checkAuth", err);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account has been created successfully");
        } catch (err) {
            console.log("theBackendErrorMessageSignUp: ", err.response.data.message)
            toast.error(err.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout");
            toast.success("Logged Out Successfully!!");
            set({ authUser: null });
        } catch (err) {
            toast.error(err.response.data.message);
        }
    },

    login: async (formData) => {
        
        set({isLogginIn: true})
        try{
            const res = await axiosInstance.post("/auth/login", formData);
            set({ authUser: res.data });
            console.log("The authUser Responded Data in login: ", res.data);

        }catch(err){
             console.log("theBackendErrorMessage: ", err.response.data.message)
            toast.error(err.response.data.message);
        }finally{
            set({isLogginIn: false})
        }
        
    }

}));