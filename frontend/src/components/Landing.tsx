const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "https://www.example.com/finishSignUp?cartId=1234",
  // This must be true.
  handleCodeInApp: true,
  // The domain must be configured in Firebase Hosting and owned by the project.
  linkDomain: "custom-domain.com",
};

export const Landing = () => {
  return <div className="text-3xl font-bold underline">Landing Page</div>;
};
