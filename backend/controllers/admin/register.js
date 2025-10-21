import admin from "../../models/admin.js";

 const registerAdmin = async (req, res) => {
     try {
        console.log(req.body);
        let {fullname,email,password,securityquestion,securityanswer} = req.body;
        // Check if admin with the same email already exists
        const existingAdmin = await admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin with this email already exists" });
        }
        // Create new admin
        const newAdmin = new admin({
            fullname,
            email,
            password: password || "admin123",
            securityquestion,
            securityanswer,
        });
        await newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully", adminId: newAdmin._id });
    } catch (error) {
        
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export default registerAdmin;