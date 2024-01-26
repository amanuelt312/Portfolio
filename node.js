const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs/promises");

const app = express();
app.use(cors());
const path = require("path");
app.use(express.json());
const microsoftTranslatorApiKey =
  "274b461760msh06015e359556e68p18418bjsn5e3aa3cd5e54";
const openaiApiKey = "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";

//firebase
const { initializeApp, cert } = require("firebase-admin/app");
const admin = require("firebase-admin");

const { getFirestore } = require("firebase-admin/firestore");

// Replace the path with the actual path to your service account key JSON file
const multer = require("multer");
const serviceAccount = require("./smartpath-b7c1c-firebase-adminsdk-4dm4a-db709ae10a.json");
// Initialize the Firebase Admin SDK with the service account key
admin.initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "smartpath-b7c1c.appspot.com",
});

// Get a Firestore instance
const db = getFirestore();
//firebase
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const bucket = admin.storage().bucket();
app.get("/", function (req, res) {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send("<h1>Hello from Node App</h1>");
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imageName = req.file.originalname;
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }
    const newId = imageName;
    const fileUpload = bucket.file(newId);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
      predefinedAcl: "publicRead",
    });
    blobStream.on("error", (error) => {
      console.error("Error uploading file:", error);
      res.status(500).send("Error uploading file.");
    });
    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      res.status(200).send(publicUrl);
    });
    blobStream.end(file.buffer);
  } catch (error) {
    console.error("Error handling image upload:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get(`/getContent`, async (req, res) => {
  try {
    const { courseName, fileName } = req.query;
    console.log(courseName, fileName);
    if (fileName == undefined || fileName == "") {
      res.status(404).json({
        success: false,
        error: "File not Enterd",
      });
    } else {
      console.log("geting content of ", fileName);
      const docRef = db
        .collection(`courses/language/${courseName}/`)
        .doc(fileName);
      const doc = await docRef.get();

      if (doc.exists) {
        const data = doc.data();
        console.log(data.order);

        res.json({
          success: true,
          content: data.content,
          order: data.order,
          // tags: data.tags,
        });
        // console.log("content send ", { fileName });
      } else {
        res.status(404).json({
          success: false,
          error: "Document not found",
        });
        console.log("note found");
      }
    }
  } catch (error) {
    console.error("Error retrieving content:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve content",
    });
  }
});
// Define a route to handle tag saving
app.post("/saveTags", async (req, res) => {
  const { courseName, order, fileName, content } = req.body;
  console.log(content);
  console.log(typeof order);
  try {
    // Check if the document already exists
    const docRef = db
      .collection(`courses/language/${courseName}`)
      .doc(fileName);
    const doc = await docRef.get();

    if (doc.exists) {
      await docRef.update({
        content: content,
        order: parseInt(order),
        status: "unlocked",
        previousDocument: "link-to-previous-document",
        nextDocument: "link-to-next-document",
      });

      console.log("Tags updated in Firestore successfully.");
      res.json({
        success: true,
        message: "Tags updated in Firestore successfully.",
      });
    } else {
      // If the document doesn't exist, create a new one
      await docRef.set({
        status: "unlocked",
        order: parseInt(order),
        previousDocument: "link-to-previous-document",
        nextDocument: "link-to-next-document",
        content: content,
      });

      console.log("Tags saved to Firestore successfully.");
      res.json({
        success: true,
        message: "Tags saved to Firestore successfully.",
      });
    }
  } catch (error) {
    console.error("Failed to save or update tags in Firestore:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save or update tags in Firestore.",
    });
  }
});

//course
app.get(`/documents/:courseName`, async (req, res) => {
  try {
    // const [files] = await bucket.getFiles({ prefix: "/courses" });
    // const fileNames = files.map((file) => file.name);
    // console.log(files);
    // res.json({ files: fileNames });
    const { courseName } = req.params;

    console.log("gettttn ", courseName);
    const db = admin.firestore();
    const files = [];
    const collectionRef = db
      .collection(`/courses/language/${courseName}`)
      .orderBy("order");
    const querySnapshot = await collectionRef.get();
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        files.push({ name: doc.id });
        // console.log(`${doc.id}=> ${JSON.stringify(doc.data())}`);
        // res.send(doc.id);
      });
      res.send(files);
      // console.log(files);
      console.log("Course send succesfully");
    } else {
      res.status(404).send("Course Not Found");
      console.log("course not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

app.get("/allCourses", async (req, res) => {
  try {
    const db = admin.firestore();

    const collectionRef = await db.collection(`/coursesInfo`);
    collectionRef.get().then((querySnapshot) => {
      const courses = [];
      querySnapshot.forEach((doc) => {
        const { title, description, imgLink } = doc.data();
        courses.push({ id: doc.id, title, description, imgLink });
      });
      res.send(courses);
      // console.log(courses);
      console.log("All courese send Successfully");
    });
  } catch (error) {
    console.log("error while geting all the courses", error);
  }
});

app.post("/createFile", async (req, res) => {
  try {
    const { fileName, content } = req.body;
    console.log(fileName);
    if (!fileName || !content) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid request payload." });
    }
    const filePath = path.join(
      __dirname,
      `new/src/pages/Cpages/${fileName}.js`
    );
    const dirPath = path.dirname(filePath);
    // Create the directory if it doesn't exist
    await fs.mkdir(dirPath, { recursive: true });

    await fs.writeFile(filePath, JSON.stringify(content), "utf-8");
    res.status(200).json({ success: true });
    console.log("file created");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create file." });
    console.log("file not created");
  }
});

app.post("/translate", async (req, res) => {
  const { text, to } = req.body;

  const options = {
    method: "POST",
    url: "https://microsoft-translator-text.p.rapidapi.com/translate",
    params: {
      "to[0]": "am", // Translate to the specified language (you can change the language code here)
      "api-version": "3.0",
      profanityAction: "NoAction",
      textType: "plain",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "274b461760msh06015e359556e68p18418bjsn5e3aa3cd5e54",
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    },
    data: [
      {
        text,
      },
    ],
  };

  try {
    const response = await axios.request(options);
    res.json({ translatedText: response.data[0].translations[0].text });

    console.log(response.data[0].translations[0].text);
  } catch (error) {
    console.error("erorror");
    res.status(500).json({ error: "Translation failed" });
  }
});

// app.get("/getContent/:fileName", async (req, res) => {
//   const { fileName } = req.params;

//   try {
//     const docRef = db.collection("courses/language/html").doc(fileName);
//     const doc = await docRef.get();

//     if (doc.exists) {
//       const data = doc.data();
//       res.json({
//         success: true,
//         content: data.content,
//         tags: data.tags,
//         // Add other properties as needed
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         error: "Document not found",
//       });
//     }
//   } catch (error) {
//     console.error("Error retrieving content:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to retrieve content",
//     });
//   }
// });

// app.post("/ask-question", async (req, res) => {
//   const { question } = req.body;

//   const { Configuration, OpenAIApi } = require("openai");

//   const configuration = new Configuration({
//     apiKey: openaiApiKey,
//   });
//   const openai = new OpenAIApi(configuration);

//   const completion = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content:
//           "You are a helpful assistant that provides explanations for beginners that are learning. now explain the following question in a simple and short way:",
//       },
//       {
//         role: "user",
//         content: question,
//       },
//     ],
//   });

//   res.json({ answer: completion.data.choices[0].message.content });
// });

const translateToEnglish = async (text) => {
  // Replace "YOUR_MICROSOFT_TRANSLATOR_API_KEY" with your actual Microsoft Translator API key
  const apiKey = microsoftTranslatorApiKey;
  const url = "https://microsoft-translator-text.p.rapidapi.com/translate";

  const options = {
    method: "POST",
    url,
    params: {
      to: "en",
      from: "am",
      "api-version": "3.0",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    },
    data: [
      {
        Text: text,
      },
    ],
  };

  try {
    const response = await axios.request(options);
    return response.data[0].translations[0].text;
  } catch (error) {
    console.error("Translation to English failed:", error);
    return null;
  }
};

// Function to translate English text to Amharic using the Translate API
const translateToAmharic = async (text) => {
  // Replace "YOUR_MICROSOFT_TRANSLATOR_API_KEY" with your actual Microsoft Translator API key
  const apiKey = microsoftTranslatorApiKey;
  const url = "https://microsoft-translator-text.p.rapidapi.com/translate";

  const options = {
    method: "POST",
    url,
    params: {
      to: "am",
      from: "en",
      "api-version": "3.0",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    },
    data: [
      {
        Text: text,
      },
    ],
  };

  try {
    const response = await axios.request(options);
    return response.data[0].translations[0].text;
  } catch (error) {
    console.error("Translation to Amharic failed:", error);
    return null;
  }
};
app.post("/explan", async (req, res) => {
  const { text } = req.body;
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: openaiApiKey,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that provides explanations for beginners that are learning. Now explain the following in a simple and short way:",
      },
      {
        role: "user",
        content: text,
      },
    ],
  });
  res.json({ answer: completion.data.choices[0].message.content });
});

app.post("/ask-question", async (req, res) => {
  const { question } = req.body;

  // Translate the user's input question from Amharic to English
  const englishQuestion = await translateToEnglish(question);
  console.log("eng: " + englishQuestion);

  if (!englishQuestion) {
    // Handle translation error
    return res.status(500).json({ error: "Translation to English failed" });
  }

  // Call the OpenAI API with the translated English question
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: openaiApiKey,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that provides explanations for beginners that are learning. Now explain the following question in a simple and short way:",
      },
      {
        role: "user",
        content: englishQuestion,
      },
    ],
  });
  console.log("after asking: " + completion.data.choices[0].message.content);
  // Translate the English response from OpenAI back to Amharic
  const amharicResponse = await translateToAmharic(
    completion.data.choices[0].message.content
  );

  if (!amharicResponse) {
    // Handle translation error
    return res.status(500).json({ error: "Translation to Amharic failed" });
  }

  // Send the translated response back to the frontend
  res.json({ answer: amharicResponse });
  console.log(amharicResponse);
});
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
