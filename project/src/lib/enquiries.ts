export type EnquiryPayload = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

export async function submitEnquiry(
  enquiry: EnquiryPayload,
): Promise<void> {
  const response = await fetch('/api/enquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(enquiry),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    throw new Error(
      result?.error || 'Could not submit your enquiry.',
    );
  }
}