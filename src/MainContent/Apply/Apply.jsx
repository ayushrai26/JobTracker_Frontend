import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {toast} from 'react-toastify'
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { NotificationContext } from '../../ContextAPI/Notifications/CreateContext';
import { MiscFunctionality } from '../../ContextAPI/Misc/createContext';


function Apply() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [coverLetter,setCoverLetter] = useState('');
  const [skill,setSkill] = useState('');
  const navigate = useNavigate();
  const [file,setFile] = useState(null);
  const [previewUrl,setPreviewUrl] = useState(null)
  const {setNotifications,setShouldfetch} = useContext(NotificationContext)
  const [jobInfo,setJobInfo] = useState({})
  const {setAppliedButton} = useContext(MiscFunctionality)
     const {jobId} = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleFileChange = (e)=>{
    setFile(e.target.files[0])
  }
const sendEmail = async()=>{
      try{
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/sendEmail',{
    method:'POST',
    headers:{
      'content-Type' :'application/json'
    },
    body:JSON.stringify({name,email,skill,company})
   })
   if(response.ok){
    toast.success('Confirmation email sent')
   }else{
    toast.error('Error sending email')
   }
      }catch(err){
        console.log(err)
        alert('Email Service error')
      }
   
}



const handleSubmit = async (e) => {
  e.preventDefault();
  let resumeUrl = null;

  try {
    // ✅ Upload resume first
    if (file) {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("https://jobtracker-backend-ql5b.onrender.com/upload/upload-resume", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Resume upload failed!");
        return;
      }

      const data = await res.json();
    
      resumeUrl = data.secure_url;
      console.log("Resume uploaded successfully:", resumeUrl);
      toast.success("Resume uploaded!");
    }

    // ✅ Save application
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

    // ✅ Success handling
    Swal.fire("Application Submitted Successfully!", "", "success");

    // Reset form
    setName("");
    setEmail("");
    setCoverLetter("");
    setSkill("");
    setFile(null);
    setPreviewUrl(null);

    // Trigger email
    await sendEmail();

    // Save notification
    if (user) {
      await fetch("https://jobtracker-backend-ql5b.onrender.com/saveNotifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, skill: jobInfo?.jobDetails?.jobTitle, userId: user.id }),
      });
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


   useEffect(()=>{
    
    const fetchJob= async()=>{
      try{
        
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch-individual-job',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({jobId})
        })
        const data = await response.json()
         
        if(response.ok){
          
          setJobInfo(data.job)
          
          
        }else{
          alert('Error in fetching jobs')
        }
      }catch(err){
        console.log(err)
      }
      
    }
    fetchJob();


   },[jobId])

const company = jobInfo?.jobDetails?.companyName;
  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Apply for This Job</h1>

      {/* Job Info (Optional - fetch via jobId from URL) */}
      <div className="bg-gray-100 p-4 rounded mb-6">
  <h2 className="text-lg font-semibold">Job Title: {jobInfo?.jobDetails?.jobTitle || "Not available"}</h2>
  <p className="text-sm text-gray-700">Company: {jobInfo?.jobDetails?.companyName || "N/A"}</p>
  <p className="text-sm text-gray-700">Location: {jobInfo?.jobDetails?.city || "City"}, {jobInfo?.jobDetails?.state || "State"}</p>
  <p className="text-sm text-gray-700">Salary: ₹{jobInfo?.Compensation?.salary || "0"}/month</p>
</div>


      {/* Application Form */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
        <div>
          <label className="block font-medium">Full Name</label>
          <input type="text" className="w-full border border-gray-300 p-2 rounded" required 
          value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        
        <div>
          <label className="block font-medium">Email</label>
          <input type="email" className="w-full border border-gray-300 p-2 rounded" required
          value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
         <div>
          <label className="block font-medium">Position</label>
          <input type="text" className="w-full border border-gray-300 p-2 rounded" disabled
          value={jobInfo?.jobDetails?.jobTitle}/>
         </div>
        

        <div>
          <label className="block font-medium">Cover Letter</label>
          <textarea rows="4" className="w-full border border-gray-300 p-2 rounded" placeholder="Tell us why you're a good fit..." 
          value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)}></textarea>
        </div>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 cursor-pointer hover:border-blue-400 transition relative w-[350px] h-[200px]">
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
          <span className="text-sm text-gray-500">PDF, DOCX, or Image up to 5MB</span>
        </label>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-24 object-contain mb-2"
            />
          ) : (
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 4a2 2 0 00-2 2v8a2 2 0 002 2h4a2 2 0 002-2V6a2 2 0 00-2-2H8z" />
              </svg>
              <span className="text-gray-700 font-medium">{file.name}</span>
            </div>
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
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default Apply;
