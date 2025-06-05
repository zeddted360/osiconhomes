import ResetPasswordClient from "@/components/ResetPasswordClient";

type ISearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function  ResetPasswordPage(props: { searchParams: ISearchParams }) {
  const  searchParams  = await props.searchParams;
  const token = searchParams.token || null;
  const id = searchParams.id || null;

  return <ResetPasswordClient token={token} id={id} />;
}