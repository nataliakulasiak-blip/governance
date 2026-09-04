/* =========================================================================
   Urania Travel — warstwa wielojęzyczna (PL / EN / FR / ES / RU / IT)
   Użycie w HTML:
     <span data-i18n="nav_home">Start</span>
     <input data-i18n-attr="placeholder:f_ph_name">
     <a data-i18n-attr="aria-label:nav_home">
   Wybór języka: ?lang=en  ->  localStorage ->  navigator.language  ->  pl
   ========================================================================= */
window.UT_LANGS = [
  { code: 'pl', flag: '🇵🇱', name: 'Polski' },
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'ru', flag: '🇷🇺', name: 'Русский' },
  { code: 'it', flag: '🇮🇹', name: 'Italiano' }
];

window.UT_I18N = {};

/* ------------------------------- POLSKI ------------------------------- */
window.UT_I18N.pl = {
  html_lang: 'pl',
  skip: 'Przejdź do treści',
  menu: 'Otwórz menu',
  theme: 'Zmień motyw',
  lang_label: 'Zmień język',

  nav_home: 'Start', nav_offer: 'Oferta', nav_blog: 'Blog', nav_faq: 'FAQ',
  nav_contact: 'Kontakt', nav_cta: 'Zapytaj o wycenę',

  hero_pill: 'Kursy językowe, wycieczki szkolne i wyjazdy grupowe', hero_pill_tag: 'od 2009',
  hero_title_a: 'Zaplanujmy razem Twój', hero_title_b: 'podróż do',
  hero_rot: 'Anglii,Hiszpanii,Włoch,Niemiec,Francji',
  hero_lead: 'Jesteśmy pod telefonem, na WhatsAppie i w skrzynce mailowej. Odpowiadamy w ciągu 24 godzin roboczych — bez formularzy bez odpowiedzi i bez infolinii.',
  hero_cta1: 'Napisz do nas', hero_cta2: 'Zadzwoń teraz',
  hero_trust: 'Gwarancja ubezpieczeniowa i wzory umów dostępne do pobrania',
  stat_years: 'lat doświadczenia', stat_clients: 'klientów rocznie',
  stat_dest: 'kierunków', stat_rating: 'średnia ocena',
  mq: 'Santorini,Kioto,Marrakesz,Reykjavík,Hanoi,Lizbona,Zanzibar,Patagonia',

  qc_title: 'Szybki kontakt', qc_sub: 'Wybierz kanał, który najbardziej Ci odpowiada.',
  qc_phone: 'Zadzwoń do biura', qc_phone_note: 'Pn–Pt 09:00–18:00',
  qc_wa: 'Napisz na WhatsAppie', qc_wa_note: 'Odpowiedź zwykle w 15 minut',
  qc_tg: 'Telegram', qc_tg_note: '@uraniatravel',
  qc_mail: 'Wyślij e-mail', qc_mail_note: 'kontakt@uraniatravel.pl',
  qc_visit: 'Dokumenty dla klienta', qc_visit_note: 'ul. Podróżnicza 12/3, Warszawa',

  ch_title: 'Wszystkie kanały kontaktu', ch_lead: 'Telefon, e-mail, komunikatory i media społecznościowe — odpisujemy wszędzie tam, gdzie nas znajdziesz.',
  ch_phone_t: 'Telefon', ch_phone_d: 'Najszybszy sposób na konkretną rozmowę o terminie i cenie.',
  ch_mail_t: 'E-mail', ch_mail_d: 'Do zapytań ofertowych, dokumentów i faktur.',
  ch_wa_t: 'WhatsApp', ch_wa_d: 'Zdjęcia hoteli, krótkie pytania, kontakt w trakcie wyjazdu.',
  ch_tg_t: 'Telegram', ch_tg_d: 'Kanał z ofertami last minute i wsparcie 24/7 dla klientów w podróży.',
  ch_fb_t: 'Facebook', ch_fb_d: 'Relacje z wyjazdów, wydarzenia i opinie podróżnych.',
  ch_ig_t: 'Instagram', ch_ig_d: 'Zdjęcia z kierunków, stories i kulisy pracy biura.',
  ch_call: 'Zadzwoń', ch_write: 'Napisz', ch_open: 'Otwórz',

  off_title: 'Biuro i godziny otwarcia', off_lead: 'Wpadnij na kawę i mapę — bez umawiania się. W soboty pracujemy krócej.',
  d_mon: 'Poniedziałek', d_tue: 'Wtorek', d_wed: 'Środa', d_thu: 'Czwartek',
  d_fri: 'Piątek', d_sat: 'Sobota', d_sun: 'Niedziela', closed: 'nieczynne',
  open_now: 'Otwarte teraz', closed_now: 'Obecnie zamknięte',
  company_title: 'Dane firmy', c_name: 'Nazwa', c_addr: 'Adres', c_nip: 'NIP',
  c_regon: 'REGON', c_reg: 'Rejestr Organizatorów Turystyki', c_bank: 'Numer konta',

  f_title: 'Napisz do nas', f_lead: 'Opisz krótko, dokąd i kiedy chcesz jechać. Wycenę przygotujemy w 24 godziny robocze.',
  f_name: 'Imię i nazwisko', f_email: 'Adres e-mail', f_phone: 'Telefon',
  f_subject: 'Temat', f_dest: 'Kierunek', f_date: 'Planowany termin',
  f_people: 'Liczba osób', f_message: 'Wiadomość',
  f_ph_name: 'Anna Kowalska', f_ph_email: 'anna@przyklad.pl', f_ph_phone: '+48 600 100 200',
  f_ph_dest: 'np. Kreta, Japonia, Islandia', f_ph_msg: 'Szukamy dwutygodniowego wyjazdu dla dwóch osób…',
  f_sub_0: 'Wybierz temat', f_sub_1: 'Wycena wyjazdu', f_sub_2: 'Wyjazd grupowy / firmowy',
  f_sub_3: 'Wyjazd grupowy / firmowy', f_sub_4: 'Rezerwacja istniejąca — zmiana', f_sub_5: 'Inne',
  f_consent: 'Wyrażam zgodę na przetwarzanie moich danych w celu odpowiedzi na zapytanie.',
  f_submit: 'Wyślij zapytanie',
  f_note: 'Administratorem danych jest Urania. Dane wykorzystujemy wyłącznie do odpowiedzi na zapytanie.',

  map_title: 'Jak do nas trafić', map_lead: 'Jesteśmy w centrum, 4 minuty pieszo od stacji metra.',
  map_load: 'Pokaż mapę', map_privacy: 'Mapa ładuje się dopiero po kliknięciu — nie wysyłamy Twoich danych bez zgody.',
  map_here: 'Nasze biuro', map_dir: 'Wyznacz trasę', map_transport: 'Metro · Tramwaj 4, 18 · Parking w podwórzu',

  faq_title: 'Najczęściej zadawane pytania', faq_lead: 'Zebraliśmy odpowiedzi na pytania, które dostajemy najczęściej. Nie ma Twojego? Napisz — dopiszemy je tutaj.',
  faq_search: 'Szukaj w pytaniach…', faq_all: 'Wszystkie', faq_cat_book: 'Rezerwacja',
  faq_cat_pay: 'Płatności', faq_cat_doc: 'Dokumenty', faq_cat_trip: 'W podróży',
  faq_empty: 'Brak wyników. Spróbuj innego słowa albo napisz do nas.',

  blog_title: 'Blog podróżniczy', blog_lead: 'Praktyczne poradniki i inspiracje od zespołu, który sam jeździ w te miejsca.',
  blog_read: 'Czytaj dalej', blog_min: 'min czytania', blog_all: 'Zobacz wszystkie wpisy',

  cta_title: 'Gotowi na pierwszy krok?', cta_lead: 'Zostaw numer albo napisz na WhatsAppie — oddzwonimy jeszcze dziś.',
  cta_b1: 'Wypełnij formularz', cta_b2: 'WhatsApp',

  ft_about: 'Kursy językowe, wycieczki szkolne i wyjazdy grupowe — od pierwszej rozmowy po powrót do domu.',
  ft_nav: 'Nawigacja', ft_contact: 'Kontakt', ft_hours: 'Godziny biura',
  v_required: 'To pole jest wymagane.',
  v_email: 'Podaj poprawny adres e-mail.',
  v_phone: 'Podaj poprawny numer telefonu.',
  f_sending: 'Wysyłanie…',
  f_invalid: 'Uzupełnij zaznaczone pola i spróbuj ponownie.',
  f_ok: 'Dziękujemy! Wiadomość została wysłana. Odpowiadamy zwykle w ciągu 24 godzin roboczych.',
  f_err: 'Nie udało się wysłać formularza. Zadzwoń do nas lub napisz na info@uraniatravel.pl.',
  f_mailto: 'Otwieramy Twój program pocztowy z gotową wiadomością. Jeśli się nie otworzył, napisz na info@uraniatravel.pl.',
  brand_tag: 'Języki · Podróże · Wolność',
  hero_pill_tag: 'Języki',
  hero_title_b: 'wyjazd do',
  qc_visit_note: 'Umowy i gwarancja ubezpieczeniowa',
  off_lead: 'Umów się telefonicznie albo mailowo — dopasujemy termin rozmowy.',
  ft_client: 'Dla klienta',
  ft_social: 'Media społecznościowe',
  doc_guarantee: 'Gwarancja ubezpieczeniowa',
  doc_person: 'Umowa dla osób fizycznych',
  doc_school_order: 'Zamów wycieczkę szkolną',
  doc_school: 'Umowa dla szkół',
  of_title: 'Cztery sposoby, żeby wyjechać z nami',
  of_lead: 'Od dwutygodniowego kursu językowego po wycieczkę dla całej klasy — każdy plan powstaje od zera.',
  of_1_b: 'Nauka',
  of_1_t: 'Kursy językowe za granicą',
  of_1_d: 'Szkoła, zakwaterowanie i program po zajęciach. Angielski, hiszpański, włoski, niemiecki i francuski.',
  of_2_b: 'Szkoły',
  of_2_t: 'Wycieczki szkolne',
  of_2_d: 'Program, transport, ubezpieczenie i komplet dokumentów dla dyrekcji oraz rodziców.',
  of_3_b: 'Grupy',
  of_3_t: 'Wyjazdy grupowe i firmowe',
  of_3_d: 'Integracja, wyjazd motywacyjny albo kurs dla zespołu — z jedną fakturą i jednym opiekunem.',
  of_4_b: 'Indywidualnie',
  of_4_t: 'Podróże indywidualne',
  of_4_d: 'Ty mówisz, co lubisz — my układamy trasę, rezerwujemy noclegi i pilnujemy przesiadek.',
  f_sub_1: 'Kurs językowy za granicą',
  f_sub_2: 'Wycieczka szkolna',
  f_sub_4: 'Podróż indywidualna',
  f_sub_5: 'Istniejąca rezerwacja lub inne',
  qc_mail_note: 'info@uraniatravel.pl',
  map_lead: 'Adres biura i dojazd — uzupełnij dane przed publikacją strony.',
  ft_rights: 'Wszelkie prawa zastrzeżone.'
};

/* ------------------------------- ENGLISH ------------------------------ */
window.UT_I18N.en = {
  html_lang: 'en',
  skip: 'Skip to content', menu: 'Open menu', theme: 'Switch theme', lang_label: 'Change language',

  nav_home: 'Home', nav_offer: 'Trips', nav_blog: 'Blog', nav_faq: 'FAQ',
  nav_contact: 'Contact', nav_cta: 'Get a quote',

  hero_pill: 'Language courses, school trips and group travel', hero_pill_tag: 'since 2009',
  hero_title_a: "Let's plan your", hero_title_b: 'journey to',
  hero_rot: 'England,Spain,Italy,Germany,France',
  hero_lead: 'Reach us by phone, on WhatsApp or by e-mail. We reply within 24 business hours — no unanswered forms, no call-centre queues.',
  hero_cta1: 'Write to us', hero_cta2: 'Call now',
  hero_trust: 'Insurance guarantee and model contracts available to download',
  stat_years: 'years of experience', stat_clients: 'clients a year',
  stat_dest: 'destinations', stat_rating: 'average rating',
  mq: 'Santorini,Kyoto,Marrakesh,Reykjavík,Hanoi,Lisbon,Zanzibar,Patagonia',

  qc_title: 'Quick contact', qc_sub: 'Pick whichever channel suits you best.',
  qc_phone: 'Call the office', qc_phone_note: 'Mon–Fri 09:00–18:00',
  qc_wa: 'Message us on WhatsApp', qc_wa_note: 'Usually answered in 15 minutes',
  qc_tg: 'Telegram', qc_tg_note: '@uraniatravel',
  qc_mail: 'Send an e-mail', qc_mail_note: 'kontakt@uraniatravel.pl',
  qc_visit: 'Client documents', qc_visit_note: 'ul. Podróżnicza 12/3, Warsaw',

  ch_title: 'Every way to reach us', ch_lead: 'Phone, e-mail, messengers and social media — wherever you find us, you get a reply.',
  ch_phone_t: 'Phone', ch_phone_d: 'The fastest way to talk dates and prices with a real person.',
  ch_mail_t: 'E-mail', ch_mail_d: 'For quote requests, documents and invoices.',
  ch_wa_t: 'WhatsApp', ch_wa_d: 'Hotel photos, quick questions, support while you travel.',
  ch_tg_t: 'Telegram', ch_tg_d: 'Last-minute deals channel and 24/7 support for clients on the road.',
  ch_fb_t: 'Facebook', ch_fb_d: 'Trip reports, events and traveller reviews.',
  ch_ig_t: 'Instagram', ch_ig_d: 'Photos from our destinations, stories and behind the scenes.',
  ch_call: 'Call', ch_write: 'Write', ch_open: 'Open',

  off_title: 'Office & opening hours', off_lead: 'Drop in for coffee and a map — no appointment needed. Shorter hours on Saturdays.',
  d_mon: 'Monday', d_tue: 'Tuesday', d_wed: 'Wednesday', d_thu: 'Thursday',
  d_fri: 'Friday', d_sat: 'Saturday', d_sun: 'Sunday', closed: 'closed',
  open_now: 'Open now', closed_now: 'Currently closed',
  company_title: 'Company details', c_name: 'Name', c_addr: 'Address', c_nip: 'VAT ID',
  c_regon: 'REGON', c_reg: 'Tour Operators Register', c_bank: 'Bank account',

  f_title: 'Write to us', f_lead: 'Tell us briefly where and when you want to go. We prepare a quote within 24 business hours.',
  f_name: 'Full name', f_email: 'E-mail address', f_phone: 'Phone',
  f_subject: 'Subject', f_dest: 'Destination', f_date: 'Preferred dates',
  f_people: 'Travellers', f_message: 'Message',
  f_ph_name: 'Anna Kowalska', f_ph_email: 'anna@example.com', f_ph_phone: '+48 600 100 200',
  f_ph_dest: 'e.g. Crete, Japan, Iceland', f_ph_msg: 'We are looking for a two-week trip for two…',
  f_sub_0: 'Choose a subject', f_sub_1: 'Trip quote', f_sub_2: 'Group / corporate travel',
  f_sub_3: 'Group / corporate travel', f_sub_4: 'Existing booking — change', f_sub_5: 'Something else',
  f_consent: 'I agree to my data being processed in order to answer this enquiry.',
  f_submit: 'Send enquiry',
  f_note: 'Urania is the data controller. We use your data only to answer your enquiry.',

  map_title: 'How to find us', map_lead: 'We are in the city centre, a 4-minute walk from the metro station.',
  map_load: 'Show map', map_privacy: 'The map loads only after you click — we do not send your data without consent.',
  map_here: 'Our office', map_dir: 'Get directions', map_transport: 'Metro · Trams 4, 18 · Courtyard parking',

  faq_title: 'Frequently asked questions', faq_lead: 'The answers we give most often. Missing yours? Write to us and we will add it here.',
  faq_search: 'Search the questions…', faq_all: 'All', faq_cat_book: 'Booking',
  faq_cat_pay: 'Payments', faq_cat_doc: 'Documents', faq_cat_trip: 'On the road',
  faq_empty: 'Nothing found. Try another word or just write to us.',

  blog_title: 'Travel blog', blog_lead: 'Practical guides and inspiration from a team that travels to these places itself.',
  blog_read: 'Read more', blog_min: 'min read', blog_all: 'See all posts',

  cta_title: 'Ready for the first step?', cta_lead: 'Leave your number or message us on WhatsApp — we will call back today.',
  cta_b1: 'Fill in the form', cta_b2: 'WhatsApp',

  ft_about: 'Language courses, school trips and group travel — from the first conversation to your way home.',
  ft_nav: 'Navigation', ft_contact: 'Contact', ft_hours: 'Office hours',
  v_required: 'This field is required.',
  v_email: 'Enter a valid e-mail address.',
  v_phone: 'Enter a valid phone number.',
  f_sending: 'Sending…',
  f_invalid: 'Please complete the highlighted fields and try again.',
  f_ok: 'Thank you! Your message has been sent. We usually reply within 24 business hours.',
  f_err: 'The form could not be sent. Please call us or write to info@uraniatravel.pl.',
  f_mailto: 'We are opening your e-mail app with the message ready. If nothing opened, write to info@uraniatravel.pl.',
  brand_tag: 'Languages · Travel · Freedom',
  hero_pill_tag: 'Languages',
  hero_title_a: 'Let\'s plan your',
  hero_title_b: 'trip to',
  qc_visit_note: 'Contracts and insurance guarantee',
  off_lead: 'Arrange a meeting by phone or e-mail — we will find a time that suits you.',
  ft_client: 'For clients',
  ft_social: 'Social media',
  doc_guarantee: 'Insurance guarantee',
  doc_person: 'Agreement for individuals',
  doc_school_order: 'Order a school trip',
  doc_school: 'Agreement for schools',
  of_title: 'Four ways to travel with us',
  of_lead: 'From a two-week language course to a trip for a whole class — every plan is built from scratch.',
  of_1_b: 'Learning',
  of_1_t: 'Language courses abroad',
  of_1_d: 'School, accommodation and an after-class programme. English, Spanish, Italian, German and French.',
  of_2_b: 'Schools',
  of_2_t: 'School trips',
  of_2_d: 'Programme, transport, insurance and a full set of documents for the head teacher and parents.',
  of_3_b: 'Groups',
  of_3_t: 'Group and corporate travel',
  of_3_d: 'Team building, an incentive trip or a course for your team — one invoice, one coordinator.',
  of_4_b: 'Individual',
  of_4_t: 'Independent travel',
  of_4_d: 'You say what you like — we build the route, book the stays and watch the connections.',
  f_sub_1: 'Language course abroad',
  f_sub_2: 'School trip',
  f_sub_4: 'Independent trip',
  f_sub_5: 'Existing booking or something else',
  qc_mail_note: 'info@uraniatravel.pl',
  map_lead: 'Office address and directions — fill these in before publishing the site.',
  ft_rights: 'All rights reserved.'
};

/* ------------------------------- FRANÇAIS ----------------------------- */
window.UT_I18N.fr = {
  html_lang: 'fr',
  skip: 'Aller au contenu', menu: 'Ouvrir le menu', theme: 'Changer de thème', lang_label: 'Changer de langue',

  nav_home: 'Accueil', nav_offer: 'Voyages', nav_blog: 'Blog', nav_faq: 'FAQ',
  nav_contact: 'Contact', nav_cta: 'Demander un devis',

  hero_pill: 'Séjours linguistiques, voyages scolaires et voyages de groupe', hero_pill_tag: 'depuis 2009',
  hero_title_a: 'Préparons ensemble votre', hero_title_b: 'voyage en',
  hero_rot: 'Angleterre,Espagne,Italie,Allemagne,France',
  hero_lead: 'Joignez-nous par téléphone, sur WhatsApp ou par e-mail. Nous répondons sous 24 heures ouvrées — sans formulaire sans réponse ni file d’attente.',
  hero_cta1: 'Écrivez-nous', hero_cta2: 'Appeler maintenant',
  hero_trust: 'Garantie d’assurance et modèles de contrat à télécharger',
  stat_years: 'ans d’expérience', stat_clients: 'clients par an',
  stat_dest: 'destinations', stat_rating: 'note moyenne',
  mq: 'Santorin,Kyoto,Marrakech,Reykjavík,Hanoï,Lisbonne,Zanzibar,Patagonie',

  qc_title: 'Contact rapide', qc_sub: 'Choisissez le canal qui vous convient le mieux.',
  qc_phone: 'Appeler l’agence', qc_phone_note: 'Lun–Ven 09h00–18h00',
  qc_wa: 'Écrire sur WhatsApp', qc_wa_note: 'Réponse en 15 minutes en général',
  qc_tg: 'Telegram', qc_tg_note: '@uraniatravel',
  qc_mail: 'Envoyer un e-mail', qc_mail_note: 'kontakt@uraniatravel.pl',
  qc_visit: 'Documents client', qc_visit_note: 'ul. Podróżnicza 12/3, Varsovie',

  ch_title: 'Tous nos canaux de contact', ch_lead: 'Téléphone, e-mail, messageries et réseaux sociaux — où que vous nous trouviez, vous obtenez une réponse.',
  ch_phone_t: 'Téléphone', ch_phone_d: 'Le moyen le plus rapide de parler dates et tarifs avec un vrai conseiller.',
  ch_mail_t: 'E-mail', ch_mail_d: 'Pour les demandes de devis, les documents et les factures.',
  ch_wa_t: 'WhatsApp', ch_wa_d: 'Photos d’hôtels, questions rapides, assistance pendant le voyage.',
  ch_tg_t: 'Telegram', ch_tg_d: 'Canal des offres de dernière minute et assistance 24h/24 en voyage.',
  ch_fb_t: 'Facebook', ch_fb_d: 'Récits de voyage, événements et avis de voyageurs.',
  ch_ig_t: 'Instagram', ch_ig_d: 'Photos de nos destinations, stories et coulisses de l’agence.',
  ch_call: 'Appeler', ch_write: 'Écrire', ch_open: 'Ouvrir',

  off_title: 'Agence et horaires', off_lead: 'Passez pour un café et une carte — sans rendez-vous. Horaires réduits le samedi.',
  d_mon: 'Lundi', d_tue: 'Mardi', d_wed: 'Mercredi', d_thu: 'Jeudi',
  d_fri: 'Vendredi', d_sat: 'Samedi', d_sun: 'Dimanche', closed: 'fermé',
  open_now: 'Ouvert maintenant', closed_now: 'Actuellement fermé',
  company_title: 'Informations légales', c_name: 'Raison sociale', c_addr: 'Adresse', c_nip: 'N° de TVA',
  c_regon: 'REGON', c_reg: 'Registre des organisateurs de voyages', c_bank: 'Compte bancaire',

  f_title: 'Écrivez-nous', f_lead: 'Dites-nous brièvement où et quand vous souhaitez partir. Devis sous 24 heures ouvrées.',
  f_name: 'Nom et prénom', f_email: 'Adresse e-mail', f_phone: 'Téléphone',
  f_subject: 'Objet', f_dest: 'Destination', f_date: 'Dates souhaitées',
  f_people: 'Nombre de voyageurs', f_message: 'Message',
  f_ph_name: 'Anna Kowalska', f_ph_email: 'anna@exemple.fr', f_ph_phone: '+48 600 100 200',
  f_ph_dest: 'ex. Crète, Japon, Islande', f_ph_msg: 'Nous cherchons un séjour de deux semaines pour deux personnes…',
  f_sub_0: 'Choisissez un objet', f_sub_1: 'Devis pour un voyage', f_sub_2: 'Voyage de groupe / entreprise',
  f_sub_3: 'Voyage de groupe / entreprise', f_sub_4: 'Réservation existante — modification', f_sub_5: 'Autre',
  f_consent: 'J’accepte le traitement de mes données afin de recevoir une réponse.',
  f_submit: 'Envoyer la demande',
  f_note: 'Urania est responsable du traitement. Vos données servent uniquement à répondre à votre demande.',

  map_title: 'Comment nous trouver', map_lead: 'En plein centre, à 4 minutes à pied de la station de métro.',
  map_load: 'Afficher la carte', map_privacy: 'La carte ne se charge qu’après un clic — aucune donnée n’est envoyée sans votre accord.',
  map_here: 'Notre agence', map_dir: 'Itinéraire', map_transport: 'Métro · Trams 4, 18 · Parking dans la cour',

  faq_title: 'Questions fréquentes', faq_lead: 'Les réponses que nous donnons le plus souvent. La vôtre manque ? Écrivez-nous, nous l’ajouterons.',
  faq_search: 'Rechercher dans les questions…', faq_all: 'Toutes', faq_cat_book: 'Réservation',
  faq_cat_pay: 'Paiements', faq_cat_doc: 'Documents', faq_cat_trip: 'En voyage',
  faq_empty: 'Aucun résultat. Essayez un autre mot ou écrivez-nous.',

  blog_title: 'Blog de voyage', blog_lead: 'Guides pratiques et inspirations d’une équipe qui parcourt elle-même ces destinations.',
  blog_read: 'Lire la suite', blog_min: 'min de lecture', blog_all: 'Voir tous les articles',

  cta_title: 'Prêt pour le premier pas ?', cta_lead: 'Laissez votre numéro ou écrivez sur WhatsApp — nous rappelons dans la journée.',
  cta_b1: 'Remplir le formulaire', cta_b2: 'WhatsApp',

  ft_about: 'Séjours linguistiques, voyages scolaires et voyages de groupe — de la première conversation au retour à la maison.',
  ft_nav: 'Navigation', ft_contact: 'Contact', ft_hours: 'Horaires',
  v_required: 'Ce champ est obligatoire.',
  v_email: 'Saisissez une adresse e-mail valide.',
  v_phone: 'Saisissez un numéro de téléphone valide.',
  f_sending: 'Envoi…',
  f_invalid: 'Complétez les champs signalés et réessayez.',
  f_ok: 'Merci ! Votre message a été envoyé. Nous répondons généralement sous 24 heures ouvrées.',
  f_err: 'L’envoi du formulaire a échoué. Appelez-nous ou écrivez à info@uraniatravel.pl.',
  f_mailto: 'Nous ouvrons votre logiciel de messagerie avec le message prêt. Si rien ne s’ouvre, écrivez à info@uraniatravel.pl.',
  brand_tag: 'Langues · Voyages · Liberté',
  hero_pill_tag: 'Langues',
  hero_title_b: 'séjour en',
  qc_visit_note: 'Contrats et garantie d’assurance',
  off_lead: 'Prenez rendez-vous par téléphone ou par e-mail — nous trouverons un créneau.',
  ft_client: 'Espace client',
  ft_social: 'Réseaux sociaux',
  doc_guarantee: 'Garantie d’assurance',
  doc_person: 'Contrat pour les particuliers',
  doc_school_order: 'Commander un voyage scolaire',
  doc_school: 'Contrat pour les écoles',
  of_title: 'Quatre façons de partir avec nous',
  of_lead: 'D’un séjour linguistique de deux semaines au voyage de toute une classe — chaque projet part de zéro.',
  of_1_b: 'Apprendre',
  of_1_t: 'Séjours linguistiques à l’étranger',
  of_1_d: 'École, hébergement et programme après les cours. Anglais, espagnol, italien, allemand et français.',
  of_2_b: 'Écoles',
  of_2_t: 'Voyages scolaires',
  of_2_d: 'Programme, transport, assurance et dossier complet pour la direction et les parents.',
  of_3_b: 'Groupes',
  of_3_t: 'Voyages de groupe et d’entreprise',
  of_3_d: 'Cohésion d’équipe, voyage de motivation ou formation — une facture, un interlocuteur.',
  of_4_b: 'Sur mesure',
  of_4_t: 'Voyages individuels',
  of_4_d: 'Vous dites ce que vous aimez — nous construisons l’itinéraire et surveillons les correspondances.',
  f_sub_1: 'Séjour linguistique à l’étranger',
  f_sub_2: 'Voyage scolaire',
  f_sub_4: 'Voyage individuel',
  f_sub_5: 'Réservation existante ou autre',
  qc_mail_note: 'info@uraniatravel.pl',
  map_lead: 'Adresse du bureau et accès — à compléter avant la mise en ligne.',
  ft_rights: 'Tous droits réservés.'
};

/* ------------------------------- ESPAÑOL ------------------------------ */
window.UT_I18N.es = {
  html_lang: 'es',
  skip: 'Ir al contenido', menu: 'Abrir menú', theme: 'Cambiar tema', lang_label: 'Cambiar idioma',

  nav_home: 'Inicio', nav_offer: 'Viajes', nav_blog: 'Blog', nav_faq: 'FAQ',
  nav_contact: 'Contacto', nav_cta: 'Pedir presupuesto',

  hero_pill: 'Cursos de idiomas, viajes escolares y viajes de grupo', hero_pill_tag: 'desde 2009',
  hero_title_a: 'Planifiquemos juntos tu', hero_title_b: 'viaje a',
  hero_rot: 'Inglaterra,España,Italia,Alemania,Francia',
  hero_lead: 'Estamos al teléfono, en WhatsApp y en el correo. Respondemos en 24 horas laborables — sin formularios sin respuesta ni centralitas.',
  hero_cta1: 'Escríbenos', hero_cta2: 'Llamar ahora',
  hero_trust: 'Garantía de seguro y modelos de contrato disponibles para descargar',
  stat_years: 'años de experiencia', stat_clients: 'clientes al año',
  stat_dest: 'destinos', stat_rating: 'valoración media',
  mq: 'Santorini,Kioto,Marrakech,Reikiavik,Hanói,Lisboa,Zanzíbar,Patagonia',

  qc_title: 'Contacto rápido', qc_sub: 'Elige el canal que más te convenga.',
  qc_phone: 'Llamar a la oficina', qc_phone_note: 'Lun–Vie 09:00–18:00',
  qc_wa: 'Escribir por WhatsApp', qc_wa_note: 'Respuesta habitual en 15 minutos',
  qc_tg: 'Telegram', qc_tg_note: '@uraniatravel',
  qc_mail: 'Enviar un correo', qc_mail_note: 'kontakt@uraniatravel.pl',
  qc_visit: 'Documentos para el cliente', qc_visit_note: 'ul. Podróżnicza 12/3, Varsovia',

  ch_title: 'Todos los canales de contacto', ch_lead: 'Teléfono, correo, mensajería y redes sociales: donde nos encuentres, obtienes respuesta.',
  ch_phone_t: 'Teléfono', ch_phone_d: 'La forma más rápida de hablar de fechas y precios con una persona real.',
  ch_mail_t: 'Correo electrónico', ch_mail_d: 'Para presupuestos, documentos y facturas.',
  ch_wa_t: 'WhatsApp', ch_wa_d: 'Fotos de hoteles, dudas rápidas y asistencia durante el viaje.',
  ch_tg_t: 'Telegram', ch_tg_d: 'Canal de ofertas de última hora y soporte 24/7 para clientes en ruta.',
  ch_fb_t: 'Facebook', ch_fb_d: 'Crónicas de viaje, eventos y opiniones de viajeros.',
  ch_ig_t: 'Instagram', ch_ig_d: 'Fotos de los destinos, stories y el día a día de la agencia.',
  ch_call: 'Llamar', ch_write: 'Escribir', ch_open: 'Abrir',

  off_title: 'Oficina y horario', off_lead: 'Pásate a por un café y un mapa, sin cita previa. Los sábados abrimos menos horas.',
  d_mon: 'Lunes', d_tue: 'Martes', d_wed: 'Miércoles', d_thu: 'Jueves',
  d_fri: 'Viernes', d_sat: 'Sábado', d_sun: 'Domingo', closed: 'cerrado',
  open_now: 'Abierto ahora', closed_now: 'Cerrado en este momento',
  company_title: 'Datos de la empresa', c_name: 'Denominación', c_addr: 'Dirección', c_nip: 'NIF/CIF',
  c_regon: 'REGON', c_reg: 'Registro de Operadores Turísticos', c_bank: 'Cuenta bancaria',

  f_title: 'Escríbenos', f_lead: 'Cuéntanos brevemente adónde y cuándo quieres ir. Preparamos el presupuesto en 24 horas laborables.',
  f_name: 'Nombre y apellidos', f_email: 'Correo electrónico', f_phone: 'Teléfono',
  f_subject: 'Asunto', f_dest: 'Destino', f_date: 'Fechas previstas',
  f_people: 'Nº de viajeros', f_message: 'Mensaje',
  f_ph_name: 'Anna Kowalska', f_ph_email: 'anna@ejemplo.es', f_ph_phone: '+48 600 100 200',
  f_ph_dest: 'p. ej. Creta, Japón, Islandia', f_ph_msg: 'Buscamos un viaje de dos semanas para dos personas…',
  f_sub_0: 'Elige un asunto', f_sub_1: 'Presupuesto de viaje', f_sub_2: 'Viaje de grupo / empresa',
  f_sub_3: 'Viaje de grupo / empresa', f_sub_4: 'Reserva existente — cambio', f_sub_5: 'Otro',
  f_consent: 'Acepto el tratamiento de mis datos para recibir respuesta a esta consulta.',
  f_submit: 'Enviar consulta',
  f_note: 'Urania es el responsable del tratamiento. Usamos tus datos solo para responder a tu consulta.',

  map_title: 'Cómo llegar', map_lead: 'Estamos en pleno centro, a 4 minutos a pie del metro.',
  map_load: 'Mostrar el mapa', map_privacy: 'El mapa se carga solo al hacer clic: no enviamos tus datos sin consentimiento.',
  map_here: 'Nuestra oficina', map_dir: 'Cómo llegar', map_transport: 'Metro · Tranvías 4 y 18 · Aparcamiento en el patio',

  faq_title: 'Preguntas frecuentes', faq_lead: 'Las respuestas que damos más a menudo. ¿Falta la tuya? Escríbenos y la añadimos.',
  faq_search: 'Buscar en las preguntas…', faq_all: 'Todas', faq_cat_book: 'Reservas',
  faq_cat_pay: 'Pagos', faq_cat_doc: 'Documentos', faq_cat_trip: 'Durante el viaje',
  faq_empty: 'Sin resultados. Prueba otra palabra o escríbenos.',

  blog_title: 'Blog de viajes', blog_lead: 'Guías prácticas e inspiración de un equipo que viaja a estos lugares.',
  blog_read: 'Seguir leyendo', blog_min: 'min de lectura', blog_all: 'Ver todas las entradas',

  cta_title: '¿Listo para el primer paso?', cta_lead: 'Déjanos tu número o escríbenos por WhatsApp: te llamamos hoy mismo.',
  cta_b1: 'Rellenar el formulario', cta_b2: 'WhatsApp',

  ft_about: 'Cursos de idiomas, viajes escolares y viajes de grupo, desde la primera conversación hasta la vuelta a casa.',
  ft_nav: 'Navegación', ft_contact: 'Contacto', ft_hours: 'Horario',
  v_required: 'Este campo es obligatorio.',
  v_email: 'Introduce un correo electrónico válido.',
  v_phone: 'Introduce un número de teléfono válido.',
  f_sending: 'Enviando…',
  f_invalid: 'Completa los campos marcados e inténtalo de nuevo.',
  f_ok: '¡Gracias! Tu mensaje se ha enviado. Solemos responder en 24 horas laborables.',
  f_err: 'No se ha podido enviar el formulario. Llámanos o escribe a info@uraniatravel.pl.',
  f_mailto: 'Abrimos tu programa de correo con el mensaje listo. Si no se abre, escribe a info@uraniatravel.pl.',
  brand_tag: 'Idiomas · Viajes · Libertad',
  hero_pill_tag: 'Idiomas',
  hero_title_b: 'viaje a',
  qc_visit_note: 'Contratos y garantía de seguro',
  off_lead: 'Concierta una cita por teléfono o correo: buscamos el momento que te venga bien.',
  ft_client: 'Área de cliente',
  ft_social: 'Redes sociales',
  doc_guarantee: 'Garantía de seguro',
  doc_person: 'Contrato para particulares',
  doc_school_order: 'Reservar un viaje escolar',
  doc_school: 'Contrato para centros escolares',
  of_title: 'Cuatro formas de viajar con nosotros',
  of_lead: 'Desde un curso de idiomas de dos semanas hasta un viaje para toda la clase: cada plan se hace desde cero.',
  of_1_b: 'Aprender',
  of_1_t: 'Cursos de idiomas en el extranjero',
  of_1_d: 'Escuela, alojamiento y programa fuera de clase. Inglés, español, italiano, alemán y francés.',
  of_2_b: 'Centros',
  of_2_t: 'Viajes escolares',
  of_2_d: 'Programa, transporte, seguro y toda la documentación para la dirección y las familias.',
  of_3_b: 'Grupos',
  of_3_t: 'Viajes de grupo y de empresa',
  of_3_d: 'Integración, viaje de incentivo o curso para el equipo: una factura y un único responsable.',
  of_4_b: 'A medida',
  of_4_t: 'Viajes individuales',
  of_4_d: 'Tú dices qué te gusta: nosotros trazamos la ruta, reservamos y vigilamos las conexiones.',
  f_sub_1: 'Curso de idiomas en el extranjero',
  f_sub_2: 'Viaje escolar',
  f_sub_4: 'Viaje individual',
  f_sub_5: 'Reserva existente u otro asunto',
  qc_mail_note: 'info@uraniatravel.pl',
  map_lead: 'Dirección de la oficina y cómo llegar: complétalo antes de publicar la web.',
  ft_rights: 'Todos los derechos reservados.'
};

/* ------------------------------- РУССКИЙ ------------------------------ */
window.UT_I18N.ru = {
  html_lang: 'ru',
  skip: 'Перейти к содержанию', menu: 'Открыть меню', theme: 'Сменить тему', lang_label: 'Сменить язык',

  nav_home: 'Главная', nav_offer: 'Туры', nav_blog: 'Блог', nav_faq: 'Вопросы',
  nav_contact: 'Контакты', nav_cta: 'Запросить расчёт',

  hero_pill: 'Языковые курсы, школьные поездки и групповые выезды', hero_pill_tag: 'с 2009 года',
  hero_title_a: 'Спланируем вместе вашу', hero_title_b: 'путешествие в',
  hero_rot: 'Англию,Испанию,Италию,Германию,Францию',
  hero_lead: 'Мы на связи по телефону, в WhatsApp и по почте. Отвечаем в течение 24 рабочих часов — без брошенных заявок и очередей на линии.',
  hero_cta1: 'Написать нам', hero_cta2: 'Позвонить',
  hero_trust: 'Страховая гарантия и образцы договоров доступны для скачивания',
  stat_years: 'лет опыта', stat_clients: 'клиентов в год',
  stat_dest: 'направлений', stat_rating: 'средняя оценка',
  mq: 'Санторини,Киото,Марракеш,Рейкьявик,Ханой,Лиссабон,Занзибар,Патагония',

  qc_title: 'Быстрая связь', qc_sub: 'Выберите удобный для вас канал.',
  qc_phone: 'Позвонить в офис', qc_phone_note: 'Пн–Пт 09:00–18:00',
  qc_wa: 'Написать в WhatsApp', qc_wa_note: 'Обычно отвечаем за 15 минут',
  qc_tg: 'Telegram', qc_tg_note: '@uraniatravel',
  qc_mail: 'Отправить e-mail', qc_mail_note: 'kontakt@uraniatravel.pl',
  qc_visit: 'Документы для клиента', qc_visit_note: 'ul. Podróżnicza 12/3, Варшава',

  ch_title: 'Все способы связи', ch_lead: 'Телефон, почта, мессенджеры и соцсети — где бы вы нас ни нашли, мы ответим.',
  ch_phone_t: 'Телефон', ch_phone_d: 'Самый быстрый способ обсудить даты и цену с живым человеком.',
  ch_mail_t: 'Электронная почта', ch_mail_d: 'Для запросов, документов и счетов.',
  ch_wa_t: 'WhatsApp', ch_wa_d: 'Фото отелей, короткие вопросы и поддержка в поездке.',
  ch_tg_t: 'Telegram', ch_tg_d: 'Канал горящих предложений и поддержка 24/7 для клиентов в пути.',
  ch_fb_t: 'Facebook', ch_fb_d: 'Отчёты о поездках, события и отзывы путешественников.',
  ch_ig_t: 'Instagram', ch_ig_d: 'Фото направлений, сторис и будни агентства.',
  ch_call: 'Позвонить', ch_write: 'Написать', ch_open: 'Открыть',

  off_title: 'Офис и часы работы', off_lead: 'Заходите на кофе и за картой — без записи. По субботам работаем короче.',
  d_mon: 'Понедельник', d_tue: 'Вторник', d_wed: 'Среда', d_thu: 'Четверг',
  d_fri: 'Пятница', d_sat: 'Суббота', d_sun: 'Воскресенье', closed: 'выходной',
  open_now: 'Сейчас открыто', closed_now: 'Сейчас закрыто',
  company_title: 'Реквизиты', c_name: 'Наименование', c_addr: 'Адрес', c_nip: 'ИНН (NIP)',
  c_regon: 'REGON', c_reg: 'Реестр туроператоров', c_bank: 'Банковский счёт',

  f_title: 'Напишите нам', f_lead: 'Коротко опишите, куда и когда хотите поехать. Расчёт подготовим за 24 рабочих часа.',
  f_name: 'Имя и фамилия', f_email: 'Электронная почта', f_phone: 'Телефон',
  f_subject: 'Тема', f_dest: 'Направление', f_date: 'Желаемые даты',
  f_people: 'Количество человек', f_message: 'Сообщение',
  f_ph_name: 'Анна Ковальская', f_ph_email: 'anna@primer.ru', f_ph_phone: '+48 600 100 200',
  f_ph_dest: 'напр. Крит, Япония, Исландия', f_ph_msg: 'Ищем двухнедельную поездку для двоих…',
  f_sub_0: 'Выберите тему', f_sub_1: 'Расчёт стоимости тура', f_sub_2: 'Групповая / корпоративная поездка',
  f_sub_3: 'Групповая / корпоративная поездка', f_sub_4: 'Изменение существующей брони', f_sub_5: 'Другое',
  f_consent: 'Согласен(на) на обработку моих данных для ответа на запрос.',
  f_submit: 'Отправить запрос',
  f_note: 'Оператор персональных данных — Urania. Данные используются только для ответа на ваш запрос.',

  map_title: 'Как нас найти', map_lead: 'Мы в центре города, 4 минуты пешком от станции метро.',
  map_load: 'Показать карту', map_privacy: 'Карта загружается только после клика — мы не передаём ваши данные без согласия.',
  map_here: 'Наш офис', map_dir: 'Построить маршрут', map_transport: 'Метро · Трамваи 4, 18 · Парковка во дворе',

  faq_title: 'Частые вопросы', faq_lead: 'Ответы, которые мы даём чаще всего. Нет вашего? Напишите — добавим сюда.',
  faq_search: 'Поиск по вопросам…', faq_all: 'Все', faq_cat_book: 'Бронирование',
  faq_cat_pay: 'Оплата', faq_cat_doc: 'Документы', faq_cat_trip: 'В поездке',
  faq_empty: 'Ничего не найдено. Попробуйте другое слово или напишите нам.',

  blog_title: 'Блог о путешествиях', blog_lead: 'Практичные гайды и вдохновение от команды, которая сама ездит в эти места.',
  blog_read: 'Читать дальше', blog_min: 'мин чтения', blog_all: 'Все записи',

  cta_title: 'Готовы сделать первый шаг?', cta_lead: 'Оставьте номер или напишите в WhatsApp — перезвоним сегодня же.',
  cta_b1: 'Заполнить форму', cta_b2: 'WhatsApp',

  ft_about: 'Языковые курсы, школьные поездки и групповые выезды — от первого разговора до возвращения домой.',
  ft_nav: 'Навигация', ft_contact: 'Контакты', ft_hours: 'Часы работы',
  v_required: 'Это поле обязательно.',
  v_email: 'Укажите корректный адрес e-mail.',
  v_phone: 'Укажите корректный номер телефона.',
  f_sending: 'Отправка…',
  f_invalid: 'Заполните отмеченные поля и попробуйте ещё раз.',
  f_ok: 'Спасибо! Сообщение отправлено. Обычно мы отвечаем в течение 24 рабочих часов.',
  f_err: 'Не удалось отправить форму. Позвоните нам или напишите на info@uraniatravel.pl.',
  f_mailto: 'Открываем ваш почтовый клиент с готовым письмом. Если он не открылся, напишите на info@uraniatravel.pl.',
  brand_tag: 'Языки · Путешествия · Свобода',
  hero_pill_tag: 'Языки',
  hero_title_b: 'поездку в',
  qc_visit_note: 'Договоры и страховая гарантия',
  off_lead: 'Договоритесь о встрече по телефону или почте — подберём удобное время.',
  ft_client: 'Клиентам',
  ft_social: 'Соцсети',
  doc_guarantee: 'Страховая гарантия',
  doc_person: 'Договор для физических лиц',
  doc_school_order: 'Заказать школьную поездку',
  doc_school: 'Договор для школ',
  of_title: 'Четыре способа поехать с нами',
  of_lead: 'От двухнедельного языкового курса до поездки для целого класса — каждый план создаётся с нуля.',
  of_1_b: 'Обучение',
  of_1_t: 'Языковые курсы за рубежом',
  of_1_d: 'Школа, проживание и программа после занятий. Английский, испанский, итальянский, немецкий и французский.',
  of_2_b: 'Школам',
  of_2_t: 'Школьные поездки',
  of_2_d: 'Программа, транспорт, страховка и полный пакет документов для дирекции и родителей.',
  of_3_b: 'Группы',
  of_3_t: 'Групповые и корпоративные выезды',
  of_3_d: 'Тимбилдинг, мотивационная поездка или курс для команды — один счёт и один куратор.',
  of_4_b: 'Индивидуально',
  of_4_t: 'Индивидуальные путешествия',
  of_4_d: 'Вы говорите, что вам нравится, — мы составляем маршрут, бронируем жильё и следим за пересадками.',
  f_sub_1: 'Языковой курс за рубежом',
  f_sub_2: 'Школьная поездка',
  f_sub_4: 'Индивидуальная поездка',
  f_sub_5: 'Существующая бронь или другое',
  qc_mail_note: 'info@uraniatravel.pl',
  map_lead: 'Адрес офиса и схема проезда — заполните перед публикацией сайта.',
  ft_rights: 'Все права защищены.'
};

/* ------------------------------- ITALIANO ----------------------------- */
window.UT_I18N.it = {
  html_lang: 'it',
  skip: 'Vai al contenuto', menu: 'Apri il menu', theme: 'Cambia tema', lang_label: 'Cambia lingua',

  nav_home: 'Home', nav_offer: 'Viaggi', nav_blog: 'Blog', nav_faq: 'FAQ',
  nav_contact: 'Contatti', nav_cta: 'Chiedi un preventivo',

  hero_pill: 'Corsi di lingua, gite scolastiche e viaggi di gruppo', hero_pill_tag: 'dal 2009',
  hero_title_a: 'Progettiamo insieme il tuo', hero_title_b: 'viaggio in',
  hero_rot: 'Inghilterra,Spagna,Italia,Germania,Francia',
  hero_lead: 'Ci trovi al telefono, su WhatsApp e via e-mail. Rispondiamo entro 24 ore lavorative — niente moduli senza risposta, niente call center.',
  hero_cta1: 'Scrivici', hero_cta2: 'Chiama ora',
  hero_trust: 'Garanzia assicurativa e modelli di contratto scaricabili',
  stat_years: 'anni di esperienza', stat_clients: 'clienti all’anno',
  stat_dest: 'destinazioni', stat_rating: 'valutazione media',
  mq: 'Santorini,Kyoto,Marrakech,Reykjavík,Hanoi,Lisbona,Zanzibar,Patagonia',

  qc_title: 'Contatto rapido', qc_sub: 'Scegli il canale che preferisci.',
  qc_phone: 'Chiama l’agenzia', qc_phone_note: 'Lun–Ven 09:00–18:00',
  qc_wa: 'Scrivici su WhatsApp', qc_wa_note: 'Di solito rispondiamo in 15 minuti',
  qc_tg: 'Telegram', qc_tg_note: '@uraniatravel',
  qc_mail: 'Invia una e-mail', qc_mail_note: 'kontakt@uraniatravel.pl',
  qc_visit: 'Documenti per il cliente', qc_visit_note: 'ul. Podróżnicza 12/3, Varsavia',

  ch_title: 'Tutti i canali di contatto', ch_lead: 'Telefono, e-mail, messaggistica e social: ovunque ci trovi, ricevi una risposta.',
  ch_phone_t: 'Telefono', ch_phone_d: 'Il modo più rapido per parlare di date e prezzi con una persona vera.',
  ch_mail_t: 'E-mail', ch_mail_d: 'Per richieste di preventivo, documenti e fatture.',
  ch_wa_t: 'WhatsApp', ch_wa_d: 'Foto degli hotel, domande veloci e assistenza durante il viaggio.',
  ch_tg_t: 'Telegram', ch_tg_d: 'Canale offerte last minute e assistenza 24/7 per chi è in viaggio.',
  ch_fb_t: 'Facebook', ch_fb_d: 'Racconti di viaggio, eventi e recensioni dei viaggiatori.',
  ch_ig_t: 'Instagram', ch_ig_d: 'Foto delle destinazioni, storie e dietro le quinte dell’agenzia.',
  ch_call: 'Chiama', ch_write: 'Scrivi', ch_open: 'Apri',

  off_title: 'Agenzia e orari', off_lead: 'Passa per un caffè e una mappa, senza appuntamento. Il sabato orario ridotto.',
  d_mon: 'Lunedì', d_tue: 'Martedì', d_wed: 'Mercoledì', d_thu: 'Giovedì',
  d_fri: 'Venerdì', d_sat: 'Sabato', d_sun: 'Domenica', closed: 'chiuso',
  open_now: 'Aperto ora', closed_now: 'Al momento chiuso',
  company_title: 'Dati dell’azienda', c_name: 'Denominazione', c_addr: 'Indirizzo', c_nip: 'Partita IVA',
  c_regon: 'REGON', c_reg: 'Registro Organizzatori di Viaggi', c_bank: 'Conto bancario',

  f_title: 'Scrivici', f_lead: 'Raccontaci in breve dove e quando vuoi partire. Il preventivo arriva entro 24 ore lavorative.',
  f_name: 'Nome e cognome', f_email: 'Indirizzo e-mail', f_phone: 'Telefono',
  f_subject: 'Oggetto', f_dest: 'Destinazione', f_date: 'Periodo previsto',
  f_people: 'Numero di persone', f_message: 'Messaggio',
  f_ph_name: 'Anna Kowalska', f_ph_email: 'anna@esempio.it', f_ph_phone: '+48 600 100 200',
  f_ph_dest: 'es. Creta, Giappone, Islanda', f_ph_msg: 'Cerchiamo un viaggio di due settimane per due persone…',
  f_sub_0: 'Scegli un oggetto', f_sub_1: 'Preventivo viaggio', f_sub_2: 'Viaggio di gruppo / aziendale',
  f_sub_3: 'Viaggio di gruppo / aziendale', f_sub_4: 'Prenotazione esistente — modifica', f_sub_5: 'Altro',
  f_consent: 'Acconsento al trattamento dei miei dati per ricevere risposta alla richiesta.',
  f_submit: 'Invia la richiesta',
  f_note: 'Titolare del trattamento è Urania. Usiamo i dati solo per rispondere alla tua richiesta.',

  map_title: 'Come raggiungerci', map_lead: 'Siamo in pieno centro, a 4 minuti a piedi dalla metropolitana.',
  map_load: 'Mostra la mappa', map_privacy: 'La mappa si carica solo dopo il clic: non inviamo i tuoi dati senza consenso.',
  map_here: 'La nostra agenzia', map_dir: 'Calcola il percorso', map_transport: 'Metro · Tram 4, 18 · Parcheggio nel cortile',

  faq_title: 'Domande frequenti', faq_lead: 'Le risposte che diamo più spesso. Manca la tua? Scrivici e la aggiungiamo qui.',
  faq_search: 'Cerca nelle domande…', faq_all: 'Tutte', faq_cat_book: 'Prenotazione',
  faq_cat_pay: 'Pagamenti', faq_cat_doc: 'Documenti', faq_cat_trip: 'In viaggio',
  faq_empty: 'Nessun risultato. Prova un’altra parola oppure scrivici.',

  blog_title: 'Blog di viaggio', blog_lead: 'Guide pratiche e ispirazione da un team che in questi posti ci va davvero.',
  blog_read: 'Continua a leggere', blog_min: 'min di lettura', blog_all: 'Vedi tutti gli articoli',

  cta_title: 'Pronti al primo passo?', cta_lead: 'Lascia il numero o scrivici su WhatsApp: ti richiamiamo in giornata.',
  cta_b1: 'Compila il modulo', cta_b2: 'WhatsApp',

  ft_about: 'Corsi di lingua, gite scolastiche e viaggi di gruppo — dalla prima chiacchierata al ritorno a casa.',
  ft_nav: 'Navigazione', ft_contact: 'Contatti', ft_hours: 'Orari',
  v_required: 'Questo campo è obbligatorio.',
  v_email: 'Inserisci un indirizzo e-mail valido.',
  v_phone: 'Inserisci un numero di telefono valido.',
  f_sending: 'Invio in corso…',
  f_invalid: 'Completa i campi evidenziati e riprova.',
  f_ok: 'Grazie! Il messaggio è stato inviato. Di solito rispondiamo entro 24 ore lavorative.',
  f_err: 'Non è stato possibile inviare il modulo. Chiamaci oppure scrivi a info@uraniatravel.pl.',
  f_mailto: 'Stiamo aprendo il tuo programma di posta con il messaggio pronto. Se non si apre, scrivi a info@uraniatravel.pl.',
  brand_tag: 'Lingue · Viaggi · Libertà',
  hero_pill_tag: 'Lingue',
  hero_title_b: 'viaggio in',
  qc_visit_note: 'Contratti e garanzia assicurativa',
  off_lead: 'Fissa un appuntamento per telefono o via e-mail: troviamo l’orario che ti serve.',
  ft_client: 'Area clienti',
  ft_social: 'Social media',
  doc_guarantee: 'Garanzia assicurativa',
  doc_person: 'Contratto per privati',
  doc_school_order: 'Ordina una gita scolastica',
  doc_school: 'Contratto per le scuole',
  of_title: 'Quattro modi per partire con noi',
  of_lead: 'Da un corso di lingua di due settimane alla gita di un’intera classe: ogni programma nasce da zero.',
  of_1_b: 'Studio',
  of_1_t: 'Corsi di lingua all’estero',
  of_1_d: 'Scuola, alloggio e programma dopo le lezioni. Inglese, spagnolo, italiano, tedesco e francese.',
  of_2_b: 'Scuole',
  of_2_t: 'Gite scolastiche',
  of_2_d: 'Programma, trasporto, assicurazione e documentazione completa per la dirigenza e le famiglie.',
  of_3_b: 'Gruppi',
  of_3_t: 'Viaggi di gruppo e aziendali',
  of_3_d: 'Team building, viaggio incentive o corso per il team: una fattura e un unico referente.',
  of_4_b: 'Su misura',
  of_4_t: 'Viaggi individuali',
  of_4_d: 'Tu dici cosa ti piace: noi costruiamo l’itinerario, prenotiamo e teniamo d’occhio le coincidenze.',
  f_sub_1: 'Corso di lingua all’estero',
  f_sub_2: 'Gita scolastica',
  f_sub_4: 'Viaggio individuale',
  f_sub_5: 'Prenotazione esistente o altro',
  qc_mail_note: 'info@uraniatravel.pl',
  map_lead: 'Indirizzo dell’agenzia e come arrivare: da completare prima della pubblicazione.',
  ft_rights: 'Tutti i diritti riservati.'
};

/* =========================================================================
   FAQ — 8 pytań w 6 językach. Kolejność musi odpowiadać kolejności
   elementów .faq__item w faq.html (atrybut data-faq-index).
   Kategorie: book | pay | doc | trip
   ========================================================================= */
window.UT_FAQ = {
  pl: [
    { q: 'Jak zarezerwować wyjazd?', a: 'Napisz do nas przez formularz, WhatsApp lub zadzwoń. Przygotujemy dwie–trzy propozycje, a po Twojej akceptacji wysyłamy umowę do podpisu online. Cała rezerwacja zajmuje zwykle jeden dzień roboczy.' },
    { q: 'Ile kosztuje przygotowanie oferty?', a: 'Nic. Wycena, konsultacja i dobór hoteli są bezpłatne — płacisz dopiero za wyjazd, który wybierzesz.' },
    { q: 'Czy mogę zapłacić w ratach?', a: 'Tak. Standardowo pobieramy 30% zaliczki przy rezerwacji, a resztę na 30 dni przed wylotem. Przy droższych wyjazdach rozkładamy płatność na cztery raty bez dodatkowych kosztów.' },
    { q: 'Jakie formy płatności akceptujecie?', a: 'Przelew bankowy, BLIK, karty Visa i Mastercard oraz płatności online. Faktura VAT wystawiana jest do każdej rezerwacji.' },
    { q: 'Jakie dokumenty są potrzebne?', a: 'W Unii Europejskiej wystarczy dowód osobisty. Poza UE potrzebny jest paszport ważny minimum 6 miesięcy od daty powrotu. O wizy i formularze wjazdowe informujemy indywidualnie przy każdej ofercie.' },
    { q: 'Czy ubezpieczenie jest wliczone?', a: 'Tak — każdy wyjazd zawiera ubezpieczenie kosztów leczenia i NNW. Możesz dokupić ubezpieczenie od kosztów rezygnacji, także w wariancie obejmującym choroby przewlekłe.' },
    { q: 'Co jeśli muszę odwołać wyjazd?', a: 'Warunki rezygnacji opisuje umowa. Im wcześniej nas poinformujesz, tym niższe koszty — dlatego zawsze proponujemy ubezpieczenie od rezygnacji, które zwraca do 100% wpłaty.' },
    { q: 'Czy mogę liczyć na pomoc w trakcie podróży?', a: 'Tak. Każdy klient dostaje numer alarmowy czynny 24/7 oraz kontakt na WhatsAppie i Telegramie do opiekuna wyjazdu. Reagujemy również poza godzinami pracy biura.' }
  ],
  en: [
    { q: 'How do I book a trip?', a: 'Write to us through the form, on WhatsApp, or call. We prepare two or three proposals and, once you accept, send the contract for online signature. Booking usually takes one business day.' },
    { q: 'How much does a quote cost?', a: 'Nothing. The quote, the consultation and the hotel selection are free — you only pay for the trip you actually choose.' },
    { q: 'Can I pay in instalments?', a: 'Yes. We normally take a 30% deposit at booking and the balance 30 days before departure. For more expensive trips we split the payment into four instalments at no extra cost.' },
    { q: 'Which payment methods do you accept?', a: 'Bank transfer, BLIK, Visa and Mastercard, and online payments. A VAT invoice is issued for every booking.' },
    { q: 'Which documents do I need?', a: 'Within the EU an ID card is enough. Outside the EU you need a passport valid for at least 6 months after your return date. We advise on visas and entry forms individually with each offer.' },
    { q: 'Is insurance included?', a: 'Yes — every trip includes medical and accident insurance. You can add cancellation cover, including a variant that covers chronic conditions.' },
    { q: 'What if I have to cancel?', a: 'Cancellation terms are set out in the contract. The earlier you tell us, the lower the cost — which is why we always offer cancellation insurance that refunds up to 100% of what you paid.' },
    { q: 'Is there support while I travel?', a: 'Yes. Every client gets a 24/7 emergency number plus WhatsApp and Telegram contact for their trip coordinator. We answer outside office hours too.' }
  ],
  fr: [
    { q: 'Comment réserver un voyage ?', a: 'Écrivez-nous via le formulaire, sur WhatsApp ou appelez-nous. Nous préparons deux ou trois propositions puis, après votre accord, nous envoyons le contrat à signer en ligne. La réservation prend en général un jour ouvré.' },
    { q: 'Le devis est-il payant ?', a: 'Non. Le devis, le conseil et la sélection des hôtels sont gratuits — vous ne payez que le voyage que vous choisissez.' },
    { q: 'Puis-je payer en plusieurs fois ?', a: 'Oui. Nous demandons habituellement 30 % d’acompte à la réservation et le solde 30 jours avant le départ. Pour les voyages plus coûteux, nous étalons le paiement en quatre échéances sans frais.' },
    { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Virement bancaire, BLIK, cartes Visa et Mastercard et paiements en ligne. Une facture est établie pour chaque réservation.' },
    { q: 'Quels documents faut-il ?', a: 'Dans l’Union européenne, une carte d’identité suffit. Hors UE, un passeport valable au moins 6 mois après la date de retour est nécessaire. Nous vous informons des visas et formulaires au cas par cas.' },
    { q: 'L’assurance est-elle incluse ?', a: 'Oui — chaque voyage inclut l’assurance frais médicaux et accidents. Vous pouvez ajouter une garantie annulation, y compris une formule couvrant les maladies chroniques.' },
    { q: 'Que se passe-t-il si j’annule ?', a: 'Les conditions figurent dans le contrat. Plus vous nous prévenez tôt, moins les frais sont élevés — c’est pourquoi nous proposons toujours une assurance annulation remboursant jusqu’à 100 % du montant versé.' },
    { q: 'Y a-t-il une assistance pendant le voyage ?', a: 'Oui. Chaque client reçoit un numéro d’urgence 24h/24 ainsi qu’un contact WhatsApp et Telegram avec son conseiller. Nous répondons aussi en dehors des heures d’ouverture.' }
  ],
  es: [
    { q: '¿Cómo reservo un viaje?', a: 'Escríbenos por el formulario, por WhatsApp o llámanos. Preparamos dos o tres propuestas y, cuando aceptas, enviamos el contrato para firmar en línea. La reserva suele completarse en un día laborable.' },
    { q: '¿Cuánto cuesta el presupuesto?', a: 'Nada. El presupuesto, el asesoramiento y la selección de hoteles son gratuitos: solo pagas el viaje que finalmente elijas.' },
    { q: '¿Puedo pagar a plazos?', a: 'Sí. Normalmente pedimos un 30 % de señal al reservar y el resto 30 días antes de la salida. En viajes de mayor importe repartimos el pago en cuatro plazos sin coste añadido.' },
    { q: '¿Qué formas de pago aceptáis?', a: 'Transferencia bancaria, BLIK, tarjetas Visa y Mastercard y pagos en línea. Emitimos factura para cada reserva.' },
    { q: '¿Qué documentos necesito?', a: 'Dentro de la UE basta el DNI. Fuera de la UE hace falta pasaporte con validez mínima de 6 meses desde la fecha de regreso. Informamos de visados y formularios de entrada en cada oferta.' },
    { q: '¿El seguro está incluido?', a: 'Sí: todos los viajes incluyen seguro de asistencia médica y accidentes. Puedes añadir seguro de cancelación, también en la variante que cubre enfermedades crónicas.' },
    { q: '¿Y si tengo que cancelar?', a: 'Las condiciones están en el contrato. Cuanto antes nos avises, menores serán los gastos, por eso siempre ofrecemos el seguro de cancelación, que devuelve hasta el 100 % de lo pagado.' },
    { q: '¿Hay asistencia durante el viaje?', a: 'Sí. Cada cliente recibe un teléfono de emergencia 24/7 y el contacto de WhatsApp y Telegram de su asesor. Respondemos también fuera del horario de oficina.' }
  ],
  ru: [
    { q: 'Как забронировать поездку?', a: 'Напишите через форму, в WhatsApp или позвоните. Мы подготовим два-три варианта, а после вашего согласия пришлём договор на онлайн-подпись. Обычно бронирование занимает один рабочий день.' },
    { q: 'Сколько стоит подготовка предложения?', a: 'Нисколько. Расчёт, консультация и подбор отелей бесплатны — вы платите только за поездку, которую выберете.' },
    { q: 'Можно ли оплатить частями?', a: 'Да. Обычно мы берём 30 % предоплаты при бронировании, остаток — за 30 дней до вылета. Для дорогих туров делим оплату на четыре части без дополнительных расходов.' },
    { q: 'Какие способы оплаты вы принимаете?', a: 'Банковский перевод, BLIK, карты Visa и Mastercard, онлайн-платежи. На каждое бронирование выставляем счёт.' },
    { q: 'Какие документы нужны?', a: 'В пределах ЕС достаточно удостоверения личности. За пределами ЕС нужен паспорт, действительный минимум 6 месяцев после даты возвращения. О визах и въездных формах сообщаем индивидуально к каждому предложению.' },
    { q: 'Входит ли страховка?', a: 'Да — в каждую поездку включена медицинская страховка и страхование от несчастных случаев. Дополнительно можно оформить страховку от отмены, в том числе с покрытием хронических заболеваний.' },
    { q: 'Что делать, если придётся отменить поездку?', a: 'Условия отмены прописаны в договоре. Чем раньше вы сообщите, тем меньше расходы — поэтому мы всегда предлагаем страховку от отмены, возвращающую до 100 % оплаты.' },
    { q: 'Есть ли поддержка во время поездки?', a: 'Да. Каждый клиент получает круглосуточный экстренный номер, а также контакт куратора в WhatsApp и Telegram. Мы отвечаем и вне рабочих часов офиса.' }
  ],
  it: [
    { q: 'Come si prenota un viaggio?', a: 'Scrivici dal modulo, su WhatsApp oppure chiamaci. Prepariamo due o tre proposte e, dopo la tua approvazione, inviamo il contratto da firmare online. La prenotazione richiede di solito un giorno lavorativo.' },
    { q: 'Quanto costa il preventivo?', a: 'Nulla. Preventivo, consulenza e selezione degli hotel sono gratuiti: paghi soltanto il viaggio che scegli.' },
    { q: 'Posso pagare a rate?', a: 'Sì. Di norma chiediamo un acconto del 30% alla prenotazione e il saldo 30 giorni prima della partenza. Per i viaggi più costosi dividiamo l’importo in quattro rate senza costi aggiuntivi.' },
    { q: 'Quali metodi di pagamento accettate?', a: 'Bonifico bancario, BLIK, carte Visa e Mastercard e pagamenti online. Per ogni prenotazione emettiamo fattura.' },
    { q: 'Quali documenti servono?', a: 'Nell’Unione Europea basta la carta d’identità. Fuori dall’UE serve il passaporto valido almeno 6 mesi dopo la data di rientro. Su visti e moduli d’ingresso informiamo caso per caso insieme all’offerta.' },
    { q: 'L’assicurazione è inclusa?', a: 'Sì: ogni viaggio comprende l’assicurazione sanitaria e infortuni. Puoi aggiungere la copertura annullamento, anche nella variante che include le patologie croniche.' },
    { q: 'E se devo annullare?', a: 'Le condizioni sono nel contratto. Prima ci avvisi, minori sono i costi: per questo proponiamo sempre l’assicurazione annullamento, che rimborsa fino al 100% di quanto versato.' },
    { q: 'C’è assistenza durante il viaggio?', a: 'Sì. Ogni cliente riceve un numero di emergenza attivo 24/7 e il contatto WhatsApp e Telegram del referente del viaggio. Rispondiamo anche fuori dall’orario dell’agenzia.' }
  ]
};

/* =========================================================================
   Blog — 3 wpisy w 6 językach (tytuł + zajawka). Pełne treści artykułów
   pozostają po polsku w katalogu /blog.
   ========================================================================= */
window.UT_POSTS = {
  pl: [
    { t: 'Jak wybrać kierunek na pierwszą dalszą podróż', d: 'Klimat, budżet, długość lotu i strefa czasowa — cztery pytania, które w dziesięć minut zawężą listę kierunków z pięćdziesięciu do trzech.' },
    { t: 'Ubezpieczenie turystyczne bez ściemy', d: 'Co naprawdę pokrywa polisa, kiedy warto dopłacić za choroby przewlekłe i dlaczego karta EKUZ nie zastąpi ubezpieczenia.' },
    { t: 'Pakowanie na dwa tygodnie w jednej walizce kabinowej', d: 'Lista, którą sami wozimy od lat: zasada trzech kolorów, kostki pakowe i rzeczy, których nigdy nie zabieramy.' }
  ],
  en: [
    { t: 'How to choose a destination for your first long trip', d: 'Climate, budget, flight length and time zone — four questions that narrow fifty destinations down to three in ten minutes.' },
    { t: 'Travel insurance without the small print', d: 'What a policy actually covers, when it is worth paying extra for chronic conditions, and why an EHIC card is not a substitute.' },
    { t: 'Two weeks in one cabin bag', d: 'The packing list we have used for years: the three-colour rule, packing cubes, and the things we never bring.' }
  ],
  fr: [
    { t: 'Choisir sa destination pour un premier grand voyage', d: 'Climat, budget, durée de vol et décalage horaire : quatre questions qui réduisent cinquante destinations à trois en dix minutes.' },
    { t: 'L’assurance voyage sans les petites lignes', d: 'Ce que couvre réellement une police, quand payer l’option maladies chroniques, et pourquoi la carte européenne ne suffit pas.' },
    { t: 'Deux semaines dans un seul bagage cabine', d: 'La liste que nous utilisons depuis des années : règle des trois couleurs, cubes de rangement et ce que nous n’emportons jamais.' }
  ],
  es: [
    { t: 'Cómo elegir destino para tu primer viaje largo', d: 'Clima, presupuesto, duración del vuelo y huso horario: cuatro preguntas que reducen cincuenta destinos a tres en diez minutos.' },
    { t: 'El seguro de viaje sin letra pequeña', d: 'Qué cubre realmente una póliza, cuándo conviene pagar por enfermedades crónicas y por qué la tarjeta sanitaria europea no basta.' },
    { t: 'Dos semanas en una sola maleta de cabina', d: 'La lista que usamos desde hace años: la regla de los tres colores, los organizadores y lo que nunca llevamos.' }
  ],
  ru: [
    { t: 'Как выбрать направление для первой дальней поездки', d: 'Климат, бюджет, длительность перелёта и часовой пояс — четыре вопроса, которые за десять минут сузят список с пятидесяти вариантов до трёх.' },
    { t: 'Туристическая страховка без мелкого шрифта', d: 'Что на самом деле покрывает полис, когда стоит доплатить за хронические заболевания и почему европейская карта её не заменяет.' },
    { t: 'Две недели с одной ручной кладью', d: 'Список, которым мы пользуемся годами: правило трёх цветов, органайзеры и вещи, которые мы никогда не берём.' }
  ],
  it: [
    { t: 'Come scegliere la meta del primo viaggio lungo', d: 'Clima, budget, durata del volo e fuso orario: quattro domande che in dieci minuti riducono cinquanta mete a tre.' },
    { t: 'L’assicurazione di viaggio senza scritte piccole', d: 'Cosa copre davvero una polizza, quando conviene pagare per le patologie croniche e perché la tessera sanitaria europea non basta.' },
    { t: 'Due settimane in un solo bagaglio a mano', d: 'La lista che usiamo da anni: la regola dei tre colori, i cubi organizer e le cose che non portiamo mai.' }
  ]
};

/* =========================================================================
   Silnik tłumaczeń
   ========================================================================= */
(function () {
  'use strict';

  var DICT = window.UT_I18N;
  var LANGS = window.UT_LANGS;
  var DEFAULT = 'pl';
  var KEY = 'ut-lang';
  var current = DEFAULT;

  function supported(code) {
    if (!code) return null;
    code = String(code).toLowerCase().slice(0, 2);
    return DICT[code] ? code : null;
  }

  function detect() {
    var url = null;
    try { url = new URLSearchParams(window.location.search).get('lang'); } catch (e) {}
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language;
    return supported(url) || supported(stored) || supported(nav) || DEFAULT;
  }

  function t(key) {
    var d = DICT[current] || DICT[DEFAULT];
    return Object.prototype.hasOwnProperty.call(d, key) ? d[key] : (DICT[DEFAULT][key] || '');
  }

  function apply(lang) {
    current = supported(lang) || DEFAULT;
    var doc = document;

    doc.documentElement.setAttribute('lang', t('html_lang') || current);

    // 1. zwykłe teksty
    Array.prototype.forEach.call(doc.querySelectorAll('[data-i18n]'), function (el) {
      var value = t(el.getAttribute('data-i18n'));
      if (value) el.textContent = value;
    });

    // 2. atrybuty:  data-i18n-attr="placeholder:f_ph_name, aria-label:nav_home"
    Array.prototype.forEach.call(doc.querySelectorAll('[data-i18n-attr]'), function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var bits = pair.split(':');
        if (bits.length < 2) return;
        var value = t(bits[1].trim());
        if (value) el.setAttribute(bits[0].trim(), value);
      });
    });

    // 3. listy rozdzielone przecinkami (rotator, wstążka kierunków)
    Array.prototype.forEach.call(doc.querySelectorAll('[data-i18n-list]'), function (el) {
      var items = (t(el.getAttribute('data-i18n-list')) || '').split(',');
      var repeat = el.hasAttribute('data-i18n-repeat') ? 2 : 1;
      var tag = el.getAttribute('data-i18n-tag') || 'span';
      var html = '';
      for (var r = 0; r < repeat; r++) {
        items.forEach(function (item) {
          html += '<' + tag + '>' + item.trim().replace(/[<>&]/g, '') + '</' + tag + '>';
        });
      }
      el.innerHTML = html;
    });

    // 4. FAQ
    var faq = window.UT_FAQ && (window.UT_FAQ[current] || window.UT_FAQ[DEFAULT]);
    if (faq) {
      Array.prototype.forEach.call(doc.querySelectorAll('[data-faq-index]'), function (item) {
        var entry = faq[parseInt(item.getAttribute('data-faq-index'), 10)];
        if (!entry) return;
        var q = item.querySelector('.faq__q-text');
        var a = item.querySelector('.faq__a p');
        if (q) q.textContent = entry.q;
        if (a) a.textContent = entry.a;
      });
    }

    // 5. Wpisy bloga
    var posts = window.UT_POSTS && (window.UT_POSTS[current] || window.UT_POSTS[DEFAULT]);
    if (posts) {
      Array.prototype.forEach.call(doc.querySelectorAll('[data-post-index]'), function (card) {
        var entry = posts[parseInt(card.getAttribute('data-post-index'), 10)];
        if (!entry) return;
        var title = card.querySelector('.post-card__title');
        var desc = card.querySelector('.post-card__desc');
        if (title) title.textContent = entry.t;
        if (desc) desc.textContent = entry.d;
      });
    }

    // 6. przycisk przełącznika
    var meta = LANGS.filter(function (l) { return l.code === current; })[0] || LANGS[0];
    var btn = doc.querySelector('.lang__btn');
    if (btn) {
      var flag = btn.querySelector('.flag');
      var code = btn.querySelector('.code');
      if (flag) flag.textContent = meta.flag;
      if (code) code.textContent = meta.code;
      btn.setAttribute('aria-label', t('lang_label') + ' — ' + meta.name);
    }
    Array.prototype.forEach.call(doc.querySelectorAll('.lang__menu button'), function (b) {
      b.setAttribute('aria-selected', b.getAttribute('data-lang') === current ? 'true' : 'false');
    });

    // 7. link kanoniczny w adresie (bez przeładowania)
    try {
      var u = new URL(window.location.href);
      if (current === DEFAULT) u.searchParams.delete('lang');
      else u.searchParams.set('lang', current);
      window.history.replaceState({}, '', u.pathname + (u.search || '') + u.hash);
    } catch (e) {}

    doc.dispatchEvent(new CustomEvent('ut:lang', { detail: { lang: current } }));
  }

  function setLang(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply(lang);
  }

  function buildSwitcher() {
    var wrap = document.querySelector('.lang');
    if (!wrap) return;
    var btn = wrap.querySelector('.lang__btn');
    var menu = wrap.querySelector('.lang__menu');
    if (!btn || !menu) return;

    menu.innerHTML = LANGS.map(function (l) {
      return '<li><button type="button" data-lang="' + l.code + '" lang="' + l.code + '" role="option" aria-selected="false">' +
             '<span class="flag" aria-hidden="true">' + l.flag + '</span>' + l.name + '</button></li>';
    }).join('');

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = wrap.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    menu.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-lang]');
      if (!b) return;
      setLang(b.getAttribute('data-lang'));
      wrap.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', function () {
      wrap.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { wrap.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
    });
  }

  function boot() {
    buildSwitcher();
    apply(detect());
  }

  window.UT = { t: t, setLang: setLang, get lang() { return current; } };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
