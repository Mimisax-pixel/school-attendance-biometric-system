# Alerts System - Step-by-Step Installation Guide

## Prerequisites

Before starting, ensure you have:

- ✅ Node.js installed (v16 or higher)
- ✅ Backend and frontend running locally
- ✅ MongoDB connection working
- ✅ Admin account created
- ✅ Students registered in at least one department
- ✅ Gmail account with 2FA enabled (if using Gmail)

## Installation Steps

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

**Expected Output:**

```
added 1 package, and audited ... packages in ...
```

**What this does:**

- Installs `nodemailer` package for email sending
- Updates `package-lock.json`

**Verify:**

```bash
npm list nodemailer
```

Should show: `nodemailer@6.9.7` (or higher)

---

### Step 2: Create Environment Configuration

**Location:** `backend/.env`

**Option A: Gmail (Recommended for Testing)**

1. **Enable 2FA on Gmail Account**

   - Go to [myaccount.google.com/security](https://myaccount.google.com/security)
   - Find "2-Step Verification"
   - Click "Enable"
   - Follow verification steps

2. **Generate App Password**

   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select Mail → Windows Computer (or your device)
   - Copy the 16-character password

3. **Create `.env` file**

   ```bash
   # In backend directory
   cat > .env << EOF
   DB_CONNECTION_STRING=your-mongodb-connection
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:5173

   # Email Configuration
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   EOF
   ```

   **Replace:**

   - `your-email@gmail.com` with your Gmail address
   - `your-16-char-app-password` with the app password from step 2

**Option B: SendGrid (For Production)**

```env
EMAIL_SERVICE=sendgrid
EMAIL_USER=apikey
EMAIL_PASSWORD=SG.your-sendgrid-api-key-here
```

**Option C: Custom SMTP**

```env
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
```

### Step 3: Verify Environment Variables

```bash
# In backend directory
cat .env
```

**Verify these exist:**

- ✅ EMAIL_SERVICE
- ✅ EMAIL_USER
- ✅ EMAIL_PASSWORD
- ✅ DATABASE_URL (existing)
- ✅ PORT (existing)

**⚠️ Important:**

- Never commit `.env` to Git
- Never share credentials
- Rotate credentials periodically

---

### Step 4: Verify Database Setup

Ensure database has required collections:

```javascript
// In MongoDB shell or client
use school_attendance_db

// Check collections exist
db.getCollectionNames()
// Should include: "students", "departments", "lecturers", "classes"

// Check students have required fields
db.students.findOne()
// Should have: fullName, email, phoneNumber, department, matricNumber

// Check at least one department exists
db.departments.findOne()
// Should have: title, school
```

---

### Step 5: Start Backend Server

```bash
cd backend
npm run dev
```

**Expected Output:**

```
[nodemon] 3.0.1
[nodemon] to restart at any time, type `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,json
Connected to MongoDB
Server is running on port 5000
```

**Troubleshooting:**

- If "Address already in use": Change PORT in .env or kill process on 5000
- If "Cannot connect to MongoDB": Verify DB_CONNECTION_STRING
- If "Email not configured": Check EMAIL_SERVICE and credentials

**Keep this terminal running!**

---

### Step 6: Verify Backend Routes

In a new terminal:

```bash
# Test if backend is responding
curl http://localhost:5000/

# Should return:
# "Welcome to the School Attendance Biometric System API"
```

---

### Step 7: Start Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

**Expected Output:**

```
VITE v4.x.x  ready in xx ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

### Step 8: Test Alerts Page Access

1. **Open Browser**

   - Go to `http://localhost:5173`

2. **Log In**

   - Use admin credentials
   - Should see dashboard

3. **Navigate to Alerts**

   - Click "Alerts" in sidebar
   - Should see "Send Alert" tab

4. **Verify Page Loads**
   - Department dropdown visible ✅
   - Delivery method selector visible ✅
   - Message input fields visible ✅
   - Send button visible ✅

---

### Step 9: Verify Students Data

Before sending alerts, verify students exist:

1. **Go to Admin Dashboard**
2. **Click Students**
3. **Verify List Shows:**
   - Student names ✅
   - Matric numbers ✅
   - Departments ✅
   - Email addresses ✅

**If no students:**

- Go to "Register Student"
- Add at least 3 test students
- Make sure they have email addresses

---

### Step 10: Test Email Sending

### Test 1: Send to All Students

1. **Go to Alerts Page**

   - Admin Dashboard > Alerts > Send Alert tab

2. **Fill Form:**

   ```
   Department: Select any department
   Delivery Method: 📧 Email
   Send To: All Students in Department
   Title: Test Alert
   Message: This is a test message
   ```

3. **Click "Send Alert"**

4. **Expected Result:**
   - ✅ Success toast: "Alert sent successfully to X student(s)"
   - ✅ Form resets
   - ✅ Check email inbox (may take 30 seconds)

### Test 2: Send to Selected Students

1. **Fill Form:**

   ```
   Department: Select department
   Delivery Method: 📧 Email
   Send To: Selected Students
   ```

2. **Select Students:**

   - Check 2-3 student checkboxes

3. **Fill Message:**

   ```
   Title: Selected Students Test
   Message: This is for specific students
   ```

4. **Click "Send Alert"**

5. **Expected Result:**
   - ✅ Only selected students receive email
   - ✅ Toast shows correct count

### Test 3: Verify Email Format

Check email inbox for:

- ✅ Subject matches alert title
- ✅ Message content matches
- ✅ Professional HTML formatting
- ✅ Blue header with title
- ✅ Gray body with message
- ✅ Footer text

---

### Step 11: Monitor Backend Logs

Watch the backend terminal for logs:

```
Email alert sent to 3 recipients
```

**Or if error:**

```
Email sending error: [error message]
```

---

### Step 12: Test Error Handling

### Test Empty Title

1. Leave title blank
2. Click "Send Alert"
3. **Expected:** Error toast "Please enter an alert title"

### Test Empty Message

1. Fill title only
2. Leave message blank
3. Click "Send Alert"
4. **Expected:** Error toast "Please enter an alert message"

### Test No Department

1. Leave department blank
2. Try to send
3. **Expected:** Error toast "Please select a department"

### Test Invalid Credentials

1. Change EMAIL_PASSWORD in .env to wrong value
2. Restart backend
3. Try to send alert
4. **Expected:** Error toast about email service

---

### Step 13: Advanced Testing (Optional)

### Test with Different Email Service

**Change to SendGrid:**

1. **Update `.env`:**

   ```env
   EMAIL_SERVICE=sendgrid
   EMAIL_USER=apikey
   EMAIL_PASSWORD=SG.your-key
   ```

2. **Restart Backend**

   ```bash
   # Ctrl+C to stop
   npm run dev
   ```

3. **Send Test Alert**
   - Follow test steps above
   - Should work with SendGrid

### Test Multiple Recipients

1. Register 10+ students in same department
2. Send alert to all
3. Verify all receive email

### Test Large Message

1. Enter 500+ character message
2. Send alert
3. Verify message displayed correctly in email

---

### Step 14: Troubleshooting Checklist

**Problem: "Alert sent" but no email received**

```bash
# Check 1: Verify email credentials
cat backend/.env | grep EMAIL

# Check 2: Check backend logs for errors
# Look at terminal where `npm run dev` runs

# Check 3: Check spam/junk folder

# Check 4: Wait 60 seconds (email can be slow)

# Check 5: Verify student has email
# Go to Students page and check email field
```

**Problem: "Failed to send alert" error**

```bash
# Check 1: Verify email service is correct
# Check EMAIL_SERVICE in .env

# Check 2: Verify credentials are correct
# For Gmail: Use APP PASSWORD, not regular password
# For SendGrid: Use API key starting with "SG."

# Check 3: Restart backend
# Ctrl+C, then npm run dev

# Check 4: Check backend logs for specific error
```

**Problem: No students showing in dropdown**

```bash
# Check 1: Verify students exist
# Go to Students page - should see list

# Check 2: Verify students have emails
# Click on student, check email field

# Check 3: Verify department is correct
# Students must be registered with a department
```

---

### Step 15: Security Verification

Ensure security best practices:

```bash
# Check 1: Verify .env not in Git
cd backend
cat .gitignore
# Should contain: .env

# Check 2: Verify credentials not in code
grep -r "EMAIL_PASSWORD" src/
# Should find NO results

# Check 3: Verify no hardcoded emails
grep -r "gmail\|sendgrid" src/
# Should only find in alertsController.js using env vars
```

---

### Step 16: Documentation

Now that installation is complete:

1. **Read Documentation:**

   - `ALERTS_QUICK_START.md` for reference
   - `ALERTS_SETUP.md` for troubleshooting
   - `ALERTS_EMAIL_TEMPLATES.md` to customize

2. **Keep Notes:**

   - Document any custom configurations
   - Note which email service you're using
   - Save any credentials securely

3. **Share with Team:**
   - Share `ALERTS_QUICK_START.md`
   - Share `ALERTS_DOCUMENTATION_INDEX.md`
   - Provide `.env.example` (without credentials)

---

## Post-Installation Checklist

- [ ] Backend dependencies installed (`nodemailer` present)
- [ ] `.env` file created with email credentials
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can log in as admin
- [ ] Can see Alerts page
- [ ] Can select department and students
- [ ] Can send test alert
- [ ] Test email received
- [ ] Email format looks good
- [ ] Error handling works (tested blank fields)
- [ ] Backend logs show success message

---

## Deployment Checklist

Before deploying to production:

- [ ] Update email service to production account
- [ ] Test with real email addresses
- [ ] Set up backup email service
- [ ] Configure rate limiting (if needed)
- [ ] Set up email delivery monitoring
- [ ] Plan WhatsApp integration (future)
- [ ] Update security policies
- [ ] Create runbook for alerts support
- [ ] Train team on alert functionality
- [ ] Set up incident response for failed sends

---

## Common Issues & Quick Fixes

| Issue                           | Fix                                             | Time  |
| ------------------------------- | ----------------------------------------------- | ----- |
| "Invalid credentials"           | Use Gmail app password, not regular password    | 2 min |
| "Address in use"                | Change PORT in .env or kill process on 5000     | 1 min |
| "Cannot find module nodemailer" | Run `npm install` in backend                    | 2 min |
| "No students found"             | Register students in database                   | 5 min |
| "Email not received"            | Check spam folder, wait 60s, verify credentials | 5 min |
| "Cannot connect to MongoDB"     | Check DB_CONNECTION_STRING in .env              | 2 min |
| "CORS error"                    | Restart frontend and backend                    | 3 min |

---

## Getting Help

1. **Check docs:** See `ALERTS_DOCUMENTATION_INDEX.md` for specific guides
2. **Check logs:** Look at terminal where backend is running
3. **Check `.env`:** Verify all credentials are correct
4. **Try troubleshooting:** See Common Issues above
5. **Ask team:** Share error messages and `.env` (without credentials)

---

## Next Steps

After successful installation:

1. **Explore Features:**

   - Send alerts to different departments
   - Test with selected students
   - Try different message content

2. **Customize (Optional):**

   - Modify email template colors
   - Add logo/branding
   - Update footer text

3. **Plan Advanced Features:**

   - WhatsApp integration via Twilio
   - Message history tracking
   - Scheduled alerts
   - Analytics dashboard

4. **Monitor & Maintain:**
   - Track email delivery success rate
   - Monitor support tickets
   - Plan scaling if high volume
   - Rotate credentials periodically

---

## Support Resources

- **Documentation:** `ALERTS_DOCUMENTATION_INDEX.md`
- **Quick Start:** `ALERTS_QUICK_START.md`
- **Setup Guide:** `ALERTS_SETUP.md`
- **Troubleshooting:** All documentation has troubleshooting sections
- **Email Customization:** `ALERTS_EMAIL_TEMPLATES.md`
- **Visual Guides:** `ALERTS_DIAGRAMS.md`

---

**Installation Complete! 🎉**

You now have a working Alerts & Notifications system ready to send messages to students.

Start sending alerts via: **Admin Dashboard > Alerts > Send Alert**
