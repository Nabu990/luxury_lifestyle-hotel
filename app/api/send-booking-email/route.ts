import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();

    const { roomName, price, checkIn, checkOut, guests, name, email, phone, total, nights } = bookingData;

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: #d4af37; margin: 0; font-size: 28px;">Lifestyle Luxury Hotel & Residence</h1>
          <p style="color: #ffffff; margin: 5px 0 0 0; opacity: 0.8;">Booking Confirmation</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
          <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
            Dear <strong>${name}</strong>,
          </p>
          
          <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for choosing Lifestyle Luxury Hotel & Residence! Your booking has been received and is being processed.
          </p>
          
          <div style="background: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #d4af37; margin-bottom: 20px;">
            <h2 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 18px;">Booking Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 500;">Room:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${roomName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 500;">Check-in:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${new Date(checkIn).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 500;">Check-out:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${new Date(checkOut).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 500;">Duration:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${nights} night${nights !== 1 ? 's' : ''}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 500;">Guests:</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${guests}</td>
              </tr>
              <tr style="border-top: 2px solid #d4af37;">
                <td style="padding: 12px 0 8px 0; color: #666; font-weight: 500;">Total:</td>
                <td style="padding: 12px 0 8px 0; color: #d4af37; font-weight: 700; font-size: 20px;">$${total}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
            We will send you a final confirmation email with your reservation details and payment instructions shortly.
          </p>
          
          <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
            If you have any questions, please contact us at <strong>+231 XXX XXX XXX</strong> or reply to this email.
          </p>
          
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 20px;">
            <p style="color: #888; font-size: 14px; margin: 0;">
              Best regards,<br>
              <strong style="color: #1a1a2e;">Lifestyle Luxury Hotel & Residence</strong><br>
              Monrovia, Liberia
            </p>
          </div>
        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Lifestyle Luxury Hotel" <noreply@lifestylehotel.com>',
      to: email,
      subject: 'Booking Confirmation - Lifestyle Luxury Hotel & Residence',
      html: emailHtml,
    });

    console.log('Booking confirmation email sent to:', email);

    return NextResponse.json({ success: true, message: 'Booking confirmation email sent' });
  } catch (error) {
    console.error('Error sending booking email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
