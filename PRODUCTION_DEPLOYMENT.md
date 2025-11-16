# Production Deployment Guide

## Authentication & Cookies

### Cookie Settings (Environment-Aware)

The application now automatically adjusts cookie settings based on the `NODE_ENV` environment variable:

**Development (NODE_ENV=development):**

- `httpOnly: true` - Prevents JavaScript access
- `secure: false` - Works on HTTP localhost
- `sameSite: "lax"` - Allows same-site requests
- Path: `/`
- Max Age: 24 hours (admin/lecturer), 1 hour (student)

**Production (NODE_ENV=production):**

- `httpOnly: true` - Prevents JavaScript access
- `secure: true` - Requires HTTPS
- `sameSite: "none"` - Allows cross-site requests (required for secure: true)
- Path: `/`
- Max Age: 24 hours (admin/lecturer), 1 hour (student)

### Important: HTTPS Required for Production

When deploying to production:

1. Ensure your backend uses HTTPS (SSL/TLS certificate required)
2. Set `NODE_ENV=production`
3. Update `FRONTEND_URL` in backend environment to your production frontend URL
4. Update `VITE_API_BASE_URL` in frontend environment to your production API URL

## Backend Setup

### Environment Variables (.env file)

```bash
# Database
DB_CONNECTION_STRING=mongodb+srv://user:password@cluster.mongodb.net/database

# JWT Secret (change this!)
JWT_SECRET=your-very-secure-secret-key-here

# Server
PORT=5000
NODE_ENV=production

# Frontend URL (must match your frontend domain)
FRONTEND_URL=https://your-frontend-domain.com
```

### CORS Configuration

The application now has enhanced CORS with:

- Explicit allowed methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
- Explicit allowed headers: Content-Type, Authorization
- Credentials enabled for cookie handling
- Proper error logging for denied origins

### Deployment Steps

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set environment variables in `.env`

3. Start server:
   ```bash
   npm start
   ```

## Frontend Setup

### Environment Variables (.env file)

```bash
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
```

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Login Flow (Production-Ready)

The login system now includes:

1. **Better Error Handling**

   - Validates input fields
   - Shows specific error messages from server
   - Displays appropriate toast notifications

2. **Environment-Aware Cookies**

   - Automatically uses secure cookies on HTTPS
   - Works seamlessly in development and production

3. **Improved Error Messages**

   - "Please select a role"
   - "Please enter email and password"
   - Server-specific error messages (wrong password, user not found, etc.)

4. **Success Feedback**
   - Shows success toast
   - Brief delay before navigation (gives user feedback)
   - Redirects to appropriate dashboard

## Common Production Issues & Fixes

### Issue: Login fails with 403 CORS error

**Solution:**

- Ensure `FRONTEND_URL` in backend matches your frontend domain exactly
- Check that both frontend and backend are using HTTPS
- Verify cookies are being sent (check browser DevTools → Application → Cookies)

### Issue: Cookies not being set

**Solution:**

- Confirm `NODE_ENV=production` is set
- Verify HTTPS is enabled
- Check that `sameSite: "none"` requires `secure: true`
- Browser must allow third-party cookies (check settings)

### Issue: Protected routes redirect to login

**Solution:**

- Verify cookie is being sent with requests
- Check `/auth/verify` endpoint is responding correctly
- Ensure JWT_SECRET is consistent between server instances
- Check token expiration times

### Issue: Login works locally but not in production

**Solution:**

- Verify `VITE_API_BASE_URL` in frontend is correct
- Check that backend `FRONTEND_URL` matches frontend domain
- Enable HTTPS on both frontend and backend
- Verify DNS resolution for both domains
- Check server logs for CORS errors

## Security Checklist

- [ ] NODE_ENV set to production
- [ ] HTTPS/SSL enabled on both frontend and backend
- [ ] JWT_SECRET changed to a strong, unique secret
- [ ] Database credentials secured
- [ ] FRONTEND_URL and API_BASE_URL match production domains
- [ ] Cookies set with `secure: true` and `sameSite: "none"`
- [ ] CORS configured for your specific domains
- [ ] No console.logs or debug code in production
- [ ] API keys and secrets not exposed in frontend code
- [ ] Database connection uses secure credentials

## Testing Authentication

### Test Login Flow

1. Navigate to login page
2. Select role (Admin/Lecturer/Student)
3. Enter valid credentials
4. Check browser DevTools → Application → Cookies for "token" cookie
5. Verify cookie has flags: HttpOnly, Secure (prod only), SameSite=None (prod only)
6. Verify redirect to appropriate dashboard
7. Check Protected route works by navigating away and back

### Test Protected Routes

1. Login successfully
2. Check that authenticated pages load
3. Logout (if implemented)
4. Try to access protected route directly - should redirect to login
5. Login again - should restore access
