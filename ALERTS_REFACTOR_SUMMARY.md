# Alerts & Notifications System - Refactor Summary

## Overview

The Alerts & Notifications page has been completely refactored to provide administrators with the ability to send custom alert messages to students in a department via email or WhatsApp. The system maintains backward compatibility with legacy automated alert configuration.

## Changes Made

### Frontend Changes

#### 1. **AlertsPage.jsx** (`frontend/src/Pages/Admin/AlertsPage.jsx`)

**Purpose:** Refactored to provide a two-tab interface for sending alerts and configuring automation.

**Key Features:**

- **Send Alert Tab:**

  - Department selection dropdown (using `useDepartment` hook)
  - Delivery method selector (Email / WhatsApp)
  - Send to option (All Students / Selected Students)
  - Custom alert title and message inputs
  - Real-time character counter for message (max 1000)
  - Student selection grid with checkboxes
  - Alert preview showing recipient count and method
  - Loading state during alert sending

- **Automated Alerts Tab:**
  - Legacy configuration for attendance, performance, and deadline alerts
  - Maintained for backward compatibility

**State Management:**

- `selectedDepartment`: Currently selected department ID
- `alertTitle`: Alert subject line
- `alertMessage`: Alert body text
- `sendTo`: "all" or "selected" option
- `selectedStudents`: Array of student IDs to send to
- `deliveryMethod`: "email" or "whatsapp"
- `departmentStudents`: List of students in selected department
- `activeTab`: "send" or "configure"
- `loading`: Loading state during API call

**API Integration:**

- Fetches departments using `useDepartment` hook
- Fetches students via `/api/v1/attendance-records?department={deptId}&limit=1000`
- Sends alerts via `POST /api/v1/send-alert`

**UI/UX Enhancements:**

- Tab navigation with icons (Send / Automated Alerts)
- Responsive grid layout for student selection
- Blue preview box showing alert summary
- Clear and Send buttons for form control
- Mobile-friendly design with scrollable student list

### Backend Changes

#### 1. **alertsController.js** (NEW - `backend/controllers/admin/alertsController.js`)

**Purpose:** Handle alert sending logic for email and WhatsApp.

**Key Functions:**

**`sendEmailAlert(recipients, title, message)`**

- Sends HTML-formatted emails to recipient list
- Uses nodemailer for email transmission
- Configured for Gmail, SendGrid, or custom SMTP
- Returns number of successfully sent emails
- Includes system branding and professional formatting

**`sendWhatsAppAlert(recipients, title, message)`**

- Placeholder for WhatsApp integration
- Extracts phone numbers from student records
- Ready for Twilio or WhatsApp Business API integration
- Currently logs prepared messages without sending

**`sendAlert(req, res)` - Express Route Handler**

- Validates required fields (departmentId, title, message, deliveryMethod)
- Fetches target students based on `sendTo` option:
  - "all": All students in department
  - "selected": Only specified students
- Calls appropriate delivery method (email or WhatsApp)
- Returns success/error response with recipient count
- Comprehensive error handling

#### 2. **alerts.js** (NEW - `backend/routes/admin/alerts.js`)

**Purpose:** Define routes for alert endpoints.

**Routes:**

- `POST /send-alert` - Send custom alert to students
  - Authentication: Required (admin role)
  - Middleware: `authenticate(["admin"])`
  - Handler: `sendAlert`

#### 3. **index.js** (`backend/index.js`)

**Changes:**

- Added import: `import AlertsRoutes from "./routes/admin/alerts.js";`
- Registered route: `app.use(apiVersion, AlertsRoutes);`

#### 4. **package.json** (`backend/package.json`)

**Changes:**

- Added dependency: `"nodemailer": "^6.9.7"`

### Documentation

#### 1. **ALERTS_SETUP.md** (NEW - `ALERTS_SETUP.md`)

Comprehensive setup and integration guide covering:

- Feature overview
- Environment variable configuration
- Gmail App Password setup instructions
- API endpoint documentation with request/response examples
- Database schema expectations
- Email configuration examples (Gmail, SendGrid, custom SMTP)
- WhatsApp integration guide (Twilio example)
- Testing instructions (cURL and frontend)
- Security considerations
- Troubleshooting guide
- Future enhancement suggestions

## Configuration Requirements

### Environment Variables (Backend)

```env
# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Alternative: SendGrid
# EMAIL_SERVICE=sendgrid
# EMAIL_USER=apikey
# EMAIL_PASSWORD=SG.your-api-key

# WhatsApp (Future Implementation)
# TWILIO_ACCOUNT_SID=your-account-sid
# TWILIO_AUTH_TOKEN=your-auth-token
# TWILIO_WHATSAPP_NUMBER=+1234567890
```

### Installation Steps

1. **Backend:**

   ```bash
   cd backend
   npm install
   ```

2. **Configure Email:**

   - Update `.env` with email credentials
   - For Gmail: Use app password (not regular password)

3. **Start Backend:**
   ```bash
   npm run dev
   ```

## API Endpoint Details

### Send Alert - POST `/api/v1/send-alert`

**Request:**

```json
{
  "departmentId": "63f7d8c9e4c0a1b2c3d4e5f6",
  "title": "Important Notice",
  "message": "All students must...",
  "sendTo": "all",
  "studentIds": [],
  "deliveryMethod": "email"
}
```

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

## Student Data Model Requirements

The system expects the following student fields:

```javascript
{
  _id: ObjectId,
  fullName: String,          // or fullname
  email: String,
  phoneNumber: String,       // For WhatsApp
  phone: String,             // Alternative
  department: ObjectId,      // Reference to Department
  matricNumber: String,
  // ... other fields
}
```

## Features

### Current Implementation ✅

- **Send Custom Alerts**: Compose and send messages to department students
- **Flexible Recipients**: Send to all students or select specific recipients
- **Multiple Delivery Methods**: Email support (WhatsApp placeholder)
- **Real-time Feedback**: Toast notifications for success/error
- **Student Selection UI**: Scrollable grid with checkboxes
- **Alert Preview**: Summary of alert details before sending
- **Role-Based Access**: Admin-only functionality
- **Character Limits**: Title (100 chars), Message (1000 chars)

### Future Enhancements 🚀

- WhatsApp integration via Twilio
- SMS delivery method
- Message history and tracking
- Scheduled alerts
- Email templates
- Delivery status tracking
- Bulk student import
- Automated alert triggers (legacy feature)

## Testing

### Frontend Testing

1. Navigate to Admin Dashboard > Alerts
2. Click "Send Alert" tab
3. Select a department
4. Choose email delivery
5. Enter test title and message
6. Select "All Students" or choose specific students
7. Click "Send Alert"
8. Verify success toast notification

### Backend Testing

```bash
curl -X POST http://localhost:5000/api/v1/send-alert \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "departmentId": "department-id",
    "title": "Test",
    "message": "Test message",
    "sendTo": "all",
    "studentIds": [],
    "deliveryMethod": "email"
  }'
```

## Security

- ✅ Role-based access control (admin only)
- ✅ Input validation (required fields, character limits)
- ✅ Student authorization (can only send to department students)
- ✅ Environment variable protection for email credentials
- ⚠️ Consider: Rate limiting for large-scale sends
- ⚠️ Consider: Email address validation before sending

## Troubleshooting

### Email Not Sending

1. Verify `.env` has correct credentials
2. For Gmail: Ensure app password (not regular password)
3. Check server logs for specific errors
4. Verify `nodemailer` is installed: `npm install nodemailer`

### No Students Found

1. Verify department exists and has students
2. Check student documents have email fields
3. Verify department ID is correct

### Frontend API Errors

1. Verify backend is running
2. Check CORS settings
3. Verify authentication token is valid
4. Check browser console for detailed errors

## Files Modified/Created

### New Files

- `backend/controllers/admin/alertsController.js`
- `backend/routes/admin/alerts.js`
- `ALERTS_SETUP.md`

### Modified Files

- `frontend/src/Pages/Admin/AlertsPage.jsx`
- `backend/index.js`
- `backend/package.json`

## Testing Instructions

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Configure email (.env):**

   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=app-password
   ```

3. **Start backend:**

   ```bash
   npm run dev
   ```

4. **Start frontend (separate terminal):**

   ```bash
   cd frontend
   npm run dev
   ```

5. **Test alerts:**
   - Go to Admin Dashboard > Alerts
   - Click "Send Alert" tab
   - Select a department
   - Send test message

## Next Steps

1. ✅ Email integration testing
2. ⏳ Implement WhatsApp via Twilio
3. ⏳ Add message history logging
4. ⏳ Implement scheduled alerts
5. ⏳ Add email template system
6. ⏳ Implement automated alert rules

## Support

For issues or questions, refer to `ALERTS_SETUP.md` or contact the development team.
