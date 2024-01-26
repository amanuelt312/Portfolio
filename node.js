const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const { cert } = require("firebase-admin/app");
const admin = require("firebase-admin");

  const serviceAccount = require("./smartpath-b7c1c-firebase-adminsdk-4dm4a-db709ae10a.json");
const { getFirestore } = require("firebase-admin/firestore");
admin.initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "smartpath-b7c1c.appspot.com",
});
const db = getFirestore();
app.get("/", async (req, res) => {
  try {
    const courseName = "html";
    const fileName = "basic";

    console.log("geting content of ", fileName);
    const docRef = db
      .collection(`courses/language/${courseName}/`)
      .doc(fileName);
    const doc = await docRef.get();

    if (doc.exists) {
      const data = doc.data();
      console.log(data.order);
      res.send(`
        <h1>basic  retrieved successfullyy</h1>
        <pre>${JSON.stringify(data.content, null, 2)}</pre>
      `);
      // console.log("content send ", { fileName });
    } else {
      res.status(404).json({
        success: false,
        error: "Document not found",
      });
      console.log("note found");
    }
  } catch (error) {
    console.error("Error retrieving content:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve content",
    });
  }
});
const port = 3005;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
