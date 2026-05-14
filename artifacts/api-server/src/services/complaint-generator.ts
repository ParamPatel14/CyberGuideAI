export interface ComplaintInput {
  fraudType: string;
  victimName: string;
  victimAddress?: string | null;
  victimPhone?: string | null;
  incidentDate?: string | null;
  amountLost?: number | null;
  bankName?: string | null;
  transactionId?: string | null;
  description: string;
}

export interface ComplaintResult {
  firDraft: string;
  bankComplaintDraft: string;
  cybercrimeComplaintDraft: string;
}

export function generateComplaints(input: ComplaintInput): ComplaintResult {
  const {
    fraudType,
    victimName,
    victimAddress,
    victimPhone,
    incidentDate,
    amountLost,
    bankName,
    transactionId,
    description,
  } = input;

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const amount = amountLost
    ? `Rs. ${amountLost.toLocaleString("en-IN")} (Rupees ${numberToWords(amountLost)})`
    : "an undisclosed amount";

  const firDraft = `FIRST INFORMATION REPORT (FIR)
To,
The Station House Officer,
[Nearest Police Station / Cybercrime Cell]
[City, State]

Date: ${today}

Subject: Complaint regarding ${fraudType} — Request for FIR Registration

Respected Sir/Madam,

I, ${victimName}, ${victimAddress ? `residing at ${victimAddress}, ` : ""}${victimPhone ? `contactable at ${victimPhone}, ` : ""}hereby lodge a formal complaint regarding a cyber fraud I have been subjected to.

INCIDENT DETAILS:
----------------
Nature of Fraud: ${fraudType}
Date of Incident: ${incidentDate ?? "As described below"}
Amount Defrauded: ${amount}
${transactionId ? `Transaction/Reference ID: ${transactionId}` : ""}
${bankName ? `Bank Involved: ${bankName}` : ""}

DESCRIPTION OF INCIDENT:
------------------------
${description}

IMMEDIATE ACTIONS TAKEN:
------------------------
1. Reported to National Cybercrime Helpline (1930)
2. Notified ${bankName ?? "my bank"} about the fraudulent transaction
3. Filed complaint at cybercrime.gov.in

I, ${victimName}, solemnly declare that the above information is true to the best of my knowledge and belief. I request you to kindly register an FIR in this matter and take appropriate legal action against the accused person(s).

I am willing to cooperate fully with your investigation and provide any additional documents or information required.

Yours faithfully,
${victimName}
${victimAddress ?? "[Your Address]"}
${victimPhone ?? "[Your Phone Number]"}
Date: ${today}

[Enclosures: Transaction records, screenshots, communication evidence as applicable]`;

  const bankComplaintDraft = `FORMAL COMPLAINT — UNAUTHORIZED TRANSACTION / CYBER FRAUD

Date: ${today}

To,
The Branch Manager / Fraud Investigation Department
${bankName ?? "[Bank Name]"}
[Branch Address]

Subject: Urgent Complaint Regarding Unauthorized ${fraudType} — Request for Immediate Account Freeze and Fund Recovery

Dear Sir/Madam,

I, ${victimName}, ${victimAddress ? `residing at ${victimAddress}, ` : ""}am writing to formally report an unauthorized fraudulent transaction on my account and to request immediate corrective action.

MY ACCOUNT DETAILS:
-------------------
Account Holder: ${victimName}
Contact: ${victimPhone ?? "[Phone Number]"}
${transactionId ? `Transaction Reference: ${transactionId}` : ""}

FRAUD DETAILS:
--------------
Type of Fraud: ${fraudType}
Date and Time: ${incidentDate ?? "[Date of Incident]"}
Amount Defrauded: ${amount}
Fraud Description: ${description}

ACTIONS REQUESTED:
------------------
1. Immediately freeze/block the beneficiary account to prevent further fund transfer
2. Initiate a chargeback/reversal request for the fraudulent transaction (Ref: ${transactionId ?? "as per records"})
3. Provide a written acknowledgment of this complaint with a case/reference number
4. Escalate to your bank's dedicated fraud investigation cell
5. Share the beneficiary account details with cybercrime authorities as required under RBI guidelines

REGULATORY REFERENCE:
---------------------
As per RBI Circular on Customer Protection — Limiting Liability of Customers in Unauthorized Electronic Banking Transactions (RBI/2017-18/15), as a customer, I am entitled to limited/zero liability depending on the nature and reporting time of the fraud. This complaint is being submitted within the stipulated reporting window.

Please acknowledge receipt of this complaint within 24 hours and provide a resolution timeline as required under the Banking Ombudsman Scheme.

I have also filed a complaint with:
- National Cybercrime Helpline (1930) — [Reference Number]
- cybercrime.gov.in — [Complaint ID if available]

Yours faithfully,
${victimName}
${victimAddress ?? "[Address]"}
${victimPhone ?? "[Phone]"}
Date: ${today}

[Enclosures: Copy of transaction records, bank statement, communication screenshots, cybercrime complaint acknowledgment]`;

  const cybercrimeComplaintDraft = `CYBERCRIME COMPLAINT — ${fraudType.toUpperCase()}

SUBMITTED TO: National Cyber Crime Reporting Portal (cybercrime.gov.in)
OR
SUBMITTED TO: Cyber Crime Police Station, [City]

Date: ${today}

COMPLAINANT DETAILS:
--------------------
Name: ${victimName}
Address: ${victimAddress ?? "[Your Complete Address]"}
Phone: ${victimPhone ?? "[Your Phone Number]"}
Email: [Your Email Address]

NATURE OF CYBERCRIME:
---------------------
Category: Financial Fraud / ${fraudType}
Sub-Category: Online Financial Fraud

INCIDENT DETAILS:
-----------------
Date and Time of Incident: ${incidentDate ?? "[Date and Approximate Time]"}
Platform/Mode Used: ${fraudType.includes("UPI") ? "UPI" : fraudType.includes("Social") ? "Social Media" : fraudType.includes("Investment") ? "Online Investment Platform" : "Digital/Online Medium"}
Amount Involved: ${amount}
${transactionId ? `Transaction Reference: ${transactionId}` : ""}
${bankName ? `Victim's Bank: ${bankName}` : ""}

ACCUSED/SUSPECT DETAILS:
-------------------------
[If known — Phone number, UPI ID, Email, Social media handle, Website URL, Account number]
Note: All known suspect details have been preserved as evidence.

DETAILED NARRATION OF INCIDENT:
---------------------------------
${description}

EVIDENCE AVAILABLE:
-------------------
1. Screenshots of fraudulent communication / platform
2. Bank transaction records and UTR numbers
3. Call/SMS records from fraudster
4. [Any other evidence available]

IMMEDIATE ACTIONS TAKEN BY COMPLAINANT:
----------------------------------------
1. Reported to National Cybercrime Helpline — 1930 on ${today}
2. Notified ${bankName ?? "bank"} of the unauthorized transaction
3. Preserved all digital evidence
4. [Any other actions taken]

RELIEF SOUGHT:
--------------
1. Registration of FIR and investigation of the cyber crime
2. Freezing of accused's accounts to prevent further transactions
3. Recovery of defrauded amount of ${amount}
4. Prosecution of the accused persons under relevant sections of the Information Technology Act, 2000 and Indian Penal Code

DECLARATION:
------------
I hereby declare that the information provided above is true and correct to the best of my knowledge. I understand that providing false information to cybercrime authorities is a punishable offence.

Signature: _______________
Name: ${victimName}
Date: ${today}
Place: [Your City]`;

  return { firDraft, bankComplaintDraft, cybercrimeComplaintDraft };
}

function numberToWords(num: number): string {
  if (num >= 10000000) return `${(num / 10000000).toFixed(2)} Crores Only`;
  if (num >= 100000) return `${(num / 100000).toFixed(2)} Lakhs Only`;
  if (num >= 1000) return `${(num / 1000).toFixed(2)} Thousand Only`;
  return `${num} Only`;
}
