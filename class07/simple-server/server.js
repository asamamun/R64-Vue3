const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path')

// Middleware to parse JSON bodies
app.use(express.json())

// Path to the user.json file
const userFilePath = path.join(__dirname, 'user.json')

// Function to generate a random password
function generateRandomPassword(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

// Function to read users from file
function readUsersFromFile() {
  try {
    if (fs.existsSync(userFilePath)) {
      const data = fs.readFileSync(userFilePath, 'utf8')
      return JSON.parse(data)
    } else {
      return []
    }
  } catch (error) {
    console.error('Error reading user file:', error)
    return []
  }
}

// Function to write users to file
function writeUsersToFile(users) {
  try {
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2))
    return true
  } catch (error) {
    console.error('Error writing to user file:', error)
    return false
  }
}

// Route to add a user with a random password
app.get('/adduser/:username', (req, res) => {
  const username = req.params.username
  
  // Read existing users from file
  let users = readUsersFromFile()
  
  // Check if user already exists
  const existingUser = users.find(user => user.username === username)
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' })
  }
  
  // Generate random password
  const password = generateRandomPassword()
  
  // Add user to array
  const newUser = { username, password }
  users.push(newUser)
  
  // Write updated users to file
  if (writeUsersToFile(users)) {
    res.json({ message: 'User added successfully', user: newUser })
  } else {
    res.status(500).json({ error: 'Failed to save user' })
  }
})

// Route to get all users
app.get('/alluser', (req, res) => {
  const users = readUsersFromFile()
  res.json({ users })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})