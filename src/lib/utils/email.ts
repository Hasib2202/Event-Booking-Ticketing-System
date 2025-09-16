// src/lib/utils/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface BookingEmailData {
  userEmail: string;
  userName: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  numberOfTickets: number;
  totalAmount: number;
  bookingId: string;
}

interface CancellationEmailData {
  userEmail: string;
  userName: string;
  eventTitle: string;
  eventDate: string;
  numberOfTickets: number;
  bookingId: string;
}

export async function sendBookingConfirmationEmail(data: BookingEmailData) {
  const { userEmail, userName, eventTitle, eventDate, eventVenue, numberOfTickets, totalAmount, bookingId } = data;

  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: `Booking Confirmed: ${eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Booking Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
          .footer { text-align: center; padding: 20px; color: #666; }
          .button { background: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎟️ EventBook</h1>
            <h2>Booking Confirmed!</h2>
          </div>

          <div class="content">
            <p>Dear ${userName},</p>
            <p>Great news! Your booking has been confirmed. Here are your event details:</p>

            <div class="booking-details">
              <h3>📋 Booking Details</h3>
              <div class="detail-row">
                <strong>Booking ID:</strong>
                <span>${bookingId}</span>
              </div>
              <div class="detail-row">
                <strong>Event:</strong>
                <span>${eventTitle}</span>
              </div>
              <div class="detail-row">
                <strong>Date & Time:</strong>
                <span>${formattedDate}</span>
              </div>
              <div class="detail-row">
                <strong>Venue:</strong>
                <span>${eventVenue}</span>
              </div>
              <div class="detail-row">
                <strong>Number of Tickets:</strong>
                <span>${numberOfTickets}</span>
              </div>
              <div class="detail-row">
                <strong>Total Amount:</strong>
                <span>$${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <p>🎉 We're excited to see you at the event!</p>
            <p>Please save this email as your booking confirmation. You can also view your booking details in your dashboard.</p>

            <a href="${process.env.NEXTAUTH_URL}/dashboard" class="button">View My Bookings</a>
          </div>

          <div class="footer">
            <p>Thank you for choosing EventBook!</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent successfully to:', userEmail);
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    throw error;
  }
}

export async function sendBookingCancellationEmail(data: CancellationEmailData) {
  const { userEmail, userName, eventTitle, eventDate, numberOfTickets, bookingId } = data;

  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: `Booking Cancelled: ${eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Booking Cancellation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
          .footer { text-align: center; padding: 20px; color: #666; }
          .button { background: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎟️ EventBook</h1>
            <h2>Booking Cancelled</h2>
          </div>

          <div class="content">
            <p>Dear ${userName},</p>
            <p>Your booking has been successfully cancelled. Here are the details:</p>

            <div class="booking-details">
              <h3>📋 Cancelled Booking Details</h3>
              <div class="detail-row">
                <strong>Booking ID:</strong>
                <span>${bookingId}</span>
              </div>
              <div class="detail-row">
                <strong>Event:</strong>
                <span>${eventTitle}</span>
              </div>
              <div class="detail-row">
                <strong>Date & Time:</strong>
                <span>${formattedDate}</span>
              </div>
              <div class="detail-row">
                <strong>Number of Tickets:</strong>
                <span>${numberOfTickets}</span>
              </div>
            </div>

            <p>😔 We're sorry to see you go, but we understand plans can change.</p>
            <p>If you cancelled by mistake or need to rebook, feel free to browse our events again.</p>

            <a href="${process.env.NEXTAUTH_URL}/events" class="button">Browse Events</a>
          </div>

          <div class="footer">
            <p>Thank you for using EventBook!</p>
            <p>We hope to see you at future events.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking cancellation email sent successfully to:', userEmail);
  } catch (error) {
    console.error('Error sending booking cancellation email:', error);
    throw error;
  }
}

export async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log('Email service is ready');
    return true;
  } catch (error) {
    console.error('Email service connection failed:', error);
    return false;
  }
}