import { SiGooglecloud, SiMongodb, SiPostgresql } from "react-icons/si";
import { FaReact, FaLock , FaCloud, FaChartBar, FaMobileAlt, FaHandshake, FaNodeJs, FaPython, FaJs, FaShieldAlt, FaServer, FaCode, FaGlobe, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import {
  cloudInfra,
  customeSoftwareDevelopment,
  dataAnalytics,
  mobileAppDevelopment,
  ITConsulting,
  cyberSecurity,
  webAppDevelopment
} from "../assets/assets.js";

export const services = [
  {
    id: 1,
    title: "Web Development",
    shortDescription: "Scalable and high-performance web applications using modern technologies.",
    description:
      "Craft robust web applications tailored to your business needs. Our team builds responsive, secure, and user-friendly solutions with the latest web technologies.",
    techStack: [
      { name: "HTML", icon: FaHtml5, color: "text-red-600" },
      { name: "CSS", icon: FaCss3Alt, color: "text-blue-600" },
      { name: "JavaScript", icon: FaJs, color: "text-yellow-500" },
      { name: "React", icon: FaReact, color: "text-blue-600" },
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
    ],
    color: "text-blue-600",
    icon: FaGlobe,
    iconColor: "text-blue-600",
    bgImage: webAppDevelopment,
    bgGradient: "from-blue-50 to-sky-50",
    borderColor: "border-blue-200",
  },
  {
    id: 2,
    title: "Mobile App Development",
    shortDescription: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
    description:
      "Build engaging mobile experiences with our cross-platform app development services. We deliver native, hybrid, and progressive web apps tailored to your audience.",
    techStack: [{ name: "Mobile", icon: FaMobileAlt, color: "text-blue-500" }],
    color: "text-green-600",
    icon: FaMobileAlt,
    iconColor: "text-green-600",
    bgImage: mobileAppDevelopment,
    bgGradient: "from-green-50 to-emerald-50",
    borderColor: "border-green-200",
  },
  {
    id: 3,
    title: "Custom Software Development",
    shortDescription: "Tailored solutions built with cutting-edge technologies to meet your unique business requirements.",
    description:
      "We develop powerful, secure, and scalable software tailored to your unique business processes. From concept to deployment, our agile teams deliver high-quality custom solutions that align with your goals.",
    techStack: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      { name: "Python", icon: FaPython, color: "text-blue-500" },
      { name: "JavaScript", icon: FaJs, color: "text-yellow-500" },
    ],
    icon: FaCode,
    color: "text-blue-600",
    iconColor: "text-blue-600",
    bgImage: customeSoftwareDevelopment,
    bgGradient: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
  },
  {
    id: 4,
    title: "Cybersecurity Solutions",
    shortDescription: "Comprehensive security services to protect your digital assets and ensure business continuity.",
    description:
      "Protect your digital infrastructure with our end-to-end cybersecurity services. We provide threat assessments, network security, endpoint protection, and disaster recovery to keep your assets safe.",
    techStack: [
      { name: "Security", icon: FaShieldAlt, color: "text-red-500" },
      { name: "Encryption", icon: FaLock, color: "text-green-600" },
    ],
    color: "text-red-600",
    icon: FaShieldAlt,
    iconColor: "text-red-600",
    bgImage: cyberSecurity,
    bgGradient: "from-red-50 to-pink-50",
    borderColor: "border-red-200",
  },
  {
    id: 5,
    title: "Cloud Infrastructure",
    shortDescription: "Scalable cloud solutions for modern businesses seeking flexibility and cost-effectiveness.",
    description:
      "Unlock flexibility and scalability with our cloud infrastructure solutions. We assist with cloud migration, architecture, optimization, and maintenance for AWS, Azure, and GCP.",
    techStack: [{ name: "GCP", icon: SiGooglecloud, color: "text-blue-500" }],
    color: "text-blue-600",
    icon: FaCloud,
    iconColor: "text-blue-600",
    bgImage: cloudInfra,
    bgGradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
  },
  {
    id: 6,
    title: "Data Analytics",
    shortDescription: "Transform raw data into actionable insights with our advanced analytics and reporting tools.",
    description:
      "Convert raw data into actionable insights. Our advanced analytics and reporting tools help you make informed decisions, improve customer experiences, and boost ROI.",
    techStack: [
      { name: "Analytics", icon: FaChartBar, color: "text-purple-500" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
    ],
    color: "text-purple-600",
    icon: FaChartBar,
    iconColor: "text-purple-600",
    bgImage: dataAnalytics,
    bgGradient: "from-purple-50 to-violet-50",
    borderColor: "border-purple-200",
  }
];
