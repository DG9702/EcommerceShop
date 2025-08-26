// utils/countries.ts
export interface Country {
  code: string;      // ISO 3166-1 alpha-2
  name: string;      // Country name
  dial_code: string; // International dial code
}

export const countries: Country[] = [
  { code: "VN", name: "Vietnam", dial_code: "+84" },
  { code: "US", name: "United States", dial_code: "+1" },
  { code: "JP", name: "Japan", dial_code: "+81" },
  { code: "KR", name: "South Korea", dial_code: "+82" },
  { code: "FR", name: "France", dial_code: "+33" },
  { code: "DE", name: "Germany", dial_code: "+49" },
  { code: "GB", name: "United Kingdom", dial_code: "+44" },
  { code: "CA", name: "Canada", dial_code: "+1" },
  { code: "AU", name: "Australia", dial_code: "+61" },
  { code: "IN", name: "India", dial_code: "+91" },
  { code: "CN", name: "China", dial_code: "+86" },
  { code: "TH", name: "Thailand", dial_code: "+66" },
  { code: "SG", name: "Singapore", dial_code: "+65" },
  { code: "MY", name: "Malaysia", dial_code: "+60" },
  { code: "PH", name: "Philippines", dial_code: "+63" },
  { code: "ID", name: "Indonesia", dial_code: "+62" },
  { code: "KH", name: "Cambodia", dial_code: "+855" },
  { code: "LA", name: "Laos", dial_code: "+856" },
  { code: "MM", name: "Myanmar", dial_code: "+95" },
  { code: "BR", name: "Brazil", dial_code: "+55" },
  { code: "AR", name: "Argentina", dial_code: "+54" },
  { code: "MX", name: "Mexico", dial_code: "+52" },
  { code: "ES", name: "Spain", dial_code: "+34" },
  { code: "IT", name: "Italy", dial_code: "+39" },
  { code: "SE", name: "Sweden", dial_code: "+46" },
  { code: "NO", name: "Norway", dial_code: "+47" },
  { code: "FI", name: "Finland", dial_code: "+358" },
  { code: "DK", name: "Denmark", dial_code: "+45" },
  { code: "RU", name: "Russia", dial_code: "+7" },
  { code: "TR", name: "Turkey", dial_code: "+90" },
  { code: "SA", name: "Saudi Arabia", dial_code: "+966" },
  { code: "AE", name: "United Arab Emirates", dial_code: "+971" },
  { code: "IL", name: "Israel", dial_code: "+972" },
  { code: "ZA", name: "South Africa", dial_code: "+27" },
  { code: "NG", name: "Nigeria", dial_code: "+234" },
  { code: "EG", name: "Egypt", dial_code: "+20" },
  { code: "PK", name: "Pakistan", dial_code: "+92" },
  { code: "BD", name: "Bangladesh", dial_code: "+880" },
  { code: "NZ", name: "New Zealand", dial_code: "+64" },
];
