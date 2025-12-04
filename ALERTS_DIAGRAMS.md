# Alerts System - User Flow & Architecture Diagrams

## User Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│              Admin Opens Alerts Page                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │  Two Tabs Available:       │
        │  - Send Alert (Active)     │
        │  - Automated Alerts        │
        └────────┬───────────────────┘
                 │
                 ▼
    ┌────────────────────────────────┐
    │  SEND ALERT TAB               │
    └────────┬───────────────────────┘
             │
    ┌────────┴──────────┐
    │                   │
    ▼                   ▼
Step 1:           Step 2:
Select            Choose
Department        Delivery Method
    │                   │
    └────────┬──────────┘
             │
             ▼
    ┌────────────────────────┐
    │ Fetch Students         │
    │ for Department         │
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────┐
    │ Step 3:                │
    │ Select Recipients      │
    │ - All Students OR      │
    │ - Selected (checkbox)  │
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────┐
    │ Step 4:                │
    │ Compose Message        │
    │ - Title (max 100)      │
    │ - Message (max 1000)   │
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────┐
    │ Step 5:                │
    │ Preview Alert          │
    │ - See recipients       │
    │ - See message preview  │
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────┐
    │ Step 6:                │
    │ Click "Send Alert"     │
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────┐
    │ API Call:              │
    │ POST /api/v1/send-alert│
    └────────┬───────────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │ Backend Validation:            │
    │ - Check all required fields    │
    │ - Verify user is admin         │
    │ - Fetch students from DB       │
    └────────┬───────────────────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │ Select Delivery Method:        │
    │ - Email → Send via nodemailer  │
    │ - WhatsApp → Placeholder       │
    └────────┬───────────────────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │ Send Alerts:                   │
    │ - Format HTML email            │
    │ - Send to each recipient       │
    │ - Track success count          │
    └────────┬───────────────────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │ Return Response:               │
    │ {                              │
    │   success: true,               │
    │   recipientCount: 45,          │
    │   message: "Alert sent to..."  │
    │ }                              │
    └────────┬───────────────────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │ Frontend Shows Toast:          │
    │ ✅ "Alert sent to 45 students" │
    │                                │
    │ Form Resets                    │
    └────────────────────────────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │ Students Receive Email         │
    │ Subject: {alertTitle}          │
    │ Message: {alertMessage}        │
    └────────────────────────────────┘
```

## System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     Frontend (React)                            │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │       AlertsPage.jsx                                       │ │
│  │  ┌────────────────────────────────────────────────────┐   │ │
│  │  │ Send Alert Tab                                     │   │ │
│  │  │ - Department Selector                              │   │ │
│  │  │ - Delivery Method Selector                         │   │ │
│  │  │ - Recipients Selector (All/Selected)               │   │ │
│  │  │ - Alert Title & Message Inputs                     │   │ │
│  │  │ - Student Checkboxes (if selected)                 │   │ │
│  │  │ - Preview Box                                      │   │ │
│  │  │ - Send/Clear Buttons                               │   │ │
│  │  └────────────────────────────────────────────────────┘   │ │
│  │                                                            │ │
│  │  ┌────────────────────────────────────────────────────┐   │ │
│  │  │ Automated Alerts Tab (Legacy)                      │   │ │
│  │  │ - Attendance Alert Configuration                   │   │ │
│  │  │ - Performance Alert Configuration                  │   │ │
│  │  │ - Deadline Reminder Configuration                  │   │ │
│  │  └────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────┘ │
└────────────────────┬───────────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
  ┌──────────────┐        ┌──────────────────┐
  │ useDepartment│        │ fetch students   │
  │ Hook         │        │ /api/v1/         │
  └──────────────┘        │ attendance-      │
                          │ records          │
                          └──────────────────┘
         │                       │
         └───────────┬───────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │ POST /api/v1/send-alert    │
        │ {                          │
        │   departmentId,            │
        │   title,                   │
        │   message,                 │
        │   sendTo,                  │
        │   studentIds,              │
        │   deliveryMethod           │
        │ }                          │
        └────────┬───────────────────┘
                 │
┌────────────────┴──────────────────────────────────────────────────┐
│                     Backend (Node.js/Express)                    │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │                   Alert Routes                               │ │
│ │              backend/routes/admin/alerts.js                 │ │
│ │                                                              │ │
│ │  POST /send-alert                                            │ │
│ │    ├─ authenticate(["admin"])                               │ │
│ │    └─ sendAlert (handler)                                   │ │
│ └────────────────┬─────────────────────────────────────────────┘ │
│                  │                                               │
│ ┌────────────────▼──────────────────────────────────────────────┐ │
│ │            Alert Controller                                   │ │
│ │     backend/controllers/admin/alertsController.js            │ │
│ │                                                               │ │
│ │  sendAlert(req, res)                                          │ │
│ │   ├─ Validate input                                           │ │
│ │   ├─ Fetch target students from MongoDB                       │ │
│ │   ├─ Call delivery method                                     │ │
│ │   └─ Return response                                          │ │
│ │                                                               │ │
│ │  sendEmailAlert(recipients, title, message)                   │ │
│ │   ├─ Format HTML email                                        │ │
│ │   ├─ Use nodemailer transporter                              │ │
│ │   └─ Send to each recipient                                   │ │
│ │                                                               │ │
│ │  sendWhatsAppAlert(recipients, title, message)                │ │
│ │   ├─ Extract phone numbers (placeholder)                      │ │
│ │   └─ Ready for Twilio integration                             │ │
│ └────────────────┬───────────────────────────────────────────────┘ │
│                  │                                               │
│    ┌─────────────┴─────────────┐                                │
│    │                           │                                │
│    ▼                           ▼                                │
│ ┌─────────────┐          ┌──────────────┐                      │
│ │ MongoDB     │          │ Email        │                      │
│ │ Students    │          │ Service      │                      │
│ │ Collection  │          │ (nodemailer) │                      │
│ │             │          │              │                      │
│ │ - fullName  │          │ - Gmail      │                      │
│ │ - email     │          │ - SendGrid   │                      │
│ │ - phone     │          │ - SMTP       │                      │
│ │ - dept      │          └──────┬───────┘                      │
│ └─────────────┘                 │                               │
│                                 ▼                               │
│                          ┌──────────────┐                      │
│                          │ Email        │                      │
│                          │ Providers    │                      │
│                          │              │                      │
│                          │ - Gmail      │                      │
│                          │ - SendGrid   │                      │
│                          │ - Outlook    │                      │
│                          │ - Yahoo      │                      │
│                          └──────────────┘                      │
│                                 │                               │
└─────────────────────────────────┼───────────────────────────────┘
                                  │
                                  ▼
                        ┌──────────────────┐
                        │ Student Email    │
                        │ Inbox            │
                        │                  │
                        │ From: admin@...  │
                        │ Subject: Alert   │
                        │ Message: ...     │
                        └──────────────────┘
```

## Data Flow Diagram

```
Request:
┌────────────────────────────────────────┐
│ POST /api/v1/send-alert               │
├────────────────────────────────────────┤
│ {                                      │
│   "departmentId": "63f7d8...",        │
│   "title": "Attendance Alert",         │
│   "message": "Please attend class",    │
│   "sendTo": "all",                     │
│   "studentIds": [],                    │
│   "deliveryMethod": "email"            │
│ }                                      │
└────────────────────────────────────────┘
                  │
                  ▼
    ┌─────────────────────────────┐
    │ Input Validation            │
    │ ✓ departmentId required     │
    │ ✓ title required            │
    │ ✓ message required          │
    │ ✓ deliveryMethod valid      │
    └─────────────────────────────┘
                  │
                  ▼
    ┌─────────────────────────────────┐
    │ Fetch Students                  │
    │ db.students.find({              │
    │   department: departmentId      │
    │ })                              │
    │ Returns: [Student, ...]         │
    └─────────────────────────────────┘
                  │
                  ▼
    ┌─────────────────────────────────┐
    │ Filter by Delivery Method       │
    │                                 │
    │ Email:                          │
    │ - Extract .email field          │
    │ - Create email list             │
    │                                 │
    │ WhatsApp:                       │
    │ - Extract .phone field          │
    │ - Create phone list             │
    └─────────────────────────────────┘
                  │
                  ▼
    ┌─────────────────────────────────┐
    │ Format Message                  │
    │                                 │
    │ Email:                          │
    │ - Create HTML template          │
    │ - Insert title and message      │
    │ - Add styling and branding      │
    │                                 │
    │ WhatsApp:                       │
    │ - Format plain text             │
    │ - Add title as prefix           │
    └─────────────────────────────────┘
                  │
                  ▼
    ┌─────────────────────────────────┐
    │ Send via Service                │
    │                                 │
    │ Email:                          │
    │ transporter.sendMail({          │
    │   to: recipients,               │
    │   subject: title,               │
    │   html: htmlContent             │
    │ })                              │
    │                                 │
    │ WhatsApp:                       │
    │ twilio.messages.create({        │
    │   to: phone,                    │
    │   body: message                 │
    │ })                              │
    └─────────────────────────────────┘
                  │
                  ▼
Response:
┌────────────────────────────────────────┐
│ {                                      │
│   "success": true,                     │
│   "message": "Alert sent to 45...",    │
│   "recipientCount": 45,                │
│   "deliveryMethod": "email"            │
│ }                                      │
└────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── ProtectedRoute
│   └── /admin/dashboard/alerts
│       └── AdminDashboard
│           └── AlertsPage
│               ├── Sidebar
│               ├── Send Alert Tab
│               │   ├── Department Dropdown
│               │   ├── Delivery Method Dropdown
│               │   ├── Send To Dropdown
│               │   ├── Alert Title Input
│               │   ├── Alert Message TextArea
│               │   ├── Student Selection Grid
│               │   ├── Alert Preview Box
│               │   ├── Send Button
│               │   └── Clear Button
│               │
│               └── Automated Alerts Tab
│                   ├── Attendance Alerts Section
│                   ├── Performance Alerts Section
│                   └── Deadline Reminders Section
```

## State Management

```
AlertsPage Component State:
├── Department Selection
│   ├── selectedDepartment: string
│   ├── departmentStudents: Student[]
│   └── departments: Department[] (from hook)
│
├── Alert Composition
│   ├── alertTitle: string
│   ├── alertMessage: string
│   └── characterCount: number
│
├── Recipients
│   ├── sendTo: "all" | "selected"
│   └── selectedStudents: string[] (IDs)
│
├── Delivery
│   ├── deliveryMethod: "email" | "whatsapp"
│   └── loading: boolean
│
└── UI
    └── activeTab: "send" | "configure"
```

## Email Template Structure

```
                HTML Email Structure
┌────────────────────────────────────────┐
│  SMTP Headers                          │
│  From: admin@university.edu            │
│  To: student@email.com                 │
│  Subject: {alertTitle}                 │
│  Content-Type: text/html               │
└────────────────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────┐
│  Header Section (Blue Background)      │
│  ┌────────────────────────────────┐   │
│  │ {alertTitle}                   │   │
│  │ (White text, H1)               │   │
│  └────────────────────────────────┘   │
│  Background: #0E3668 (Dark Blue)       │
│  Padding: 20px                         │
└────────────────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────┐
│  Body Section (Light Gray Background)  │
│  ┌────────────────────────────────┐   │
│  │ {alertMessage}                 │   │
│  │ (Dark text, preserved line     │   │
│  │  breaks)                       │   │
│  └────────────────────────────────┘   │
│  Background: #f5f5f5 (Light Gray)      │
│  Padding: 20px                         │
└────────────────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────┐
│  Footer Section                        │
│  ┌────────────────────────────────┐   │
│  │ This is an automated message   │   │
│  │ from the School Attendance ... │   │
│  └────────────────────────────────┘   │
│  Font Size: 12px                       │
│  Color: #999 (Gray)                    │
└────────────────────────────────────────┘
```

## Error Handling Flow

```
┌─────────────────────────────────┐
│ User Action (Send Alert)        │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Form Validation                 │
├─────────────────────────────────┤
│ ✓ Department selected?          │
│ ✓ Title not empty?              │
│ ✓ Message not empty?            │
│ ✓ If selected: Students chosen? │
└────────┬────────────────────────┘
         │
   ┌─────┴──────┐
   │            │
 NO/Error       ▼
   │      ┌──────────────┐
   │      │ Valid?       │
   │      └──────┬───────┘
   │             │ YES
   │             ▼
   │      ┌─────────────────────┐
   │      │ API Call            │
   │      │ /send-alert         │
   │      └──────┬──────────────┘
   │             │
   │      ┌──────┴────────┐
   │      │               │
   │   Error              ▼
   │      │        ┌────────────┐
   │      │        │ Success?   │
   │      │        └─────┬──────┘
   │      │              │ YES
   │      │              ▼
   │      │        ┌──────────────┐
   └──┐  │        │ Reset Form   │
      │  │        │ Show Success │
      │  │        └──────────────┘
      │  │              │
      └──┼──────────────┤
         │              │
         ▼              ▼
    ┌──────────────────────────────┐
    │ Toast Notification           │
    │ ✅ Success: "Sent to X..."   │
    │ ❌ Error: "Failed..."        │
    └──────────────────────────────┘
```

---

These diagrams provide a visual understanding of:

- User journey through the alert sending process
- System architecture and component relationships
- Data flow through the system
- Email template structure
- Error handling and validation flow
