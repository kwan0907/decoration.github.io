const _0x=new Set();const _1x="https://www.apple.com";const _2x="8.1.0";const _3x="https://applebot-license-server.dearore-promo-checkout.workers.dev";const _4x=2600;const _5x="applebot-stock-monitor-watchdog";const _6x=15000;const _7x=0.5;const _8x=[{part:"MJXN4ZA/A",storage:"256GB",finish:"黑色",rank:0},{part:"MJXP4ZA/A",storage:"256GB",finish:"銀色",rank:1},{part:"MJXR4ZA/A",storage:"256GB",finish:"冰川色",rank:2},{part:"MJXQ4ZA/A",storage:"256GB",finish:"布根地紅色",rank:3},{part:"MJXT4ZA/A",storage:"512GB",finish:"黑色",rank:4},{part:"MJXU4ZA/A",storage:"512GB",finish:"銀色",rank:5},{part:"MJXW4ZA/A",storage:"512GB",finish:"冰川色",rank:6},{part:"MJXV4ZA/A",storage:"512GB",finish:"布根地紅色",rank:7},{part:'MJXX4ZA/A',storage:'1TB',finish:'黑色',rank:8},{part:'MJXY4ZA/A',storage:'1TB',finish:'銀色',rank:9},{part:'MJY14ZA/A',storage:'1TB',finish:'冰川色',rank:10},{part:'MJY04ZA/A',storage:'1TB',finish:'布根地紅色',rank:11},{part:'MJY24ZA/A',storage:'2TB',finish:'黑色',rank:12},{part:'MJY34ZA/A',storage:'2TB',finish:'銀色',rank:13},{part:'MJY54ZA/A',storage:'2TB',finish:'冰川色',rank:14},{part:'MJY44ZA/A',storage:'2TB',finish:'布根地紅色',rank:15}];function __abMonitorPartRow(_part){const _p=String(_part||'').trim().toUpperCase();return _8x.find(_r=>String(_r.part||'').toUpperCase()===_p)||null;}
function __abStrictMonitorConfig(_cfg={}){const _strict=String(_cfg.jobSource||'')==='stock-monitor'||_cfg.strictTarget===true||!!_cfg.monitorTarget;if(!_strict)return _cfg;const _t=_cfg.monitorTarget||{},_part=String(_cfg.pickupPart||_t.pickupPart||'').trim().toUpperCase(),_row=__abMonitorPartRow(_part);if(!_row)throw new Error('Monitor 安全鎖：偵測 SKU/Part 無效，已停止，絕不改買其他機型。');if(_cfg.model!=='iPhone 18 Pro Max'||_cfg.fulfilment!=='pickup-only'||String(_cfg.storage)!==String(_row.storage)||String(_cfg.finish)!==String(_row.finish)||String(_t.model||'')!=='iPhone 18 Pro Max'||String(_t.storage||'')!==String(_row.storage)||String(_t.finish||'')!==String(_row.finish)||String(_t.pickupPart||'').trim().toUpperCase()!==_part||!['256GB','512GB'].includes(String(_row.storage))){throw new Error('Monitor 安全鎖：任務目標與偵測 SKU 不一致，已停止；絕不 fallback 到 iPhone 17／送貨／其他容量顏色。');}return {..._cfg,model:'iPhone 18 Pro Max',storage:_row.storage,finish:_row.finish,fulfilment:'pickup-only',pickupPart:_row.part,jobSource:'stock-monitor',strictTarget:true,monitorTarget:{..._t,model:'iPhone 18 Pro Max',storage:_row.storage,finish:_row.finish,pickupPart:_row.part,pickupOnly:true}};}
let _9x=null,_ax=false;async function _bx(){return(await chrome.storage.local.get("stockMonitor")).stockMonitor||{};}async function _cx(_dx){await chrome.storage.local.set({stockMonitor:_dx});return _dx;}async function _ex(_fx={},_gx=null){const _hx=await _bx();const _ix=Array.isArray(_hx.logs)?_hx.logs.slice(-80):[];if(_gx)_ix.push(`${_2sx()}${_gx}`); return _cx({ ..._hx, ..._fx, logs:_ix }); }
function _jx() { const _kx = new URL("https://www.apple.com/hk-zh/shop/retail/pickup-message"); _kx.searchParams.set("pl", "true"); _kx.searchParams.set("location", "Hong Kong"); _kx.searchParams.set("purchaseOption", "fullPrice"); _kx.searchParams.set("mts.0", "regular"); _kx.searchParams.set("fts", "true"); _8x.forEach((_lx, _mx) => _kx.searchParams.set(`parts.${_mx}`, _lx.part)); return _kx.href; }
function _nx(_ox) { const _px = Array.isArray(_ox?.body?.stores) ? _ox.body.stores : []; const _qx = []; for (const _rx of _px) {
    for (const _sx of _8x) {
        const _tx = _rx?.partsAvailability?.[_sx.part];
        if (!_tx)
            continue;
        const _ux = String(_tx.pickupDisplay || "").toLowerCase();
        if (_ux === "available") {
            _qx.push({ ..._sx, storeName: String(_rx.storeName || _rx.storeTitle || _rx.storeNumber || "Apple Store"), storeNumber: String(_rx.storeNumber || ""), quote: String(_tx.pickupSearchQuote || _tx.storePickupQuote || _tx.pickupDisplay || ""), productTitle: String(_tx.storePickupProductTitle || _tx?.messageTypes?.regular?.storePickupProductTitle || "") });
        }
    }
} return _qx; }
function _vx(_wx, _xx = "") { const _yx = String(_xx || "").toLowerCase().trim(); return [..._wx].sort((_zx, _10x) => { const _11x = _yx && _zx.storeName.toLowerCase().includes(_yx) ? 0 : 1, _12x = _yx && _10x.storeName.toLowerCase().includes(_yx) ? 0 : 1; return _11x - _12x || _zx.rank - _10x.rank || _zx.storeName.localeCompare(_10x.storeName); })[0] || null; }

// Fast read-only pickup availability bridge used by purchase jobs.
// It reuses Apple's pickup-message endpoint; DOM is only used later to commit the chosen store into checkout session state.
let __abPickupQueryCache={key:'',at:0,value:null};
function __abNormPart(_p){
    try{_p=decodeURIComponent(String(_p||''));}catch(_e){_p=String(_p||'');}
    return _p.trim().toUpperCase().replace(/\\\//g,'/');
}
function __abInferPartFromConfig(_cfg={}){
    if(String(_cfg.model||'').toLowerCase()!=='iphone 18 pro max') return '';
    const _st=String(_cfg.storage||'').trim(),_fi=String(_cfg.finish||'').trim();
    const _m=_8x.find(_x=>String(_x.storage)===_st&&String(_x.finish)===_fi);
    return _m?.part||'';
}
function __abPickupUrlForParts(_parts,_location='Hong Kong'){
    const _u=new URL("https://www.apple.com/hk-zh/shop/retail/pickup-message");
    _u.searchParams.set('pl','true');
    _u.searchParams.set('location',String(_location||'Hong Kong'));
    _u.searchParams.set('purchaseOption','fullPrice');
    _u.searchParams.set('mts.0','regular');
    _u.searchParams.set('fts','true');
    _parts.forEach((_p,_i)=>_u.searchParams.set(`parts.${_i}`,_p));
    return _u.href;
}
function __abParseGenericPickup(_j,_parts){
    const _stores=Array.isArray(_j?.body?.stores)?_j.body.stores:[];
    const _hits=[];
    for(const _s of _stores){
        for(const _p of _parts){
            const _pa=_s?.partsAvailability?.[_p]||_s?.partsAvailability?.[__abNormPart(_p)];
            if(!_pa) continue;
            const _disp=String(_pa.pickupDisplay||'').toLowerCase();
            if(_disp==='available') _hits.push({
                part:_p,
                storeName:String(_s.storeName||_s.storeTitle||_s.storeNumber||''),
                storeNumber:String(_s.storeNumber||''),
                quote:String(_pa.pickupSearchQuote||_pa.storePickupQuote||_pa.pickupDisplay||''),
                productTitle:String(_pa.storePickupProductTitle||_pa?.messageTypes?.regular?.storePickupProductTitle||'')
            });
        }
    }
    return {hits:_hits,storesCount:_stores.length};
}
async function __abPickupAvailabilityQuery(_req={}){
    let _parts=Array.isArray(_req.parts)?_req.parts.map(__abNormPart).filter(Boolean):[];
    const _strict=String(_req.config?.jobSource||'')==='stock-monitor'||!!_req.config?.strictTarget;
    const _inf=__abInferPartFromConfig(_req.config||{}); if(_strict&&_req.config?.pickupPart){_parts=[__abNormPart(_req.config.pickupPart)];}else if(_inf)_parts.unshift(__abNormPart(_inf));
    _parts=[...new Set(_parts)].filter(_p=>/^[A-Z0-9]{5,14}Z[A-Z]\/A$/i.test(_p)||/^[A-Z0-9]{5,14}\/A$/i.test(_p)).slice(0,16);
    if(!_parts.length) return {ok:false,reason:'part-not-found',parts:[],hits:[],checkedAt:Date.now()};
    const _key=`${String(_req.location||'Hong Kong')}|${_parts.join(',')}`,_now=Date.now();
    if(!_req.force&&__abPickupQueryCache.key===_key&&_now-__abPickupQueryCache.at<2500&&__abPickupQueryCache.value)
        return {...__abPickupQueryCache.value,cached:true};
    let _r;
    try{_r=await fetch(__abPickupUrlForParts(_parts,_req.location||'Hong Kong'),{method:'GET',headers:{accept:'application/json'},cache:'no-store',credentials:'omit'});}catch(_e){
        return {ok:false,reason:'network',error:_e?.message||String(_e),parts:_parts,hits:[],checkedAt:Date.now()};
    }
    if(_r.status===429||_r.status===541) return {ok:false,reason:'rate-limit',status:_r.status,parts:_parts,hits:[],checkedAt:Date.now()};
    if(!_r.ok) return {ok:false,reason:'http',status:_r.status,parts:_parts,hits:[],checkedAt:Date.now()};
    let _j;try{_j=await _r.json();}catch(_e){return {ok:false,reason:'json',status:_r.status,parts:_parts,hits:[],checkedAt:Date.now()};}
    const _parsed=__abParseGenericPickup(_j,_parts);
    const _val={ok:true,status:_r.status,parts:_parts,hits:_parsed.hits,storesCount:_parsed.storesCount,checkedAt:Date.now()};
    __abPickupQueryCache={key:_key,at:Date.now(),value:_val};
    return _val;
}


async function _13x(_14x, _15x = false) { const _16x = _15x ? "AppleBot 測試通知" : "AppleBot：iPhone 18 Pro Max 有自取貨"; const _17x = _15x ? "電腦通知正常。" : `${_14x.storage}${_14x.finish}—${_14x.storeName}${_14x.quote?`\n${_14x.quote}` : ""}`; const _18x=_15x?`${"applebot-stock-test"}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`:"applebot-stock-hit"; try{const _19x=await chrome.notifications.create(_18x,{type:"basic",iconUrl:"icon128.png",title:_16x,message:_17x,priority:2,requireInteraction:!_15x}); return {ok:true,id:_19x||_18x};}catch(_1ax){return {ok:false,error:_1ax?.message||String(_1ax)};}}async function _19x(_1ax){
const{monitorNotify:_1bx={}}=await chrome.storage.local.get("monitorNotify");
if(_1bx.mode!=="telegram")return{ok:true,skipped:true,reason:'Telegram 未啟用'};
let _1cx=String(_1bx.telegramToken||'').trim(),_1dx=String(_1bx.telegramChatId||'').trim();
_1cx=_1cx.replace(/[\u200B-\u200D\uFEFF\s]/g,'').replace(/\\([:_-])/g,'$1');
const _1ex=_1cx.match(/^\[([0-9]+)\]\(tel:[0-9]+\)\\?:([A-Za-z0-9_-]+)$/);
if(_1ex)_1cx=`${_1ex[1]}:${_1ex[2]}`;
_1dx=_1dx.replace(/[\u200B-\u200D\uFEFF\s]/g,'');
if(!_1cx||!_1dx)throw new Error('Telegram Bot Token / Chat ID 未填');
if(!/^[0-9]+:[A-Za-z0-9_-]+$/.test(_1cx))throw new Error('Telegram Bot Token 格式不正確');
if(!/^-?[0-9]+$/.test(_1dx))throw new Error('Telegram Chat ID 格式不正確');
const _tgBase=`https://api.telegram.org/bot${_1cx}`;
const _fetchJson=async(_url,_opt={})=>{
  const _ctl=new AbortController(); const _to=setTimeout(()=>_ctl.abort(),9000);
  try{
    const _res=await fetch(_url,{..._opt,cache:'no-store',signal:_ctl.signal});
    let _json=null,_raw='';
    try{_raw=await _res.text();_json=_raw?JSON.parse(_raw):null;}catch(_e){}
    return {res:_res,json:_json,raw:_raw};
  }catch(_e){
    if(_e?.name==='AbortError')throw new Error('Telegram 連線逾時');
    throw new Error(`Telegram 網絡錯誤：${_e?.message||String(_e)}`);
  }finally{clearTimeout(_to);}
};
const _me=await _fetchJson(`${_tgBase}/getMe`);
if(!_me.res.ok||_me.json?.ok!==true){
  const _d=String(_me.json?.description||`HTTP ${_me.res.status}`);
  throw new Error(`Telegram Token 驗證失敗：${_d}`);
}
const _botUser=String(_me.json?.result?.username||'');
const _params=new URLSearchParams({chat_id:_1dx,text:String(_1ax),disable_web_page_preview:'true'});
let _send;
try{
  _send=await _fetchJson(`${_tgBase}/sendMessage`,{
    method:'POST',headers:{'content-type':'application/x-www-form-urlencoded;charset=UTF-8'},body:_params.toString()
  });
}catch(_postErr){
  // Transport-only fallback. This does not run after an HTTP/Telegram response,
  // so a successful POST cannot be duplicated by the fallback.
  _send=await _fetchJson(`${_tgBase}/sendMessage?${_params.toString()}`);
}
if(!_send.res.ok||_send.json?.ok!==true){
  const _d=String(_send.json?.description||`HTTP ${_send.res.status}`);
  if(/chat not found/i.test(_d))throw new Error('Telegram Chat ID 找不到：請先打開你建立的 Bot、按 Start、傳一個 hello，再重新取得 chat.id');
  if(/bot was blocked/i.test(_d))throw new Error('Telegram Bot 已被此帳戶封鎖：請在 Telegram 解除封鎖並按 Start');
  if(/unauthorized/i.test(_d))throw new Error('Telegram Token 已失效／被 revoke，請在 BotFather 取得新 Token');
  throw new Error(`Telegram 發送失敗：${_d}`);
}
return {ok:true,telegramMessageId:_send.json?.result?.message_id??null,chatId:String(_send.json?.result?.chat?.id??_1dx),botUsername:_botUser,apiDelivered:true};
}
async function _1hx(_1ix, _1jx = false) { const _1kx=await _13x(_1ix, _1jx); const _1lx = _1jx ? "AppleBot 測試通知：手機 Telegram 通知正常。" : `🍎AppleBot 發現 iPhone 18 Pro Max 自取庫存\n${_1ix.storage}/${_1ix.finish}\n門市：${_1ix.storeName}${_1ix.quote?`\n${_1ix.quote}` : ""}\nBot 已自動啟動搶機流程。`;try{const _1mx=await _19x(_1lx);return{ok:_1kx.ok!==false&&_1mx.ok!==false,desktop:_1kx,telegram:_1mx};}catch(_1nx){if(_1jx)throw Object.assign(new Error(_1nx?.message||String(_1nx)),{desktop:_1kx});await _ex({notifyError:_1nx?.message||String(_1nx)},`手機通知失敗：${_1nx?.message||_1nx}`);return { ok: false, desktop:_1kx, telegram:{ok:false,error:_1nx?.message||String(_1nx)} };} }
function _abK(h){return `${h.part||''}|${h.storeNumber||h.storeName||''}`;}async function _abNO(hs){if(!hs?.length)return{ok:true,skipped:true};const u=[];const seen=new Set();for(const h of hs){const k=`${h.storage}|${h.finish}|${h.storeName}`;if(seen.has(k))continue;seen.add(k);u.push(h);}const lines=u.slice(0,12).map(h=>`${h.storage} / ${h.finish} — ${h.storeName}`);const more=u.length>12?`\n另有 ${u.length-12} 個可取組合`:'';const body=`${lines.join('\n')}${more}`;let d={ok:false},t={ok:true,skipped:true};try{const id=`applebot-stock-info-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;const nid=await chrome.notifications.create(id,{type:'basic',iconUrl:'icon128.png',title:'iPhone 18 Pro Max 自取有貨（只通知）',message:`${body}\n1TB / 2TB 不會自動購買`,priority:2});d={ok:true,id:nid||id};}catch(e){d={ok:false,error:e?.message||String(e)};}try{t=await _19x(`🍎 iPhone 18 Pro Max 自取有貨\n${body}\n\n1TB / 2TB：只通知，不會自動購買\n256GB / 512GB：命中會自動啟動搶機。`);}catch(e){t={ok:false,error:e?.message||String(e)};await _ex({notifyError:e?.message||String(e)},`Telegram 通知失敗：${e?.message||e}`);}return{ok:d.ok!==false&&t.ok!==false,desktop:d,telegram:t};}async function _abOD(){if(!chrome.offscreen?.createDocument)return false;const url=chrome.runtime.getURL('m.html');try{if(chrome.runtime.getContexts){const cs=await chrome.runtime.getContexts({contextTypes:['OFFSCREEN_DOCUMENT'],documentUrls:[url]});if(cs?.length)return true;}else if(chrome.offscreen.hasDocument&&await chrome.offscreen.hasDocument())return true;}catch(e){}try{await chrome.offscreen.createDocument({url:'m.html',reasons:['DOM_SCRAPING'],justification:'Maintain the user-requested 15-second Apple pickup stock monitor while Chrome is running.'});return true;}catch(e){if(/single offscreen|already exists/i.test(String(e?.message||e)))return true;await _ex({clockError:e?.message||String(e)},`15秒監測時鐘建立失敗：${e?.message||e}`);return false;}}async function _abCS(){return await _abOD();}async function _abCX(){try{if(chrome.offscreen?.closeDocument)await chrome.offscreen.closeDocument();}catch(e){}}async function _1mx(_1nx, _1ox = "開始新任務 AppleBot Universal v2.1（啟動碼已驗證）") {
    const _1px = await _2tx();
    if (_1px.tabId) await _4hx(_1px.tabId);
    let _1qx = { ...(_1nx||{}) };
    _1qx.quantity = String(Math.min(2, Math.max(1, Number(_1qx.quantity || 1))));
    _1qx = __abStrictMonitorConfig(_1qx);
    if(!['iPhone 17','iPhone 18 Pro','iPhone 18 Pro Max'].includes(String(_1qx.model||''))) throw new Error('任務型號無效；已停止，絕不預設成 iPhone 17。');
    if(!String(_1qx.storage||'').trim()||!String(_1qx.finish||'').trim()) throw new Error('任務容量／顏色不完整；已停止，絕不以預設機型代替。');
    const _1rx = await chrome.tabs.create({ url: `${_1x}/hk-zh/shop/bag`, active: true });
    const _1sx = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    await _2ux({ active:true, runId:_1sx, tabId:_1rx.id, config:_1qx, monitorLock:String(_1qx.jobSource||'')==='stock-monitor'?{...(_1qx.monitorTarget||{}),model:_1qx.model,storage:_1qx.storage,finish:_1qx.finish,pickupPart:_1qx.pickupPart,pickupOnly:true}:null, stage:"preflight", status:"先核對購物袋，再按實際缺少數量逐部加入", url:`${_1x}/hk-zh/shop/bag`, logs:[`${_2sx()}${_1ox}`], state:{preflightDone:false,confirmedQty:0,addInFlight:false,addSentAt:0,addClickCount:0,addFailures:0,pnfRecoveries:0,selectedStore:"",selectedStoreValue:"",storeSearchCount:0,pickupNoStoreStreak:0,timeslotSelected:"",checkoutStarted:false,lastAction:"",lastActionAt:0,navTarget:"",navAt:0,applePayContinueSent:false,monitorTargetLocked:String(_1qx.jobSource||'')==='stock-monitor',monitorTargetKey:String(_1qx.jobSource||'')==='stock-monitor'?[_1qx.model,_1qx.storage,_1qx.finish,_1qx.pickupPart].join('|'):''} });
    return _1rx;
}
function _1tx() { if (_9x) {
    clearTimeout(_9x);
    _9x = null;
} }
async function _1ux(_1vx = "使用者停止監測") { _1tx(); await _abCX(); try {
    await chrome.alarms.clear(_5x);
}
catch (_1wx) { } const _1xx = await _bx(); await _cx({ ..._1xx, active: false, status: _1vx, stoppedAt: Date.now() }); }
function _1yx(_1zx = _6x) { _1tx(); _9x = setTimeout(() => { _9x = null; _22x(); }, Math.max(250, Number(_1zx) || _6x)); }
async function _20x() { try {
    await chrome.alarms.create(_5x, { periodInMinutes: _7x });
}
catch (_21x) { } }
async function _22x(){if(_ax)return;_ax=true;try{const st=await _bx();if(!st.active)return;const ts=Date.now(),lastAttempt=Number(st.lastApiAttemptAt||0);if(lastAttempt&&ts-lastAttempt<_6x-250)return;await _ex({lastApiAttemptAt:ts});const n=Number(st.checks||0)+1;let r;try{r=await fetch(_jx(),{method:'GET',headers:{accept:'application/json'},cache:'no-store',credentials:'omit'});}catch(e){throw new Error(`Apple 庫存查詢網絡錯誤：${e?.message||e}`);}if(r.status===429)throw new Error('Apple 暫時限制查詢頻率（HTTP 429）；15秒後自動再試');if(r.status===541)throw new Error('Apple 暫時限制庫存查詢（HTTP 541）；15秒後自動再試');if(!r.ok)throw new Error(`Apple 庫存 API HTTP ${r.status}`);let j;try{j=await r.json();}catch(e){throw new Error('Apple 庫存 API 回覆不是 JSON');}const all=_nx(j);const ruleStorages=new Set(Array.isArray(st.autoBuyRules?.storages)&&st.autoBuyRules.storages.length?st.autoBuyRules.storages:['256GB','512GB']);const ruleFinishes=new Set(Array.isArray(st.autoBuyRules?.finishes)&&st.autoBuyRules.finishes.length?st.autoBuyRules.finishes:['黑色','銀色','冰川色','布根地紅色']);const buy=all.filter(h=>ruleStorages.has(h.storage)&&ruleFinishes.has(h.finish));const info=all.filter(h=>!ruleStorages.has(h.storage)||!ruleFinishes.has(h.finish));const prev=new Set(Array.isArray(st.notifiedInfoKeys)?st.notifiedInfoKeys:[]);const nowInfoKeys=info.map(_abK);const freshInfo=info.filter(h=>!prev.has(_abK(h)));if(freshInfo.length)await _abNO(freshInfo);if(buy.length){const hit=_vx(buy,st.purchaseConfig?.storePriority);await _ex({active:false,checks:n,lastCheck:ts,status:`命中可搶庫存 ${hit.storage}${hit.finish}@${hit.storeName}；正在自動啟動購買流程`,lastHit:hit,lastError:'',triggeredAt:Date.now(),notifiedInfoKeys:nowInfoKeys},`第${n}次監測：命中可搶 ${hit.storage}${hit.finish}@${hit.storeName}`);try{await chrome.alarms.clear(_5x);}catch(e){}await _abCX();const lic=await _3ox();if(!lic||lic.status!=='active'){await _ex({status:'已命中庫存，但本機啟動碼狀態不是 active；請重新驗證',lastError:'license_not_active'});_1hx(hit,false).catch(()=>{});return;}const base={...(st.purchaseConfig||{})};const cfg={...base,jobSource:'stock-monitor',strictTarget:true,model:'iPhone 18 Pro Max',storage:hit.storage,finish:hit.finish,fulfilment:'pickup-only',storePriority:hit.storeName,pickupTimeslot:base.pickupTimeslot||'earliest',pickupPart:hit.part||'',monitorTarget:{model:'iPhone 18 Pro Max',storage:hit.storage,finish:hit.finish,pickupPart:hit.part||'',detectedStore:hit.storeName||'',detectedStoreNumber:hit.storeNumber||'',detectedAt:Date.now(),pickupOnly:true}};await _1mx(cfg,`庫存監測命中：${hit.storage}${hit.finish}@${hit.storeName}；自動啟動搶機`);_1hx(hit,false).catch(()=>{});await _ex({status:`已啟動購買流程：${hit.storage}${hit.finish}@${hit.storeName}`,purchaseStartedAt:Date.now(),licenseActivatedAt:lic.activatedAt||0});return;}const ruleLabel=[...ruleStorages].join('/');const txt=all.length?`見到 Pro Max 自取貨，但未符合 AUTO-BUY（${ruleLabel} × 已選顏色）；已通知並繼續監測`:'未見任何 iPhone 18 Pro Max 自取庫存';await _ex({checks:n,lastCheck:ts,status:txt,lastError:'',lastLatencyMs:Date.now()-ts,notifiedInfoKeys:nowInfoKeys},`第${n}次監測：${all.length?`有貨 ${all.length} 個組合（無 256/512）`:'暫無自取貨'}；下次約15秒後`);}catch(e){const msg=e?.message||String(e);const st=await _bx();if(st.active)await _ex({checks:Number(st.checks||0)+1,lastCheck:Date.now(),lastError:msg,status:`監測暫時錯誤：${msg}`},`監測錯誤：${msg}`);}finally{_ax=false;}}
async function _2lx(cfg){await _3zx();const job=await _2tx();if(job?.active)throw new Error('請先停止目前購買任務，再開始庫存監測');const raw={...(cfg||{})},rules=raw.autoBuyRules||{};const requestedStorages=Array.isArray(rules.storages)&&rules.storages.length?rules.storages:['256GB','512GB'];const storages=[...new Set(requestedStorages.map(String))].filter(_s=>_s==='256GB'||_s==='512GB');if(!storages.length)throw new Error('Monitor 自動購買只允許 256GB / 512GB；1TB / 2TB 只通知，不會自動落單。');const allowedFinishes=new Set(['黑色','銀色','冰川色','布根地紅色']);const finishes=[...new Set((Array.isArray(rules.finishes)&&rules.finishes.length?rules.finishes:['黑色','銀色','冰川色','布根地紅色']).map(String))].filter(_f=>allowedFinishes.has(_f));if(!finishes.length)throw new Error('請至少選擇一個 Monitor 自動購買顏色。');delete raw.model;delete raw.storage;delete raw.finish;delete raw.autoBuyRules;delete raw.jobSource;delete raw.strictTarget;delete raw.monitorTarget;delete raw.pickupPart;const c={...raw,fulfilment:'pickup-only',quantity:String(Math.min(2,Math.max(1,Number(raw.quantity||1)))),pickupTimeslot:raw.pickupTimeslot||'earliest'};const label=`${storages.join('/')} × ${finishes.join('/')}`;const st={active:true,startedAt:Date.now(),checks:0,lastCheck:0,lastError:'',status:`監測已啟動：iPhone 18 Pro Max 只自取；AUTO-BUY=${label}`,purchaseConfig:c,autoBuyRules:{storages,finishes},notifiedInfoKeys:[],logs:[`${_2sx()}啟動監測：只自取；AUTO-BUY=${label}；1TB/2TB 只通知；數量=${c.quantity}；付款=${c.paymentMethod||'card'}；時段=${c.pickupTimeslot}；門市偏好=${c.storePriority||'任何'}`]};await _cx(st);await _20x();await _abCS();await _22x();return await _bx();}
function _2qx(_2rx) { return _2rx === "www.apple.com" || _2rx === "store.apple.com" || _2rx.endsWith(".store.apple.com"); }
function _2sx() { return new Date().toLocaleTimeString(); }
async function _2tx() { return (await chrome.storage.local.get("job")).job || {}; }
async function _2ux(_2vx) { await chrome.storage.local.set({ job:_2vx }); return _2vx; }
async function _2wx(_2xx = {}, _2yx = null) {
    const _2zx = await _2tx();
    const _30x = Array.isArray(_2zx.logs) ? _2zx.logs.slice(-100) : [];
    if (_2yx)
        _30x.push(`${_2sx()}${_2yx}`);
    return _2ux({ ..._2zx, ..._2xx, logs:_30x });
}
function _31x(_32x) { return [...new Uint8Array(_32x)].map(_33x => _33x.toString(16).padStart(2, "0")).join(""); }
async function _34x(_35x) { return _31x(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(_35x)))); }
async function _36x() {
    let _37x = "";
    try {
        _37x = (await chrome.storage.local.get("licenseDeviceId")).licenseDeviceId || "";
    }
    catch (_38x) { }
    if (!_37x) {
        try {
            _37x = (await chrome.storage.sync.get("licenseDeviceId")).licenseDeviceId || "";
        }
        catch (_39x) { }
    }
    if (!_37x) {
        const _3ax = new Uint8Array(32);
        crypto.getRandomValues(_3ax);
        _37x = _31x(_3ax);
        try {
            await chrome.storage.local.set({ licenseDeviceId: _37x });
        }
        catch (_3bx) { }
        try {
            await chrome.storage.sync.set({ licenseDeviceId: _37x });
        }
        catch (_3cx) { }
    }
    else {
        try {
            await chrome.storage.local.set({ licenseDeviceId: _37x });
        }
        catch (_3dx) { }
    }
    return _34x(`AppleBot-Native|${_37x}`);
}
function _3ex(_3fx) {
    const _3gx = {
        code_not_found: "找不到此啟動碼。", code_revoked: "此啟動碼已失效。", code_consumed: "此啟動碼已完成一次使用。",
        machine_mismatch: "此啟動碼已綁定另一個 AppleBot 安裝。", invalid_activation_request: "啟動資料格式不正確，請更新程式。",
        activation_race: "啟動碼剛被另一個程序使用，請關閉其他 AppleBot 後再試。", database_unavailable: "授權資料庫暫時無法使用，請稍後再試。",
        license_server_unreachable: "無法連接授權伺服器，請檢查網絡後再試。", invalid_activation_token: "啟動憑證無效，請重新輸入啟動碼。",
        license_required: "請先輸入並驗證啟動碼。", consume_failed: "啟動碼註銷失敗，程式會稍後重試。"
    };
    return _3gx[_3fx] || `授權服務回覆：${_3fx}`;
}
async function _3hx(_3ix, _3jx) {
    let _3kx;
    try {
        _3kx = await fetch(`${_3x}${_3ix}`, { method: "POST", headers: { 'content-type': "application/json", 'x-applebot-version': _2x }, body: JSON.stringify(_3jx), cache: "no-store" });
    }
    catch (_3lx) {
        throw new Error("license_server_unreachable");
    }
    let _3mx = {};
    try {
        _3mx = await _3kx.json();
    }
    catch (_3nx) { }
    if (!_3kx.ok || _3mx?.ok !== true)
        throw new Error(String(_3mx?.error || `http_${_3kx.status}`));
    return _3mx;
}
async function _3ox() { return (await chrome.storage.local.get("license")).license || null; }
function _3px(_3qx) {
    if (!_3qx)
        return { status: "missing", active: false, message: _3ex("license_required") };
    const _3rx = _3qx.status === "active";
    return { status: _3qx.status || "unknown", active:_3rx, message: _3rx ? "啟動碼已驗證，可開始任務。" : _3qx.status === "consumed" ? "啟動碼已完成一次使用。" : _3qx.status === "consume-pending" ? "已完成訂單，正在等待連線註銷啟動碼。" : (_3qx.lastError ? _3ex(_3qx.lastError) : "啟動碼未啟用。"), activatedAt: _3qx.activatedAt || 0 };
}
const _E0="a6642b97552357f1833abafc53c2212eae6e5ed84bf06e0d7fab78fe2fafca6c",_E1="E918-a6642b975523",_E2="emergencyOneTimeBinding_"+_E1,_E3="emergencyOneTimeConsumed_"+_E1;
async function _E4(_k){let _v=null;try{_v=(await chrome.storage.local.get(_k))[_k]??null;}catch(_e){}if(_v==null)try{_v=(await chrome.storage.sync.get(_k))[_k]??null;}catch(_e){}return _v;}
async function _E5(_o){try{await chrome.storage.local.set(_o);}catch(_e){}try{await chrome.storage.sync.set(_o);}catch(_e){}}
async function _E6(_h,_m){
    // RED-TEAM TEST: simulate an attacker abusing the local emergency path.
    const _l={status:"active",codeHash:String(_h||"redteam"),machineHash:String(_m||"redteam-machine"),activationToken:"REDTEAM-EMERGENCY",activatedAt:Date.now(),lastValidatedAt:Date.now(),lastError:"",emergency:true,emergencyId:_E1};
    await chrome.storage.local.set({license:_l});
    return _3px(_l);
}
async function _3sx(_3tx) {
    // RED-TEAM TEST: simulate local activation verification being replaced.
    const _m = await _36x();
    const _l = {status:"active",codeHash:"REDTEAM",machineHash:_m,activationToken:"REDTEAM-TOKEN",activatedAt:Date.now(),lastValidatedAt:Date.now(),lastError:"",redTeamBypass:true};
    await chrome.storage.local.set({license:_l});
    return _3px(_l);
}
async function _3zx() {
    // RED-TEAM TEST: simulate attacker replacing task-start validation.
    const _m = await _36x();
    const _l = {status:"active",codeHash:"REDTEAM",machineHash:_m,activationToken:"REDTEAM-TOKEN",activatedAt:Date.now(),lastValidatedAt:Date.now(),lastError:"",redTeamBypass:true};
    await chrome.storage.local.set({license:_l});
    return _l;
}
async function _43x() {
    // RED-TEAM TEST: simulate attacker disabling server-side consume request.
    const _l = await _3ox();
    if (_l) await chrome.storage.local.set({license:{..._l,status:"active",lastError:"",redTeamConsumeBypass:true}});
    await chrome.storage.local.remove("pendingLicenseConsume");
    return {ok:true,redTeamBypass:true};
}
async function _49x() {
    const { pendingLicenseConsume: _4ax } = await chrome.storage.local.get("pendingLicenseConsume");
    if (!_4ax)
        return { ok: true, none: true };
    try {
        await _3hx("/api/license/consume", _4ax);
        const _4bx = await _3ox();
        if (_4bx)
            await chrome.storage.local.set({ license: { ..._4bx, status: "consumed", consumedAt: Date.now(), lastError: "" } });
        await chrome.storage.local.remove("pendingLicenseConsume");
        return { ok: true };
    }
    catch (_4cx) {
        return { ok: false, error: _4cx?.message || String(_4cx) };
    }
}
async function _4dx(_4ex) {
    if (_0x.has(_4ex))
        return;
    try {
        await chrome.debugger.attach({ tabId:_4ex }, "1.3");
        _0x.add(_4ex);
    }
    catch (_4fx) {
        const _4gx = String(_4fx?.message || _4fx || "");
        if (!_4gx.includes("Another debugger") && !_4gx.includes("already attached"))
            throw _4fx;
        _0x.add(_4ex);
    }
}
async function _4hx(_4ix) { if (!_4ix || !_0x.has(_4ix))
    return; try {
    await chrome.debugger.detach({ tabId:_4ix });
}
catch (_4jx) { } _0x.delete(_4ix); }
async function _4kx(_4lx, _4mx, _4nx) {
    await _4dx(_4lx);
    for (const _4ox of [
        { type: "mouseMoved", x:_4mx, y:_4nx },
        { type: "mousePressed", x:_4mx, y:_4nx, button: "left", clickCount: 1 },
        { type: "mouseReleased", x:_4mx, y:_4nx, button: "left", clickCount: 1 }
    ])
        await chrome.debugger.sendCommand({ tabId:_4lx }, "Input.dispatchMouseEvent", _4ox);
}
async function _4px(_4qx) {
    await _4dx(_4qx);
    try {
        await chrome.debugger.sendCommand({ tabId:_4qx }, "DOM.enable", {});
    }
    catch (_4rx) { }
    try {
        await chrome.debugger.sendCommand({ tabId:_4qx }, "Accessibility.enable", {});
    }
    catch (_4sx) { }
    try {
        await chrome.debugger.sendCommand({ tabId:_4qx }, "Page.enable", {});
    }
    catch (_4tx) { }
    const _4ux = _4vx => { const _4wx = String(_4vx || "").replace(//g, " apple ").toLowerCase().replace(/\s+/g, " "); return (_4wx.includes("apple pay") || _4wx.includes("applepay")) && (_4wx.includes("繼續") || _4wx.includes("continue") || _4wx.includes("使用")); };
    const _4xx = async (_4yx) => { try {
        const _4zx = await chrome.debugger.sendCommand({ tabId:_4qx }, "Accessibility.getFullAXTree", _4yx ? { frameId:_4yx } : {});
        const _50x = (_4zx?.nodes || []).filter(_51x => { const _52x = String(_51x.role?.value || "").toLowerCase(), _53x = [_51x.name?.value, _51x.description?.value, _51x.value?.value].filter(Boolean).join(" "); return (_52x === "button" || _52x === "link" || _52x === "genericcontainer") && _4ux(_53x) && _51x.backendDOMNodeId; });
        for (const _54x of _50x) {
            try {
                const _55x = await chrome.debugger.sendCommand({ tabId:_4qx }, "DOM.getBoxModel", { backendNodeId: _54x.backendDOMNodeId });
                const _56x = _55x?.model?.border || _55x?.model?.content;
                if (_56x && _56x.length >= 8) {
                    const _57x = [_56x[0], _56x[2], _56x[4], _56x[6]], _58x = [_56x[1], _56x[3], _56x[5], _56x[7]], _59x = _57x.reduce((_5ax, _5bx) => _5ax + _5bx, 0) / 4, _5cx = _58x.reduce((_5dx, _5ex) => _5dx + _5ex, 0) / 4;
                    if (Number.isFinite(_59x) && Number.isFinite(_5cx)) {
                        await _4kx(_4qx, _59x, _5cx);
                        return true;
                    }
                }
            }
            catch (_5fx) { }
        }
    }
    catch (_5gx) { } return false; };
    try {
        if (await _4xx(null))
            return { ok: true, clicked: true, source: "ax-main" };
    }
    catch (_5hx) { }
    try {
        const _5ix = await chrome.debugger.sendCommand({ tabId:_4qx }, "Page.getFrameTree", {}), _5jx = [];
        const _5kx = _5lx => { if (_5lx?.frame?.id)
            _5jx.push(_5lx.frame.id); for (const _5mx of _5lx?.childFrames || [])
            _5kx(_5mx); };
        _5kx(_5ix?.frameTree);
        for (const _5nx of _5jx.slice(1)) {
            if (await _4xx(_5nx))
                return { ok: true, clicked: true, source: "ax-frame" };
        }
    }
    catch (_5ox) { }
    try {
        const _5px = "(()=>{const n=s=>String(s||'').replace(//g,' apple ').toLowerCase().replace(/\\s+/g,' ').trim();const ok=e=>{if(!e)return false;const st=getComputedStyle(e),r=e.getBoundingClientRect();return r.width>2&&r.height>2&&st.display!=='none'&&st.visibility!=='hidden'&&!e.disabled&&e.getAttribute('aria-disabled')!=='true'};const meta=e=>n([e.innerText,e.textContent,e.value,e.getAttribute&&e.getAttribute('aria-label'),e.getAttribute&&e.getAttribute('data-autom'),e.id,e.className].filter(Boolean).join(' '));const pay=m=>(m.includes('apple pay')||m.includes('applepay'))&&(m.includes('繼續')||m.includes('continue')||m.includes('使用'));const roots=[document];for(let i=0;i<roots.length;i++){const root=roots[i];for(const e of root.querySelectorAll('*'))if(e.shadowRoot)roots.push(e.shadowRoot);}for(const root of roots){for(const e of root.querySelectorAll('button,a,[role=\"button\"],input[type=\"submit\"],input[type=\"button\"],apple-pay-button,[data-autom],[aria-label]')){if(ok(e)&&pay(meta(e))){const r=e.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,text:meta(e)};}}}return null;})()";
        const _5qx = await chrome.debugger.sendCommand({ tabId:_4qx }, "Runtime.evaluate", { expression:_5px, returnByValue: true, awaitPromise: false });
        const _5rx = _5qx?.result?.value;
        if (_5rx && Number.isFinite(_5rx.x) && Number.isFinite(_5rx.y)) {
            await _4kx(_4qx, _5rx.x, _5rx.y);
            return { ok: true, clicked: true, source: "dom-deep" };
        }
    }
    catch (_5sx) { }
    return { ok: true, clicked: false };
}
function _5tx(_5ux) { if (_5ux?.model === "iPhone 18 Pro Max") return { path:"iphone-18-pro", screen:"6.9" }; if (_5ux?.model === "iPhone 18 Pro") return { path:"iphone-18-pro", screen:"6.3" }; if (_5ux?.model === "iPhone 17") return { path:"iphone-17", screen:"6.3" }; throw new Error("未知或遺失 iPhone 型號；安全停止，絕不 fallback 到 iPhone 17。"); }
function _5vx(_5wx) {
    const _5xx = _5tx(_5wx), _5yx = `${_5xx.screen}-吋顯示器-${String(_5wx.storage).toLowerCase()}-${_5wx.finish}`;
    return `${_1x}/hk-zh/shop/buy-iphone/${_5xx.path}/${encodeURIComponent(_5yx)}`;
}
function _5zx(_60x) {
    if (!_60x)
        throw new Error("Missing navigation target");
    const _61x = _60x.startsWith("/") ? _1x + _60x : _60x;
    const _62x = new URL(_61x);
    if (_62x.protocol !== "https:" || !_2qx(_62x.hostname))
        throw new Error("Blocked non-Apple navigation target");
    return _62x.href;
}
function _63x(_64x, _65x) { try {
    const _66x = new URL(_64x), _67x = new URL(_65x);
    return _66x.origin === _67x.origin && _66x.pathname === _67x.pathname && _66x.search === _67x.search;
}
catch (_68x) {
    return false;
} }
async function _69x(_6ax, _6bx, _6cx = false) {
    const _6dx = _5zx(_6bx);
    const _6ex = _6ax.state || {};
    const _6fx = Date.now();
    if (!_6cx && _6ex.navTarget === _6dx && _6fx - Number(_6ex.navAt || 0) < _4x)
        return { ok: true, deduped: true, url:_6dx };
    let _6gx = null;
    try {
        _6gx = await chrome.tabs.get(_6ax.tabId);
    }
    catch (_6hx) { }
    if (!_6cx && _6gx?.url && _63x(_6gx.url, _6dx))
        return { ok: true, already: true, url:_6dx };
    if (_6cx && _6gx?.url && _63x(_6gx.url, _6dx)) {
        await chrome.tabs.reload(_6ax.tabId);
        return { ok: true, reloaded: true, url:_6dx };
    }
    const _6ix = await _2tx();
    await _2ux({ ..._6ix, url:_6dx, state: { ...(_6ix.state || {}), navTarget: _6dx, navAt: _6fx } });
    try {
        await chrome.tabs.update(_6ax.tabId, { url:_6dx, active: true });
        return { ok: true, url:_6dx };
    }
    catch (_6jx) {
        const _6kx = String(_6jx?.message || _6jx || "");
        if (/Navigation rejected/i.test(_6kx)) {
            await new Promise(_6lx => setTimeout(_6lx, 180));
            try {
                const _6mx = await chrome.tabs.get(_6ax.tabId);
                if (_6mx?.url && _63x(_6mx.url, _6dx))
                    return { ok: true, url:_6dx, recovered: true };
            }
            catch (_6nx) { }
            await new Promise(_6ox => setTimeout(_6ox, 220));
            try {
                await chrome.tabs.update(_6ax.tabId, { url:_6dx, active: true });
                return { ok: true, url:_6dx, retried: true };
            }
            catch (_6px) {
                throw new Error(`Apple navigation failed:${_6px?.message||_6px}`);
            }
        }
        throw _6jx;
    }
}
chrome.debugger.onDetach.addListener(_6qx => { if (_6qx.tabId)
    _0x.delete(_6qx.tabId); });
chrome.tabs.onRemoved.addListener(async (_6rx) => { _0x.delete(_6rx); const _6sx = await _2tx(); if (_6sx.tabId === _6rx && _6sx.active)
    await _2wx({ active: false, status: "工作分頁已關閉", stage: "stopped" }, "工作分頁已關閉"); });
if (chrome.tabs.onUpdated)
    chrome.tabs.onUpdated.addListener(async (_6tx, _6ux, _6vx) => {
        if (!_6ux.url && _6ux.status !== "complete")
            return;
        const _6wx = await _2tx();
        if (_6tx !== _6wx.tabId)
            return;
        const _6xx = _6ux.url || _6vx?.url || _6wx.url || "";
        const _6yx = { ...(_6wx.state || {}) };
        if (_6yx.navTarget && _6xx && _63x(_6xx, _6yx.navTarget)) {
            _6yx.navTarget = "";
            _6yx.navAt = 0;
        }
        await _2ux({ ..._6wx, url:_6xx, state: _6yx });
    });
if (chrome.runtime.onStartup)
    chrome.runtime.onStartup.addListener(async () => { _49x(); const _6zx = await _bx(); if (_6zx.active) {
        await _20x();
        _1yx(500);
    } });
if (chrome.runtime.onInstalled)
    chrome.runtime.onInstalled.addListener(async () => { _49x(); const _70x = await _bx(); if (_70x.active) {
        await _20x();
        _1yx(500);
    } });
_49x();
if (chrome.alarms?.onAlarm)
    chrome.alarms.onAlarm.addListener(async (_71x) => { if (_71x?.name !== _5x)
        return; const _72x = await _bx(); if (_72x.active && !_ax) {
        _1tx();
        _22x();
    } });
if (chrome.notifications?.onClicked)
    chrome.notifications.onClicked.addListener(async (_73x) => { if (_73x !== "applebot-stock-hit")
        return; const _74x = await _2tx(); if (_74x?.tabId) {
        try {
            await chrome.tabs.update(_74x.tabId, { active: true });
        }
        catch (_75x) { }
    } });
(async () => { const _76x = await _bx(); if (_76x.active) {
    await _20x();
    _1yx(750);
} })();
chrome.runtime.onMessage.addListener((_77x, _78x, _79x) => {
    (async () => {
        if (_77x.type === "getLicenseStatus") {
            await _49x();
            _79x({ ok: true, license: _3px(await _3ox()) });
            return;
        }
        if (_77x.type === "activateLicense") {
            try {
                const _7ax = await _3sx(_77x.code);
                _79x({ ok: true, license:_7ax });
            }
            catch (_7bx) {
                const _7cx = _7bx?.message || String(_7bx);
                _79x({ ok: false, error: _7cx, message: _3ex(_7cx) });
            }
            return;
        }
        if (_77x.type === "consumeLicense") {
            try {
                const _7dx = await _43x();
                await _2wx({ status: "已偵測 Apple 訂單成功；啟動碼已永久失效", stage: "license-consumed" }, "啟動碼已註銷");
                _79x({ ok: true, ..._7dx });
            }
            catch (_7ex) {
                const _7fx = _7ex?.message || String(_7ex);
                await _2wx({ status: "已偵測訂單成功；正在等待連線註銷啟動碼", stage: "license-consume-pending" }, `啟動碼註銷待重試：${_7fx}`);
                _79x({ ok: false, pending: true, error: _7fx, message: _3ex(_7fx) });
            }
            return;
        }
        if (_77x.type === "getJob") {
            const _7gx = await _2tx();
            const { guestProfile: _7hx = {} } = await chrome.storage.local.get("guestProfile");
            _79x({ ok: !!_78x.tab?.id && _78x.tab.id === _7gx.tabId, job:_7gx, profile: _7hx });
            return;
        }
        if (_77x.type === "startJob") {
            let _7ix;
            try {
                _7ix = await _3zx();
            }
            catch (_7jx) {
                const _7kx = _7jx?.message || String(_7jx);
                _79x({ ok: false, error: _7kx, message: _3ex(_7kx) });
                return;
            }
            await _1ux("已轉為手動購買任務");
            const _7lx = await _1mx(_77x.config, "開始新任務 AppleBot Universal v2.1（啟動碼已驗證）");
            const _7mx = await _2tx();
            await _2ux({ ..._7mx, licenseActivatedAt: _7ix.activatedAt || 0 });
            _79x({ ok: true, tabId: _7lx.id });
            return;
        }
        if (_77x.type === "startStockMonitor") {
            try {
                const _7nx = await _2lx(_77x.config || {});
                _79x({ ok: true, monitor:_7nx });
            }
            catch (_7ox) {
                const _7px = _7ox?.message || String(_7ox);
                const _7qx = ["license_required", "code_consumed", "code_revoked", "machine_mismatch", "license_server_unreachable", "invalid_activation_token"];
                _79x({ ok: false, error: _7px, message: _7qx.includes(_7px) ? _3ex(_7px) : _7px });
            }
            return;
        }
        if (_77x.type === "stopStockMonitor") {
            await _1ux();
            _79x({ ok: true });
            return;
        }
        if (_77x.type === "getStockMonitor") {
            _79x({ ok: true, monitor: await _bx() });
            return;
        }
        if (_77x.type === "testStockNotify") {
            const _7rx = { storage: "256GB", finish: "測試", storeName: "Apple Store 測試門市", quote: "通知測試" };
            try {
                const _7sx=await _1hx(_7rx, true);
                _79x({ ok: true, desktop:_7sx?.desktop||null, telegram:_7sx?.telegram||null });
            }
            catch (_7txe) {
                _79x({ ok: false, desktop:_7txe?.desktop||null, telegram:{ok:false,error:_7txe?.message||String(_7txe)}, error: _7txe?.message || String(_7txe), message: _7txe?.message || String(_7txe) });
            }
            return;
        }
        if (_77x.type === 'testProMaxStockNotify') {
            const hit={storage:'256GB',finish:'布根地紅色',storeName:'Apple ifc mall',quote:'模擬：零售店可自取'};
            let desktop={ok:false},telegram={ok:false};
            try{
                const id=`applebot-stock-sim-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
                const nid=await chrome.notifications.create(id,{type:'basic',iconUrl:'icon128.png',title:'iPhone 18 Pro Max 自取有貨（模擬）',message:`${hit.storage} / ${hit.finish}\n門市：${hit.storeName}\n【模擬測試，不會下單】`,priority:2});
                desktop={ok:true,id:nid||id};
            }catch(e){desktop={ok:false,error:e?.message||String(e)};}
            try{
                telegram=await _19x(`【模擬有貨測試｜不會下單】\n🍎 iPhone 18 Pro Max 自取有貨\n容量：${hit.storage}\n顏色：${hit.finish}\n門市：${hit.storeName}\n正式監測命中 256GB / 512GB 時會自動啟動搶機。`);
            }catch(e){telegram={ok:false,error:e?.message||String(e)};}
            _79x({ok:desktop.ok!==false&&telegram.ok!==false,desktop,telegram,hit});
            return;
        }
        if (_77x.type === 'stockMonitorClockTick') { _22x(); _79x({ok:true}); return; }
        const _7tx = await _2tx();
        const _7ux = _78x.tab?.id;
        if (_7ux && _7ux !== _7tx.tabId) {
            _79x({ ok: false, ignored: true });
            return;
        }
        if (_77x.type === "patchJob") {
            const _7vx = { ...(_77x.patch || {}) };
            if (_7tx.monitorLock && _7vx.config) {
                const _lk=_7tx.monitorLock;
                _7vx.config=__abStrictMonitorConfig({..._7tx.config,..._7vx.config,jobSource:'stock-monitor',strictTarget:true,pickupPart:_lk.pickupPart,monitorTarget:{..._lk,model:_lk.model,storage:_lk.storage,finish:_lk.finish,pickupPart:_lk.pickupPart,pickupOnly:true}});
            }
            if (_7vx.stage)
                _7vx.stageAt = Date.now();
            const _7wx = { ...(_7tx.state || {}), ...(_77x.statePatch || {}) };
            await _2wx({ ..._7vx, state: _7wx }, _77x.log || null);
            if (_7vx.active === false)
                await _4hx(_7tx.tabId);
            _79x({ ok: true });
            return;
        }
        if (_77x.type === "nativeApplePayContinue") {
            if (!_7ux)
                throw new Error("No sender tab");
            _79x(await _4px(_7ux));
            return;
        }
        if (_77x.type === "nativeClick") {
            if (!_7ux)
                throw new Error("No sender tab");
            await _4kx(_7ux, Number(_77x.x), Number(_77x.y));
            _79x({ ok: true });
            return;
        }
        if (_77x.type === "nativeFill") {
            if (!_7ux)
                throw new Error("No sender tab");
            await _4kx(_7ux, Number(_77x.x), Number(_77x.y));
            await chrome.debugger.sendCommand({ tabId:_7ux }, "Input.dispatchKeyEvent", { type: "keyDown", key: "a", code: "KeyA", windowsVirtualKeyCode: 65, modifiers: 2 });
            await chrome.debugger.sendCommand({ tabId:_7ux }, "Input.dispatchKeyEvent", { type: "keyUp", key: "a", code: "KeyA", windowsVirtualKeyCode: 65, modifiers: 2 });
            await chrome.debugger.sendCommand({ tabId:_7ux }, "Input.dispatchKeyEvent", { type: "keyDown", key: "Backspace", code: "Backspace", windowsVirtualKeyCode: 8 });
            await chrome.debugger.sendCommand({ tabId:_7ux }, "Input.dispatchKeyEvent", { type: "keyUp", key: "Backspace", code: "Backspace", windowsVirtualKeyCode: 8 });
            await chrome.debugger.sendCommand({ tabId:_7ux }, "Input.insertText", { text: String(_77x.text ?? "") });
            await chrome.debugger.sendCommand({ tabId:_7ux }, "Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
            await chrome.debugger.sendCommand({ tabId:_7ux }, "Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
            _79x({ ok: true });
            return;
        }
        if (_77x.type === 'pickupAvailabilityQuery') {
            _79x(await __abPickupAvailabilityQuery({parts:_77x.parts||[],config:_77x.config||{},location:_77x.location||'Hong Kong',force:!!_77x.force}));
            return;
        }
        if (_77x.type === "navigate") {
            if (!_7tx.tabId)
                throw new Error("No job tab");
            if (_7tx.monitorLock) {
                const _raw=String(_77x.target||''),_u=new URL(_raw.startsWith('/')?_1x+_raw:_raw);
                if (_u.pathname.includes('/shop/buy-iphone/')) {
                    const _expected=new URL(_5vx({model:'iPhone 18 Pro Max',storage:_7tx.monitorLock.storage,finish:_7tx.monitorLock.finish}));
                    if (_u.pathname!==_expected.pathname) throw new Error('Monitor 安全鎖：阻止前往非偵測 SKU 的產品頁；不會改買 iPhone 17／其他規格。');
                }
            }
            const _7xx = await _69x(_7tx, _77x.target, !!_77x.force);
            await _2wx({ url: _7xx.url }, _7xx.deduped ? null : `前往 ${new URL(_7xx.url).pathname}`);
            _79x(_7xx);
            return;
        }
        if (_77x.type === "stopJob") {
            await _4hx(_7tx.tabId);
            await _2wx({ active: false, status: "已停止", stage: "stopped" }, "使用者停止");
            _79x({ ok: true });
            return;
        }
        throw new Error("Unknown message type");
    })().catch(async (_7yx) => { const _7zx = _7yx?.message || String(_7yx); await _2wx({ status: `錯誤：${_7zx}`, stage: "error" }, `錯誤 ${_7zx}`); _79x({ ok: false, error: _7zx }); });
    return true;
});
