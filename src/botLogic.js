import { KNOWLEDGE_DOMAIN, FALLBACK_RESPONSES } from './config.js';

export function detectLanguage(text) {
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
    if (/[\u0900-\u097F]/.test(text)) return 'hi';
    return 'en';
}

export async function getBotResponse(userMessage, currentLang) {
    await new Promise(r => setTimeout(r, 600));

    const msg = userMessage.toLowerCase();
    const lang = detectLanguage(userMessage) || currentLang;

    // Use specific checks first to avoid broad matches catching everything
    if (msg.includes("pg duration")) {
        return `PG Duration: ${KNOWLEDGE_DOMAIN.duration.pg}`;
    }
    if (msg.includes("ug duration")) {
        return `UG Duration: ${KNOWLEDGE_DOMAIN.duration.ug}`;
    }
    if (msg.includes("diploma duration")) {
        return `Diploma Duration: ${KNOWLEDGE_DOMAIN.duration.diploma}`;
    }

    if (msg.includes("pg eligibility")) {
        return `PG Eligibility: ${KNOWLEDGE_DOMAIN.eligibility.pg}`;
    }
    if (msg.includes("ug eligibility")) {
        return `UG Eligibility: ${KNOWLEDGE_DOMAIN.eligibility.ug}`;
    }
    if (msg.includes("diploma eligibility")) {
        return `Diploma Eligibility: ${KNOWLEDGE_DOMAIN.eligibility.diploma}`;
    }

    if (msg.includes("pg fee") || msg.includes("pg cost")) {
        return `PG Fees: ${KNOWLEDGE_DOMAIN.fees.pg}`;
    }
    if (msg.includes("ug fee") || msg.includes("ug cost")) {
        return `UG Fees: ${KNOWLEDGE_DOMAIN.fees.ug}`;
    }
    if (msg.includes("diploma fee") || msg.includes("diploma cost")) {
        return `Diploma Fees: ${KNOWLEDGE_DOMAIN.fees.diploma}`;
    }

    if (msg.includes("hostel fees boys") || msg.includes("hostel boys fees") || msg.includes("hostel fees for boys")) {
        return `Hostel Fees (Boys): ${KNOWLEDGE_DOMAIN.hostel_fees.boys}`;
    }
    if (msg.includes("hostel fees girls") || msg.includes("hostel girls fees") || msg.includes("hostel fees for girls")) {
        return `Hostel Fees (Girls): ${KNOWLEDGE_DOMAIN.hostel_fees.girls}`;
    }

    if (msg.includes("admission dates")) {
        return `Admission Dates: ${KNOWLEDGE_DOMAIN.admissions.dates}`;
    }
    if (msg.includes("admission process") || msg.includes("admission")) {
        return `Admission Process: ${KNOWLEDGE_DOMAIN.admissions.process.join(", ")}`;
    }
    if (msg.includes("admission documents")) {
        return `Admission Documents: ${KNOWLEDGE_DOMAIN.admissions.documents.join(", ")}`;
    }

    if (msg.includes("pg course") || msg.includes("pg")) {
        return `PG: ${KNOWLEDGE_DOMAIN.courses.pg.join(", ")}`;
    }
    if (msg.includes("diploma course") || msg.includes("diploma")) {
        return `Diploma: ${KNOWLEDGE_DOMAIN.courses.diploma.join(", ")}`;
    }
    if (msg.includes("ug course") || msg.includes("ug") || msg.includes("ug")) {
        return `UG: ${KNOWLEDGE_DOMAIN.courses.ug.join(", ")}`;
    }

    if (msg.includes("location")) {
        return `Location: ${KNOWLEDGE_DOMAIN.overview.location}`;
    }

    if (msg.includes("placement") || msg.includes("placement")) {
        return `Top Recruiters: ${KNOWLEDGE_DOMAIN.placements.companies.join(", ")}`;
    }
    if (msg.includes("internship")) {
        return `Internship: ${KNOWLEDGE_DOMAIN.placements.internships}`;
    }

    if (msg.includes("contact")) {
        const c = KNOWLEDGE_DOMAIN.contact_info;
        return `Phone: ${c.phone}, Email: ${c.email}, Website: ${c.website}`;
    }

    if (msg.includes("college") || msg.includes("about")) {
        return `${KNOWLEDGE_DOMAIN.overview.name}, ${KNOWLEDGE_DOMAIN.overview.location}. Vision: ${KNOWLEDGE_DOMAIN.overview.vision}`;
    }

    return FALLBACK_RESPONSES[lang] || FALLBACK_RESPONSES.en;
}