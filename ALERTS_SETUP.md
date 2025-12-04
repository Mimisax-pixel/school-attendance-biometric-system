# Alerts & Notifications System - Setup Guide

## Overview

The refactored Alerts page now allows administrators to send custom alert messages to students in a department via email or WhatsApp. It maintains backward compatibility with automated alert configuration for future implementation.

## Features

### 1. **Send Alert Tab**

- Select a department
- Choose delivery method (Email or WhatsApp)
- Send to all students or selected students
- Compose custom alert title and message
- Preview alert details before sending

### 2. **Automated Alerts Tab** (Legacy)

- Configure automated alerts for attendance, performance, and deadlines
- Set thresholds and recipient options
- Future implementation placeholder

## Backend Setup

### Environment Variables

Add the following to your `.env` file in the backend directory:

```env
# Email Configuration (Gmail example)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Or use other email services (SendGrid, Mailgun, etc.)
# EMAIL_SERVICE=sendgrid
# EMAIL_USER=apikey
# EMAIL_PASSWORD=your-sendgrid-api-key

# WhatsApp Integration (Future)
# TWILIO_ACCOUNT_SID=your-account-sid
# TWILIO_AUTH_TOKEN=your-auth-token
# TWILIO_WHATSAPP_NUMBER=+1234567890
```

### Gmail App Password Setup

If using Gmail:

1. Enable 2-factor authentication on your Google Account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer" (or your device)
4. Copy the generated 16-character password
5. Use this password in `EMAIL_PASSWORD` env variable

### Install Dependencies

```bash
cd backend
npm install
```

The `nodemailer` package has been added to `package.json`.

## API Endpoint

### Send Alert

**Endpoint:** `POST /api/v1/send-alert`

**Authentication:** Required (Admin role only)

**Request Body:**

```json
{
  "departmentId": "63f7d8c9e4c0a1b2c3d4e5f6",
  "title": "Important Notice",
  "message": "All students must complete their attendance verification by Friday.",
  "sendTo": "all",
  "studentIds": [],
  "deliveryMethod": "email"
}
```

**Parameters:**

- `departmentId` (string, required): MongoDB ID of the department
- `title` (string, required): Alert title (max 100 characters)
- `message` (string, required): Alert message (max 1000 characters)
- `sendTo` (string, required): Either "all" or "selected"
- `studentIds` (array, required if sendTo="selected"): Array of student MongoDB IDs
- `deliveryMethod` (string, required): Either "email" or "whatsapp"

**Success Response:**

```json
{
  "success": true,
  "message": "Alert sent successfully to 45 student(s)",
  "recipientCount": 45,
  "deliveryMethod": "email"
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error description"
}
```

## Database Schema

The system expects the following student fields:

```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String,
  phoneNumber: String,      // For WhatsApp
  phone: String,            // Alternative phone field
  department: ObjectId,     // Reference to Department
  matricNumber: String,
  // ... other fields
}
```

## Email Configuration Examples

### Gmail (Recommended for Development)

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

### SendGrid

```env
EMAIL_SERVICE=sendgrid
EMAIL_USER=apikey
EMAIL_PASSWORD=SG.your-sendgrid-api-key
```

### Custom SMTP Server

```env
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
```

To use custom SMTP, update `alertsController.js`:

```javascript
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

## Frontend Features

### Department Selection

- Dropdown lists all departments
- Fetches students for selected department via `/api/v1/admin/students?department={deptId}`

### Student Selection

- When "Selected Students" option is chosen
- Displays list of students with checkboxes
- Shows student name and matric number
- Scrollable list with max height for many students

### Alert Preview

- Shows number of recipients
- Displays delivery method
- Previews alert title and message
- Real-time character count

### Responsive Design

- Mobile-friendly layout
- Tabs collapse on small screens
- Scrollable student list on mobile

## WhatsApp Integration (Future)

Currently, WhatsApp sending is a placeholder. To implement:

1. **Using Twilio:**

   ```javascript
   import twilio from "twilio";

   const sendWhatsAppAlert = async (recipients, title, message) => {
     const client = twilio(
       process.env.TWILIO_ACCOUNT_SID,
       process.env.TWILIO_AUTH_TOKEN
     );

     for (const recipient of recipients) {
       await client.messages.create({
         from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
         to: `whatsapp:${recipient.phoneNumber}`,
         body: `${title}\n\n${message}`,
       });
     }
   };
   ```

2. **Environment Variables:**

   ```env
   TWILIO_ACCOUNT_SID=your-account-sid
   TWILIO_AUTH_TOKEN=your-auth-token
   TWILIO_WHATSAPP_NUMBER=+1234567890
   ```

3. **Install Twilio:**
   ```bash
   npm install twilio
   ```

## Testing

### Using cURL

```bash
curl -X POST http://localhost:5000/api/v1/send-alert \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-auth-token" \
  -d '{
    "departmentId": "63f7d8c9e4c0a1b2c3d4e5f6",
    "title": "Test Alert",
    "message": "This is a test message",
    "sendTo": "all",
    "studentIds": [],
    "deliveryMethod": "email"
  }'
```

### Using Frontend

1. Navigate to Admin Dashboard > Alerts
2. Click "Send Alert" tab
3. Select a department
4. Choose email or WhatsApp
5. Enter alert title and message
6. Choose "All Students" or select specific students
7. Click "Send Alert"

## Security Considerations

1. **Authentication:** All endpoints require admin authentication
2. **Authorization:** Admin role is enforced via middleware
3. **Input Validation:**
   - Title max 100 characters
   - Message max 1000 characters
   - Department and student validation
4. **Rate Limiting:** Consider implementing rate limiting for large-scale sends
5. **Email Validation:** Ensure student email addresses are valid before sending

## Troubleshooting

### Gmail Authentication Failed

- Ensure 2FA is enabled
- Verify app password (not regular Gmail password)
- Check that app password is 16 characters
- Ensure `EMAIL_USER` matches Gmail account

### No Students Found

- Verify department ID is correct
- Check that students are registered with the department
- Ensure student documents have email/phone fields

### Email Not Sending

- Check email credentials in `.env`
- Verify CORS settings allow the request
- Check server logs for error messages
- Ensure nodemailer is installed: `npm install nodemailer`

### WhatsApp Not Working

- WhatsApp integration is currently a placeholder
- Implement Twilio or another WhatsApp API provider
- Ensure student documents have valid phone numbers

## Future Enhancements

1. **Email Templates:** Create reusable email templates
2. **WhatsApp Integration:** Implement Twilio or WhatsApp Business API
3. **SMS Alerts:** Add SMS as delivery method
4. **Message History:** Store sent messages in database
5. **Scheduled Alerts:** Allow scheduling alerts for future sending
6. **Bulk Import:** Import contact lists for sending
7. **Delivery Tracking:** Track delivery status and read receipts
8. **Automated Rules:** Implement the legacy automated alert triggers

## Support

For issues or questions, contact the development team or create an issue in the repository.
