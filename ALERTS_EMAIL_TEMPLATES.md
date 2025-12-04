# Email Alert Template Documentation

## Current Email Format

The email alerts are sent with professional HTML formatting. Below is the structure:

### Email Structure

**Subject:** `{alertTitle}`

**From:** `{EMAIL_USER from .env}`

**Body (HTML):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div
    style="background-color: #0E3668; color: white; padding: 20px; border-radius: 8px 8px 0 0;"
  >
    <h1 style="margin: 0;">{alertTitle}</h1>
  </div>
  <div
    style="background-color: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px;"
  >
    <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">
      {alertMessage}
    </p>
    <p style="color: #999; font-size: 12px; margin-top: 20px;">
      This is an automated message from the School Attendance Biometric System.
    </p>
  </div>
</div>
```

### Components

1. **Header Section** (Blue background)

   - Color: `#0E3668` (School branding color)
   - Contains: Alert title as H1
   - Padding: 20px

2. **Body Section** (Light gray background)

   - Background: `#f5f5f5`
   - Contains: Alert message with preserved line breaks
   - Footer: System attribution
   - Padding: 20px
   - Border radius: 8px on bottom corners

3. **Message Formatting**
   - Font: Arial, sans-serif
   - Line height: 1.6 (readable spacing)
   - Preserves user line breaks with `white-space: pre-wrap`
   - Max width: 600px (mobile-friendly)

## Example Email

### Title: "Important Attendance Notice"

### Message: "Dear Students,\n\nPlease note that attendance is mandatory for all classes...\n\nBest regards,\nDean of Students"

### Rendered as:

```
From: admin@university.edu
Subject: Important Attendance Notice

┌──────────────────────────────────────┐
│ Important Attendance Notice           │
│ (White text on dark blue background) │
└──────────────────────────────────────┘

Dear Students,

Please note that attendance is mandatory for all classes...

Best regards,
Dean of Students

---
This is an automated message from the School Attendance Biometric System.
```

## Customization Guide

### Change Header Color

Edit `alertsController.js` line 15:

```javascript
<div style="background-color: #YOUR_COLOR; color: white; ...">
```

**Color Options:**

- `#0E3668` - Dark blue (current)
- `#1173D4` - Bright blue
- `#2D5F2E` - Green
- `#8B4513` - Brown
- `#DC143C` - Red (for urgent)

### Change Background Color

Edit `alertsController.js` line 19:

```javascript
<div style="background-color: #YOUR_COLOR; padding: 20px; ...">
```

**Options:**

- `#f5f5f5` - Light gray (current)
- `#ffffff` - White
- `#f0f8ff` - Light blue
- `#f5f5dc` - Beige

### Add Logo/Images

Edit `alertsController.js` after line 14:

```javascript
<div style="background-color: #0E3668; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
  <img src="https://your-university.edu/logo.png" alt="Logo" style="height: 40px; margin-bottom: 10px;">
  <h1 style="margin: 0;">${title}</h1>
</div>
```

### Add Footer Links

Edit `alertsController.js` before closing body div:

```javascript
<div style="background-color: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px;">
  <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">
    ${message}
  </p>

  <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
    <a
      href="https://your-university.edu/help"
      style="color: #1173D4; text-decoration: none; margin-right: 15px;"
    >
      Help
    </a>
    <a
      href="https://your-university.edu/contact"
      style="color: #1173D4; text-decoration: none;"
    >
      Contact Us
    </a>
  </div>

  <p style="color: #999; font-size: 12px; margin-top: 20px;">
    This is an automated message from the School Attendance Biometric System.
  </p>
</div>
```

### Add Student Name Personalization

Update `alertsController.js` to pass student names:

```javascript
const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background-color: #0E3668; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
      <h1 style="margin: 0;">${title}</h1>
    </div>
    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px;">
      <p style="color: #555;">Dear ${studentName},</p>
      <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      <p style="color: #999; font-size: 12px; margin-top: 20px;">
        This is an automated message from the School Attendance Biometric System.
      </p>
    </div>
  </div>
`;
```

Then update email sending to include student name:

```javascript
for (const student of emailList) {
  const personalized = htmlContent.replace('${studentName}', student.fullName);
  await transporter.sendMail({
    ...
    html: personalized,
  });
}
```

## Advanced: HTML Email Best Practices

### Mobile Responsiveness

For better mobile rendering, wrap in media query:

```html
<style>
  @media only screen and (max-width: 600px) {
    .email-container {
      width: 100% !important;
      max-width: 100% !important;
    }
  }
</style>
```

### Testing Email Rendering

Services to test HTML emails:

- [Litmus](https://www.litmus.com/)
- [Email on Acid](https://www.emailonacid.com/)
- [Mjml.io](https://mjml.io/)
- Send test email to Gmail, Outlook, Apple Mail

### Common Email Client Issues

| Client     | Issue                   | Fix                    |
| ---------- | ----------------------- | ---------------------- |
| Outlook    | Padding ignored         | Use margin instead     |
| Gmail      | CSS resets              | Use inline styles      |
| Apple Mail | Web fonts not supported | Use system fonts       |
| Dark Mode  | Text invisible          | Use dark colors (#333) |

### Email Client Safe Colors

**Safe text colors:**

- `#333333` - Dark gray (good contrast)
- `#555555` - Medium gray
- `#000000` - Black

**Avoid:**

- Light grays on light backgrounds
- Bright neon colors
- Light colors in dark mode

## Future Template Enhancement Ideas

### Template Variables

```javascript
// Support dynamic variables in message
const message = "Dear {{studentName}}, {{departmentName}} has a notice.";
const rendered = message
  .replace("{{studentName}}", "John Doe")
  .replace("{{departmentName}}", "Computer Science");
```

### Template Presets

```javascript
const templates = {
  attendance: {
    title: "Attendance Alert",
    headerColor: "#DC143C",
    icon: "⚠️",
  },
  announcement: {
    title: "Important Announcement",
    headerColor: "#1173D4",
    icon: "📢",
  },
  reminder: {
    title: "Reminder",
    headerColor: "#FFA500",
    icon: "📝",
  },
};
```

### Styling Variables

```javascript
const emailConfig = {
  headerColor: "#0E3668",
  bodyBackground: "#f5f5f5",
  textColor: "#333333",
  accentColor: "#1173D4",
  fontFamily: "Arial, sans-serif",
  maxWidth: "600px",
};
```

## Current Limitations & Future Improvements

### Current

- ✅ Simple HTML formatting
- ✅ Plain text message content
- ✅ Basic styling

### Planned

- ⏳ Email template system
- ⏳ Dynamic variable insertion
- ⏳ Rich text editor for composing
- ⏳ Multiple template presets
- ⏳ Image/logo support
- ⏳ Unsubscribe links
- ⏳ Read receipt tracking

## Troubleshooting Email Display

### Message not showing

- Check `white-space: pre-wrap` is set
- Verify email client doesn't strip CSS
- Test with plain text email

### Colors not showing

- Use inline `style` attributes
- Avoid `<style>` tags for email clients
- Test in multiple email clients

### Links not clickable

- Use standard `<a href="">` tags
- Ensure `style="color: #0066cc;"` for visibility
- Test in Gmail, Outlook, etc.

## Support

For email rendering issues, see:

- [Email Clients CSS Support](https://www.campaignmonitor.com/css/)
- [Litmus Email Client Reference](https://www.litmus.com/email-client-accessibility-2023/)
- [MDN - HTML Email Best Practices](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)
