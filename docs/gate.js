/* The analysis chapter and its documents are decrypted only after unlocking. */
(() => {
  let content = null;
  let packet;
  let pending;
  const urls = new Map();
  const lockedPage = () => `<div class="page-top"><div class="container"><p class="eyebrow">Niveau 03 · Accès réservé</p><h1>LE PROCHAIN NIVEAU<br>VOUS ATTEND</h1><p class="lead">L’enseignant vous communiquera le mot de passe pour ouvrir la partie analyse et ses documents.</p></div></div><div class="container page-body"><section class="unlock-card" aria-labelledby="unlock-title"><svg class="lock-pixel" viewBox="0 0 32 32" aria-hidden="true"><use href="assets/snes-sprites.svg#lock" width="32" height="32"></use></svg><h2 id="unlock-title">DÉBLOQUER LA PARTIE 3</h2><p>Terminez d’abord le cadrage et la préparation de votre enquête. Les données simulées seront disponibles après déverrouillage.</p><form data-analysis-unlock><label for="analysis-password">Mot de passe</label><div class="unlock-fields"><input id="analysis-password" name="password" type="password" autocomplete="off" required aria-describedby="unlock-status"><button class="button blue" type="submit">DÉBLOQUER</button></div><p id="unlock-status" role="status" aria-live="polite"></p></form><a href="#enqueter">Revenir à la préparation de l’enquête →</a></section></div>`;
  const decode = value => Uint8Array.from(atob(value),c=>c.charCodeAt(0));
  function bundle() {
    if (!pending) pending = fetch('assets/analysis.enc.json').then(response => { if(!response.ok)throw Error('network');return response.json(); }).catch(error=>{pending=null;throw error;});
    return pending;
  }
  async function decrypt(key) {
    packet = await bundle();
    const plaintext = await crypto.subtle.decrypt({name:'AES-GCM',iv:decode(packet.iv)},key,decode(packet.data));
    return JSON.parse(new TextDecoder().decode(plaintext));
  }
  async function unlock(password) {
    packet = await bundle();
    const normal = password.normalize('NFKC').trim().toLocaleLowerCase('fr').replace(/\s+/g,' ');
    const material = await crypto.subtle.importKey('raw',new TextEncoder().encode(normal),'PBKDF2',false,['deriveKey']);
    const key = await crypto.subtle.deriveKey({name:'PBKDF2',salt:decode(packet.salt),iterations:packet.iterations,hash:'SHA-256'},material,{name:'AES-GCM',length:256},true,['decrypt']);
    const result = await decrypt(key);
    content = result;
    try { sessionStorage.setItem('replay-analysis-key',btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.exportKey('raw',key))))); } catch {}
    document.dispatchEvent(new CustomEvent('replay:unlock'));
  }
  function bind(root) {
    root.querySelectorAll('[data-protected-file]').forEach(link => {
      const name = link.dataset.protectedFile;
      const file = content?.files[name];
      if (!file) { link.href='#analyser';link.removeAttribute('target');link.removeAttribute('download');link.setAttribute('aria-label',`${link.textContent.trim()} — mot de passe requis pour la partie 3`); return; }
      if (!urls.has(name)) urls.set(name,URL.createObjectURL(new Blob([decode(file.data)],{type:file.type})));
      link.href=urls.get(name);link.removeAttribute('aria-label');
      if (/\.(xlsx|csv|json)$/.test(name)) { link.download=name;link.removeAttribute('target'); }
      else { link.target='_blank';link.rel='noopener'; }
    });
  }
  document.addEventListener('submit',async event => {
    const form=event.target.closest('[data-analysis-unlock]');if(!form)return;
    event.preventDefault();
    const field=form.querySelector('input');const status=form.querySelector('[role=status]');const button=form.querySelector('button');
    button.disabled=true;status.textContent='Ouverture du niveau…';field.removeAttribute('aria-invalid');
    try { await unlock(field.value);field.value=''; }
    catch (error) {
      status.textContent=error.message==='network'?'Le document n’a pas pu être chargé. Réessayez dans un instant.':'Ce mot de passe ne convient pas. Réessayez.';
      field.setAttribute('aria-invalid','true');field.focus();field.select();
    } finally {button.disabled=false;}
  });
  window.ReplayGate={page:()=>content?.html||lockedPage(),bind,isOpen:()=>!!content};
  // Keep the chapter open for this browser tab's session, without saving the password.
  (async()=>{
    try {
      const saved=sessionStorage.getItem('replay-analysis-key');if(!saved)return;
      const key=await crypto.subtle.importKey('raw',decode(saved),{name:'AES-GCM'},false,['decrypt']);
      content=await decrypt(key);document.dispatchEvent(new CustomEvent('replay:unlock'));
    } catch {try{sessionStorage.removeItem('replay-analysis-key');}catch{}}
  })();
})();
