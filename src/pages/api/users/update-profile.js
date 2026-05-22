
export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, name, photoURL } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: {
      email,
      name,
      photoURL,
    },
  });
}