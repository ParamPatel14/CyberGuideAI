export interface TrendingScam {
  name: string;
  description: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  reportedCases: number;
  trend: "RISING" | "STABLE" | "DECLINING";
  targetGroup: string;
}

export interface ScamCategory {
  id: string;
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface FraudStatistics {
  totalCasesReported: number;
  totalAmountLost: number;
  recoveryRate: number;
  mostCommonFraudType: string;
  averageAmountLost: number;
  casesThisMonth: number;
}

export interface PreventionTip {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface AlertCard {
  id: string;
  title: string;
  message: string;
  severity: "INFO" | "WARNING" | "DANGER" | "CRITICAL";
  date: string;
}

export interface AwarenessData {
  trendingScams: TrendingScam[];
  categories: ScamCategory[];
  statistics: FraudStatistics;
  preventionTips: PreventionTip[];
  alertCards: AlertCard[];
}

export function getAwarenessData(): AwarenessData {
  const trendingScams: TrendingScam[] = [
    {
      name: "AI-Powered Deepfake Voice Scams",
      description: "Fraudsters use AI to clone voices of family members or officials to demand urgent money transfers, bypassing victim skepticism entirely.",
      riskLevel: "CRITICAL",
      reportedCases: 8420,
      trend: "RISING",
      targetGroup: "Adults 30-60, especially those with elderly parents",
    },
    {
      name: "Digital Arrest Scam",
      description: "Caller claims to be from CBI, ED, or Customs and threatens 'digital arrest' for alleged crimes unless a fine is paid immediately via UPI.",
      riskLevel: "CRITICAL",
      reportedCases: 14200,
      trend: "RISING",
      targetGroup: "Working professionals and senior citizens",
    },
    {
      name: "Fake Investment Trading Platforms",
      description: "Victims are invited to 'premium' stock trading or crypto groups on WhatsApp/Telegram, shown fake profits, then unable to withdraw funds.",
      riskLevel: "HIGH",
      reportedCases: 22100,
      trend: "RISING",
      targetGroup: "Young adults aged 25-40 seeking high returns",
    },
    {
      name: "OTP Bypass KYC Scam",
      description: "Posing as bank or telecom officials, scammers collect OTPs under the guise of mandatory KYC updates, then drain accounts.",
      riskLevel: "HIGH",
      reportedCases: 31500,
      trend: "STABLE",
      targetGroup: "All age groups, especially mobile banking users",
    },
    {
      name: "Part-Time Job / Task Fraud",
      description: "Victims are hired for fake work-from-home tasks (liking videos, reviewing products), paid small amounts initially, then asked to invest for larger returns.",
      riskLevel: "HIGH",
      reportedCases: 28700,
      trend: "RISING",
      targetGroup: "Students, homemakers, and recently unemployed",
    },
    {
      name: "Romance Scam (Dating App Fraud)",
      description: "Fraudsters build romantic relationships on dating apps over weeks, then request money for emergencies, medical bills, or travel to meet the victim.",
      riskLevel: "MEDIUM",
      reportedCases: 9300,
      trend: "STABLE",
      targetGroup: "Single adults aged 28-55",
    },
    {
      name: "Fake Government Scheme Fraud",
      description: "SMS/WhatsApp messages claim victim has won a government housing scheme, PM Kisan, or insurance payout — requesting registration fees.",
      riskLevel: "MEDIUM",
      reportedCases: 18900,
      trend: "DECLINING",
      targetGroup: "Rural populations and senior citizens",
    },
    {
      name: "QR Code Payment Reversal Scam",
      description: "Fraudsters request payment reversal by sending a QR code to scan — scanning the QR authorizes a debit, not a credit.",
      riskLevel: "HIGH",
      reportedCases: 12400,
      trend: "RISING",
      targetGroup: "Online sellers and marketplace users",
    },
  ];

  const categories: ScamCategory[] = [
    { id: "financial", name: "Financial Fraud", count: 98400, percentage: 34.2, color: "#ef4444" },
    { id: "investment", name: "Investment Scam", count: 64200, percentage: 22.3, color: "#f97316" },
    { id: "identity", name: "Identity Theft", count: 41800, percentage: 14.5, color: "#eab308" },
    { id: "social", name: "Social Engineering", count: 38100, percentage: 13.2, color: "#8b5cf6" },
    { id: "ecommerce", name: "E-Commerce Fraud", count: 26700, percentage: 9.3, color: "#06b6d4" },
    { id: "job", name: "Job/Employment Fraud", count: 18900, percentage: 6.5, color: "#22c55e" },
  ];

  const statistics: FraudStatistics = {
    totalCasesReported: 1247832,
    totalAmountLost: 17842000000,
    recoveryRate: 11.4,
    mostCommonFraudType: "OTP Fraud",
    averageAmountLost: 142000,
    casesThisMonth: 38241,
  };

  const preventionTips: PreventionTip[] = [
    {
      id: "tip-1",
      title: "Never Share OTPs or PINs",
      description: "No bank, government agency, or legitimate company will ever call you to ask for your OTP, PIN, CVV, or password. These are for your eyes only.",
      category: "Account Security",
    },
    {
      id: "tip-2",
      title: "Verify Before You Transfer",
      description: "Always call back the person on their official number before sending any money, even if they sound like your boss or family member.",
      category: "Payment Safety",
    },
    {
      id: "tip-3",
      title: "Check URLs Carefully",
      description: "Fraudulent websites often use domain names like 'sbi-login.com' instead of 'sbi.co.in'. Always type bank URLs directly and look for the padlock icon.",
      category: "Online Safety",
    },
    {
      id: "tip-4",
      title: "Enable Transaction Alerts",
      description: "Set up SMS and email alerts for every transaction so you can immediately detect unauthorized activity and report it within the critical 1-hour window.",
      category: "Monitoring",
    },
    {
      id: "tip-5",
      title: "No Government Agency Does Digital Arrests",
      description: "CBI, ED, Police, and Customs agencies do not conduct video-call arrests. If someone threatens you online, disconnect immediately and call 1930.",
      category: "Scam Awareness",
    },
    {
      id: "tip-6",
      title: "Research Investment Platforms Thoroughly",
      description: "Verify any investment platform is registered with SEBI at sebi.gov.in. If you cannot find it, it is a scam. No legitimate platform guarantees returns.",
      category: "Investment Safety",
    },
    {
      id: "tip-7",
      title: "Use Strong, Unique Passwords",
      description: "Use a different strong password for every important account. Enable two-factor authentication using an authenticator app, not just SMS.",
      category: "Account Security",
    },
    {
      id: "tip-8",
      title: "Be Wary of 'Too Good to Be True' Offers",
      description: "Part-time jobs paying Rs 5000/hour, 300% investment returns, or lottery wins you never entered are 100% scams. Your greed is their weapon.",
      category: "Scam Awareness",
    },
  ];

  const alertCards: AlertCard[] = [
    {
      id: "alert-1",
      title: "CRITICAL: Digital Arrest Scams Surge 340%",
      message: "Fraudsters posing as CBI/ED/Police officers are conducting fake video call 'digital arrests'. Government agencies do not arrest via video call. Hang up immediately and call 1930.",
      severity: "CRITICAL",
      date: new Date().toISOString(),
    },
    {
      id: "alert-2",
      title: "WARNING: AI Voice Cloning Used in New Scam Wave",
      message: "Cybercriminals are using AI to clone voices of your relatives to request emergency transfers. Always verify by calling the actual person on their known number.",
      severity: "DANGER",
      date: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "alert-3",
      title: "Alert: Fake Trading App Investment Scam",
      message: "Multiple reports of fake 'VIP trading groups' on Telegram promising guaranteed stock market profits. SEBI has issued warnings — verify platform registration before investing.",
      severity: "WARNING",
      date: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: "alert-4",
      title: "INFO: New Helpline for Fraud Victims",
      message: "The National Cybercrime Helpline (1930) now operates 24x7 with faster response times. Call within 1 hour of fraud for the best chance of fund recovery.",
      severity: "INFO",
      date: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      id: "alert-5",
      title: "WARNING: QR Code Scam Targeting Marketplace Sellers",
      message: "Fraudsters are sending QR codes claiming to 'send payment'. Scanning these QR codes authorizes a debit, not a credit. Never scan a buyer's QR code.",
      severity: "DANGER",
      date: new Date(Date.now() - 345600000).toISOString(),
    },
  ];

  return { trendingScams, categories, statistics, preventionTips, alertCards };
}
