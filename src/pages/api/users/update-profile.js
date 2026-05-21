// export default function handler(req, res) {
//   if (req.method !== "PATCH") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const { name, email, photoURL } = req.body;

//   // এখানে আপনার database update logic বসাতে পারেন
//   // demo purpose: শুধু received data return করা হচ্ছে
//   res.status(200).json({ success: true, user: { name, email, photoURL } });
// }
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