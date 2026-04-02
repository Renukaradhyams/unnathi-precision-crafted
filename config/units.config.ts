import {
  factoryMedia,
  infrastructureMedia,
  machineryMedia,
  qualityMedia,
  teamMedia,
  humanizeFilename,
  type MediaAsset,
} from "@config/media.config";

export type UnitGalleryImage = MediaAsset;

export type UnitMachine = {
  id: string;
  name: string;
  brand: string;
  model: string;
  axis: string;
  image?: string;
  images?: string[];
};

export type UnitSpecification = {
  label: string;
  value: string;
};

export type UnitCertification = {
  name: string;
  image?: string;
};

export type UnitContact = {
  address: string;
  phone: string;
  email: string;
};

export type UnitConfig = {
  id: string;
  name: string;
  location: string;
  address: string;
  specialisation: string;
  specialisationBadges: string[];
  overview: string;
  specifications: UnitSpecification[];
  machines: UnitMachine[];
  capabilities: string[];
  galleryImages: UnitGalleryImage[];
  industries: string[];
  teamDescription: string;
  teamPhoto?: string;
  certifications: UnitCertification[];
  videoSrc?: string;
  contact: UnitContact;
  mapSrc: string;
};

const machineImageSets = {
  turning: [machineryMedia[0].src, machineryMedia[4].src, machineryMedia[5].src],
  vmc: [machineryMedia[1].src, machineryMedia[2].src, machineryMedia[3].src],
  grinding: [machineryMedia[6].src, machineryMedia[8].src],
  wirecut: [machineryMedia[7].src],
  tig: [machineryMedia[26].src],
  orbital: [machineryMedia[10].src],
  heavy: [machineryMedia[13].src, machineryMedia[14].src],
};

const commonMachines: UnitMachine[] = [
  { id: "machine-spec-01", name: humanizeFilename(machineryMedia[0].path), brand: "ACE", model: "J300LM", axis: "2-Axis", image: machineImageSets.turning[0], images: machineImageSets.turning },
  { id: "machine-spec-02", name: humanizeFilename(machineryMedia[4].path), brand: "PRIDE", model: "Unnati-1000", axis: "2-Axis", image: machineImageSets.turning[1], images: machineImageSets.turning },
  { id: "machine-spec-03", name: humanizeFilename(machineryMedia[5].path), brand: "ACE", model: "JOBBER LM", axis: "2-Axis", image: machineImageSets.turning[2], images: machineImageSets.turning },
  { id: "machine-spec-04", name: humanizeFilename(machineryMedia[25].path), brand: "HAAS", model: "ST 20", axis: "2-Axis", image: machineryMedia[25].src, images: [machineryMedia[25].src, ...machineImageSets.turning] },
  { id: "machine-spec-05", name: humanizeFilename(machineryMedia[11].path), brand: "JAGUAR", model: "LX20TL5", axis: "2-Axis", image: machineImageSets.turning[0], images: machineImageSets.turning },
  { id: "machine-spec-06", name: humanizeFilename(machineryMedia[12].path), brand: "PROTECK", model: "PL 500U", axis: "2-Axis", image: machineImageSets.turning[2], images: machineImageSets.turning },
  { id: "machine-spec-07", name: humanizeFilename(machineryMedia[1].path), brand: "BFW", model: "CHAKRA", axis: "5-Axis", image: machineImageSets.vmc[0], images: machineImageSets.vmc },
  { id: "machine-spec-08", name: humanizeFilename(machineryMedia[3].path), brand: "HAAS", model: "DTH1 / VF-2", axis: "3-Axis / 5-Axis", image: machineImageSets.vmc[1], images: machineImageSets.vmc },
  { id: "machine-spec-09", name: humanizeFilename(machineryMedia[17].path), brand: "BFW", model: "AGNI+ / BMV Series", axis: "4-Axis", image: machineryMedia[17].src, images: [machineryMedia[17].src, ...machineImageSets.vmc] },
  { id: "machine-spec-10", name: humanizeFilename(machineryMedia[6].path), brand: "COSMOS", model: "E1050 / 114", axis: "3-Axis", image: machineImageSets.grinding[0], images: machineImageSets.grinding },
  { id: "machine-spec-11", name: humanizeFilename(machineryMedia[8].path), brand: "Micromatic", model: "GCU-350 / ECO-200U", axis: "1-Axis", image: machineImageSets.grinding[1], images: machineImageSets.grinding },
  { id: "machine-spec-12", name: humanizeFilename(machineryMedia[7].path), brand: "Electronica", model: "2 Machines", axis: "1-Axis / 5-Axis", image: machineImageSets.wirecut[0], images: machineImageSets.wirecut },
  { id: "machine-spec-13", name: humanizeFilename(machineryMedia[10].path), brand: "ORBITRON", model: "7000", axis: "Special Purpose", image: machineImageSets.orbital[0], images: machineImageSets.orbital },
  { id: "machine-spec-14", name: humanizeFilename(machineryMedia[26].path), brand: "INDUS-ARC", model: "Standard · Manual", axis: "Manual", image: machineImageSets.tig[0], images: machineImageSets.tig },
  { id: "machine-spec-15", name: humanizeFilename(machineryMedia[13].path), brand: "Heavy Engineering Cell", model: "H-Boring", axis: "Horizontal", image: machineImageSets.heavy[0], images: machineImageSets.heavy },
  { id: "machine-spec-16", name: humanizeFilename(machineryMedia[14].path), brand: "Heavy Engineering Cell", model: "VTL", axis: "Vertical", image: machineImageSets.heavy[1], images: machineImageSets.heavy },
];

const unit2Machines: UnitMachine[] = [
  { id: "u2-machine-01", name: humanizeFilename(machineryMedia[15].path), brand: "PRIDE", model: "Standard", axis: "2-Axis", image: machineryMedia[15].src, images: [machineryMedia[15].src] },
  { id: "u2-machine-02", name: humanizeFilename(machineryMedia[9].path), brand: "BFW Chakra", model: "BMV60 TC20", axis: "3-Axis", image: machineryMedia[9].src, images: [machineryMedia[9].src] },
  { id: "u2-machine-03", name: humanizeFilename(machineryMedia[19].path), brand: "BFW", model: "BMV50 TC24", axis: "3-Axis", image: machineryMedia[19].src, images: [machineryMedia[19].src] },
  { id: "u2-machine-04", name: humanizeFilename(machineryMedia[20].path), brand: "COSMOS", model: "114", axis: "1-Axis", image: machineryMedia[20].src, images: [machineryMedia[20].src] },
  { id: "u2-machine-05", name: humanizeFilename(machineryMedia[8].path), brand: "Micromatic", model: "GCU-350", axis: "1-Axis", image: machineryMedia[8].src, images: [machineryMedia[8].src, machineryMedia[23].src] },
  { id: "u2-machine-06", name: humanizeFilename(machineryMedia[7].path), brand: "Electronica", model: "Standard", axis: "4-Axis", image: machineryMedia[7].src, images: [machineryMedia[7].src, machineryMedia[24].src] },
];

const commonCapabilities = [
  "CNC Turning Centres",
  "Vertical Milling Centres",
  "Surface Grinding Machines",
  "Cylindrical Grinding Machines",
  "Wire Cutting Machines",
  "Orbital Welding",
  "Welding Support",
  "H-Boring & VTL",
  "Major Inspection Instruments",
];

const commonIndustries = ["Pharma Equipment", "Aerospace", "Semi-Conductor", "Machine Tools"];

// humanizeFilename is now imported from @config/media.config

const importGlob = (globResult: Record<string, unknown>, prefixUrl: string): MediaAsset[] => {
  return Object.entries(globResult).map(([path, src], i) => {
    const filename = path.split('/').pop() || '';
    return {
      id: `${prefixUrl}-${i}`,
      label: humanizeFilename(filename),
      section: "factory",
      src: src as string,
      path: path.replace('/src/', 'src/'),
    };
  });
};

const unit1ImagesRaw = import.meta.glob('@/assets/Unnathi-01-web content/*.webp', { eager: true, import: 'default' });
const unit1Gallery = importGlob(unit1ImagesRaw, 'unit1');
unit1Gallery.sort((a, b) => a.path.includes('Unnathi_unit-01_heromain.webp') ? -1 : b.path.includes('Unnathi_unit-01_heromain.webp') ? 1 : 0);

import unit2HeroImg from "@/assets/Main_photos/unnathi_unit-02main.webp";
const unit2HeroAsset: MediaAsset = { id: "unit2-hero", label: "Unit 2 Overview", section: "factory", src: unit2HeroImg, path: "src/assets/Main_photos/unnathi_unit-02main.webp" };
const unit2ImagesRaw = import.meta.glob('@/assets/Unnathi-02-web content/*.webp', { eager: true, import: 'default' });
const unit2Gallery = [unit2HeroAsset, ...importGlob(unit2ImagesRaw, 'unit2')];

import unit3HeroMain from "@/assets/Unnathi-03-web content/Unnathi_unit-03_mainhero.webp";
import passivationJobImg from "@/assets/Unnathi-03-web content/lifting job after passivation.webp";

const unit3ImagesRaw = import.meta.glob('@/assets/Unnathi-03-web content/*.webp', { eager: true, import: 'default' });
const unit3Gallery = importGlob(unit3ImagesRaw, 'unit3');
unit3Gallery.sort((a, b) => a.path.includes('Unnathi_unit-03_mainhero.webp') ? -1 : b.path.includes('Unnathi_unit-03_mainhero.webp') ? 1 : 0);

import unit4HeroMain from "@/assets/Unnathi-04-web content/Unnathi_unit04_mainhero.webp";
import hBoringMachineImg from "@/assets/Unnathi-04-web content/H-boring machine.webp";

const unit4ImagesRaw = import.meta.glob('@/assets/Unnathi-04-web content/*.webp', { eager: true, import: 'default' });
const unit4Gallery = importGlob(unit4ImagesRaw, 'unit4').filter(img => !img.path.endsWith('VTL.webp'));
unit4Gallery.sort((a, b) => a.path.includes('Unnathi_unit04_mainhero.webp') ? -1 : b.path.includes('Unnathi_unit04_mainhero.webp') ? 1 : 0);

export const unitGallerySections = {
  factory: { id: "unit-gallery-factory", label: "Factory / Shop Floor Gallery", description: "Shop-floor images used for Unit-1 and shared factory galleries.", assets: factoryMedia },
  machinery: { id: "unit-gallery-machinery", label: "Machinery Gallery", description: "Machine photos used for Unit-2 and machinery sections.", assets: machineryMedia },
  infrastructure: { id: "unit-gallery-infrastructure", label: "Infrastructure Gallery", description: "Infrastructure photos used for Unit-3 and infrastructure sections.", assets: infrastructureMedia },
  quality: { id: "unit-gallery-quality", label: "Quality Lab Gallery", description: "Quality-inspection photos used for quality sections.", assets: qualityMedia },
  team: { id: "unit-gallery-team", label: "Team / Workforce Gallery", description: "Team photos shared across about/gallery/unit sections.", assets: teamMedia },
} as const;

export const unitsConfig: UnitConfig[] = [
  {
    id: "bangalore-1",
    name: "Unnathi CNC Technologies Pvt Ltd (UNIT-1)",
    location: "Bangalore",
    address: "No.487, D1 & D2, 13th cross, 4th Phase, Peenya Industrial Area, Bangalore-560058",
    specialisation: "Precision component manufacturer",
    specialisationBadges: ["Precision Components", "AS9100D", "ISO 9001:2015"],
    overview: "Unit-1 is our primary precision machining and fabrication facility, housing the core shop floor, welding cells, inspection room, and dispatch-ready infrastructure for repeat aerospace and industrial production.",
    specifications: [
      { label: "Certification", value: "AS 9100D & ISO 9001:2015" },
      { label: "Validity", value: "12/12/2027" },
      { label: "City", value: "Bangalore" },
    ],
    machines: commonMachines.filter(m => m.id !== "machine-spec-15" && m.id !== "machine-spec-16"),
    capabilities: commonCapabilities.filter(c => c !== "H-Boring & VTL"),
    galleryImages: unit1Gallery,
    industries: commonIndustries,
    teamDescription: "Dedicated team of precision engineers, welders, machinists, and quality assurance specialists.",
    teamPhoto: teamMedia[0].src,
    certifications: [{ name: "AS9100D" }, { name: "ISO 9001:2015" }],
    videoSrc: "/videos/unnathi-tour.mp4",
    contact: {
      address: "No.487, D1 & D2, 13th cross, 4th Phase, Peenya Industrial Area, Bangalore-560058",
      phone: "+91 80-41171792",
      email: "rfq@unnathicnc.com",
    },
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.2932493679077!2d77.5018843736754!3d13.016988337302525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3cfac4663ddb%3A0xc169fcf8ebfffd0!2sUnnathi%20CNC%20Technologies%20Pvt%20Ltd%2C%20Unit%201!5e0!3m2!1sen!2sin!4v1775124633753!5m2!1sen!2sin",
  },
  {
    id: "bangalore-2",
    name: "Unnathi CNC Technologies Pvt Ltd (UNIT-2)",
    location: "Bangalore",
    address: "A-418(B), 9th main road, 4th Phase, Peenya Industrial Area, Bangalore -560058",
    specialisation: "Dedicated machining and machine-building unit",
    specialisationBadges: ["Unit 02", "CNC Machining", "Machine Building"],
    overview: "Unit-2 is focused on standalone machine installations and machining capacity, featuring BFW centers, turning machines, grinding, EDM wire cutting, and supporting shop-floor assets for flexible production programs.",
    specifications: [
      { label: "Core Expertise", value: "CNC Machining & Machine Manufacturing" },
      { label: "City", value: "Bangalore" },
    ],
    machines: unit2Machines,
    capabilities: commonCapabilities.filter(c => !["Orbital Welding", "Welding Support", "H-Boring & VTL", "Major Inspection Instruments"].includes(c)),
    galleryImages: unit2Gallery,
    industries: commonIndustries,
    teamDescription: "Specialized machine build, machining, and assembly team for flexible production runs.",
    teamPhoto: teamMedia[1].src,
    certifications: [{ name: "ISO 9001:2015" }],
    videoSrc: "/videos/unnathi-tour.mp4",
    contact: {
      address: "A-418(B), 9th main road, 4th Phase, Peenya Industrial Area, Bangalore -560058",
      phone: "+91 80-41171792",
      email: "rfq@unnathicnc.com",
    },
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.315312433018!2d77.49790728885498!3d13.015581599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d00dbd4c93b%3A0xf3aff97826141941!2sUnnathi%20CNC%20Technologies%20Pvt%20Ltd%20Unit%202!5e0!3m2!1sen!2sin!4v1775125651480!5m2!1sen!2sin",
  },
  {
    id: "bangalore-3",
    name: "Unnathi CNC Technologies Pvt Ltd (UNIT-3)",
    location: "Bangalore",
    address: "No.9/5, Shed No.11, Yerappa Industrial Area, Magadi main road, Channenahalli, Tavarekere Hobli, Bangalore -562130",
    specialisation: "Pickling, electropolishing and passivation",
    specialisationBadges: ["Unit 03", "Surface Treatment", "ISO 9001:2015"],
    overview: "Unit-3 is our process-treatment unit for electropolishing, pickling, passivation, and related finishing flows, supported by process-area imagery, controlled handling, and inspection instrumentation.",
    specifications: [
      { label: "Certification", value: "ISO 9001:2015" },
      { label: "Validity", value: "07/01/2029" },
      { label: "City", value: "Bangalore" },
    ],
    machines: [
      { id: "unit3-ep-tank", name: humanizeFilename(infrastructureMedia[2].path), brand: "Process Plant", model: "High-Purity Electropolishing", axis: "Chemical Process", image: infrastructureMedia[2].src },
      { id: "unit3-passivation", name: "Lifting Job After Passivation", brand: "Process Plant", model: "Acid Passivation", axis: "Chemical Process", image: passivationJobImg },
    ],
    capabilities: [
      "Precision Electropolishing (SS 316L/304)",
      "Chemical Pickling & Scale Removal",
      "Nitric Acid Passivation (ASTM A967)",
      "High-Purity Pharma Component Finishing",
      "Surface Roughness (Ra) Control & Validation",
      "Chemical Resistance Testing",
    ],
    galleryImages: unit3Gallery,
    industries: ["Pharma Equipment"],
    teamDescription: "Process specialists in electropolishing, pickling, passivation, and precision finishing workflows.",
    teamPhoto: teamMedia[2].src,
    certifications: [{ name: "ISO 9001:2015" }],
    videoSrc: "/videos/unnathi-tour.mp4",
    contact: {
      address: "No.9/5, Shed No.11, Yerappa Industrial Area, Magadi main road, Channenahalli, Tavarekere Hobli, Bangalore -562130",
      phone: "+91 80-41171792",
      email: "rfq@unnathicnc.com",
    },
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15551.737614227393!2d77.42066927987061!3d12.976047349719472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3b7ff566fcb3%3A0xd0a37cab388d2d9!2sUnnathi%20CNC%20Technologies%20Pvt%20Ltd%20%2C%203rd%20Unit!5e0!3m2!1sen!2sin!4v1775125723613!5m2!1sen!2sin",
  },
  {
    id: "tumakuru",
    name: "Unnathi CNC Technologies Pvt Ltd (UNIT-4)",
    location: "Tumakuru",
    address: "Plot No.254, Yalladadlu village, Hobli Kora, Nelahala, 2nd Phase, Vasanthanarasapura Industrial Area, Tumakuru -572128",
    specialisation: "Heavy engineering works",
    specialisationBadges: ["Unit 04", "Heavy Engineering", "Large Components"],
    overview: "Unit-4 is the heavy-engineering expansion unit with H-boring, VTL, large shop-floor areas, storage, and building-level infrastructure suited for bigger components and fabrication-intensive programs.",
    specifications: [
      { label: "Specialization", value: "Heavy Engineering" },
      { label: "City", value: "Tumakuru" },
    ],
    machines: [
      { id: "unit4-h-boring", name: humanizeFilename(hBoringMachineImg), brand: "Heavy Engineering Cell", model: "H-Boring", axis: "Horizontal", image: hBoringMachineImg },
      commonMachines[15],
    ],
    capabilities: [
      "H-Boring & VTL: Heavy boring and vertical turning for large-diameter components.",
      "Large-Scale Component Machining (up to Ø 2500 mm)",
      "Precision Horizontal Boring for Industrial Housings",
      "High-Tonnage Material Handling & Logistics",
      "Large-Cylinder Vertical Turning Support",
    ],
    galleryImages: unit4Gallery,
    industries: ["Heavy Engineering", "Large Components"],
    teamDescription: "Heavy engineering production, handling, and logistics experts supporting large-component manufacturing.",
    certifications: [{ name: "ISO 9001:2015" }],
    videoSrc: "/videos/unnathi-tour.mp4",
    contact: {
      address: "Plot No.254, Yalladadlu village, Hobli Kora, Nelahala, 2nd Phase, Vasanthanarasapura Industrial Area, Tumakuru -572128",
      phone: "+91 80-41171792",
      email: "rfq@unnathicnc.com",
    },
    mapSrc: "https://maps.google.com/maps?q=13.506792,77.024323&z=16&output=embed",
  },
];

export const unitsById = Object.fromEntries(unitsConfig.map((unit) => [unit.id, unit]));

export const factoryPhotos = factoryMedia;
export const machineryPhotos = machineryMedia;
export const infrastructurePhotos = infrastructureMedia;
export const qualityLabPhotos = qualityMedia;
export const teamPhotos = teamMedia;
