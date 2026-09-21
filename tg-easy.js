(()=>{
  const $=id=>document.getElementById(id);
  const tokenEl=$('telegramToken'), chatEl=$('telegramChatId'), modeEl=$('phoneNotify');
  const saveBtn=$('saveNotify'), testBtn=$('testNotify');
  if(!tokenEl||!chatEl||!modeEl) return;

  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  const box=document.createElement('div');
  box.id='tgEasyBox';
  box.innerHTML=`
    <div class="tgEasyTitle">Telegram 一鍵設定</div>
    <div class="tgEasyHint">唔使搵 Chat ID、唔使開 getUpdates、唔使睇 JSON。</div>
    <button type="button" id="tgOpenBotFather" class="tgEasySecondary">① 未有 Bot？開啟 @BotFather</button>
    <label>通知收件人</label>
    <select id="tgEasyTarget"><option value="private">我自己手機</option><option value="group">Telegram 群組</option></select>
    <button type="button" id="tgEasyStart" class="tgEasyPrimary">② 貼好 Token → 開始一鍵設定</button>
    <button type="button" id="tgEasyFinish" class="tgEasyPrimary">③ 完成 Telegram 動作 → 自動取得 ID＋測試</button>
    <div id="tgEasyStatus" class="tgEasyStatus">先喺 BotFather 建立 Bot，將 Bot Token 貼喺上面。</div>
    <details class="tgEasyAdvanced"><summary>進階／手動 Chat ID</summary><div id="tgEasyAdvancedSlot"></div></details>`;

  const style=document.createElement('style');
  style.textContent=`
    #tgEasyBox{margin-top:9px;padding:10px;border:1px solid #2b5b88;background:#101923;border-radius:10px}
    .tgEasyTitle{font-weight:800;font-size:13px;color:#8ecbff;margin-bottom:3px}.tgEasyHint{font-size:10px;color:#aaa;margin-bottom:7px;line-height:1.45}
    #tgEasyBox button{margin-top:6px}.tgEasyPrimary{background:#1671c5!important;border-color:#1671c5!important}.tgEasySecondary{background:#2b2b2b!important;border-color:#555!important}
    .tgEasyStatus{margin-top:8px;padding:8px;border-radius:7px;background:#0b1117;color:#cfd8e3;font-size:10px;line-height:1.5;white-space:pre-wrap}
    .tgEasyStatus.ok{border:1px solid #2f855a;background:#0d1c13;color:#b9f6cf}.tgEasyStatus.bad{border:1px solid #8b3a3a;background:#1b0f0f;color:#ffc3c3}
    .tgEasyAdvanced{margin-top:8px!important;padding:6px!important}.tgEasyAdvanced summary{font-size:10px!important;color:#888!important}
  `;
  document.head.appendChild(style);

  // Put the simple wizard immediately after the token input.
  tokenEl.insertAdjacentElement('afterend',box);
  const chatLabel=chatEl.previousElementSibling;
  const advSlot=box.querySelector('#tgEasyAdvancedSlot');
  if(chatLabel?.tagName==='LABEL') advSlot.appendChild(chatLabel);
  advSlot.appendChild(chatEl);
  if(saveBtn) advSlot.appendChild(saveBtn);
  if(testBtn){ testBtn.textContent='重新測試 Telegram 通知'; box.insertAdjacentElement('afterend',testBtn); }

  const targetEl=$('tgEasyTarget'), statusEl=$('tgEasyStatus'), startEl=$('tgEasyStart'), finishEl=$('tgEasyFinish');
  const say=(msg,kind='')=>{statusEl.textContent=msg;statusEl.className='tgEasyStatus'+(kind?' '+kind:'');};
  const cleanToken=()=>String(tokenEl.value||'').trim().replace(/[\u200B-\u200D\uFEFF]/g,'');
  async function tgJson(url,opts={}){
    const ctrl=new AbortController(); const timer=setTimeout(()=>ctrl.abort(),8000);
    try{
      const r=await fetch(url,{...opts,signal:ctrl.signal,cache:'no-store'});
      let j=null; try{j=await r.json();}catch{}
      if(!r.ok||!j?.ok) throw new Error(j?.description||`HTTP ${r.status}`);
      return j;
    }finally{clearTimeout(timer);}
  }
  function chatFromUpdate(u){return u?.message?.chat||u?.edited_message?.chat||u?.my_chat_member?.chat||u?.chat_member?.chat||u?.channel_post?.chat||null;}
  async function baseline(token){
    try{const j=await tgJson(`https://api.telegram.org/bot${encodeURIComponent(token).replace(/%3A/gi,':')}/getUpdates?limit=100`);return Math.max(-1,...(j.result||[]).map(x=>Number(x.update_id)||-1));}
    catch{return -1;}
  }
  async function saveNotify(token,chatId){
    modeEl.value='telegram'; chatEl.value=String(chatId);
    const value={mode:'telegram',telegramToken:token,telegramChatId:String(chatId)};
    await chrome.storage.local.set({monitorNotify:value});
    return value;
  }
  async function testNow(){
    const r=await chrome.runtime.sendMessage({type:'testStockNotify'});
    if(!r?.ok) throw new Error(r?.telegram?.error||r?.message||r?.error||'測試通知失敗');
    if(r?.telegram?.ok===false) throw new Error(r.telegram.error||'Telegram 發送失敗');
    return r;
  }

  $('tgOpenBotFather').onclick=()=>chrome.tabs.create({url:'https://t.me/BotFather'});
  startEl.onclick=async()=>{
    const token=cleanToken(); tokenEl.value=token;
    if(!/^[0-9]+:[A-Za-z0-9_-]+$/.test(token)){say('Token 格式唔正確。請喺 @BotFather 複製完整 Bot Token 再貼上。','bad');return;}
    startEl.disabled=true;
    try{
      say('正在驗證 Bot Token…');
      const me=await tgJson(`https://api.telegram.org/bot${token}/getMe`);
      const username=me?.result?.username;
      if(!username) throw new Error('Telegram 無法取得 Bot username');
      const lastUpdateId=await baseline(token);
      const target=targetEl.value==='group'?'group':'private';
      await chrome.storage.local.set({tgEasySetup:{token,target,username,lastUpdateId,startedAt:Date.now()}});
      if(target==='private'){
        say(`Bot：@${username}\n而家會打開 Telegram。請撳「START／開始」，之後返嚟 AppleBot 撳第③步。`,'ok');
        await chrome.tabs.create({url:`https://t.me/${encodeURIComponent(username)}?start=applebot_setup`});
      }else{
        say(`Bot：@${username}\n而家會打開 Telegram。請選擇你要收通知嘅群組並加入 Bot；加入後喺群組傳一個 /start@${username}，再返嚟撳第③步。`,'ok');
        await chrome.tabs.create({url:`https://t.me/${encodeURIComponent(username)}?startgroup=applebot_setup`});
      }
    }catch(e){say(`設定失敗：${e?.message||e}`,'bad');}
    finally{startEl.disabled=false;}
  };

  finishEl.onclick=async()=>{
    finishEl.disabled=true;
    try{
      const {tgEasySetup:s={}}=await chrome.storage.local.get('tgEasySetup');
      const token=cleanToken()||s.token||'';
      if(!token) throw new Error('請先完成第②步。');
      say('正在自動搵 Chat ID…');
      const j=await tgJson(`https://api.telegram.org/bot${token}/getUpdates?limit=100`);
      const rows=(j.result||[]).filter(u=>Number(u.update_id)>Number(s.lastUpdateId??-1));
      const want=s.target==='group'?'group':'private';
      const candidates=rows.map(u=>({u,chat:chatFromUpdate(u)})).filter(x=>x.chat).filter(x=>want==='private'?x.chat.type==='private':['group','supergroup'].includes(x.chat.type));
      if(!candidates.length){
        if(want==='group') throw new Error(`未搵到新群組。請確認已將 @${s.username||'你的Bot'} 加入群組，並喺群組傳 /start@${s.username||'BotUsername'}，再按一次第③步。`);
        throw new Error('未搵到你嘅 Start 訊息。請打開 Bot 撳 START／開始，再按一次第③步。');
      }
      const hit=candidates[candidates.length-1].chat;
      await saveNotify(token,hit.id);
      const label=hit.title||hit.username||[hit.first_name,hit.last_name].filter(Boolean).join(' ')||String(hit.id);
      say(`已自動連接：${label}\nChat ID：${hit.id}\n正在發送測試通知…`,'ok');
      const tr=await testNow();
      await chrome.storage.local.remove('tgEasySetup');
      say(`✅ Telegram 設定完成\n收件人：${label}\n測試訊息已成功發送。之後 AppleBot 有貨通知會直接送到呢度。`,'ok');
    }catch(e){say(`未完成：${e?.message||e}`,'bad');}
    finally{finishEl.disabled=false;}
  };

  // Restore wizard state when popup reopens after Telegram tab was opened.
  (async()=>{
    const {tgEasySetup:s}=await chrome.storage.local.get('tgEasySetup');
    if(s?.token){tokenEl.value=s.token;if(s.target)targetEl.value=s.target;say(s.target==='group'?`等待你完成 Telegram 群組設定。完成後撳第③步。`:`等待你喺 Telegram Bot 撳 START。完成後撳第③步。`,'ok');}
  })().catch(()=>{});
})();
