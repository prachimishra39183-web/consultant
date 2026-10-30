import { supabase } from '@/lib/supabase';

export type EnquiryInput = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

export async function submitEnquiry(input: EnquiryInput): Promise<void> {
  const { error } = await supabase.from('enquiries').insert({
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    interest: input.interest,
    message: input.message || null,
  });

  if (error) {
    throw new Error('Enquiry could not be saved.');
  }
}
