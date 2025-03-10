import axios from "axios";
import { atom } from "jotai";

export type Submission = {
  language: string;
  timestamp: string;
  submission: string;
  status: string;
  username: string;
  problemId: string;
};

export const globalSubmissions = atom(async (get) => {
  const response = await axios.get(
    "https://getsubmissions-jql22nphfa-uc.a.run.app"
  );
  console.log({ response });
  const m = response.data.response.map((x: any) => ({
    language: x.submission.language,
    timestamp: x.submission.submitTime._nanoseconds,
    submission: x.submission.submission,
    status: x.submission.status,
    problemId: x.submission.problemId,
    username: x.user.username,
  }));

  console.log({ m });
  return m;
});
