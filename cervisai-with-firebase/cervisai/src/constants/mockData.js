// ─── CerVis AI — Mock Data ────────────────────────────────────────────────────
// Replace with real API calls when backend is ready.

export const PATIENTS = [
  { id: "P-0041", name: "Aisha Noor",     age: 34, scan: "MRI Cervical", date: "2025-04-10", status: "Positive", confidence: 91.4, risk: "High" },
  { id: "P-0038", name: "Fatima Al-Said", age: 47, scan: "Fundus Image", date: "2025-04-08", status: "Negative", confidence: 97.2, risk: "Low" },
  { id: "P-0035", name: "Lena Müller",    age: 52, scan: "MRI Cervical", date: "2025-04-05", status: "Positive", confidence: 84.1, risk: "Moderate" },
  { id: "P-0031", name: "Grace Owusu",    age: 29, scan: "Fundus Image", date: "2025-04-02", status: "Negative", confidence: 95.8, risk: "Low" },
  { id: "P-0028", name: "Mei Lin Zhao",   age: 61, scan: "MRI Cervical", date: "2025-03-29", status: "Positive", confidence: 88.6, risk: "High" },
];

export const EDU_CASES = [
  {
    id: "EC-01",
    title: "Early-Stage Cervical Carcinoma",
    modality: "MRI",
    difficulty: "Intermediate",
    tags: ["Cervical Cancer", "T1 Staging", "MRI"],
    accent: "#FCE4EC",
    icon: "🔬",
    summary: "A 38-year-old female presenting with irregular menstrual bleeding. MRI reveals a focal hyperintense lesion at the cervical os, 1.8 cm in diameter, confined to the cervix.",
    aiFindings: "Irregular cell boundary texture patterns detected in the transformation zone with 89.3% confidence. Key indicators: abnormal stromal signal intensity, disrupted fibrous stroma.",
    keyLearning: [
      "Identify transformation zone anomalies",
      "Understand T1 vs T2 MRI staging",
      "Recognize stromal invasion signals",
    ],
  },
  {
    id: "EC-02",
    title: "Glaucomatous Optic Nerve Damage",
    modality: "Fundus",
    difficulty: "Advanced",
    tags: ["Glaucoma", "Fundus", "Optic Disc"],
    accent: "#E3F2FD",
    icon: "👁️",
    summary: "A 65-year-old male with progressive visual field loss. Fundus imaging shows a cup-to-disc ratio of 0.8 with inferior notching and peripapillary atrophy.",
    aiFindings: "Enlarged cup-to-disc ratio, inferior rim thinning, and RNFL dropout flagged. Confidence: 93.1%. Pattern matched advanced glaucoma dataset.",
    keyLearning: [
      "Cup-to-disc ratio measurement",
      "RNFL defect interpretation",
      "Correlate imaging with visual field data",
    ],
  },
  {
    id: "EC-03",
    title: "Diabetic Retinopathy – Grade III",
    modality: "Fundus",
    difficulty: "Beginner",
    tags: ["Diabetic Retinopathy", "Microaneurysm"],
    accent: "#E3F2FD",
    icon: "👁️",
    summary: "A 54-year-old diabetic patient with 12-year history. Fundus image shows flame hemorrhages, hard exudates, and microaneurysms in all quadrants.",
    aiFindings: "47 microaneurysms, 6 flame hemorrhages, cotton-wool spots in superior quadrant. Severity: Grade III (Severe NPDR). Confidence: 96.7%.",
    keyLearning: [
      "Grading NPDR vs PDR",
      "Microaneurysm identification patterns",
      "When to refer for laser treatment",
    ],
  },
];

export const STATS = [
  { label: "Total Scans",         value: "1,284", delta: "+12%",       up: true },
  { label: "Positive Detections", value: "347",   delta: "+4.2%",      up: false },
  { label: "Avg Confidence",      value: "91.3%", delta: "+1.8%",      up: true },
  { label: "Cases Reviewed",      value: "89",    delta: "This Month", up: true },
];

// ─── In-memory user store (replace with real auth API) ───────────────────────
export const USER_STORE = [
  { email: "doctor@cervis.ai",  password: "demo1234", name: "Dr. Sarah Al-Rashid", role: "doctor",  specialty: "Senior Radiologist" },
  { email: "student@cervis.ai", password: "demo1234", name: "Ahmed Karimi",         role: "student", specialty: "Medical Student, Y3" },
];
