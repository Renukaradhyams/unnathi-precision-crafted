export const contactConfig = {
  phones: {
    landline: "080-41171792",
    mobile: "+91 9480686747",
  },
  emails: {
    rfq: "rfq@unnathicnc.com",
    careers: "careers@unnathicnc.com",
  },
  registeredAddress: "No.487 D1 & D2, 13th Cross, 4th Phase, Peenya Industrial Area, Bangalore – 560058, Karnataka, India",
} as const;

export type ContactConfig = typeof contactConfig;
