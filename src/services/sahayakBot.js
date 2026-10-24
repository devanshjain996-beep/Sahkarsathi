/**
 * Sahayak Cooperative AI Assistant - Response Engine
 * Provides intelligent, polite, and contextual responses for SahkarSathi.
 * 
 * Logic rules:
 * 1. SahkarSathi-related question -> Answer using platform knowledge/data.
 * 2. Greeting -> Respond with a polite greeting.
 * 3. Gratitude -> Respond politely ("You're welcome! I'm happy to help.").
 * 4. Random / Off-topic -> Politely explain Sahayak's purpose and request a platform question.
 * 5. Meaningless / Nonsense -> Politely ask the user to rephrase their question.
 * 
 * Never responds with "Thank you" to unknown, random, or nonsense queries.
 */

import { BRAND } from "../config/brand.js";

// Keyboard mash patterns commonly typed when users test nonsense
const KEYBOARD_SEQUENCES = [
  "asdfghjkl",
  "lkjhgfdsa",
  "qwertyuiop",
  "poiuytrewq",
  "zxcvbnm",
  "mnbvcxz",
  "qazwsx",
  "wsxedc",
  "edcrfv",
  "rfvtgb",
  "12345678",
  "87654321",
];

/**
 * Detect if input is meaningless or nonsensical gibberish
 */
export function isNonsense(text) {
  const clean = (text || "").trim().toLowerCase();
  if (!clean) return true;

  // 1. Check if string contains NO letters at all (only symbols, numbers, punctuation)
  if (!/[a-z\u0900-\u097F]/i.test(clean)) {
    // Exception: Exactly 8 digits could be a cooperative ID
    if (/^\d{8}$/.test(clean)) return false;
    return true;
  }

  // 2. Check for keyboard mash sequence matches (5+ consecutive keys from standard rows)
  for (const seq of KEYBOARD_SEQUENCES) {
    if (clean.includes(seq) || (seq.includes(clean) && clean.length >= 5)) {
      return true;
    }
  }

  // 3. Excessive repeated characters like "aaaaaaa", "zzzzzz", "!!!!!!"
  if (/(.)\1{3,}/.test(clean)) {
    return true;
  }

  // 4. In Latin script: check words for long unbroken consonant clusters or missing vowels
  const words = clean.split(/\s+/).filter(Boolean);
  let gibberishWordCount = 0;

  for (const word of words) {
    const stripped = word.replace(/[^a-z]/gi, "");
    if (!stripped) continue;

    // 5 or more consecutive consonants (excluding 'y' which acts as a vowel)
    if (/[bcdfghjklmnpqrstvwxz]{5,}/i.test(stripped)) {
      return true;
    }

    // A word of 4 or more letters with zero vowels (and not known abbreviations)
    const hasVowel = /[aeiouy]/i.test(stripped);
    if (stripped.length >= 4 && !hasVowel) {
      return true;
    }

    // Single words of length >= 7 with extremely low vowel ratio (< 15%)
    if (stripped.length >= 7) {
      const vowelCount = (stripped.match(/[aeiouy]/gi) || []).length;
      if (vowelCount / stripped.length < 0.15) {
        gibberishWordCount++;
      }
    }
  }

  if (words.length > 0 && gibberishWordCount === words.length) {
    return true;
  }

  return false;
}

/**
 * Detect language of the input
 * Returns "hi" if Devanagari or predominantly Hindi/Hinglish, else "en"
 */
export function detectLanguage(text, defaultLang = "en") {
  if (!text) return defaultLang;

  // 1. Devanagari script presence is a definite indicator of Hindi
  if (/[\u0900-\u097F]/.test(text)) {
    return "hi";
  }

  const clean = text.toLowerCase().trim();

  // 2. Distinct Hinglish vocabulary that indicates the user is writing Hindi in Roman script
  const hinglishTokens = [
    "kaise", "kya", "karo", "batao", "chahiye", "madad", "karigar",
    "kripya", "kripaya", "kitna", "daam", "paise", "karna", "bhai",
    "shukriya", "dhanyawad", "dhanyavad", "pranam"
  ];
  
  const hasHinglish = hinglishTokens.some((t) => new RegExp(`\\b${t}\\b`, "i").test(clean));
  const hasEnglishWords = /\b(how|what|why|who|when|where|can|could|would|please|tell|joke|mars|capital|thank|hello|hi|welcome)\b/i.test(clean);

  if (hasHinglish && !hasEnglishWords) {
    return "hi";
  }

  // If UI is set to Hindi and there are no English words
  if (defaultLang === "hi" && !hasEnglishWords && !/^[a-z\s]+$/i.test(clean)) {
    return "hi";
  }

  return "en";
}

/**
 * Check if the input is a greeting
 */
export function isGreeting(text) {
  const clean = (text || "").trim().toLowerCase();
  if (!clean) return false;

  const devanagariGreeting = /^(नमस्ते|नमस्कार|प्रणाम|हेलो|हाय|शुभ\s*(प्रभात|दिन|संध्या))/;
  if (devanagariGreeting.test(clean)) return true;

  const greetingPattern = /^(hi|hello|hey|namaste|namaskar|namaskaram|greetings|good\s*(morning|afternoon|evening)|pranam|hola|kese\s*ho|kaise\s*ho)(\s+.*)?$/i;
  
  if (greetingPattern.test(clean)) {
    // If the input also asks a specific platform question, don't stop at greeting
    const hasPlatformQuestion = /(worker|register|electric|plumb|price|rate|cost|verif|qr|project|team|signup|job)/i.test(clean);
    return !hasPlatformQuestion;
  }
  return false;
}

/**
 * Check if the input expresses gratitude
 */
export function isGratitude(text) {
  const clean = (text || "").trim().toLowerCase();
  if (!clean) return false;

  const devanagariGratitude = /(धन्यवाद|शुक्रिया|थैंक\s*यू|आभार)/;
  if (devanagariGratitude.test(clean)) return true;

  const gratitudePattern = /\b(thank\s*you|thanks|thx|thnx|ty|much\s*appreciated|appreciate\s*(it|you)|grateful|dhanyawad|dhanyavad|shukriya|meherbani)\b/i;
  if (gratitudePattern.test(clean)) {
    // Make sure it is not part of a larger service query
    const hasPlatformQuestion = /(worker|register|electric|plumb|price|rate|cost|verif|qr|project|team|signup)/i.test(clean);
    return !hasPlatformQuestion;
  }
  return false;
}

/**
 * Check if the input is a farewell
 */
export function isFarewell(text) {
  const clean = (text || "").trim().toLowerCase();
  return /^(bye|goodbye|see\s*you|take\s*care|alvida|tata)\b/i.test(clean) || /^(अलविदा|बाय)/.test(clean);
}

/**
 * Match a SahkarSathi-specific question
 */
export function matchSahkarSathiKnowledge(text, isHi) {
  const clean = (text || "").toLowerCase().trim();

  // 1. Worker Registration / Becoming a partner / Applying for work
  if (
    /(register|join|signup|apply|enroll|become)\s*(as|a)?\s*(worker|craftsperson|partner|contractor|electrician|plumber|mason|painter|carpenter)/i.test(clean) ||
    /how\s*(do\s*i|to)\s*(register|join|work|apply)\s*(as|for)?\s*(a\s*)?(worker|cooperative|platform)?/i.test(clean) ||
    /worker\s*(registration|signup|join|application)/i.test(clean) ||
    /(कारीगर|वर्कर|पंजीकरण|रजिस्टर|जुड़ें|काम\s*चाहिए|काम\s*कैसे\s*मिलेगा)/.test(clean)
  ) {
    return {
      text: isHi
        ? "सहकारसाथी पर कारीगर (Worker) के रूप में जुड़ने के लिए, 'साइन अप' पर जाएं और **Worker** भूमिका चुनें (या /worker/join पर जाएं)। अपना विवरण और ट्रेड कौशल दर्ज करने के बाद, आपको 4-स्तरीय सहकारी सत्यापन (आधार eKYC, पुलिस सत्यापन, हुनर परीक्षण और ई-श्रम लिंकेज) पूरा करना होगा। सत्यापन के बाद आपको आपकी 8-अंकीय डिजिटल आईडी मिलेगी और बिना किसी बिचौलिए या कमीशन के सीधे काम मिलेगा!"
        : "To register as a worker on SahkarSathi, go to the Sign Up page and select the **Worker** role (or visit /worker/join). Enter your trade details and complete our 4-tier cooperative verification (Aadhaar eKYC, police background check, trade skill evaluation, and e-Shram linkage). Once approved, you will receive an 8-digit digital Cooperative ID and direct project dispatches with zero commission!",
      actionRoute: "/signup",
    };
  }

  // 2. Electrician / Electrical
  if (/electric|wiring|fuse|switchboard|earthing|बिजली|इलेक्ट्रिशियन/i.test(clean)) {
    return {
      text: isHi
        ? "हमारे प्रमाणित इलेक्ट्रीशियन ₹249/विज़िट से उपलब्ध हैं (बिना किसी सर्ज प्राइसिंग के)। हम वायरिंग, स्विचबोर्ड, फ़्यूज़ और अर्थिंग की जांच करते हैं।"
        : "Our certified electricians are available starting at ₹249/visit with zero surge pricing. Services include wiring, switchboard upgrades, fuse diagnosis, and safety earthing.",
      actionRoute: "/book",
    };
  }

  // 3. Plumbing / Plumber
  if (/plumb|leak|pipe|tap|faucet|drain|water\s*motor|प्लंबर|नल|पाइप/i.test(clean)) {
    return {
      text: isHi
        ? "सहकारसाथी प्लंबर लीकेज, पाइप फिटिंग, सैनिटरी कार्य और वाटर मोटर रिपेयर के लिए ₹299/विज़िट की तय दर पर उपलब्ध हैं।"
        : "Our certified cooperative plumbers handle leak repairs, pipe fittings, sanitary installation, and water motor repairs starting at ₹299/visit.",
      actionRoute: "/book",
    };
  }

  // 4. AC Repair / Servicing
  if (/ac\b|air\s*condition|cooling|compressor|jet\s*clean|एसी/i.test(clean)) {
    return {
      text: isHi
        ? "एसी सर्विसिंग, डीप जेट कॉइल क्लीनिंग और गैस रीफिलिंग ₹499/विज़िट से उपलब्ध हैं।"
        : "SahkarSathi AC technicians provide deep jet coil cleaning, compressor diagnostics, and gas refills starting at ₹499/visit.",
      actionRoute: "/book",
    };
  }

  // 5. Painting / Whitewash
  if (/paint|whitewash|texture\s*wall|emulsion|पुताई|पेंट/i.test(clean)) {
    return {
      text: isHi
        ? "घर की पुताई, वाटरप्रूफ कोटिंग और टेक्सचर डिजाइन ₹14/वर्ग फुट की तय सहकारी दर से उपलब्ध हैं।"
        : "Professional painting services (interior emulsion, exterior waterproofing, texture walls) start at democratic rates of ₹14/sq ft.",
      actionRoute: "/book",
    };
  }

  // 6. Cleaning / Sanitization
  if (/clean|sanitiz|chimney|sofa\s*shampoo|सफाई/i.test(clean)) {
    return {
      text: isHi
        ? "फुल डीप-होम क्लीनिंग, किचन चिमनी और सोफा शैम्पू ₹399/विज़िट से उपलब्ध हैं।"
        : "Full deep-home sanitization, kitchen chimney degreasing, and sofa shampooing start at standard cooperative rates of ₹399/visit.",
      actionRoute: "/book",
    };
  }

  // 7. Carpentry / Woodwork
  if (/carpent|wood|furniture|cabinet|door|hinge|बढ़ई|फर्नीचर/i.test(clean)) {
    return {
      text: isHi
        ? "मॉड्यूलर कैबिनेट, दरवाज़ा कुंडी और फर्नीचर मरम्मत के लिए बढ़ई ₹349/विज़िट से उपलब्ध हैं।"
        : "Skilled carpenters for modular cabinets, door latch repairs, furniture restoration, and hinges start at ₹349/visit.",
      actionRoute: "/book",
    };
  }

  // 8. Vehicle Repair
  if (/vehicle|car\b|bike|two\s*wheeler|motorcycle|गाड़ी|वाहन/i.test(clean)) {
    return {
      text: isHi
        ? "घर पर टू-व्हीलर और फोर-व्हीलर सर्विसिंग, बैटरी चेक और ब्रेक रिपेयर ₹399/विज़िट से उपलब्ध हैं।"
        : "Doorstep two-wheeler & four-wheeler servicing, battery checks, and brake repairs start at ₹399/visit.",
      actionRoute: "/book",
    };
  }

  // 9. Moving / Relocation
  if (/mov(e|ing)|packers?|relocat|shifting|सामान\s*शिफ्ट/i.test(clean)) {
    return {
      text: isHi
        ? "सुरक्षित पैकिंग और शिफ्टिंग सेवाएं ₹1499/ट्रिप से शुरू होती हैं।"
        : "Multi-partner moving and fragile packing services start at ₹1499/trip.",
      actionRoute: "/book",
    };
  }

  // 10. Teams / Crew / Supervisor / Construction / Renovation
  if (/team|crew|project|construct|renovat|supervisor|masonry|ठेकेदार|टीम|सुपरवाइजर|निर्माण/i.test(clean)) {
    return {
      text: isHi
        ? "टीम परियोजनाओं (नवीनीकरण, निर्माण, पुताई) के लिए हम मास्टर सुपरवाइजर के नेतृत्व में कुशल क्रू तैयार करते हैं। आपका भुगतान सहकारी एस्क्रो में सुरक्षित रहता है और माइलस्टोन पूरा होने पर ही रिलीज होता है!"
        : "For team projects (renovations, masonry, painting, construction), we assemble a multi-trade team led by a Master Site Supervisor. Funds remain safe in cooperative escrow until each milestone is verified!",
      actionRoute: "/projects",
    };
  }

  // 11. Price / Rates / Surge / Commission
  if (/price|rate|cost|charge|fee|how\s*much|surge|commission|दर|मूल्य|खर्चा|फीस/i.test(clean)) {
    return {
      text: isHi
        ? "सहकारसाथी मानक सहकारी दरों पर काम करता है (शून्य सर्ज प्राइसिंग): प्लंबिंग ₹299, इलेक्ट्रिकल ₹249, एसी रिपेयर ₹499, पुताई ₹14/वर्ग फुट, सफाई ₹399, बढ़ई ₹349। कोई बिचौलिया या अतिरिक्त कमीशन नहीं!"
        : "SahkarSathi rates are fixed democratically by worker councils: Plumbing (₹299/visit), Electrical (₹249/visit), AC Repair (₹499/visit), Painting (₹14/sq ft), Cleaning (₹399/visit), Carpentry (₹349/visit). Zero surge pricing and zero hidden commission!",
      actionRoute: "/services",
    };
  }

  // 12. Verification / QR / Police / ID / Safety / Aadhaar
  if (/verif|qr|id\b|police|aadhaar|ekyc|badge|safety|सत्यापन|पहचान/i.test(clean) || /^\d{8}$/.test(clean)) {
    return {
      text: isHi
        ? "आप किसी भी साथी के डिजिटल कार्ड पर QR कोड स्कैन कर सकते हैं या /verify पर उनकी 8-अंकीय सहकारी आईडी दर्ज करके आधार eKYC, स्वतंत्र पुलिस क्लीयरेंस और कौशल प्रमाणपत्र सत्यापित कर सकते हैं।"
        : "You can enter any 8-digit Cooperative ID or scan their QR code at /verify to check live Aadhaar eKYC, independent police clearance, and trade skill certifications.",
      actionRoute: "/verify",
    };
  }

  // 13. How It Works / Escrow / Guarantee / Model
  if (/how\s*it\s*works|how\s*does\s*(this|it)\s*work|cooperative|model|escrow|guarantee|refund|यह\s*कैसे\s*काम\s*करता\s*है/i.test(clean)) {
    return {
      text: isHi
        ? "1. आवश्यकता दर्ज करें → 2. निष्पक्ष रोटेशन द्वारा सत्यापित साथी का चयन → 3. पारदर्शी दर → 4. 14-दिवसीय सेवा गारंटी के साथ संतुष्टि पर सुरक्षित भुगतान।"
        : "1. Post your requirement → 2. Cooperative AI fair rotation matches verified craftspeople → 3. Receive transparent quote with no surge pricing → 4. Pay safely upon verified satisfaction, backed by our 14-day service guarantee.",
      actionRoute: "/services",
    };
  }

  // 14. Brand / Platform identity
  if (/sahkar\s*sathi|sahkarsathi|about|platform|who\s*are\s*you|सहकारसाथी/i.test(clean)) {
    return {
      text: isHi
        ? `${BRAND.name} भारत का पहला सहकारी घरेलू एवं निर्माण सेवा मंच है। हम घरों को निष्पक्ष दरों पर सत्यापित कारीगरों से जोड़ते हैं और कारीगरों को 100% पारदर्शी कमाई और सामाजिक सुरक्षा प्रदान करते हैं।`
        : `${BRAND.name} is a worker-owned cooperative platform connecting households with verified craftspeople and project teams under fair, democratic rates with zero middleman commissions.`,
      actionRoute: null,
    };
  }

  // 15. Contact / Support
  if (/contact|phone|email|support|helpline|customer\s*care|हेल्पलाइन|संपर्क/i.test(clean)) {
    return {
      text: isHi
        ? `आप सहकारसाथी सहायता टीम से ईमेल ${BRAND.supportEmail} या टोल-फ्री ${BRAND.supportPhone} पर संपर्क कर सकते हैं।`
        : `You can reach SahkarSathi support anytime via email at ${BRAND.supportEmail} or toll-free at ${BRAND.supportPhone}.`,
      actionRoute: null,
    };
  }

  return null;
}

/**
 * Main engine generating a polite, accurate response following all 5 rules.
 * 
 * @param {string} query The user message
 * @param {string} currentLang Active UI language ("en" | "hi")
 * @returns {{ text: string, category: string, actionRoute: string | null }}
 */
export function generateSahayakResponse(query, currentLang = "en") {
  const trimmed = (query || "").trim();
  if (!trimmed) {
    return {
      text: "",
      category: "empty",
      actionRoute: null,
    };
  }

  const lang = detectLanguage(trimmed, currentLang);
  const isHi = lang === "hi";

  // RULE 5: Meaningless / Nonsense input
  if (isNonsense(trimmed)) {
    return {
      text: isHi
        ? "मुझे आपका संदेश समझ नहीं आया। क्या आप कृपया अपने प्रश्न को स्पष्ट रूप से पुनः लिख सकते हैं ताकि मैं सहकारसाथी सेवाओं, दरों या कारीगर सत्यापन में आपकी सहायता कर सकूँ?"
        : "I'm sorry, I couldn't understand that. Could you please rephrase your question or ask about SahkarSathi services, rates, or worker verification?",
      category: "nonsense",
      actionRoute: null,
    };
  }

  // RULE 3: Gratitude / Thank you
  if (isGratitude(trimmed)) {
    return {
      text: isHi
        ? "आपका बहुत-बहुत स्वागत है! मुझे आपकी सहायता करके खुशी हुई। यदि सहकारसाथी के बारे में आपका कोई और सवाल हो, तो अवश्य बताएं।"
        : "You're welcome! I'm happy to help. Let me know if you need anything else regarding SahkarSathi.",
      category: "gratitude",
      actionRoute: null,
    };
  }

  // Farewell / Goodbyes
  if (isFarewell(trimmed)) {
    return {
      text: isHi
        ? "अलविदा! सहकारसाथी से जुड़ने के लिए धन्यवाद। आपका दिन शुभ हो!"
        : "Goodbye! Thank you for choosing SahkarSathi. Have a wonderful day ahead!",
      category: "farewell",
      actionRoute: null,
    };
  }

  // RULE 2: Greeting
  if (isGreeting(trimmed)) {
    return {
      text: isHi
        ? "नमस्ते! सहकारसाथी में आपका स्वागत है। मैं सहायक (Sahayak) हूँ, आपका डिजिटल सहकारी सहायक। आज मैं सेवा बुकिंग, कारीगर सत्यापन या दरों के बारे में आपकी क्या मदद कर सकता हूँ?"
        : "Namaste! Welcome to SahkarSathi. I am Sahayak, your cooperative assistant. How can I help you with booking services, worker verification, or pricing today?",
      category: "greeting",
      actionRoute: null,
    };
  }

  // RULE 1: SahkarSathi-related question
  const knowledgeMatch = matchSahkarSathiKnowledge(trimmed, isHi);
  if (knowledgeMatch) {
    return {
      text: knowledgeMatch.text,
      category: "knowledge",
      actionRoute: knowledgeMatch.actionRoute,
    };
  }

  // RULE 4: Random / Off-topic question
  // (Recognizable words/sentence, but not related to SahkarSathi)
  return {
    text: isHi
      ? "मैं सहायक (Sahayak) हूँ, सहकारसाथी का डिजिटल सहायक। मैं केवल सहकारसाथी मंच (जैसे सेवा बुकिंग, कारीगर सत्यापन, उचित दरें और परियोजना प्रबंधन) से जुड़े प्रश्नों में सहायता करने के लिए तैयार किया गया हूँ। कृपया सहकारसाथी से संबंधित कोई प्रश्न पूछें!"
      : "I am Sahayak, the SahkarSathi assistant. I am specifically designed to help with SahkarSathi-related queries such as booking services, worker verification, fair cooperative rates, and project management. Please feel free to ask a question related to our platform!",
    category: "off_topic",
    actionRoute: null,
  };
}
