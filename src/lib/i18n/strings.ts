import type { Lang } from "@/lib/game/types";

/**
 * Every string in the game, in English and Kannada.
 * {name} is replaced with the player's display name.
 * Speaker lines feed the TTS engine; [tags] are delivery direction
 * for ElevenLabs and are stripped before display.
 */

export interface Strings {
  boot: {
    title: string;
    sub: string;
    credit: string;
    tap: string;
  };
  boarding: {
    dhruvaGreet: string;
    nameLabel: string;
    nameKnLabel: string;
    nameKnHint: string;
    dhruvaNameApproved: string;
    langPick: string;
    btnBoard: string;
  };
  transit: {
    dhruvaLaunch: string;
    dhruvaSecret: string;
    sendTitle: string;
    msg1: string;
    msg2: string;
    msg3: string;
    waiting: string;
    dhruvaPatience: string;
    dhruvaReply: string;
    btnSend: string;
    btnContinue: string;
  };
  arrival: {
    dhruvaArrive: string;
    dhruvaChinnu: string;
    dhruvaSol: string;
    dhruvaMap: string;
    btnContinue: string;
  };
  map: {
    title: string;
    commander: string;
    power: string;
    greenhouse: string;
    life: string;
    sol: string;
    done: string;
    visit: string;
    revisit: string;
    stormWarning: string;
    stormReady: string;
    btnStorm: string;
  };
  power: {
    dhruva1: string;
    dhruva2: string;
    dhruva3: string;
    life: string;
    green: string;
    shield: string;
    units: string;
    barkCold: string;
    barkShield: string;
    barkAir: string;
    barkBalanced: string;
    btnLock: string;
    locked: string;
  };
  greenhouse: {
    dhruva1: string;
    dhruva2: string;
    tomatoes: string;
    potatoes: string;
    sunflowers: string;
    gerald: string;
    dhruvaGrow: string;
    btnPick: string;
    stageSprout: string;
    stageYoung: string;
    stageMature: string;
    stageFrozen: string;
  };
  life: {
    dhruva1: string;
    dhruva2: string;
    comfort: string;
    comfortDesc: string;
    balanced: string;
    balancedDesc: string;
    savers: string;
    saversDesc: string;
  };
  sol: {
    title: string;
    dhruvaReport: string;
    dhruvaDustWarn: string;
    high: string;
    low: string;
    pressure: string;
    wind: string;
    attribution: string;
    btnContinue: string;
  };
  storm: {
    dhruva1: string;
    dhruva2: string;
    shields: string;
    shieldsDesc: string;
    greenhouse: string;
    greenhouseDesc: string;
    comms: string;
    commsDesc: string;
    title: string;
  };
  recovery: {
    outcomeShields: string;
    outcomeGreenhouse: string;
    outcomeComms: string;
    dhruvaTradeoff: string;
    cardTitle: string;
    cardBody: string;
    cardSource: string;
    btnContinue: string;
  };
  ceremony: {
    dhruva1: string;
    dhruva2: string;
    certTitle: string;
    certSubtitle: string;
    starsLabel: string;
    badgesLabel: string;
    badgeShields: string;
    badgeGerald: string;
    badgeComms: string;
    badgeExplorer: string;
    btnDownload: string;
    btnReplay: string;
    btnSources: string;
    dhruvaClose: string;
  };
  sources: {
    title: string;
    intro: string;
    btnBack: string;
  };
  hud: {
    voiceOn: string;
    voiceOff: string;
    continue: string;
  };
  chinnu: {
    stowaway: string;
    arrival: string;
    powerGood: string;
    powerBad: string;
    gerald: string;
    water: string;
    sneeze: string;
    hide: string;
    recoverShields: string;
    recoverOther: string;
    proud: string;
  };
}

export const STRINGS: Record<Lang, Strings> = {
  en: {
    boot: {
      title: "Mission: Dhruva",
      sub: "A Junior Astronaut Mission Trainer",
      credit: "Built for the NASA Space Apps Challenge 2026",
      tap: "Tap to launch",
    },
    boarding: {
      dhruvaGreet:
        "Hello, explorer! I am Dhruva, your Mission Control. Before we fly, what should I call you?",
      nameLabel: "Your name",
      nameKnLabel: "Your name in Kannada",
      nameKnHint: "Check it, and change it if you like.",
      dhruvaNameApproved:
        "{name}. A fine name for an astronaut. Pick your language, and let us go to Mars!",
      langPick: "Choose your language",
      btnBoard: "Board the rocket",
    },
    transit: {
      dhruvaLaunch:
        "Three... two... one... liftoff! {name}, you are on your way to Mars!",
      dhruvaSecret:
        "While we cruise, a little secret from Mission Control. Mars is far, far away. So far that even radio waves, the fastest travelers in the universe, need about ten whole minutes to carry your voice home.",
      sendTitle: "Send a message to Earth. You must wait for the reply!",
      msg1: "Hi Mom, I am an astronaut!",
      msg2: "Mars, here I come!",
      msg3: "Wish me luck!",
      waiting: "Your voice is crossing space...",
      dhruvaPatience:
        "Patience is a superpower. Astronauts practice it every day.",
      dhruvaReply:
        "Look, a reply from Earth! We are so proud of you. Ten minutes of real space just stood between you and home.",
      btnSend: "Send",
      btnContinue: "Tap to continue",
    },
    arrival: {
      dhruvaArrive:
        "Welcome to Mars, {name}! This is your outpost in Jezero Crater, a real place, where NASA's Perseverance rover is rolling right now.",
      dhruvaChinnu:
        "Oh! Something followed you from the cargo. It is a mini rover-bot. It says its name is Chinnu!",
      dhruvaSol:
        "One day on Mars is called a sol. Twenty four hours and thirty seven minutes. A little extra time, every day, just for you.",
      dhruvaMap:
        "Your outpost has four stations, Commander. You choose the order. Chinnu will follow you anywhere.",
      btnContinue: "Tap to continue",
    },
    map: {
      title: "Outpost Map",
      commander: "Commander {name}",
      power: "Power Station",
      greenhouse: "Greenhouse",
      life: "Life Support",
      sol: "Sol Report",
      done: "Checked",
      visit: "Visit",
      revisit: "Visit again",
      stormWarning: "Check every station before the storm!",
      stormReady: "All stations checked. Storm shelter is ready.",
      btnStorm: "Face the storm",
    },
    power: {
      dhruva1:
        "The Sun is our power plant. Solar panels drink sunshine and turn it into electricity: air to breathe, warm plants, and safety shields.",
      dhruva2:
        "But Mars has a dust problem. NASA's InSight lander watched dust slowly bury its panels, sometimes for weeks, until the wind cleaned them off.",
      dhruva3:
        "Your battery holds limited power. Every watt you give one station is a watt taken from another. That is not a flaw. That is engineering. Ready, Commander?",
      life: "Life Support",
      green: "Greenhouse",
      shield: "Shielding",
      units: "power units",
      barkCold: "Careful, the greenhouse is getting chilly.",
      barkShield: "The shield looks strong today.",
      barkAir: "The air feels thin in there.",
      barkBalanced: "A balanced plan. Mission Control approves.",
      btnLock: "Lock the power plan",
      locked: "Power plan locked in",
    },
    greenhouse: {
      dhruva1:
        "We can't truck food from Earth. Mars is too far. So we grow it, just like NASA astronauts grew lettuce on the space station!",
      dhruva2:
        "Pick your first crop, {name}. Choose well. They will grow with you across the whole mission.",
      tomatoes: "Tomatoes",
      potatoes: "Potatoes",
      sunflowers: "Sunflowers",
      gerald: "Chinnu named this one Gerald.",
      dhruvaGrow: "Look how much they have grown, {name}!",
      btnPick: "Plant it",
      stageSprout: "sprout",
      stageYoung: "growing",
      stageMature: "thriving",
      stageFrozen: "frozen",
    },
    life: {
      dhruva1:
        "Breathing is easy on Earth. Not here! Your recycler turns yesterday's breath back into fresh air. And the space station recycles about ninety three percent of its water. Every drop counts. Even the drops you sweat.",
      dhruva2: "How careful will your crew be with water today?",
      comfort: "Comfort crew",
      comfortDesc: "Warm showers for all. Morale high, reserves low.",
      balanced: "Balanced",
      balancedDesc: "Sponge baths and careful cups. A steady middle path.",
      savers: "Super savers",
      saversDesc: "Every drop saved. Reserves high, crew grumbling.",
    },
    sol: {
      title: "Sol Report",
      dhruvaReport:
        "Sol Report! Today's real Mars weather, from NASA's InSight lander. High minus twenty three, low minus ninety five degrees. Light winds. A quiet sol... for now.",
      dhruvaDustWarn:
        "Dust is rising in the forecast, and my sun watches are beeping. Visit every station before the storm, Commander.",
      high: "High",
      low: "Low",
      pressure: "Pressure",
      wind: "Wind",
      attribution: "Real archived data from NASA InSight (REMS).",
      btnContinue: "Tap to continue",
    },
    storm: {
      dhruva1:
        "Red alert, {name}. The Sun just sneezed. A solar flare! In May 2024, the biggest storm in twenty years struck Earth. Astronauts on Mars have no thick sky to protect them. And this one is coming for you.",
      dhruva2:
        "Your batteries cannot save everything. Choose what gets the power, Commander.",
      shields: "Shields up",
      shieldsDesc: "Crew fully protected. The greenhouse freezes.",
      greenhouse: "Heat the greenhouse",
      greenhouseDesc: "Plants survive. The crew takes some radiation.",
      comms: "Boost the antenna",
      commsDesc:
        "Call Earth through the storm. Crew dose rises, plants shiver.",
      title: "Solar Storm",
    },
    recovery: {
      outcomeShields:
        "The shields held. You are safe, {name}. But the greenhouse is frozen, and Gerald needs a hug.",
      outcomeGreenhouse:
        "The greenhouse glows warm and alive. Your dosimeter clicked a little more than usual. You took some radiation, but the plants are smiling.",
      outcomeComms:
        "Earth heard you through the storm. Brave! But your dose climbed, and the plants shiver.",
      dhruvaTradeoff:
        "Whatever you chose, you met a truth every NASA planner knows. There are no perfect answers out here. Only careful ones.",
      cardTitle: "Science Card: NASA Twins Study",
      cardBody:
        "NASA followed astronaut Scott Kelly for one year in space. His body changed. Almost everything bounced back when he came home. Amazing things, these bodies of ours.",
      cardSource: "Real research, open on NASA OSDR.",
      btnContinue: "Continue",
    },
    ceremony: {
      dhruva1:
        "Mission complete, {name}! You kept your crew alive, you made hard choices, and you learned what Mars teaches. Every decision costs something.",
      dhruva2:
        "Stars and badges, for you, Commander. Take your certificate. You earned it.",
      certTitle: "JUNIOR ASTRONAUT",
      certSubtitle: "Mars Outpost Commander",
      starsLabel: "stars",
      badgesLabel: "badges",
      badgeShields: "Shield Bearer",
      badgeGerald: "Gerald's Guardian",
      badgeComms: "Voice of Earth",
      badgeExplorer: "Jezero Explorer",
      btnDownload: "Download certificate",
      btnReplay: "Fly again, new path!",
      btnSources: "Sources and credits",
      dhruvaClose:
        "Fly again anytime, {name}. Dhruva will be here, watching the sky for you.",
    },
    sources: {
      title: "Sources and Credits",
      intro:
        "This game uses real NASA open data. Every event you played came from a real mission.",
      btnBack: "Back to the stars",
    },
    hud: {
      voiceOn: "Voice on",
      voiceOff: "Voice off",
      continue: "Tap to continue",
    },
    chinnu: {
      stowaway: "[excited] Is there room for one small bot?",
      arrival: "Chinnu reporting for duty!",
      powerGood: "Chinnu runs on sunshine! No pressure.",
      powerBad: "[sad] Chinnu... feeling... sleepy.",
      gerald: "Chinnu named this one Gerald.",
      water: "Chinnu does not cry. Water is expensive.",
      sneeze: "Big sneeze from the sun!",
      hide: "[whispers] Chinnu is hiding now.",
      recoverShields: "Chinnu kept Gerald warm. Gerald says hi.",
      recoverOther: "Chinnu is ninety percent dust now.",
      proud: "You did good, Commander. Chinnu is proud.",
    },
  },
  kn: {
    boot: {
      title: "ಮಿಷನ್: ಧ್ರುವ",
      sub: "ಒಂದು ಜೂನಿಯರ್ ಆಸ್ಟ್ರೋನಾಟ್ ಮಿಷನ್ ಟ್ರೈನರ್",
      credit: "ನಾಸಾ ಸ್ಪೇಸ್ ಆಪ್ಸ್ ಚಾಲೆಂಜ್ 2026 ಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ",
      tap: "ಲಾಂಚ್ ಮಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
    },
    boarding: {
      dhruvaGreet:
        "ಹಲೋ ಎಕ್ಸ್‌ಪ್ಲೋರರ್! ನಾನು ಧ್ರುವ, ನಿಮ್ಮ ಮಿಷನ್ ಕಂಟ್ರೋಲ್. ಹಾರಲು ಮೊದಲು, ನಿಮ್ಮನ್ನು ಹೇಗೆ ಕರೆಯಲಿ?",
      nameLabel: "ನಿಮ್ಮ ಹೆಸರು",
      nameKnLabel: "ಕನ್ನಡದಲ್ಲಿ ನಿಮ್ಮ ಹೆಸರು",
      nameKnHint: "ಒಮ್ಮೆ ನೋಡಿ, ಬೇಕಿದ್ರೆ ಬದಲಾಯಿಸಿ.",
      dhruvaNameApproved:
        "{name}. ಆಸ್ಟ್ರೋನಾಟ್‌ಗೆ ಚೆಂದಾದ ಹೆಸರು. ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ, ಮಂಗಳಕ್ಕೆ ಹೋಗೋಣ!",
      langPick: "ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ",
      btnBoard: "ರಾಕೆಟ್ ಏರಿ",
    },
    transit: {
      dhruvaLaunch:
        "ಮೂರು... ಎರಡು... ಒಂದು... ಲಾಂಚ್! {name}, ನೀವು ಮಂಗಳದ ಕಡೆ ಹೊರಟಿದ್ದೀರಾ!",
      dhruvaSecret:
        "ಪ್ರಯಾಣದ ನಡುವೆ, ಮಿಷನ್ ಕಂಟ್ರೋಲ್‌ನಿಂದ ಒಂದು ಸಣ್ಣ ರಹಸ್ಯ. ಮಂಗಳ ತುಂಬಾ ದೂರದಲ್ಲಿದೆ. ಎಷ್ಟು ದೂರ ಅಂದ್ರೆ, ಬ್ರಹ್ಮಾಂಡದ ಅತ್ಯಂತ ವೇಗದ ಪ್ರಯಾಣಿಕರಾದ ರೇಡಿಯೊ ಅಲೆಗಳಿಗೇ ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ಮನೆಗೆ ಕೊಂಡೊಯ್ಯಲು ಹತ್ತು ಪೂರ್ತಿ ನಿಮಿಷ ಬೇಕು!",
      sendTitle: "ಭೂಮಿಗೆ ಒಂದು ಸಂದೇಶ ಕಳಿಸಿ. ಉತ್ತರಕ್ಕಾಗಿ ಕಾಯಬೇಕು!",
      msg1: "ಹಾಯ್ ಅಮ್ಮ, ನಾನು ಆಸ್ಟ್ರೋನಾಟ್!",
      msg2: "ಮಂಗಳಾ, ನಾನು ಬರ್ತಿದ್ದೀನಿ!",
      msg3: "ನನಗೆ ಶುಭ ಹೇಳಿ!",
      waiting: "ನಿಮ್ಮ ಧ್ವನಿ ಆಕಾಶವನ್ನು ದಾಟುತ್ತಿದೆ...",
      dhruvaPatience:
        "ತಾಳ್ಮೆ ಒಂದು ಸೂಪರ್‌ಪವರ್. ಆಸ್ಟ್ರೋನಾಟ್‌ಗಳು ಪ್ರತಿದಿನ ಅದನ್ನು ಅಭ್ಯಾಸ ಮಾಡುತ್ತಾರೆ.",
      dhruvaReply:
        "ನೋಡಿ, ಭೂಮಿಯಿಂದ ಉತ್ತರ ಬಂದಿದೆ! ನಾವು ನಿಮ್ಮ ಮೇಲೆ ಹೆಮ್ಮೆ ಪಡುತ್ತೇವೆ. ನಿಮ್ಮ ಮತ್ತು ಮನೆಯ ನಡುವೆ ಹತ್ತು ನಿಮಿಷದ ನಿಜವಾದ ಆಕಾಶ ಇತ್ತು!",
      btnSend: "ಕಳಿಸಿ",
      btnContinue: "ಮುಂದುವರಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
    },
    arrival: {
      dhruvaArrive:
        "ಮಂಗಳಕ್ಕೆ ಸ್ವಾಗತ, {name}! ಇದು ಜೆಜೆರೊ ಕ್ರೇಟರ್‌ನಲ್ಲಿರುವ ನಿಮ್ಮ ಔಟ್‌ಪೋಸ್ಟ್. ನಾಸಾದ ಪರ್ಸಿವರೆನ್ಸ್ ರೋವರ್ ಈಗಲೇ ಇಲ್ಲಿ ತಿರುಗಾಡುತ್ತಿರುವ ನಿಜವಾದ ಜಾಗ.",
      dhruvaChinnu:
        "ಏನೋ! ಕಾರ್ಗೊದಿಂದ ನಿಮ್ಮ ಜೊತೆ ಒಂದು ಸಣ್ಣ ರೋಬೊ ಬಂದಿದೆ. ಅದು ತನ್ನ ಹೆಸರು ಚಿನ್ನು ಅಂತ ಹೇಳುತ್ತಿದೆ!",
      dhruvaSol:
        "ಮಂಗಳದ ಒಂದು ದಿನವನ್ನು ಸಾಲ್ ಅಂತ ಕರೆಯುತ್ತಾರೆ. ಇಪ್ಪತ್ನಾಲ್ಕು ಗಂಟೆ, ಮೂವತ್ತೇಳು ನಿಮಿಷ. ಪ್ರತಿದಿನ ಸ್ವಲ್ಪ ಹೆಚ್ಚುವರಿ ಸಮಯ, ನಿಮ್ಮ ಪಾಲಿಗೇ!",
      dhruvaMap:
        "ನಿಮ್ಮ ಔಟ್‌ಪೋಸ್ಟ್‌ನಲ್ಲಿ ನಾಲ್ಕು ಸ್ಟೇಷನ್‌ಗಳಿವೆ, ಕಮಾಂಡರ್. ಯಾವ ಕ್ರಮದಲ್ಲಿ ಹೋಗಬೇಕು ಅನ್ನೋದು ನಿಮ್ಮ ಇಷ್ಟ. ಚಿನ್ನು ಎಲ್ಲಿಗಾದರೂ ನಿಮ್ಮ ಜೊತೆ ಬರುತ್ತದೆ.",
      btnContinue: "ಮುಂದುವರಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
    },
    map: {
      title: "ಔಟ್‌ಪೋಸ್ಟ್ ನಕ್ಷೆ",
      commander: "ಕಮಾಂಡರ್ {name}",
      power: "ಪವರ್ ಸ್ಟೇಷನ್",
      greenhouse: "ಗ್ರೀನ್‌ಹೌಸ್",
      life: "ಲೈಫ್ ಸಪೋರ್ಟ್",
      sol: "ಸಾಲ್ ರಿಪೋರ್ಟ್",
      done: "ಮುಗಿಯಿತು",
      visit: "ಹೋಗಿ",
      revisit: "ಮತ್ತೊಮ್ಮೆ ಹೋಗಿ",
      stormWarning: "ಬಿರುಗಾಳಿಗೂ ಮೊದಲು ಎಲ್ಲಾ ಸ್ಟೇಷನ್ ನೋಡಿ!",
      stormReady: "ಎಲ್ಲಾ ಸ್ಟೇಷನ್ ಮುಗಿಯಿತು. ಬಿರುಗಾಳಿ ಆಶ್ರಯ ಸಿದ್ಧ.",
      btnStorm: "ಬಿರುಗಾಳಿಯನ್ನು ಎದುರಿಸಿ",
    },
    power: {
      dhruva1:
        "ಸೂರ್ಯ ನಮ್ಮ ಪವರ್ ಪ್ಲಾಂಟ್. ಸೋಲರ್ ಪ್ಯಾನೆಲ್‌ಗಳು ಬಿಸಿಲನ್ನು ಕುಡಿದು ವಿದ್ಯುತ್ ಮಾಡುತ್ತವೆ: ಉಸಿರಾಡಲು ಗಾಳಿ, ಬೆಚ್ಚಗಿನ ಗಿಡಗಳು, ಮತ್ತು ಸುರಕ್ಷಾ ಗುರಾಣಿಗಳು.",
      dhruva2:
        "ಆದ್ರೆ ಮಂಗಳದಲ್ಲಿ ಧೂಳಿನ ಸಮಸ್ಯೆ ಇದೆ. ನಾಸಾದ ಇನ್‌ಸೈಟ್ ಲ್ಯಾಂಡರ್, ಧೂಳು ನಿಧಾನವಾಗಿ ಪ್ಯಾನೆಲ್ ಮೇಲೆ ಹೇಗೆ ಕುಳಿತುಕೊಂಡಿತು ಅನ್ನೋದನ್ನ ನೋಡಿತ್ತು. ಗಾಳಿ ಸ್ವಚ್ಛ ಮಾಡೋವರೆಗೂ, ವಾರಕ್ಕಳೆ ಹಾಗೇ ಇರುತ್ತಿತ್ತು.",
      dhruva3:
        "ನಿಮ್ಮ ಬ್ಯಾಟರಿಯಲ್ಲಿ ಸೀಮಿತ ಶಕ್ತಿ ಇದೆ. ಒಂದು ಸ್ಟೇಷನ್‌ಗೆ ಕೊಡುವ ಪ್ರತಿ ವಾಟ್, ಇನ್ನೊಂದರಿಂದ ಕಿತ್ತುಕೊಂಡದ್ದೇ. ಅದು ತಪ್ಪಲ್ಲ. ಅದು ಎಂಜಿನಿಯರಿಂಗ್! ಸಿದ್ಧರಾಗಿದ್ದೀರಾ, ಕಮಾಂಡರ್?",
      life: "ಲೈಫ್ ಸಪೋರ್ಟ್",
      green: "ಗ್ರೀನ್‌ಹೌಸ್",
      shield: "ಶೀಲ್ಡಿಂಗ್",
      units: "ಪವರ್ ಯೂನಿಟ್‌ಗಳು",
      barkCold: "ಎಚ್ಚರ, ಗ್ರೀನ್‌ಹೌಸ್ ಚಳಿಯಾಗುತ್ತಿದೆ.",
      barkShield: "ಶೀಲ್ಡ್ ಇಂದ ಬಲವಾಗಿ ಕಾಣುತ್ತಿದೆ.",
      barkAir: "ಅಲ್ಲಿ ಗಾಳಿ ತೆಳ್ಳಗಾಗಿ ಕಾಣುತ್ತಿದೆ.",
      barkBalanced: "ಸಮತೋಲಿತ ಯೋಜನೆ. ಮಿಷನ್ ಕಂಟ್ರೋಲ್ ಒಪ್ಪಿಗೆ ನೀಡುತ್ತದೆ.",
      btnLock: "ಪವರ್ ಪ್ಲಾನ್ ಲಾಕ್ ಮಾಡಿ",
      locked: "ಪವರ್ ಪ್ಲಾನ್ ಲಾಕ್ ಆಗಿದೆ",
    },
    greenhouse: {
      dhruva1:
        "ಭೂಮಿಯಿಂದ ಆಹಾರ ತರಲಾಗುವುದಿಲ್ಲ. ಮಂಗಳ ತುಂಬಾ ದೂರ. ಆದ್ರಿಂದ ನಾವೇ ಬೆಳೆಯೋಣ, ನಾಸಾ ಆಸ್ಟ್ರೋನಾಟ್‌ಗಳು ಸ್ಪೇಸ್ ಸ್ಟೇಷನ್‌ನಲ್ಲಿ ಲೆಟಿಸ್ ಬೆಳೆದಂತೆ!",
      dhruva2:
        "ನಿಮ್ಮ ಮೊದಲ ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ, {name}. ಚೆನ್ನಾಗಿ ಆಯ್ಕೆ ಮಾಡಿ. ಇಡೀ ಮಿಷನ್‌ನಲ್ಲಿ ಅವು ನಿಮ್ಮ ಜೊತೆ ಬೆಳೆಯುತ್ತವೆ.",
      tomatoes: "ಟೊಮ್ಯಾಟೊ",
      potatoes: "ಆಲೂಗಡ್ಡೆ",
      sunflowers: "ಸೂರ್ಯಕಾಂತಿ",
      gerald: "ಚಿನ್ನು ಇದನ್ನ ಜೆರಾಲ್ಡ್ ಅಂತ ಕರಿಯುತ್ತೆ.",
      dhruvaGrow: "ನೋಡಿ, ಎಷ್ಟು ಚೆನ್ನಾಗಿ ಬೆಳೆದಿದೆ, {name}!",
      btnPick: "ನೆಡಿ",
      stageSprout: "ಮೊಳಕೆ",
      stageYoung: "ಬೆಳೆಯುತ್ತಿದೆ",
      stageMature: "ಚೆನ್ನಾಗಿದೆ",
      stageFrozen: "ಫ್ರೀಜ್ ಆಗಿದೆ",
    },
    life: {
      dhruva1:
        "ಭೂಮಿಯಲ್ಲಿ ಉಸಿರಾಡೋದು ಸುಲಭ. ಇಲ್ಲ ಅಲ್ಲ! ನಿಮ್ಮ ರೀಸೈಕ್ಲರ್, ನಿನ್ನೆಯ ಉಸಿರನ್ನೇ ಮತ್ತೆ ತಾಜಾ ಗಾಳಿಯನ್ನಾಗಿ ಮಾಡುತ್ತದೆ. ಮತ್ತು ಸ್ಪೇಸ್ ಸ್ಟೇಷನ್ ತನ್ನ ಸುಮಾರು ತೊಂಬತ್ತಮೂರು ಪ್ರತಿಶತ ನೀರನ್ನು ರೀಸೈಕಲ್ ಮಾಡುತ್ತದೆ. ಪ್ರತಿ ಹನಿಯೂ ಬೆಲೆಬಾಳುತ್ತದೆ. ನೀವು ಬಿಟ್ಟ ಬೆವರೂ ಸಹ.",
      dhruva2: "ಇಂದು ನಿಮ್ಮ ತಂಡ ನೀರನ್ನು ಎಷ್ಟು ಎಚ್ಚರಿಕೆಯಿಂದ ಬಳಸುತ್ತದೆ?",
      comfort: "ಆರಾಮದಾಯಕ ತಂಡ",
      comfortDesc: "ಎಲ್ಲರಿಗೂ ಬಿಸಿ ಶವರ್. ಉತ್ಸಾಹ ಹೆಚ್ಚು, ನೀರಿನ ಕಾಳಜಿ ಕಡಿಮೆ.",
      balanced: "ಸಮತೋಲನ",
      balancedDesc: "ಸ್ಪಂಜ್ ಸ್ನಾನ ಮತ್ತು ಎಚ್ಚರಿಕೆಯ ಲೋಟ. ಸರಿಬದ್ದ ಮಧ್ಯಮಾರ್ಗ.",
      savers: "ಸೂಪರ್ ಸೇವರ್‌ಗಳು",
      saversDesc: "ಪ್ರತಿ ಹನಿ ಉಳಿಸಿದ ತಂಡ. ನೀರು ಹೆಚ್ಚು, ತಂಡ ಸ್ವಲ್ಪ ಗೊಣಗುತ್ತದೆ.",
    },
    sol: {
      title: "ಸಾಲ್ ರಿಪೋರ್ಟ್",
      dhruvaReport:
        "ಸಾಲ್ ರಿಪೋರ್ಟ್! ಇಂದಿನ ಮಂಗಳದ ನಿಜವಾದ ಹವಾಮಾನ, ನಾಸಾದ ಇನ್‌ಸೈಟ್ ಲ್ಯಾಂಡರ್‌ನಿಂದ. ಗರಿಷ್ಠ ಮೈನಸ್ ಇಪ್ಪತ್ಮೂರು, ಕನಿಷ್ಠ ಮೈನಸ್ ತೊಂಬತ್ತೈದು ಡಿಗ್ರಿ. ತಿಳಿ ಗಾಳಿ. ಶಾಂತ ಸಾಲ್... ಸದ್ಯಕ್ಕೆ.",
      dhruvaDustWarn:
        "ಮುನ್ಸೂಚನೆಯಲ್ಲಿ ಧೂಳು ಏರುತ್ತಿದೆ, ನನ್ನ ಸೂರ್ಯ ವೀಕ್ಷಕಗಳು ಬೀಪ್ ಹೊಡೆಯುತ್ತಿವೆ. ಬಿರುಗಾಳಿಗೂ ಮೊದಲು ಎಲ್ಲಾ ಸ್ಟೇಷನ್ ನೋಡಿ, ಕಮಾಂಡರ್.",
      high: "ಗರಿಷ್ಠ",
      low: "ಕನಿಷ್ಠ",
      pressure: "ಒತ್ತಡ",
      wind: "ಗಾಳಿ",
      attribution: "ನಾಸಾ ಇನ್‌ಸೈಟ್ (REMS) ನಿಂದ ನಿಜವಾದ ಆರ್ಕೈವ್ ಮಾಹಿತಿ.",
      btnContinue: "ಮುಂದುವರಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
    },
    storm: {
      dhruva1:
        "ರೆಡ್ ಅಲರ್ಟ್, {name}. ಸೂರ್ಯ ಈಗಷ್ಟೇ ಸೀನು ಹೊಡೆದ. ಸೋಲಾರ್ ಫ್ಲೇರ್! 2024 ಮೇ ತಿಂಗಳಲ್ಲಿ, ಇಪ್ಪತ್ತು ವರ್ಷಗಳಲ್ಲಿ ಬಂದ ಅತಿ ದೊಡ್ಡ ಬಿರುಗಾಳಿ ಭೂಮಿಗೆ ಬಡಿಯಿತು. ಮಂಗಳದ ಆಸ್ಟ್ರೋನಾಟ್‌ಗಳಿಗೆ ರಕ್ಷಣೆಗೆ ದಪ್ಪ ಆಕಾಶವಿಲ್ಲ. ಮತ್ತು ಈ ಬಿರುಗಾಳಿ ನಿಮ್ಮ ಕಡೆ ಬರುತ್ತಿದೆ.",
      dhruva2:
        "ನಿಮ್ಮ ಬ್ಯಾಟರಿಗಳು ಎಲ್ಲವನ್ನೂ ಉಳಿಸಲಾರವು. ಯಾವುದಕ್ಕೆ ಶಕ್ತಿ ಸಿಗಬೇಕು ಅನ್ನೋದನ್ನ ಆಯ್ಕೆ ಮಾಡಿ, ಕಮಾಂಡರ್.",
      shields: "ಶೀಲ್ಡ್ ಮೇಲೆ",
      shieldsDesc: "ತಂಡ ಪೂರ್ತಿ ರಕ್ಷಣೆ. ಗ್ರೀನ್‌ಹೌಸ್ ಫ್ರೀಜ್ ಆಗುತ್ತದೆ.",
      greenhouse: "ಗ್ರೀನ್‌ಹೌಸ್ ಬಿಸಿ ಮಾಡಿ",
      greenhouseDesc: "ಗಿಡಗಳು ಉಳುತ್ತವೆ. ತಂಡಕ್ಕೆ ಸ್ವಲ್ಪ ವಿಕಿರಣ.",
      comms: "ಆಂಟೆನಾ ಬೂಸ್ಟ್ ಮಾಡಿ",
      commsDesc:
        "ಬಿರುಗಾಳಿಯ ನಡುವೆ ಭೂಮಿಗೆ ಕರೆ. ತಂಡಕ್ಕೆ ವಿಕಿರಣ, ಗಿಡಗಳು ನಡುಗುತ್ತವೆ.",
      title: "ಸೌರ ಬಿರುಗಾಳಿ",
    },
    recovery: {
      outcomeShields:
        "ಶೀಲ್ಡ್ ತಡೆಯಿತು. ನೀವು ಸುರಕ್ಷಿತ, {name}. ಆದ್ರೆ ಗ್ರೀನ್‌ಹೌಸ್ ಫ್ರೀಜ್ ಆಗಿದೆ, ಜೆರಾಲ್ಡ್‌ಗೆ ಒಂದು ತಬ್ಬಿಡಬೇಕು.",
      outcomeGreenhouse:
        "ಗ್ರೀನ್‌ಹೌಸ್ ಬೆಚ್ಚಗಾಗಿ ಹೊಳೆಯುತ್ತಿದೆ. ನಿಮ್ಮ ಡೋಸಿಮೀಟರ್ ವಾಡಿಕೆಗಿಂತ ಸ್ವಲ್ಪ ಜಾಸ್ತಿ ಕ್ಲಿಕ್ ಆಯಿತು. ಸ್ವಲ್ಪ ವಿಕಿರಣ ತಗುಲಿತು, ಆದ್ರೆ ಗಿಡಗಳು ನಗುತ್ತಿವೆ.",
      outcomeComms:
        "ಬಿರುಗಾಳಿಯ ನಡುವೆಯೂ ಭೂಮಿ ನಿಮ್ಮ ಧ್ವನಿ ಕೇಳಿತು. ಧೈರ್ಯ! ಆದ್ರೆ ವಿಕಿರಣ ಹೆಚ್ಚಾಯಿತು, ಗಿಡಗಳು ನಡುಗುತ್ತಿವೆ.",
      dhruvaTradeoff:
        "ನೀವು ಏನೇ ಆಯ್ಕೆ ಮಾಡಿದ್ರೂ, ಪ್ರತಿಯೊಬ್ಬ ನಾಸಾ ಪ್ಲಾನರ್‌ಗೂ ಗೊತ್ತಿರೋ ಒಂದು ಸತ್ಯವನ್ನ ನೀವು ಎದುರಿಸಿದ್ರೊಂದು. ಇಲ್ಲಿ ಪರ್‌ಫೆಕ್ಟ್ ಉತ್ತರಗಳಿಲ್ಲ. ಎಚ್ಚರಿಕೆಯ ಉತ್ತರಗಳು ಮಾತ್ರ ಇವೆ.",
      cardTitle: "ಸೈನ್ಸ್ ಕಾರ್ಡ್: ನಾಸಾ ಟ್ವಿನ್ಸ್ ಸ್ಟಡಿ",
      cardBody:
        "ನಾಸಾ, ಆಸ್ಟ್ರೋನಾಟ್ ಸ್ಕಾಟ್ ಕೆಲ್ಲಿ ಒಂದು ವರ್ಷ ಬಾಹ್ಯಾಕಾಶದಲ್ಲಿ ಇದ್ದಾಗ ಅವರನ್ನು ಅಧ್ಯಯನ ಮಾಡಿತು. ಅವರ ದೇಹ ಬದಲಾಯಿತು. ಮನೆಗೆ ಬಂದಾಗ ಬಹುತೇಕ ಎಲ್ಲವೂ ಮರಳಿ ಹಿಂದಿನಂತಾಯಿತು. ನಮ್ಮ ದೇಹಗಳು ಅದ್ಭುತವಲ್ಲವೇ.",
      cardSource: "ನಿಜವಾದ ಸಂಶೋಧನೆ, ನಾಸಾ OSDR ನಲ್ಲಿ ಮುಕ್ತವಾಗಿದೆ.",
      btnContinue: "ಮುಂದುವರಿಸಿ",
    },
    ceremony: {
      dhruva1:
        "ಮಿಷನ್ ಪೂರ್ಣ, {name}! ನಿಮ್ಮ ತಂಡವನ್ನು ಉಳಿಸಿದ್ರೀರಾ, ಕಠಿಣ ಆಯ್ಕೆಗಳನ್ನ ಮಾಡಿದ್ರೀರಾ, ಮಂಗಳ ಕಲಿಸೋದನ್ನ ಕಲಿತ್ರೀರಾ. ಪ್ರತಿ ನಿರ್ಧಾರಕ್ಕೂ ಬೆಲೆ ಇದೆ.",
      dhruva2:
        "ನಕ್ಷತ್ರಗಳು ಮತ್ತು ಬ್ಯಾಡ್ಜ್‌ಗಳು, ನಿಮಗಾಗಿ, ಕಮಾಂಡರ್. ನಿಮ್ಮ ಪ್ರಮಾಣಪತ್ರ ತೆಗೆದುಕೊಳ್ಳಿ. ಅದು ನಿಮ್ಮ ಸ್ವಂತ ಸಂಪಾದನೆ.",
      certTitle: "ಜೂನಿಯರ್ ಆಸ್ಟ್ರೋನಾಟ್",
      certSubtitle: "ಮಂಗಳ ಔಟ್‌ಪೋಸ್ಟ್ ಕಮಾಂಡರ್",
      starsLabel: "ನಕ್ಷತ್ರಗಳು",
      badgesLabel: "ಬ್ಯಾಡ್ಜ್‌ಗಳು",
      badgeShields: "ಶೀಲ್ಡ್ ವೀರ",
      badgeGerald: "ಜೆರಾಲ್ಡ್‌ನ ರಕ್ಷಕ",
      badgeComms: "ಭೂಮಿಯ ಧ್ವನಿ",
      badgeExplorer: "ಜೆಜೆರೊ ಎಕ್ಸ್‌ಪ್ಲೋರರ್",
      btnDownload: "ಪ್ರಮಾಣಪತ್ರ ಡೌನ್‌ಲೋಡ್",
      btnReplay: "ಮತ್ತೆ ಹಾರಿ, ಹೊಸ ದಾರಿಯಲ್ಲಿ!",
      btnSources: "ಮೂಲಗಳು ಮತ್ತು ಕೃತಜ್ಞತೆಗಳು",
      dhruvaClose:
        "ಯಾವಾಗ ಬೇಕಿದ್ರೂ ಮತ್ತೆ ಹಾರಿ, {name}. ಧ್ರುವ ಇಲ್ಲೇ ಇರುತ್ತೇನೆ, ಆಕಾಶ ನೋಡುತ್ತಾ.",
    },
    sources: {
      title: "ಮೂಲಗಳು ಮತ್ತು ಕೃತಜ್ಞತೆಗಳು",
      intro:
        "ಈ ಆಟು ನಾಸಾದ ನಿಜವಾದ ಮುಕ್ತ ಮಾಹಿತಿಯನ್ನು ಬಳಸುತ್ತದೆ. ನೀವು ಆಡಿದ ಪ್ರತಿ ಘಟನೆಯೂ ನಿಜವಾದ ಮಿಷನ್‌ನಿಂದ ಬಂದಿದೆ.",
      btnBack: "ನಕ್ಷತ್ರಗಳ ಕಡೆಗೆ ಹಿಂದೆ",
    },
    hud: {
      voiceOn: "ಧ್ವನಿ ಆನ್",
      voiceOff: "ಧ್ವನಿ ಆಫ್",
      continue: "ಮುಂದುವರಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
    },
    chinnu: {
      stowaway: "[excited] ಒಂದು ಚಿಕ್ಕ ಬಾಟ್‌ಗೆ ಜಾಗ ಇದೆಯಾ?",
      arrival: "ಕೆಲಸಕ್ಕೆ ಚಿನ್ನು ಈಸ್ ರೆಡಿ!",
      powerGood: "ಚಿನ್ನು ಓಡೋದು ಸೂರ್ಯನ ಬೆಳಕಿಂದ, ಚಿಂತೆ ಬೇಡ!",
      powerBad: "[sad] ಚಿನ್ನುಗೆ.... ನಿದ್ದೆ... ಬರೋತರ.... ಆಗ್ತಿದೆ....",
      gerald: "ಚಿನ್ನು ಇದನ್ನ ಜೆರಾಲ್ಡ್ ಅಂತ ಕರಿಯುತ್ತೆ.",
      water: "ಚಿನ್ನು ಅಳೋದಿಲ್ಲ, ಯಾಕಂದ್ರೆ ನೀರು ತುಂಬಾ ದುಬಾರಿ.",
      sneeze: "ಅಬ್ಬಾ! ಸೂರ್ಯ ದೊಡ್ಡದಾಗಿ ಆಕ್ಷಿ ಮಾಡ್ದ!",
      hide: "[whispers] ಚಿನ್ನು ಈಗ ಅಡಗಿಕೊಂಡಿದೆ.",
      recoverShields: "ಚಿನ್ನು ಜೆರಾಲ್ಡ್ ಅನ್ನು ಬೆಚ್ಚಗಿಟ್ಟಿತು. ಜೆರಾಲ್ಡ್ ಹಾಯ್ ಹೇಳ್ತಿದೆ.",
      recoverOther: "ಚಿನ್ನು ಈಗ ತೊಂಬತ್ತು ಪ್ರತಿಶತ ಧೂಳು!",
      proud: "ಚೆನ್ನಾಗಿ ಮಾಡಿದ್ದೀಯಾ ಕಮಾಂಡರ್, ಚಿನ್ನುಗೆ ಫುಲ್ ಹೆಮ್ಮೆ!",
    },
  },
};

export function fmt(template: string, params: Record<string, string>): string {
  let out = template;
  for (const [key, value] of Object.entries(params)) {
    out = out.replaceAll(`{${key}}`, value);
  }
  return out;
}

export function displayName(
  lang: Lang,
  name: string,
  nameKn: string,
): string {
  const trimmed = (lang === "kn" ? nameKn || name : name || nameKn) || "";
  return trimmed.trim();
}
