import Student from "../../models/students.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure email transporter (using Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  host: process.env.EMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // your app password
  },
});

console.log(process.env.EMAIL_USER);

// Send alert via email
const sendEmailAlert = async (recipients, title, message) => {
  try {
    const emailList = recipients
      .map((student) => student.email)
      .filter(Boolean);
    if (emailList.length === 0) {
      console.warn("No valid email addresses found");
      return emailList.length;
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #0E3668; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">${title}</h1>
        </div>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px;">
          <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            This is an automated message from the School Attendance Biometric System.
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emailList.join(","),
      subject: title,
      html: htmlContent,
    });

    console.log(`Email alert sent to ${emailList.length} recipients`);
    return emailList.length;
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send email alerts");
  }
};

// Send alert via WhatsApp (using placeholder - integrate with WhatsApp Business API)
const sendWhatsAppAlert = async (recipients, title, message) => {
  try {
    // This is a placeholder for WhatsApp integration
    // In production, integrate with Twilio, WhatsApp Business API, or similar service
    const phoneNumbers = recipients
      .map((student) => student.phone)
      .filter(Boolean);

    if (phoneNumbers.length === 0) {
      console.warn("No valid phone numbers found");
      return 0;
    }

    // TODO: Implement actual WhatsApp sending via API
    // Example with Twilio:
    // const twilio = require('twilio')(accountSid, authToken);
    // for (const phone of phoneNumbers) {
    //   await twilio.messages.create({
    //     body: `${title}\n\n${message}`,
    //     from: `whatsapp:${twilioWhatsAppNumber}`,
    //     to: `whatsapp:${phone}`,
    //   });
    // }

    console.log(
      `WhatsApp alert prepared for ${phoneNumbers.length} recipients (not yet sent)`
    );
    return phoneNumbers.length;
  } catch (error) {
    console.error("WhatsApp sending error:", error);
    throw new Error("Failed to send WhatsApp alerts");
  }
};

// Send alert to students
export const sendAlert = async (req, res) => {
  try {
    const {
      departmentId,
      department,
      title,
      message,
      sendTo,
      studentIds,
      deliveryMethod,
    } = req.body;

    // Accept either department title (department) or departmentId
    const departmentKey = department || departmentId;

    // Validation
    if (!departmentKey || !title || !message || !deliveryMethod) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: department (title) or departmentId, title, message, deliveryMethod",
      });
    }

    if (!["email", "whatsapp"].includes(deliveryMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery method. Must be 'email' or 'whatsapp'",
      });
    }

    // Fetch students based on sendTo option
    let recipients;
    if (sendTo === "all") {
      // Send to all students in the department (department is stored as title string)
      recipients = await Student.find({ department: departmentKey }).select(
        "fullname email phone matricNumber"
      );
    } else if (sendTo === "selected" && studentIds && studentIds.length > 0) {
      // Send to selected students
      recipients = await Student.find({
        _id: { $in: studentIds },
        department: departmentKey,
      }).select("fullname email phone matricNumber");
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid sendTo option or no students selected",
      });
    }

    if (recipients.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No students found matching the criteria",
      });
    }

    // Send alerts based on delivery method
    let recipientCount = 0;
    if (deliveryMethod === "email") {
      recipientCount = await sendEmailAlert(recipients, title, message);
    } else if (deliveryMethod === "whatsapp") {
      recipientCount = await sendWhatsAppAlert(recipients, title, message);
    }

    return res.status(200).json({
      success: true,
      message: `Alert sent successfully to ${recipientCount} student(s)`,
      recipientCount,
      deliveryMethod,
    });
  } catch (error) {
    console.error("Send alert error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to send alert",
    });
  }
};

export default {
  sendAlert,
};
