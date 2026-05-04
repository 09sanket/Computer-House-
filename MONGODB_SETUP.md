# MongoDB Atlas Setup Guide

## Quick Setup Steps

### 1. Create MongoDB Atlas Account
- Go to: https://www.mongodb.com/cloud/atlas
- Click "Try Free" or "Sign Up"
- Create your account

### 2. Create a Cluster
- Click "Build a Database"
- Choose **FREE** tier (M0 Sandbox)
- Select a cloud provider and region (closest to you)
- Click "Create"

### 3. Create Database User
- Go to "Database Access" (left sidebar)
- Click "Add New Database User"
- Choose "Password" authentication
- Username: `admin` (or your choice)
- Password: Create a strong password (save it!)
- Database User Privileges: "Atlas admin" or "Read and write to any database"
- Click "Add User"

### 4. Whitelist IP Address
- Go to "Network Access" (left sidebar)
- Click "Add IP Address"
- For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
- For production: Add your specific IP addresses
- Click "Confirm"

### 5. Get Connection String
- Go back to "Database" (left sidebar)
- Click "Connect" on your cluster
- Choose "Connect your application"
- Driver: Node.js
- Version: 5.5 or later
- Copy the connection string

### 6. Update .env File
Open `server/.env` and update:

```env
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/computer-house?retryWrites=true&w=majority
```

**Important:**
- Replace `YOUR_PASSWORD` with the password you created in step 3
- Replace `cluster0.xxxxx` with your actual cluster address
- Keep `/computer-house` as the database name (or change it if you prefer)
- The connection string should look like:
  ```
  mongodb+srv://admin:MyPassword123@cluster0.abc123.mongodb.net/computer-house?retryWrites=true&w=majority
  ```

### 7. Restart Server
```bash
# Stop current server (Ctrl+C)
npm run server:dev
```

### 8. Verify Connection
Check server logs for:
```
✅ MongoDB Connected Successfully
📊 Database: computer-house
🌐 Host: cluster0.xxxxx.mongodb.net
```

Or test the API:
```bash
curl http://localhost:5000/api/health/db
```

Should return:
```json
{
  "status": "connected",
  "readyState": "connected",
  "database": "computer-house",
  "host": "cluster0.xxxxx.mongodb.net"
}
```

## Create Admin User

After MongoDB is connected, create an admin user:

```bash
node create-admin.js admin@computerhouse.com Sanket123
```

## Troubleshooting

### Error: ECONNREFUSED 127.0.0.1:27017
**Problem:** Server is trying to connect to localhost instead of MongoDB Atlas

**Solution:**
1. Check `server/.env` file
2. Ensure `MONGODB_URI` starts with `mongodb+srv://`
3. Restart the server after updating .env

### Error: Authentication failed
**Problem:** Wrong username or password in connection string

**Solution:**
1. Verify username and password in MongoDB Atlas
2. Check connection string in `.env` file
3. Ensure password is URL-encoded (special characters need encoding)

### Error: IP not whitelisted
**Problem:** Your IP address is not allowed to connect

**Solution:**
1. Go to MongoDB Atlas → Network Access
2. Add your current IP address
3. Or use `0.0.0.0/0` for all IPs (development only)

### Error: Connection timeout
**Problem:** Network or firewall issue

**Solution:**
1. Check your internet connection
2. Verify firewall settings
3. Try increasing timeout in connection options

## Connection String Format

**MongoDB Atlas:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database-name?retryWrites=true&w=majority
```

**Local MongoDB:**
```
mongodb://localhost:27017/database-name
```

## Security Notes

- Never commit `.env` file to git
- Use strong passwords for database users
- In production, whitelist specific IP addresses only
- Rotate passwords regularly
- Use environment-specific connection strings



