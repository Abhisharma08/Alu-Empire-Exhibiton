'use server';

import { z } from 'zod';
import { google } from 'googleapis';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  designation: z.string().min(2, { message: 'Please enter your designation.' }),
  city: z.string().min(2, { message: 'Please enter your city.' }),
});

export async function submitInterest(data: { name: string, email: string, phone: string, designation: string, city: string }) {
  const validatedFields = formSchema.safeParse(data);

  if (!validatedFields.success) {
    // This should ideally not happen if client-side validation is working
    return { success: false, message: 'Invalid data provided. Please check your input and try again.' };
  }

  const { name, email, phone, designation, city } = validatedFields.data;

  try {
    // This is an example of how you would connect to the Google Sheets API.
    // You would need to set up a service account in your Google Cloud project,
    // enable the Google Sheets API, and share your sheet with the service account's email.
    // Then, you would store the credentials as environment variables.
    
    // Ensure you have a .env.local file with these variables
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.log('Google Sheets environment variables not set. Simulating save.');
      console.log('SIMULATING SAVE TO GOOGLE SHEET:');
      console.log(`Name: ${name}, Email: ${email}, Phone: ${phone}, Designation: ${designation}, City: ${city}`);
      // Simulate network delay for API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: "Thank you for your interest! We'll be in touch soon. (Simulated)" };
    }

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:E', // Adjust sheet name and range as needed
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [[name, email, phone, designation, city]],
        },
    });

    return { success: true, message: "Thank you for your interest! We've received your submission." };

  } catch (error) {
    console.error('Error submitting interest form to Google Sheets:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again later.' };
  }
}
