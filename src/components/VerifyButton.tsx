"use client";
import { MouseEvent,useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { Bde } from "@/app/bde/page";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const VerifyButton = ({ _id }: { _id: string }) => {
    const [isVeriFying, setisVerifying] = useState<boolean>(false);
    const router = useRouter();
    
    const handleVerify = async (e: MouseEvent<HTMLButtonElement>) => {
        setisVerifying(true);
    try {
      const id = JSON.parse(_id);
      const response = await fetch(`/api/bde/verify/${id}`, {
        method: "PATCH",
      });
        const data: { success: boolean; message: Bde } = await response.json();
      if (!response.ok) {
        throw new Error("Error during verification");
      }
      toast.success(`${data.message.username} verified succesfully`);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    } finally {
        setisVerifying(false);
    }
  };
  return (
    <Button
      variant={"outline"}
      className="w-full m-2 cursor-pointer bg-green-300 text-green-700"
      onClick={handleVerify}
    >
      {isVeriFying && <Loader2 className="animate-spin" size={24} />}
      <span>{isVeriFying ? "verifying..." : "verify"}</span>
    </Button>
  );
};

export default VerifyButton;
