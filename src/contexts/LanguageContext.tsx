
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('temple-language');
    return (saved as Language) || 'mr';
  });

  useEffect(() => {
    localStorage.setItem('temple-language', language);
  }, [language]);

  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation helper function
const getTranslation = (key: string, language: Language): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};

// Translations object
const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      activities: 'Activities',
      events: 'Events',
      donate: 'Donate',
      contact: 'Contact'
    },
    hero: {
      title: 'Welcome to Sacred Temple',
      subtitle: 'A place of peace, prayer, and community worship',
      cta: 'Discover Our Mission'
    },
    about: {
      title: 'About Our Temple',
      description1: 'For over 50 years, Sacred Temple has been a beacon of spiritual guidance and community service. Our temple serves as a sanctuary where people from all walks of life come together to find peace, wisdom, and connection.',
      description2: 'We believe in the power of meditation, prayer, and community service to transform lives and create positive change in our world. Our doors are always open to those seeking spiritual growth and inner peace.',
      yearsOfService: 'Years of Service',
      communityMembers: 'Community Members'
    },
    activities: {
      title: 'Our Activities',
      dailyPrayers: {
        title: 'Daily Prayers',
        description: 'Join us for morning and evening prayers every day. Experience the tranquility of collective worship.',
        time: '6:00 AM & 7:00 PM'
      },
      meditation: {
        title: 'Meditation Sessions',
        description: 'Guided meditation sessions to help you find inner peace and spiritual clarity.',
        time: 'Saturdays 9:00 AM'
      },
      communityService: {
        title: 'Community Service',
        description: 'Participate in our weekly community service programs helping those in need.',
        time: 'Sundays 10:00 AM'
      },
      spiritualDiscourses: {
        title: 'Spiritual Discourses',
        description: 'Weekly teachings and discussions on spiritual philosophy and ancient wisdom.',
        time: 'Thursdays 7:00 PM'
      },
      youthPrograms: {
        title: 'Youth Programs',
        description: 'Special programs designed for young people to learn about values and spirituality.',
        time: 'Saturdays 4:00 PM'
      },
      festivals: {
        title: 'Festival Celebrations',
        description: 'Celebrate traditional festivals with music, dance, and community feasts.',
        time: 'Various Dates'
      }
    },
    events: {
      title: 'Upcoming Events',
      springFestival: {
        date: 'March 15, 2024',
        title: 'Spring Festival Celebration',
        description: 'Join us for our annual spring festival with traditional music, dance, and community feast.',
        time: '10:00 AM - 6:00 PM'
      },
      meditationRetreat: {
        date: 'March 22, 2024',
        title: 'Meditation Retreat',
        description: 'A day-long meditation retreat for deepening your spiritual practice.',
        time: '8:00 AM - 5:00 PM'
      },
      communityServiceDay: {
        date: 'April 5, 2024',
        title: 'Community Service Day',
        description: 'Special community service event helping local families in need.',
        time: '9:00 AM - 3:00 PM'
      }
    },
    donate: {
      title: 'Support Our Mission',
      description: 'Your generous donations help us maintain our temple, support community programs, and provide spiritual guidance to all who seek it.',
      donation25: 'Supports daily temple maintenance and utilities',
      donation50: 'Funds community service programs for one week',
      donation100: 'Sponsors a meditation session or spiritual discourse',
      donateNow: 'Donate Now',
      otherWays: 'Other Ways to Give',
      otherWaysDescription: 'You can also support us through volunteer work, spreading awareness about our mission, or participating in our fundraising events throughout the year.',
      learnMore: 'Learn More About Giving'
    },
    contact: {
      title: 'Contact Us',
      getInTouch: 'Get In Touch',
      address: 'Address',
      addressValue: '123 Sacred Street, Peaceful Valley, PV 12345',
      phone: 'Phone',
      phoneValue: '(555) 123-4567',
      email: 'Email',
      emailValue: 'info@sacredtemple.org',
      templeHours: 'Temple Hours',
      mondayFriday: 'Monday - Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      subject: 'Subject',
      message: 'Message',
      namePlaceholder: 'Your full name',
      emailPlaceholder: 'your.email@example.com',
      subjectPlaceholder: 'How can we help you?',
      messagePlaceholder: 'Please share your thoughts or questions...',
      sendMessage: 'Send Message'
    },
    footer: {
      description: 'A sanctuary of peace, wisdom, and community service. Join us in our mission to spread love, compassion, and spiritual growth throughout our community.',
      quickLinks: 'Quick Links',
      contactInfo: 'Contact Info',
      copyright: '© 2024 Sacred Temple. All rights reserved. Built with love and devotion.'
    }
  },
  mr: {
    nav: {
      home: 'मुख्यपृष्ठ',
      about: 'आमच्याबद्दल',
      activities: 'क्रियाकलाप',
      events: 'कार्यक्रम',
      donate: 'दान',
      contact: 'संपर्क'
    },
    hero: {
      title: 'पवित्र मंदिरात आपले स्वागत',
      subtitle: 'शांती, प्रार्थना आणि सामुदायिक उपासनेचे स्थान',
      cta: 'आमचे ध्येय शोधा'
    },
    about: {
      title: 'आमच्या मंदिराबद्दल',
      description1: '५० वर्षांहून अधिक काळ, पवित्र मंदिर आध्यात्मिक मार्गदर्शन आणि सामुदायिक सेवेचा दीपस्तंभ आहे. आमचे मंदिर एक अभयारण्य म्हणून काम करते जेथे सर्व क्षेत्रातील लोक शांती, शहाणपण आणि संबंध शोधण्यासाठी एकत्र येतात.',
      description2: 'आम्ही ध्यान, प्रार्थना आणि सामुदायिक सेवेच्या शक्तीवर विश्वास ठेवतो जे जीवन बदलते आणि आमच्या जगात सकारात्मक बदल घडवून आणते. आध्यात्मिक वाढ आणि अंतर्गत शांती शोधणाऱ्यांसाठी आमचे दरवाजे नेहमी खुले आहेत.',
      yearsOfService: 'वर्षांची सेवा',
      communityMembers: 'समुदायाचे सदस्य'
    },
    activities: {
      title: 'आमचे क्रियाकलाप',
      dailyPrayers: {
        title: 'दैनंदिन प्रार्थना',
        description: 'दररोज सकाळी आणि संध्याकाळी प्रार्थनेसाठी आमच्यात सामील व्हा. सामूहिक उपासनेची शांतता अनुभवा.',
        time: 'सकाळी ६:०० आणि संध्याकाळी ७:००'
      },
      meditation: {
        title: 'ध्यान सत्र',
        description: 'अंतर्गत शांती आणि आध्यात्मिक स्पष्टता मिळवण्यासाठी मार्गदर्शित ध्यान सत्रे.',
        time: 'शनिवारी सकाळी ९:००'
      },
      communityService: {
        title: 'सामुदायिक सेवा',
        description: 'गरजू लोकांना मदत करणाऱ्या आमच्या साप्ताहिक सामुदायिक सेवा कार्यक्रमात सहभागी व्हा.',
        time: 'रविवारी सकाळी १०:००'
      },
      spiritualDiscourses: {
        title: 'आध्यात्मिक प्रवचन',
        description: 'आध्यात्मिक तत्त्वज्ञान आणि प्राचीन शहाणपणावर साप्ताहिक शिकवणी आणि चर्चा.',
        time: 'गुरुवारी संध्याकाळी ७:००'
      },
      youthPrograms: {
        title: 'युवा कार्यक्रम',
        description: 'तरुणांना मूल्ये आणि अध्यात्म शिकवण्यासाठी विशेष कार्यक्रम.',
        time: 'शनिवारी दुपारी ४:००'
      },
      festivals: {
        title: 'सण साजरे',
        description: 'संगीत, नृत्य आणि सामुदायिक मेजवानीसह पारंपारिक सण साजरे करा.',
        time: 'विविध तारखा'
      }
    },
    events: {
      title: 'आगामी कार्यक्रम',
      springFestival: {
        date: '१५ मार्च, २०२४',
        title: 'वसंत उत्सव साजरा',
        description: 'पारंपारिक संगीत, नृत्य आणि सामुदायिक मेजवानीसह आमच्या वार्षिक वसंत उत्सवात सामील व्हा.',
        time: 'सकाळी १०:०० - संध्याकाळी ६:००'
      },
      meditationRetreat: {
        date: '२२ मार्च, २०२४',
        title: 'ध्यान निवृत्ती',
        description: 'आपल्या आध्यात्मिक अभ्यासाला खोली देण्यासाठी दिवसभराची ध्यान निवृत्ती.',
        time: 'सकाळी ८:०० - संध्याकाळी ५:००'
      },
      communityServiceDay: {
        date: '५ एप्रिल, २०२४',
        title: 'सामुदायिक सेवा दिवस',
        description: 'गरजू स्थानिक कुटुंबांना मदत करणारा विशेष सामुदायिक सेवा कार्यक्रम.',
        time: 'सकाळी ९:०० - दुपारी ३:००'
      }
    },
    donate: {
      title: 'आमच्या ध्येयाला पाठिंबा द्या',
      description: 'तुमची उदार देणगी आम्हाला आमचे मंदिर राखण्यात, सामुदायिक कार्यक्रमांना पाठिंबा देण्यात आणि सर्वांना आध्यात्मिक मार्गदर्शन देण्यात मदत करते.',
      donation25: 'दैनंदिन मंदिर देखभाल आणि उपयोगिता सेवांना पाठिंबा',
      donation50: 'एका आठवड्यासाठी सामुदायिक सेवा कार्यक्रमांना निधी',
      donation100: 'ध्यान सत्र किंवा आध्यात्मिक प्रवचनाचे प्रायोजकत्व',
      donateNow: 'आता दान करा',
      otherWays: 'देण्याचे इतर मार्ग',
      otherWaysDescription: 'तुम्ही स्वयंसेवी कामाद्वारे, आमच्या ध्येयाबद्दल जागरूकता पसरवून किंवा वर्षभर आमच्या निधी उभारणी कार्यक्रमात सहभागी होऊन आम्हाला पाठिंबा देऊ शकता.',
      learnMore: 'देण्याबद्दल अधिक जाणून घ्या'
    },
    contact: {
      title: 'आमच्याशी संपर्क साधा',
      getInTouch: 'संपर्कात रहा',
      address: 'पत्ता',
      addressValue: '१२३ पवित्र मार्ग, शांत खोरे, पीव्ही १२३४५',
      phone: 'फोन',
      phoneValue: '(५५५) १२३-४५६७',
      email: 'ईमेल',
      emailValue: 'info@sacredtemple.org',
      templeHours: 'मंदिरच्या वेळा',
      mondayFriday: 'सोमवार - शुक्रवार',
      saturday: 'शनिवार',
      sunday: 'रविवार',
      fullName: 'पूर्ण नाव',
      emailAddress: 'ईमेल पत्ता',
      subject: 'विषय',
      message: 'संदेश',
      namePlaceholder: 'तुमचे पूर्ण नाव',
      emailPlaceholder: 'तुमचा.ईमेल@उदाहरण.कॉम',
      subjectPlaceholder: 'आम्ही तुम्हाला कशी मदत करू शकतो?',
      messagePlaceholder: 'कृपया तुमचे विचार किंवा प्रश्न सामायिक करा...',
      sendMessage: 'संदेश पाठवा'
    },
    footer: {
      description: 'शांती, शहाणपण आणि सामुदायिक सेवेचे अभयारण्य. प्रेम, करुणा आणि आध्यात्मिक वाढ आमच्या समुदायामध्ये पसरवण्याच्या आमच्या ध्येयात सामील व्हा.',
      quickLinks: 'द्रुत दुवे',
      contactInfo: 'संपर्क माहिती',
      copyright: '© २०२४ पवित्र मंदिर. सर्व हक्क राखीव. प्रेम आणि भक्तीने निर्मित.'
    }
  }
};
