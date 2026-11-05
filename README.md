# MySubs v12 — GitHub Pages + Supabase

Versiunea include toate modificările din preview: fundal verde, antet compact, fără banner și fără butoanele de test, câmpul Banca, etichetele Suma / Început abonament și diacritice.

## 1. Configurează Supabase

1. Creează un proiect Supabase sau alege proiectul în care dorești MySubs. Tabelul folosit este `mysubs_subscriptions`, separat de alte aplicații.
2. În SQL Editor, creează o interogare, copiază conținutul `supabase/schema.sql` și rulează-l. Scriptul activează Row Level Security: fiecare utilizator autentificat își poate citi și modifica numai propriile abonamente; vizitatorii neautentificați nu au acces.
3. În Authentication → Users → Add user → Create new user, creează contul tău cu e-mail și parolă. Dacă apare opțiunea Auto Confirm User, activeaz-o. Parola se introduce doar în Supabase și în formularul de autentificare, niciodată în fișierele GitHub.
4. Pentru utilizare personală, dezactivează în Authentication opțiunea care permite crearea de conturi noi (Allow new users to sign up). Păstrează autentificarea prin e-mail/parolă activă.
5. Copiază Project URL și cheia **publishable** (sau cheia legacy **anon**) din setările / dialogul Connect al proiectului.
6. Completează cele două valori în `config.js`. NU folosi cheia secretă sau `service_role` și nu pune parola bazei de date în repository. URL-ul și cheia publică sunt concepute pentru aplicația din browser; politicile SQL protejează datele.

## 2. Publică pe GitHub Pages

1. Creează un repository pentru aplicație, de exemplu `mysubs`. Pentru cel mai simplu flux GitHub Pages, folosește un repository public dacă planul tău nu permite Pages din repository privat. Codul este vizibil; datele rămân protejate în Supabase.
2. Încarcă **fișierele din interiorul acestui director**, inclusiv subdirectorul `supabase`, direct în rădăcina repository-ului. Fișierul de intrare este `index.html`, cu litere mici. Nu încărca ZIP-ul ca atare.
3. În Settings → Pages → Build and deployment, selectează Deploy from a branch, ramura `main` și directorul `/ (root)`, apoi Save.
4. Deschide adresa afișată de GitHub după finalizarea publicării și autentifică-te.
5. Adaugă un abonament, reîncarcă pagina, apoi verifică-l de pe alt dispozitiv autentificat în același cont. Modifică și șterge un abonament de probă pentru verificarea completă.

Nu sunt necesare Node, compilare sau instalări pe calculator. Biblioteca Supabase este încărcată de pe jsDelivr, versiunea fixată 2.49.8. Conexiunea la internet este necesară; nu există salvare offline a abonamentelor. Sesiunea este păstrată de biblioteca Supabase în browser și tokenul este reînnoit automat când este posibil. Politicile proiectului și ștergerea datelor browserului pot solicita o nouă autentificare.

## 3. Iconița pe iPhone și în browser

Fișierele sunt referite în `<head>` (metadatele paginii), nu în `<header>` (antetul vizual):

- `apple-touch-icon.png`: iconița pentru Safari → Add to Home Screen.
- `favicon.svg`: mascota pe suport opac, cu margine deschisă, pentru contrast pe taburi deschise și închise la culoare.
- `favicon-32.png`: alternativă PNG pentru browsere.
- `manifest.webmanifest`, `icon-192.png`, `icon-512.png`: nume, pornire și afișare standalone.

Căile sunt relative, deci funcționează și când aplicația este găzduită la `/mysubs/`.

Pe iPhone: deschide **adresa GitHub Pages** în Safari → Share → Add to Home Screen → păstrează Open as Web App activ dacă este afișat. Dacă ai deja o scurtătură veche, șterge doar scurtătura și creeaz-o din nou după publicare; iOS poate păstra iconița veche în cache. Aspectul real al iconiței trebuie verificat pe dispozitiv după publicare.

## Datele existente

Acest pachet nu importă automat date din Google Sheets sau din preview. Acestea rămân în locul în care au fost salvate. Păstrează o copie înainte de trecerea la noua aplicație; transferul poate fi pregătit separat. Cursurile valutare sunt memorate local pentru performanță, dar abonamentele sunt citite și salvate în Supabase.

## Observații despre calcule

Calculele existente au fost păstrate. Data „Început abonament” este folosită ca prima scadență; pentru un abonament în probă se introduce data primei plăți de după probă. Alegerea băncii este salvată, dar nu schimbă automat regula de comision Revolut moștenită din preview. Conversiile și comisioanele rămân estimări.

## Fișiere

`index.html` — aplicația; `config.js` — cele două valori publice; `supabase-store.js` — autentificare și operații cu date; `supabase/schema.sql` — tabel și reguli de acces; iconițele și manifestul — identitatea aplicației; `.nojekyll` — publicare statică.

## Validare

Verificate: sintaxa JavaScript, legăturile locale și dimensiunile iconițelor, câmpul Banca în fluxul de salvare/citire, contractul operațiilor cu un client Supabase simulat. Conectarea la un proiect real, politicile RLS executate în baza de date, publicarea GitHub și iconița pe iPhone necesită completarea configurației și verificarea în conturile tale.

## Documentație oficială

- Supabase client: https://supabase.com/docs/reference/javascript/initializing
- Supabase autentificare: https://supabase.com/docs/reference/javascript/auth-signinwithpassword
- Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Apple Web App icons: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
