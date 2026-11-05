/* MySubs v12 — Supabase Auth + date separate pentru fiecare utilizator. */
(()=>{
 let client=null,session=null;
 const el=id=>document.getElementById(id);
 const show=()=>{el('appMain').hidden=!session;el('authPanel').hidden=!!session;el('signOut').hidden=!session;};
 const fail=error=>{throw new Error(error.message||'Operația nu a reușit.');};
 const toItem=r=>({id:r.id,name:r.name,amount:Number(r.amount),currency:r.currency,bank:r.bank||'',start:r.start,cycle:r.cycle,status:r.status,end:r.end||'',payTime:r.pay_time?.slice(0,5)||'',notes:r.notes||''});
 window.MySubsStore={isSignedIn:()=>!!session,ready:null,async call(fn,s){
  if(!client||!session)throw Error('Autentifică-te pentru a continua.');
  if(fn==='loadData'){const {data,error}=await client.from('mysubs_subscriptions').select('*').order('created_at');if(error)fail(error);return {items:data.map(toItem)};}
  if(fn==='saveItem'){
   const row={name:s.name,amount:Number(s.amount),currency:s.currency,bank:s.bank||null,start:s.start,cycle:s.cycle,status:s.status,end:s.end||null,pay_time:s.payTime||null,notes:s.notes||''};
   const query=s.id?client.from('mysubs_subscriptions').update(row).eq('id',s.id):client.from('mysubs_subscriptions').insert({...row,user_id:session.user.id});
   const {data,error}=await query.select().single();if(error)fail(error);return toItem(data);
  }
  if(fn==='deleteItem'){const {data,error}=await client.from('mysubs_subscriptions').delete().eq('id',s).select('id');if(error)fail(error);if(!data.length)throw Error('Abonamentul nu a fost găsit sau nu poate fi șters.');return;}
  throw Error('Operație necunoscută.');
 }};
 window.MySubsStore.ready=(async()=>{
  try{
   const cfg=window.MYSUBS_CONFIG||{};
   if(!cfg.supabaseUrl||cfg.supabaseUrl.includes('PROIECTUL-TAU')||!cfg.supabasePublishableKey||cfg.supabasePublishableKey.includes('CHEIA-'))throw Error('Completează config.js cu URL-ul proiectului și cheia publică Supabase.');
   if(!window.supabase)throw Error('Biblioteca Supabase nu s-a încărcat. Verifică conexiunea și reîncarcă pagina.');
   client=window.supabase.createClient(cfg.supabaseUrl,cfg.supabasePublishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
   const {data,error}=await client.auth.getSession();if(error)fail(error);session=data.session;show();
   client.auth.onAuthStateChange((event,next)=>{const changed=session?.user?.id!==next?.user?.id;session=next;show();if(changed)setTimeout(()=>window.dispatchEvent(new Event('mysubs-auth')),0);});
   el('loginForm').onsubmit=async e=>{e.preventDefault();el('loginSubmit').disabled=true;el('loginMessage').textContent='Se verifică datele…';try{const {error}=await client.auth.signInWithPassword({email:el('loginEmail').value.trim(),password:el('loginPassword').value});if(error)throw error;el('loginPassword').value='';el('loginMessage').textContent='';}catch(e){el('loginMessage').textContent='Autentificarea a eșuat. Verifică e-mailul, parola și conexiunea.';}finally{el('loginSubmit').disabled=false;}};
   el('signOut').onclick=async()=>{el('signOut').disabled=true;try{const {error}=await client.auth.signOut({scope:'local'});if(error)throw error;}catch(e){alert('Deconectarea a eșuat. Încearcă din nou.');}finally{el('signOut').disabled=false;}};
  }catch(e){show();el('loginMessage').textContent=e.message;el('loginSubmit').disabled=true;}
 })();
})();
