import { TSingin, TSingup } from "@/lib/types";
import apiInstance from "./apiInstance";
import { useMutation } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "sonner";

const signin = async (data: TSingin) => {
  const response = await apiInstance.post("/auth/signin", data);
  return response.data;
};

export const useSignin = (setError: UseFormSetError<TSingin>) => {
  return useMutation({
    mutationKey: ["signin"],
    mutationFn: signin,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: ({ response }: AxiosError) => {
      if (!response) {
        toast("No response from the server.", {
          description: "Server did not responed to your request.",
          action: {
            label: "Refresh",
            onClick: () => window.location.reload(),
          },
        });
        return;
      }

      if (response.status === 401) {
        const { error, message } = response.data as {
          message: string;
          error: "number" | "password";
        };
        setError(error, { message });
      } else {
        const { error, message } = response.data as {
          message: string;
          error: string;
        };
        toast(error, {
          description: message,
        });
      }
    },
  });
};

const signup = async (data: TSingup) => {
  const response = await apiInstance.post("/auth/signup", data);
  return response.data;
};

export const useSignup = (setError: UseFormSetError<TSingup>) => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: ({ response }: AxiosError) => {
      if (!response) {
        toast("No response from the server.", {
          description: "Server did not responed to your request.",
          action: {
            label: "Refresh",
            onClick: () => window.location.reload(),
          },
        });
        return;
      }

      if (response.status === 409) {
        setError("number", {
          message: "Number already in use.",
        });
      } else {
        const { error, message } = response.data as {
          message: string;
          error: string;
        };
        toast(error, {
          description: message,
        });
      }
    },
  });
};
