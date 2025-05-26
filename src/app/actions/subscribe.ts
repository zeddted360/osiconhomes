"use server"
interface IPrevState {
    success: boolean;
    message: string;
}
export const subscribe = async (_prevState: IPrevState, formData: FormData) => {
    const { email } = Object.fromEntries(formData);
    console.log("The incoming email is ", email);

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, message: `Mail from ${email} recieved with success` };
    } catch (error) {
        return { success: false, message: "Error during subscription" };
    }
};
