# AGENTS.md — MySubs

## Priorități și continuitate
- Citește acest fișier înainte de orice intervenție asupra repository-ului `anzosafe-oss/mysubs`.
- Prioritizează calitatea, stabilitatea și experiența utilizatorului înaintea economiei de tokeni.
- Păstrează coerența vizuală și funcțională între aplicațiile ecosistemului MyApps și respectă convențiile de design, comportament și versiune stabilite anterior.
- Păstrează integral funcționalitățile existente care nu fac obiectul solicitării. Evită refactorizările fără legătură cu cererea.

## Analiză și reutilizare
- Concentrează analiza inițială asupra aplicației curente, fișierelor relevante și dependențelor directe. Folosește căi cunoscute și căutări țintite.
- Consultă alte repository-uri sau proiecte Supabase atunci când sunt necesare pentru solicitare, o dependență reală sau coerența ecosistemului; nu impune o aprobare suplimentară doar pentru această consultare.
- Când utilizatorul face referire la o altă aplicație, consultă implementarea reală a acesteia și reutilizează soluția validată, adaptând-o aplicației curente.
- Evită căutările generale, investigațiile redundante și verificările repetate fără motiv, fără a compromite calitatea implementării și testării. Extinde analiza când dovezile sau riscurile o cer.
- În Supabase, accesează numai proiectele și resursele necesare intervenției. Verifică identificatorii necunoscuți și nu expune secrete.

## Date și medii
- Datele demonstrative sunt permise exclusiv în preview și în mediile de testare.
- La prima publicare, aplicația LIVE trebuie să fie curată, fără date demonstrative. Verifică inițializarea, seed-urile, migrațiile, stocarea locală și orice import automat de exemple.
- La actualizările ulterioare, păstrează integral datele reale ale utilizatorilor. Nu reseta și nu suprascrie datele pentru a obține un mediu curat.
- Ține datele de test separate de datele reale; nu crea exemple în producție pentru validare.

## Întreținere și validare
- Elimină fișierele devenite inutile numai după verificarea dependențelor, inclusiv referințele dinamice, manifestele, service worker-ele, cache-urile și configurația de publicare.
- Nu șterge resurse cu utilizare incertă și nu rescrie istoricul Git. Păstrează curățarea legată de intervenția curentă, fără audituri generale nesolicitate.
- Rulează verificări adecvate schimbării și riscului, inclusiv regresiile relevante. Verifică compatibilitatea cu iOS, Android și desktop, în special formularele, zonele de siguranță, navigarea și funcțiile PWA afectate.
- Nu prezenta verificările statice sau simulările drept teste pe dispozitive reale. Raportează clar ce ai verificat, limitele și blocajele.

## Versiuni și publicare
- Pregătește schimbările pe o ramură separată și oferă un rezultat concret, verificabil înainte de publicare.
- Actualizează versiunea aplicației la publicare, conform convențiilor existente, inclusiv marcajele de versiune și cache-urile relevante.
- Publică în producție numai cu acordul explicit al utilizatorului. Nu integra în ramura de producție și nu declanșa un deployment de producție înainte de acest acord.
- O revizuire exclusivă a documentației nu necesită creșterea versiunii aplicației și nu autorizează publicarea acesteia.
- Raportează concis fișierele schimbate, rezultatul, validarea și orice limitare materială.

## Întreținerea regulilor
- La revizuirea acestui fișier, înlocuiește sau elimină regulile care contravin principiilor de mai sus; nu adăuga reguli contradictorii peste cele vechi.
