# 🏢 Client Management System

## Overview
The Client Management system allows you to manage companies, their contacts, and secure credentials (passwords, tokens, etc.) in a centralized and secure way.

## ✨ Features

### 1. Client Profiles
- **Company Details**: Name, Email, Phone, Website, VAT, Address.
- **Logo**: Upload company logos.
- **Status**: Track Active, Inactive, or Lead clients.
- **Project History**: View all projects associated with a client.

### 2. Contact Management
- Add multiple contacts per client.
- Mark primary contacts.
- Store direct phone numbers and emails.

### 3. 🔐 Password Manager (Credentials)
- **Secure Storage**: All passwords are **encrypted** in the database.
- **Categorization**: Organize by Login, Server, Database, API Key, etc.
- **Safe Viewing**: Passwords are hidden by default. Use the "Copy Password" action to view/copy them.
- **Service Links**: Store URLs for quick access to services.

## 🚀 How to Use

### Adding a Client
1. Go to **Client Management > Clients**.
2. Click **New Client**.
3. Fill in the company information and address.
4. Upload a logo (optional).

### Adding Credentials
1. Open a Client's profile.
2. Click on the **Password Manager** tab.
3. Click **New credential**.
4. Fill in the details:
   - **Service / System**: e.g., "WordPress Admin", "AWS Console".
   - **Type**: Select the type of credential.
   - **Username**: The login username or email.
   - **Password**: The secure password (will be encrypted).
5. Click **Create**.

### Viewing/Copying Passwords
1. In the **Password Manager** tab, find the credential.
2. Click the **Copy Password** icon (clipboard) on the right side of the row.
3. A modal will appear with the password. You can copy it from there.

## 🔒 Security Note
- Passwords are stored using Laravel's encryption.
- They are never displayed in plain text in the main table.
- Only authorized admins can access these credentials.
