import VerifyFailureClient from "@/components/VerifyFailureClient";

type VerifyFailurePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function VerifyFailurePage({ searchParams }: VerifyFailurePageProps) {
  const resolvedSearchParams = await searchParams;

  const id = typeof resolvedSearchParams.id === "string" ? resolvedSearchParams.id : null;

  return <VerifyFailureClient id={id} />;
}