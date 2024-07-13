const express = require('express')
const connectDB = require('./utils/conn')
const cors = require('cors')

const app = express()
const port = 3000

connectDB();

app.use(cors());

app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/permission', require('./routes/permissionRoutes'));
app.use('/api/messoff', require('./routes/messoffRoutes'));
app.use('/api/request', require('./routes/requestRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/suggestion', require('./routes/suggestionRoutes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
