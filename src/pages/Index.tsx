
import React, { useEffect, useState } from 'react';
import { Home, Activity, CalendarDays, MessageSquare, Contact, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'activities', 'events', 'donate', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 ${language === 'mr' ? 'font-devanagari' : ''}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-orange-800">Sacred Temple</div>
            <div className="hidden md:flex space-x-8 items-center">
              {[
                { id: 'home', label: t('nav.home'), icon: Home },
                { id: 'about', label: t('nav.about'), icon: MessageSquare },
                { id: 'activities', label: t('nav.activities'), icon: Activity },
                { id: 'events', label: t('nav.events'), icon: CalendarDays },
                { id: 'donate', label: t('nav.donate'), icon: Heart },
                { id: 'contact', label: t('nav.contact'), icon: Contact },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 hover:bg-orange-100 ${
                    activeSection === id ? 'bg-orange-200 text-orange-800' : 'text-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
              <LanguageSwitcher />
            </div>
            <div className="md:hidden flex items-center space-x-4">
              <LanguageSwitcher />
              <button className="text-orange-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2834&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 to-yellow-900/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {t('hero.subtitle')}
          </p>
          <button
            onClick={() => scrollToSection('about')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {t('hero.cta')}
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-orange-800 mb-8">{t('about.title')}</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=2731&q=80"
                  alt="Sacred temple interior with ornate architecture"
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="text-left">
                <p className="text-lg text-gray-700 mb-6">
                  {t('about.description1')}
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  {t('about.description2')}
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="text-2xl font-bold text-orange-800">50+</h3>
                    <p className="text-gray-600">{t('about.yearsOfService')}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="text-2xl font-bold text-orange-800">1000+</h3>
                    <p className="text-gray-600">{t('about.communityMembers')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-orange-800 text-center mb-12">{t('activities.title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: t('activities.dailyPrayers.title'),
                  description: t('activities.dailyPrayers.description'),
                  time: t('activities.dailyPrayers.time')
                },
                {
                  title: t('activities.meditation.title'),
                  description: t('activities.meditation.description'),
                  time: t('activities.meditation.time')
                },
                {
                  title: t('activities.communityService.title'),
                  description: t('activities.communityService.description'),
                  time: t('activities.communityService.time')
                },
                {
                  title: t('activities.spiritualDiscourses.title'),
                  description: t('activities.spiritualDiscourses.description'),
                  time: t('activities.spiritualDiscourses.time')
                },
                {
                  title: t('activities.youthPrograms.title'),
                  description: t('activities.youthPrograms.description'),
                  time: t('activities.youthPrograms.time')
                },
                {
                  title: t('activities.festivals.title'),
                  description: t('activities.festivals.description'),
                  time: t('activities.festivals.time')
                }
              ].map((activity, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <h3 className="text-xl font-bold text-orange-800 mb-3">{activity.title}</h3>
                  <p className="text-gray-700 mb-4">{activity.description}</p>
                  <div className="text-orange-600 font-semibold">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-orange-800 text-center mb-12">{t('events.title')}</h2>
            <div className="space-y-6">
              {[
                {
                  date: t('events.springFestival.date'),
                  title: t('events.springFestival.title'),
                  description: t('events.springFestival.description'),
                  time: t('events.springFestival.time')
                },
                {
                  date: t('events.meditationRetreat.date'),
                  title: t('events.meditationRetreat.title'),
                  description: t('events.meditationRetreat.description'),
                  time: t('events.meditationRetreat.time')
                },
                {
                  date: t('events.communityServiceDay.date'),
                  title: t('events.communityServiceDay.title'),
                  description: t('events.communityServiceDay.description'),
                  time: t('events.communityServiceDay.time')
                }
              ].map((event, index) => (
                <div key={index} className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg border-l-4 border-orange-500">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="text-orange-600 font-semibold mb-1">{event.date}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                      <p className="text-gray-700">{event.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <div className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {event.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-20 bg-gradient-to-r from-orange-100 to-yellow-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-orange-800 mb-8">{t('donate.title')}</h2>
            <p className="text-xl text-gray-700 mb-12">
              {t('donate.description')}
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  amount: "$25",
                  description: t('donate.donation25')
                },
                {
                  amount: "$50",
                  description: t('donate.donation50')
                },
                {
                  amount: "$100",
                  description: t('donate.donation100')
                }
              ].map((donation, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-3">{donation.amount}</div>
                  <p className="text-gray-700">{donation.description}</p>
                  <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full transition-all duration-300">
                    {t('donate.donateNow')}
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">{t('donate.otherWays')}</h3>
              <p className="text-gray-700 mb-6">
                {t('donate.otherWaysDescription')}
              </p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300">
                {t('donate.learnMore')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-orange-800 text-center mb-12">{t('contact.title')}</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.getInTouch')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{t('contact.address')}</h4>
                      <p className="text-gray-600">{t('contact.addressValue')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{t('contact.phone')}</h4>
                      <p className="text-gray-600">{t('contact.phoneValue')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{t('contact.email')}</h4>
                      <p className="text-gray-600">{t('contact.emailValue')}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="font-semibold text-gray-800 mb-4">{t('contact.templeHours')}</h4>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>{t('contact.mondayFriday')}</span>
                      <span>6:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('contact.saturday')}</span>
                      <span>5:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('contact.sunday')}</span>
                      <span>5:00 AM - 10:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.fullName')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={t('contact.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.emailAddress')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={t('contact.emailPlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.subject')}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={t('contact.subjectPlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={t('contact.messagePlaceholder')}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    {t('contact.sendMessage')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Sacred Temple</h3>
              <p className="text-orange-200 mb-4">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                <button className="bg-orange-800 hover:bg-orange-700 p-2 rounded-full transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="bg-orange-800 hover:bg-orange-700 p-2 rounded-full transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </button>
                <button className="bg-orange-800 hover:bg-orange-700 p-2 rounded-full transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.989C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
              <ul className="space-y-2 text-orange-200">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">{t('nav.about')}</button></li>
                <li><button onClick={() => scrollToSection('activities')} className="hover:text-white transition-colors">{t('nav.activities')}</button></li>
                <li><button onClick={() => scrollToSection('events')} className="hover:text-white transition-colors">{t('nav.events')}</button></li>
                <li><button onClick={() => scrollToSection('donate')} className="hover:text-white transition-colors">{t('nav.donate')}</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.contactInfo')}</h4>
              <div className="space-y-2 text-orange-200">
                <p>123 Sacred Street</p>
                <p>Peaceful Valley, PV 12345</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@sacredtemple.org</p>
              </div>
            </div>
          </div>
          <div className="border-t border-orange-800 mt-8 pt-8 text-center text-orange-200">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
