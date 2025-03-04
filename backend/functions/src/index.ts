// /**
//  * Import function triggers from their respective submodules:
//  *
//  * import {onCall} from "firebase-functions/v2/https";
//  * import {onDocumentWritten} from "firebase-functions/v2/firestore";
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

import { onRequest, onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { SUPPORTED_LANGUAGES } from "./utils";
initializeApp();

const db = getFirestore();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const getSubmissions = onRequest(
  { cors: true },
  async (request, response) => {
    // const offset = request.body.offset;
    const limit = request.body.limit || 10;
    const res = await db
      .collection("submissions")
      .limit(limit)
      .orderBy("submitTime", "desc")
      .get();
    const submissions = [];
    console.log("res.docs");
    console.log(res.docs.length);
    res.docs.forEach(async (doc) => {
      console.log("doc1");
      submissions.push(
        new Promise(async (resolve) => {
          const snapshot = await doc.data().user.get();
          console.log("snapshot", snapshot.data());
          resolve({
            submission: doc.data(),
            user: snapshot.data(),
          });
        })
      );
    });

    response.send({
      response: await Promise.all(submissions),
    });
  }
);

export const submit = onCall(async (request) => {
  const uid = request.auth.uid;
  const language = request.data.language;
  const submission = request.data.submission;
  const problemId = request.data.problemId;

  if (!uid) {
    return {
      message: "Unauthorized",
    };
  }

  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return {
      message: "Language not supported",
    };
  }

  const problem = await db
    .collection("problems")
    .doc(problemId?.toString())
    .get();

  if (!problem.exists) {
    return {
      message: "Problem Doesnt exist",
    };
  }

  const doc = await db.collection("submissions").add({
    language,
    submission,
    problemId,
    userId: uid,
    submitTime: new Date(),
    workerTryCount: 0,
    status: "PENDING",
  });

  return {
    message: "Submission done",
    id: doc.id,
  };
});
