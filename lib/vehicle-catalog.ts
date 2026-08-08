/**
 * Year / make / model pickers for the estimate form.
 * Popular models per make (US market) — not exhaustive; includes "Other".
 */

const CURRENT_YEAR = new Date().getFullYear();

/** Model years: current+1 (new models) down to 1990 */
export const VEHICLE_YEARS: string[] = Array.from(
  { length: CURRENT_YEAR + 1 - 1990 + 1 },
  (_, i) => String(CURRENT_YEAR + 1 - i),
);

/** Common makes we see in North Jersey + other popular brands */
export const VEHICLE_MAKES = [
  "Acura",
  "Audi",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ford",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jeep",
  "Kia",
  "Lexus",
  "Lincoln",
  "Mazda",
  "Mercedes-Benz",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Ram",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
  "Other",
] as const;

export type VehicleMake = (typeof VEHICLE_MAKES)[number];

/** Popular models by make (alphabetical within make) */
export const VEHICLE_MODELS: Record<string, readonly string[]> = {
  Acura: ["ILX", "Integra", "MDX", "RDX", "TLX", "Other"],
  Audi: ["A3", "A4", "A5", "A6", "Q3", "Q5", "Q7", "Q8", "Other"],
  BMW: ["2 Series", "3 Series", "4 Series", "5 Series", "X1", "X3", "X5", "X7", "Other"],
  Buick: ["Enclave", "Encore", "Envision", "Other"],
  Cadillac: ["CT4", "CT5", "Escalade", "XT4", "XT5", "XT6", "Other"],
  Chevrolet: [
    "Blazer",
    "Camaro",
    "Colorado",
    "Equinox",
    "Malibu",
    "Silverado",
    "Suburban",
    "Tahoe",
    "Traverse",
    "Trax",
    "Other",
  ],
  Chrysler: ["300", "Pacifica", "Other"],
  Dodge: ["Challenger", "Charger", "Durango", "Hornet", "Other"],
  Ford: [
    "Bronco",
    "Edge",
    "Escape",
    "Explorer",
    "F-150",
    "F-250",
    "Fusion",
    "Mustang",
    "Ranger",
    "Other",
  ],
  GMC: ["Acadia", "Canyon", "Sierra", "Terrain", "Yukon", "Other"],
  Honda: [
    "Accord",
    "Civic",
    "CR-V",
    "HR-V",
    "Odyssey",
    "Passport",
    "Pilot",
    "Ridgeline",
    "Other",
  ],
  Hyundai: ["Elantra", "Kona", "Palisade", "Santa Fe", "Sonata", "Tucson", "Venue", "Other"],
  Infiniti: ["Q50", "QX50", "QX55", "QX60", "QX80", "Other"],
  Jeep: ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Renegade", "Wrangler", "Other"],
  Kia: ["Forte", "K5", "Soul", "Sorento", "Sportage", "Telluride", "Other"],
  Lexus: ["ES", "GX", "IS", "NX", "RX", "UX", "Other"],
  Lincoln: ["Aviator", "Corsair", "Nautilus", "Navigator", "Other"],
  Mazda: ["CX-30", "CX-5", "CX-50", "CX-9", "Mazda3", "Mazda6", "Other"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "GLA", "GLC", "GLE", "GLS", "Other"],
  MINI: ["Clubman", "Convertible", "Countryman", "Hardtop", "Other"],
  Mitsubishi: ["Eclipse Cross", "Outlander", "Outlander Sport", "Other"],
  Nissan: [
    "Altima",
    "Frontier",
    "Kicks",
    "Maxima",
    "Murano",
    "Pathfinder",
    "Rogue",
    "Sentra",
    "Titan",
    "Other",
  ],
  Ram: ["1500", "2500", "3500", "ProMaster", "Other"],
  Subaru: ["Ascent", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "WRX", "Other"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y", "Other"],
  Toyota: [
    "4Runner",
    "Camry",
    "Corolla",
    "Highlander",
    "Prius",
    "RAV4",
    "Sienna",
    "Tacoma",
    "Tundra",
    "Other",
  ],
  Volkswagen: ["Atlas", "Golf", "ID.4", "Jetta", "Passat", "Tiguan", "Other"],
  Volvo: ["S60", "S90", "XC40", "XC60", "XC90", "Other"],
  Other: ["Other"],
};

export function modelsForMake(make: string): readonly string[] {
  if (!make) return [];
  return VEHICLE_MODELS[make] ?? ["Other"];
}

/** Insurers commonly used in NJ — plus Other for free text */
export const INSURER_OPTIONS = [
  "Progressive",
  "GEICO",
  "State Farm",
  "Allstate",
  "Liberty Mutual",
  "NJM",
  "Travelers",
  "USAA",
  "Nationwide",
  "Farmers",
  "Plymouth Rock",
  "Selective",
  "Amica",
  "Erie",
  "New Jersey Manufacturers",
  "No insurance / cash job",
  "Other",
] as const;
