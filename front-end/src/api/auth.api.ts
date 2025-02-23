import { TSingin, TSingup } from "@/lib/types";
import apiInstance from "./apiInstance";
import { useMutation } from "@tanstack/react-query";

const signin = async (data: TSingin) => {
  const response = await apiInstance.post("/auth/signin", data);
  return response.data;
};

export const useSignin = () => {
  return useMutation({
    mutationKey: ["signin"],
    mutationFn: signin,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

const signup = async (data: TSingup) => {
  const response = await apiInstance.post("/auth/signup", data);
  return response.data;
};

export const useSignup = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
