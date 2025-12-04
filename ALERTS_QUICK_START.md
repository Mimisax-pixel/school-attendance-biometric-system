# Alerts System - Quick Start Guide

## 5-Minute Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Email

Create or update `.env` in the backend directory:

```env
# Gmail (Easiest for Testing)
EMAIL_SERVICE=gmail
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

**Getting Gmail App Password:**

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select Mail → Windows Computer
3. Copy the 16-character password
4. Paste in `EMAIL_PASSWORD` above

### 3. Start Backend

```bash
npm run dev
```

Expected output:

```
Connected to MongoDB
Server is running on port 5000
```

### 4. Start Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

### 5. Access Alerts Page

1. Go to http://localhost:5173
2. Log in as Admin
3. Click "Alerts" in sidebar → "Send Alert" tab

## Testing the Feature

### Test 1: Send to All Students

1. **Select Department** - Choose any department with students
2. **Delivery Method** - Select "📧 Email"
3. **Send To** - Keep "All Students in Department"
4. **Title** - Enter: `Test Alert`
5. **Message** - Enter: `This is a test message from the Alerts system.`
6. **Click** - "Send Alert"

**Expected Result:**

- ✅ Success toast: "Alert sent successfully to X student(s) via email"
- ✅ Students receive email with formatted title and message

### Test 2: Send to Selected Students

1. **Select Department** - Choose department
2. **Send To** - Select "Selected Students"
3. **Student Selection** - Check 2-3 student checkboxes
4. **Fill** - Title and message
5. **Click** - "Send Alert"

**Expected Result:**

- ✅ Only selected students receive email
- ✅ Toast shows correct recipient count

### Test 3: Verify Email Format

When you receive an email, it should have:

- ✅ Subject line matching your title
- ✅ Professional HTML formatting
- ✅ Your message content
- ✅ System branding

## Common Issues & Fixes

### ❌ "Failed to send alert"

**Solution:** Check `.env` email credentials

```bash
# Verify EMAIL_USER and EMAIL_PASSWORD are correct
# For Gmail: Use app password, not regular password
```

### ❌ "No students found in this department"

**Solution:**

1. Ensure department has registered students
2. Check Students page to verify they exist
3. Try a different department

### ❌ Email not received

**Solution:**

1. Check spam/junk folder
2. Wait 30 seconds (email can be slow)
3. Check backend logs for error messages
4. Verify email address in student record is correct

### ❌ "Missing required fields"

**Solution:**

1. Ensure all fields are filled:
   - Department ✓
   - Delivery Method ✓
   - Title ✓
   - Message ✓
2. For "Selected Students": Check at least 1 student

## Using Different Email Services

### SendGrid (Production)

```env
EMAIL_SERVICE=sendgrid
EMAIL_USER=apikey
EMAIL_PASSWORD=SG.your-sendgrid-key
```

### Outlook/Office 365

```env
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

### Yahoo Mail

```env
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-app-password
```

## Advanced: Custom SMTP

```env
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=username
EMAIL_PASSWORD=password
```

Then update `alertsController.js` line 6-11 to use custom SMTP.

## Features Overview

| Feature              | Status         | Notes                         |
| -------------------- | -------------- | ----------------------------- |
| Send to All Students | ✅ Ready       | Works with all email services |
| Send to Selected     | ✅ Ready       | Choose specific students      |
| Email Delivery       | ✅ Ready       | Fully functional              |
| WhatsApp Delivery    | ⏳ Placeholder | Ready for Twilio integration  |
| Message History      | ⏳ Coming      | Plan to track sent messages   |
| Scheduled Alerts     | ⏳ Coming      | Send alerts at specific times |
| Email Templates      | ⏳ Coming      | Reusable message templates    |

## API Reference

### Send Alert

```
POST /api/v1/send-alert
Content-Type: application/json
Authorization: Bearer {admin-token}

{
  "departmentId": "dept-id",
  "title": "Alert Title",
  "message": "Alert message content",
  "sendTo": "all",
  "studentIds": [],
  "deliveryMethod": "email"
}
```

**Response Success:**

```json
{
  "success": true,
  "message": "Alert sent successfully to 45 student(s)",
  "recipientCount": 45,
  "deliveryMethod": "email"
}
```

## Debugging

### Enable Verbose Logging

In `alertsController.js`, add console logs:

```javascript
console.log("Recipients:", recipients.length);
console.log("Email list:", emailList);
```

### Check Network Requests

In browser DevTools:

1. Open Network tab
2. Send an alert
3. Look for `send-alert` POST request
4. Check response for errors

### Monitor Server Logs

Watch backend terminal for:

```
Email alert sent to X recipients
or
Email sending error: ...
```

## Next Steps

After verifying alerts work:

1. **Optional: Setup WhatsApp**

   - Create Twilio account
   - Update `alertsController.js` with Twilio client
   - Configure `TWILIO_*` environment variables

2. **Optional: Add Message History**

   - Create Alert model in MongoDB
   - Log alerts when sent
   - Display history in UI

3. **Deploy to Production**
   - Use SendGrid or similar service
   - Remove Gmail credentials before deploying
   - Set up environment variables on hosting platform

## Support

- 📖 Full docs: See `ALERTS_SETUP.md`
- 🐛 Issues: Check troubleshooting section above
- 📝 Summary: See `ALERTS_REFACTOR_SUMMARY.md`

---

**Questions?** Review the configuration in `.env` or check backend logs for specific error messages.
