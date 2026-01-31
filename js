document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  const res = await fetch("/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  document.getElementById("status").textContent = result.status;
});

import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "your@gmail.com",
    pass: "app-password"
  }
});

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  await transporter.sendMail({
    from: `"Contact Form" <your@gmail.com>`,
    to: "your@gmail.com",
    subject: `New message from ${name}`,
    text: `${message}\n\nEmail: ${email}`
  });

  res.json({ status: "Повідомлення надіслано!" });
});

app.listen(3000, () => console.log("Server started on 3000"));

