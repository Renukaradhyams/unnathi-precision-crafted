import {
  Target, Cog, ShieldCheck, Users, Clock, HeartHandshake,
  Plane, Stethoscope, Zap, Wrench
} from "lucide-react";
import { pageSectionMedia } from "./media.config";

export const homeHeroContent = {
  badge: "AS9100D & ISO 9001:2015 Certified",
  title: "UNNATHI CNC Technologies",
  subtitle: "Precision Engineering Excellence Since 2007",
  description: "Delivering high-precision machined components and advanced CNC manufacturing solutions with world-class infrastructure, engineering expertise, and uncompromising quality standards."
};

export const whyChooseContent = [
  { icon: Target, title: "High Precision Engineering", desc: "Tolerances as tight as ±0.005mm across complex geometries with advanced CNC equipment." },
  { icon: Cog, title: "Advanced CNC Infrastructure", desc: "State-of-the-art CNC turning and milling centers with 4-axis and 5-axis machining expertise." },
  { icon: ShieldCheck, title: "Certified Quality Standards", desc: "AS9100D & ISO 9001:2015 certified quality management systems." },
  { icon: Users, title: "Skilled Engineering Workforce", desc: "Experienced engineers, technicians, and quality professionals driving manufacturing excellence." },
  { icon: Clock, title: "On-Time Delivery", desc: "Committed delivery schedules ensuring reliable supply chain performance." },
  { icon: HeartHandshake, title: "Customer-Centric Approach", desc: "Collaborative partnerships with OEMs and engineering companies for optimized solutions." },
];

export const homeIndustriesContent = [
  { icon: Plane, title: "Aerospace", img: pageSectionMedia.home.sections.industriesAerospace.asset.src, desc: "Flight-critical components meeting AS9100D standards for aerospace OEMs." },
  { icon: Stethoscope, title: "Pharma Equipment", img: pageSectionMedia.home.sections.industriesPharma.asset.src, desc: "Precision-machined components for pharma and process equipment applications." },
  { icon: Zap, title: "Semi-Conductor", img: pageSectionMedia.home.sections.industriesSemiconductor.asset.src, desc: "High-precision components for semiconductor manufacturing equipment." },
  { icon: Wrench, title: "Machine Tools", img: pageSectionMedia.home.sections.industriesMachineTools.asset.src, desc: "Reliable machined components for machine tool builders and automation systems." },
];

export const homeCapabilitiesList = [
  "CNC Turning", "CNC Milling", "Precision Machining", "Grinding Operations",
  "Reverse Engineering", "Prototype Development", "Import Substitution", "Jig & Fixture Manufacturing",
];

export const homeMaterialsList = [
  "Carbon Steel", "Alloy Steel", "Stainless Steel", "Aluminium", "Brass & Copper", "Engineering Plastics", "Exotic Alloys",
];

export const homeTestimonials = [
  { name: "Rajesh Kumar", role: "VP Engineering, AeroTech India", text: "UNNATHI CNC consistently delivers components that exceed our stringent aerospace specifications. Their precision and commitment to quality make them our go-to manufacturing partner.", rating: 5 },
  { name: "Dr. Priya Sharma", role: "Director, MedEquip Solutions", text: "Their precision and quality control for medical components is truly exceptional. We've maintained zero-defect delivery for over 3 years with UNNATHI CNC.", rating: 5 },
  { name: "Anil Patel", role: "CEO, AgriMach Solutions", text: "Reliable partner for high-volume precision agricultural components. Outstanding delivery performance and competitive pricing set them apart.", rating: 5 },
  { name: "Sunil Mehta", role: "Head of Procurement, AutoParts Global", text: "From prototyping to batch production, UNNATHI CNC handles it all with remarkable consistency. A trusted partner for our automotive component needs.", rating: 5 },
];

export const corporateOverviewContent = {
  label: "About UNNATHI CNC",
  title: "Precision Engineering Since 2007",
  paragraphs: [
    "UNNATHI CNC Technologies Pvt. Ltd. is a leading precision engineering and CNC machining company established in 2007 and headquartered in Bangalore, India. The company specializes in manufacturing high-precision machined components and assemblies for global customers across multiple engineering sectors.",
    "With advanced CNC infrastructure, experienced engineering teams, and a strong quality-driven culture, we have built a reputation for delivering reliable, high-quality components that meet stringent technical specifications and industry standards."
  ],
  badges: ["AS9100D Certified", "ISO 9001:2015", "4 Manufacturing Units", "Since 2007"]
};

export const homeInfrastructurePreview = [
  { title: "VMC", section: "infrastructureCenters", items: ["Vertical Machining Centers (VMC)", "4-Axis & 5-Axis Machines", "High-Speed Machining"] },
  { title: "CNC Turning Centers", section: "infrastructureTurning", items: ["Multi-Axis CNC Lathes", "Swiss-Type Lathes", "Turn-Mill Combined Centers"] },
  { title: "Quality & Inspection", section: "infrastructureQuality", items: ["Profile Projector", "Digital Height Master", "Precision Measuring Instruments"] },
];

export const homeExploreSection = {
  label: "Explore Our Facility",
  title: "Manufacturing Excellence in Action",
  description: "A virtual walkthrough of our advanced CNC facilities and core engineering capabilities.",
  videoTitle: "Inside the Shopfloor",
  videoDescription: "Take a closer look at our world-class manufacturing units and precision-driven processes."
};

export const homeBrochureSection = {
  title: "Corporate Brochure",
  description: "Download our corporate profile for a complete overview of our CNC machinery, manufacturing infrastructure, and quality credentials.",
  items: [
    "CNC Turning & Milling Capabilities",
    "AS9100D & ISO 9001:2015 Certified",
    "Multi-Unit Manufacturing Network",
  ]
};

export const homeStatsSection = {
  label: "By The Numbers",
  title: "Our Manufacturing Scale"
};
