// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('display') as HTMLDivElement;
const linkContainer = document.getElementById('link-container') as HTMLDivElement;
const shareableLink = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

// form submission
form.addEventListener('submit', (event: Event) => {
event.preventDefault(); 

// input values
const username = (document.getElementById('username') as HTMLInputElement).value;
const name = (document.getElementById('name') as HTMLInputElement).value;Z
const email = (document.getElementById('email') as HTMLInputElement).value;
const contact = (document.getElementById('contact') as HTMLInputElement).value;
const education = (document.getElementById('education') as HTMLTextAreaElement).value;
const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

// Save form data in localStorage with the username
const resumeData = {
name,
email,
contact,
education,
experience,
skills
};

localStorage.setItem(username, JSON.stringify(resumeData)); 


// Generate the resume
const resumeHTML = `
<h2>Resume</h2>
<h3><u>Personal Information:</u></h3>
<p><b>Name:</b> <span contenteditable="true">${name}</span></p>
<p><b>Email:</b> <span contenteditable="true">${email}</span></p>
<p><b>Phone:</b> <span contenteditable="true">${contact}</span></p>

<h3><u>Education:</u></h3>
<p contenteditable="true">${education}</p>
<h3><u>Experience:</u></h3>
<p contenteditable="true">${experience}</p>
<h3><u>Skills:</u></h3>
<p contenteditable="true">${skills}</p>
`;

// Display the generated resume
resumeDisplayElement.innerHTML = resumeHTML;

// Generate a shareable URL 
const shareableURL =`${window.location.origin}?username=${encodeURIComponent(username)}`;

// Display the shareable link
linkContainer.style.display = 'block';
shareableLink.href = shareableURL;
shareableLink.textContent = shareableURL;
});

// PDF download
downloadPdfButton.addEventListener('click', () => {
window.print(); 
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
if (username) {

// Autofill form if data is found in localStorage
const savedResumeData = localStorage.getItem(username);
if (savedResumeData) {
const resumeData = JSON.parse(savedResumeData);
(document.getElementById('username') as HTMLInputElement).value = username;
(document.getElementById('name') as HTMLInputElement).value = resumeData.name;
(document.getElementById('email') as HTMLInputElement).value = resumeData.email;
(document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
(document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
(document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
(document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
}
}
});


