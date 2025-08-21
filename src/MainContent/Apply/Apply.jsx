import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { NotificationContext } from "../../ContextAPI/Notifications/CreateContext";
import { MiscFunctionality } from "../../ContextAPI/Misc/createContext";

function Apply() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [skill, setSkill] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [jobInfo, setJobInfo] = useState({});
  const { jobId } = useParams();
  const navigate = useNavigate();

  const { setNotifications, setShouldfetch } = useContext(NotificationContext);
  const { setAppliedButton } = useContext(MiscFunctionality);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) {
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const company = jobInfo?.jobDetails?.companyName;

  // 📩 Email confirmation
  const sendEmail = async () => {
    try {
      const response = await fetch(
        "https://jobtracker-backend-ql5b.onrender.com/sendEmail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, skill, company }),
        }
      );
      response.ok
        ? toast.success("Confirmation email sent")
        : toast.error("Error sending email");
    } catch (err) {
      console.log(err);
      toast.error("Email service error");
    }
  };

  // 📝 Submit Application
  const handleSubmit = async (e) => {
    e.preventDefault();
    let resumeUrl = null;

    try {
      // Upload Resume
      if (file) {
        const formData = new FormData();
        formData.append("resume", file);

        const res = await fetch(
          "https://jobtracker-backend-ql5b.onrender.com/upload/upload-resume",
          { method: "POST", body: formData }
        );

        if (!res.ok) {
          toast.error("Resume upload failed!");
          return;
        }

        const data = await res.json();
        resumeUrl = data.secure_url;
        toast.success("Resume uploaded!");
      }

      // Save Application
      const response = await fetch(
        "https://jobtracker-backend-ql5b.onrender.com/save/user-applied-applications",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            skill: jobInfo?.jobDetails?.jobTitle,
            company,
            coverLetter,
            userId: user.id,
            jobId,
            resume: resumeUrl,
          }),
        }
      );

      if (response.status === 400) {
        Swal.fire("Error!", "Already applied", "error");
        return;
      }

      if (!response.ok) {
        Swal.fire("Error!", "Something went wrong", "error");
        return;
      }

      Swal.fire("Application Submitted Successfully!", "", "success");

      // Reset form
      setName("");
      setEmail("");
      setCoverLetter("");
      setSkill("");
      setFile(null);
      setPreviewUrl(null);

      await sendEmail();

      // Save notification
      if (user) {
        await fetch(
          "https://jobtracker-backend-ql5b.onrender.com/saveNotifications",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              company,
              skill: jobInfo?.jobDetails?.jobTitle,
              userId: user.id,
            }),
          }
        );
      }

      setNotifications({ company, skill: jobInfo?.jobDetails?.jobTitle });
      setAppliedButton(true);
      setShouldfetch((prev) => !prev);
      toast.info("You have a new notification");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  // 🎯 Fetch Job Info
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(
          "https://jobtracker-backend-ql5b.onrender.com/fetch-individual-job",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jobId }),
          }
        );
        const data = await response.json();

        if (response.ok) setJobInfo(data.job);
        else toast.error("Error fetching job details");
      } catch (err) {
        console.log(err);
      }
    };
    fetchJob();
  }, [jobId]);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl mt-10 border border-gray-100">
      {/* Job Info Card */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-md mb-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-2">
          Apply for {jobInfo?.jobDetails?.jobTitle || "this role"}
        </h1>
        <p className="text-gray-700">
          <span className="font-semibold">Company:</span>{" "}
          {jobInfo?.jobDetails?.companyName || "N/A"}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Location:</span>{" "}
          {jobInfo?.jobDetails?.city || "City"},{" "}
          {jobInfo?.jobDetails?.state || "State"}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Salary:</span> ₹
          {jobInfo?.Compensation?.salary || "0"}/month
        </p>
      </div>

      {/* Application Form */}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Position</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100"
            disabled
            value={jobInfo?.jobDetails?.jobTitle}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Cover Letter</label>
          <textarea
            rows="4"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            placeholder="Tell us why you're a good fit..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
        </div>

        {/* Resume Upload */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-400 transition relative w-full">
          {!file ? (
            <label
              htmlFor="resumeUpload"
              className="flex flex-col items-center justify-center h-full w-full space-y-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4"
                />
              </svg>
              <span className="text-gray-700 font-medium">Upload Resume</span>
              <span className="text-sm text-gray-500">
                PDF, DOCX, or Image up to 5MB
              </span>
            </label>
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-32 object-contain mb-2"
                />
              ) : (
                <span className="text-gray-700 font-medium">{file.name}</span>
              )}
            </div>
          )}

          <input
            id="resumeUpload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition shadow-md"
        >
          🚀 Submit Application
        </button>
      </form>
    </div>
  );
}

export default Apply;
