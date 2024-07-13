const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (assuming you have MongoDB installed and running locally)
mongoose.connect('mongodb://localhost:27017/faceDetectionDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// Define a schema for storing detected face data
const faceSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  faceCoordinates: {
    x: Number,
    y: Number,
    width: Number,
    height: Number
  }
});

const Face = mongoose.model('Face', faceSchema);

// Middleware to parse JSON request body
app.use(express.json());

// Route to receive face detection data
app.post('/api/faces', async (req, res) => {
  const { faceCoordinates } = req.body;

  try {
    const newFace = new Face({ faceCoordinates });
    await newFace.save();
    res.status(201).json({ message: 'Face detection data saved successfully' });
  } catch (error) {
    console.error('Error saving face detection data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
