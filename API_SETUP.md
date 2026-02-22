# Contact Form API Setup Guide

This guide will help you set up the contact form backend on Vercel.

## 📧 Email Service Setup (Gmail)

### Step 1: Generate Gmail App Password

**Method 1: Direct Link (Easiest)**
1. Go directly to: https://myaccount.google.com/apppasswords
2. You may need to sign in again
3. If prompted, enable **2-Step Verification** first
4. Enter app name: "Portfolio Website"
5. Click **Create**
6. You'll see a 16-character password - **COPY THIS** (you won't see it again)

**Method 2: Manual Navigation**
1. Go to: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Make sure **2-Step Verification** is enabled (if not, enable it first)
4. Scroll down and search for "App passwords" or look under "How you sign in to Google"
   - **Note:** You'll ONLY see "App passwords" option if 2-Step Verification is enabled
5. Click on **App passwords**
6. Enter app name: "Portfolio Website"
7. Click **Create**
8. You'll see a 16-character password - **COPY THIS** (you won't see it again)

**Important Notes:**
- App passwords option only appears AFTER enabling 2-Step Verification
- If you still don't see it, use the direct link (Method 1) above
- The password will look like: `abcd efgh ijkl mnop` (16 characters with spaces)

### Step 2: Set Environment Variables on Vercel

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Select your portfolio project
3. Click on **Settings** tab
4. Click on **Environment Variables** in the left sidebar
5. Add the following variables:

   **Variable 1:**
   - Name: `EMAIL_USER`
   - Value: `your-email@gmail.com` (your Gmail address)
   - Environment: Check all (Production, Preview, Development)

   **Variable 2:**
   - Name: `EMAIL_PASSWORD`
   - Value: The 16-character app password you generated
   - Environment: Check all (Production, Preview, Development)

6. Click **Save** for each variable

### Step 3: Redeploy Your Project

After adding environment variables, you need to redeploy:

1. Go to **Deployments** tab in Vercel
2. Click on the three dots next to your latest deployment
3. Click **Redeploy**
4. The contact form will now work!

## 🧪 Testing Locally

To test the contact form on your local machine:

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your Gmail credentials:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-character-app-password
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Test the contact form at http://localhost:5173/contact

## 🔒 Security Notes

- Never commit your `.env` file to Git (it's already in `.gitignore`)
- Use App Passwords, not your regular Gmail password
- The `.env.example` file is safe to commit (no real credentials)

## ✅ Verification

After deployment, test your contact form:
1. Go to your live site
2. Fill out and submit the contact form
3. Check your Gmail inbox for the message
4. You should receive an email with the form submission

## 🆘 Troubleshooting

**Issue: Email not sending**
- Double-check your environment variables in Vercel
- Ensure you're using an App Password, not your regular Gmail password
- Make sure 2-Step Verification is enabled on your Google account
- Check the Vercel Function logs for errors

**Issue: "Failed to send email" error**
- Verify your Gmail App Password is correct
- Check if Gmail is blocking the sign-in attempt (check your email for security alerts)
- Ensure environment variables are set for all environments (Production, Preview, Development)

## 📝 How It Works

1. User fills out the contact form
2. Form data is sent to `/api/contact` serverless function
3. Nodemailer sends an email to your Gmail address
4. You receive the message in your inbox
5. You can reply directly to the sender (reply-to is set to their email)
