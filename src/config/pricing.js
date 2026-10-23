/**
 * SahkarSathi Service Pricing Configuration
 * All rates are determined by member cooperatives based on fair-wage guidelines.
 * Edit price values below to update them throughout the web app.
 */
export const PRICING = {
  plumbing: {
    id: "plumbing",
    name: "Plumbing",
    from: 299,
    unit: "visit",
    prosCount: 140,
    icon: "Wrench",
    description: "Leak fixes, pipe fittings, sanitary installation, and water motor repairs.",
  },
  electrical: {
    id: "electrical",
    name: "Electrical",
    from: 249,
    unit: "visit",
    prosCount: 180,
    icon: "Zap",
    description: "Wiring, switchboard upgrades, fuse diagnosis, and safety earthing.",
  },
  acRepair: {
    id: "acRepair",
    name: "AC Repair",
    from: 499,
    unit: "visit",
    prosCount: 95,
    icon: "Wind",
    description: "Deep jet coil cleaning, gas refills, compressor checks, and installations.",
  },
  painting: {
    id: "painting",
    name: "Painting",
    from: 14,
    unit: "sq ft",
    prosCount: 210,
    icon: "PaintBucket",
    description: "Interior emulsions, waterproof exterior coating, and texture wall designs.",
  },
  cleaning: {
    id: "cleaning",
    name: "Cleaning",
    from: 399,
    unit: "visit",
    prosCount: 160,
    icon: "Sparkles",
    description: "Full deep-home sanitization, kitchen chimney degreasing, and sofa shampooing.",
  },
  carpentry: {
    id: "carpentry",
    name: "Carpentry",
    from: 349,
    unit: "visit",
    prosCount: 115,
    icon: "Hammer",
    description: "Custom modular cabinets, door latch repair, furniture restoration, and hinges.",
  },
  vehicleRepair: {
    id: "vehicleRepair",
    name: "Vehicle Repair",
    from: 399,
    unit: "visit",
    prosCount: 85,
    icon: "Car",
    description: "Doorstep two-wheeler & four-wheeler servicing, battery checks, and brake fixes.",
  },
  moving: {
    id: "moving",
    name: "Moving",
    from: 1499,
    unit: "trip",
    prosCount: 70,
    icon: "Truck",
    description: "Multi-partner packing, careful fragile protection, loading, and transit.",
  },
};

export const PRICING_NOTE = "Standard cooperative rates. No surge pricing. No hidden commission.";

/**
 * Helper to format price string uniformly
 */
export function formatPrice(item) {
  if (!item) return "";
  return `₹${item.from} / ${item.unit}`;
}
