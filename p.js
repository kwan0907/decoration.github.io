const _0x=["model","storage","finish","quantity","fulfilment","storePriority","pickupTimeslot","paymentMethod","cardReviewAction"];const _1x=["lastName","firstName","address1","address2","email","phone"];const _2x=_3x=>document.getElementById(_3x);let _4x=false;let __monitorUiState={active:false};const _5x={'iPhone 17':{storage:["256GB","512GB"],finish:["霧藍色","薰衣草紫色","黑色","白色","鼠尾草綠色"]},'iPhone 18 Pro':{storage:["256GB","512GB","1TB","2TB"],finish:["布根地紅色","冰川色","銀色","黑色"]},'iPhone 18 Pro Max':{storage:["256GB","512GB","1TB","2TB"],finish:["布根地紅色","冰川色","銀色","黑色"]}};function _6x(_7x,_8x,_9x){_7x.innerHTML="";for(const _ax of _8x){const _bx=document.createElement("option");_bx.value=_bx.textContent=_ax;_7x.appendChild(_bx);}if(_8x.includes(_9x))_7x.value=_9x;}function _cx(_dx="",_ex=""){const _fx=_2x("model").value,_gx=_5x[_fx]||_5x["iPhone 17"];_6x(_2x("storage"),_gx.storage,_dx||_2x("storage").value);_6x(_2x("finish"),_gx.finish,_ex||_2x("finish").value);_2x("timeslotWrap").style.display=_fx.startsWith("iPhone 18")?"block":"none";}function _hx(){const _ix=_2x("pickupTimeslot");for(let _jx=8*60;_jx<=20*60+45;_jx+=15){const _kx=_jx+15,_lx=_mx=>`${String(Math.floor(_mx/60)).padStart(2,"0")}:${String(_mx%60).padStart(2,"0")}`;
    const _nx = `${_lx(_jx)}-${_lx(_kx)}`;
    const _ox = document.createElement("option");
    _ox.value = _nx;
    _ox.textContent = _nx;
    _ix.appendChild(_ox);
} }
async function _px() { const _qx = Object.fromEntries(_1x.map(_rx => [_rx, _2x(_rx).value.trim()])); await chrome.storage.local.set({ guestProfile:_qx }); return _qx; }
async function _sx() { const _tx = { mode: _2x("phoneNotify").value, telegramToken: _2x("telegramToken").value.trim(), telegramChatId: _2x("telegramChatId").value.trim() }; await chrome.storage.local.set({ monitorNotify:_tx }); return _tx; }
function _ux(_vx) { _4x = !!_vx?.active; _2x("botControls").disabled = !_4x; _2x("licenseStatus").textContent = _vx?.message || "請輸入啟動碼。"; _2x("licenseStatus").className = "licenseStatus " + (_4x ? "ok" : "bad"); if (_4x) {
    _2x("activationCode").value = "";
    _2x("activateLicense").textContent = "重新核對啟動碼";
} try{_10x(__monitorUiState||{active:false});}catch(_e){} }
async function _wx() { const _xx = await chrome.runtime.sendMessage({ type: "getLicenseStatus" }); _ux(_xx?.license || { active: false, message: _xx?.message || "無法讀取授權狀態" }); }
function _yx() { return Object.fromEntries(_0x.map(_zx => [_zx, _2x(_zx).value])); }
function _10x(_11x={}){
__monitorUiState=_11x||{active:false};
const active=!!_11x.active;
const startBtn=document.getElementById('startMonitor'),stopBtn=document.getElementById('stopMonitor');
if(startBtn)startBtn.disabled=active||!_4x;if(stopBtn)stopBtn.disabled=!active;
const r=_11x.autoBuyRules||{};
const ss=Array.isArray(r.storages)&&r.storages.length?r.storages:['256GB','512GB'];
const ff=Array.isArray(r.finishes)&&r.finishes.length?r.finishes:['黑色','銀色','冰川色','布根地紅色'];
const c=_11x.purchaseConfig||{};
const pay=c.paymentMethod==='applepay'?'Apple Pay':'信用卡／扣帳卡';
const slot=c.pickupTimeslot==='earliest'||!c.pickupTimeslot?'最早可用':c.pickupTimeslot;
const store=c.storePriority||'任何可用門市';
const last=_11x.lastCheck?new Date(_11x.lastCheck).toLocaleTimeString():'等待第一次檢查';
let result=_11x.status||'等待啟動';
if(active&&!_11x.lastCheck)result='已啟動，正在進行第一次庫存檢查';
const lines=[];
lines.push(active?'🟢 正在監測｜每約 15 秒':'⚪ 尚未開始監測');
lines.push(`檢查次數：${_11x.checks||0}　｜　最後檢查：${last}`);
lines.push(`目前結果：${result}`);
lines.push('');
lines.push(`自動購買：${ss.join(' / ')} × ${ff.join(' / ')}`);
lines.push(`購買設定：數量 ${c.quantity||1}｜${pay}｜時段 ${slot}｜門市 ${store}`);
lines.push('');
lines.push('命中後流程：通知 → 停止監測 → 自動建立任務 → 購物袋 → 自取門市／時段 → 訪客資料 → 付款');
if(_11x.lastHit)lines.push(`最近命中：${_11x.lastHit.storage} / ${_11x.lastHit.finish} / ${_11x.lastHit.storeName}`);
if(_11x.lastError)lines.push(`⚠️ 最近錯誤：${_11x.lastError}`);
const box=document.getElementById('monitorStatus');if(box){box.textContent=lines.join('\n');box.className='monstatus'+(_11x.lastError?' error':active?' active':'');}
const raw=document.getElementById('monitorRawLog');if(raw){const ls=Array.isArray(_11x.logs)?_11x.logs.slice(-12):[];raw.textContent=ls.length?ls.join('\n'):'暫無 LOG';}
}
async function _14x() { const { job: _15x = {}, guestProfile: _16x = {}, stockMonitor: _17x = {}, monitorNotify: _18x = {} } = await chrome.storage.local.get(["job", "guestProfile", "stockMonitor", "monitorNotify"]); if (_15x.config) {
    if (_15x.config.model)
        _2x("model").value = _15x.config.model;
    _cx(_15x.config.storage, _15x.config.finish);
    for (const _19x of _0x)
        if (_15x.config[_19x] != null && _2x(_19x))
            _2x(_19x).value = _15x.config[_19x];
}
else
    _cx(); for (const _1ax of _1x)
    if (_16x[_1ax] != null && document.activeElement !== _2x(_1ax))
        _2x(_1ax).value = _16x[_1ax]; if (document.activeElement !== _2x("phoneNotify"))
    _2x("phoneNotify").value = _18x.mode || "off"; if (document.activeElement !== _2x("telegramToken"))
    _2x("telegramToken").value = _18x.telegramToken || ""; if (document.activeElement !== _2x("telegramChatId"))
    _2x("telegramChatId").value = _18x.telegramChatId || ""; _10x(_17x); const _1bx = []; _1bx.push(_15x.stage ? `[${_15x.stage}]${_15x.status||"待命"}` : (_15x.status || "待命")); if (_15x.url)
    _1bx.push(`URL:${_15x.url}`); const _1cx = _15x.state || {}; _1bx.push(`Qty verified:${_1cx.confirmedQty??0}/${_15x.config?.quantity??"-"}|Add clicks:${_1cx.addClickCount??0}`); if (_1cx.selectedStore)
    _1bx.push(`Store:${_1cx.selectedStore}`); if (_1cx.timeslotSelected)
    _1bx.push(`Timeslot:${_1cx.timeslotSelected}`); if (_1cx.storeSearchCount)
    _1bx.push(`Store checks:${_1cx.storeSearchCount}`); _1bx.push(...(_15x.logs || []).slice(-16)); _2x("status").textContent = _1bx.join("\n"); }
_2x("model").addEventListener("change", () => _cx());
_2x("activateLicense").onclick = async () => { const _1dx = _2x("activationCode").value.trim(); if (!_1dx) {
    _2x("licenseStatus").textContent = "請輸入啟動碼。";
    _2x("licenseStatus").className = "licenseStatus bad";
    return;
} _2x("activateLicense").disabled = true; _2x("licenseStatus").textContent = "正在核對啟動碼及裝置…"; try {
    const _1ex = await chrome.runtime.sendMessage({ type: "activateLicense", code:_1dx });
    if (!_1ex?.ok) {
        _ux({ active: false, message: _1ex?.message || _1ex?.error || "啟動失敗" });
        return;
    }
    _ux(_1ex.license);
}
catch (_1fx) {
    _ux({ active: false, message: `啟動失敗：${_1fx?.message||_1fx}` });
}
finally {
    _2x("activateLicense").disabled = false;
} };
_2x("saveProfile").onclick = async () => { await _px(); _2x("status").textContent = "訪客資料已儲存在本機 Chrome。"; };
_2x("saveNotify").onclick = async () => { await _sx(); _2x("monitorStatus").textContent = "通知設定已儲存在本機 Chrome。"; };
_2x("testNotify").onclick = async () => { await _sx(); _2x("testNotify").disabled = true; try {
    const _1gx = await chrome.runtime.sendMessage({ type: "testStockNotify" });
    if(_1gx?.ok){const _1gxd=_1gx.desktop?.ok===false?`電腦通知：失敗（${_1gx.desktop.error||'unknown'}）`:'電腦通知：OK';const _1gxt=_1gx.telegram?.skipped?'Telegram：未啟用':(_1gx.telegram?.ok?`Telegram：OK${_1gx.telegram.telegramMessageId!=null?`（message ${_1gx.telegram.telegramMessageId}）`:''}`:`Telegram：失敗（${_1gx.telegram?.error||'unknown'}）`);_2x("monitorStatus").textContent=`${_1gxd}\n${_1gxt}`;}else{const _1gxd=_1gx?.desktop?.ok===false?`電腦通知：失敗（${_1gx.desktop.error||'unknown'}）`:'電腦通知：已嘗試';_2x("monitorStatus").textContent=`${_1gxd}\nTelegram：失敗（${_1gx?.message||_1gx?.error||_1gx?.telegram?.error||"unknown"}）`; }
}
finally {
    _2x("testNotify").disabled = false;
} };
_2x("startMonitor").onclick = async () => { if (!_4x) {
    _2x("monitorStatus").textContent = "請先驗證啟動碼。";
    return;
} await Promise.all([_px(), _sx()]); _2x("startMonitor").disabled = true; try {
    const _1hx = await chrome.runtime.sendMessage({ type: "startStockMonitor", config: _yx() });
    if (!_1hx?.ok) {
        _2x("monitorStatus").textContent = _1hx?.message || _1hx?.error || "無法開始監測";
        await _wx();
        return;
    }
    await _14x();
}
finally {
    await _14x();
} };
_2x("stopMonitor").onclick = async () => { await chrome.runtime.sendMessage({ type: "stopStockMonitor" }); await _14x(); };
_2x("start").onclick = async () => { if (!_4x) {
    _2x("status").textContent = "請先驗證啟動碼。";
    return;
} await _px(); const _1ix = _yx(); _2x("start").disabled = true; try {
    const _1jx = await chrome.runtime.sendMessage({ type: "startJob", config:_1ix });
    if (!_1jx?.ok) {
        _2x("status").textContent = _1jx?.message || _1jx?.error || "無法開始任務";
        await _wx();
        return;
    }
    await _14x();
}
finally {
    _2x("start").disabled = false;
} };
_2x("stop").onclick = async () => { await chrome.runtime.sendMessage({ type: "stopJob" }); await _14x(); };
chrome.storage.onChanged.addListener((_1kx, _1lx) => { if (_1lx === "local" && (_1kx.job || _1kx.guestProfile || _1kx.license || _1kx.stockMonitor || _1kx.monitorNotify)) {
    _14x();
    _wx();
} });
_hx();
_cx();
Promise.all([_wx(), _14x()]);

;(()=>{const b=document.getElementById('testStockHit');if(!b)return;b.onclick=async()=>{try{b.disabled=true;const save=document.getElementById('saveNotify');if(save)save.click();await new Promise(r=>setTimeout(r,120));const r=await chrome.runtime.sendMessage({type:'testProMaxStockNotify'});const out=document.getElementById('monitorStatus');if(r?.ok){const d=r.desktop?.ok===false?`電腦通知：失敗（${r.desktop.error||'unknown'}）`:'電腦通知：OK';const t=r.telegram?.skipped?'Telegram：未啟用':(r.telegram?.ok?`Telegram：OK${r.telegram.telegramMessageId!=null?`（message ${r.telegram.telegramMessageId}）`:''}`:`Telegram：失敗（${r.telegram?.error||'unknown'}）`);out.textContent=`模擬 iPhone 18 Pro Max 256GB 自取有貨\n${d}\n${t}\n此測試不會啟動購買。`;}else{out.textContent=`模擬有貨通知失敗：${r?.message||r?.error||'unknown'}`;}}catch(e){const out=document.getElementById('monitorStatus');if(out)out.textContent=`模擬有貨通知失敗：${e?.message||e}`;}finally{b.disabled=false;}};})();

;(()=>{
const $=id=>document.getElementById(id);
const capMap=[['monCap256','256GB'],['monCap512','512GB']];
const colorMap=[['monColorBlack','黑色'],['monColorSilver','銀色'],['monColorGlacier','冰川色'],['monColorBurgundy','布根地紅色']];
const ids=['monitorQuantity','monitorPaymentMethod','monitorCardReviewAction','monitorStorePriority','monitorPickupTimeslot'];
function copyTimes(){const src=$('pickupTimeslot'),dst=$('monitorPickupTimeslot');if(!src||!dst)return;dst.innerHTML='';for(const o of src.options)dst.appendChild(o.cloneNode(true));}
function read(){return {quantity:$('monitorQuantity')?.value||'1',paymentMethod:$('monitorPaymentMethod')?.value||'card',cardReviewAction:$('monitorCardReviewAction')?.value||'auto',storePriority:$('monitorStorePriority')?.value||'',pickupTimeslot:$('monitorPickupTimeslot')?.value||'earliest',autoBuyRules:{storages:capMap.filter(([id])=>$(id)?.checked).map(([,v])=>v),finishes:colorMap.filter(([id])=>$(id)?.checked).map(([,v])=>v)}};}
async function save(){const v=read();await chrome.storage.local.set({monitorPurchasePrefs:v});return v;}
async function load(){copyTimes();const x=await chrome.storage.local.get('monitorPurchasePrefs');const v=x.monitorPurchasePrefs||{};for(const id of ids)if(v[id.replace(/^monitor/,'').replace(/^./,c=>c.toLowerCase())]!=null&&$(id))$(id).value=v[id.replace(/^monitor/,'').replace(/^./,c=>c.toLowerCase())];if(v.quantity&&$('monitorQuantity'))$('monitorQuantity').value=String(v.quantity);if(v.paymentMethod&&$('monitorPaymentMethod'))$('monitorPaymentMethod').value=v.paymentMethod;if(v.cardReviewAction&&$('monitorCardReviewAction'))$('monitorCardReviewAction').value=v.cardReviewAction;if(v.storePriority!=null&&$('monitorStorePriority'))$('monitorStorePriority').value=v.storePriority;if(v.pickupTimeslot&&$('monitorPickupTimeslot'))$('monitorPickupTimeslot').value=v.pickupTimeslot;const rr=v.autoBuyRules||{};if(Array.isArray(rr.storages)&&rr.storages.length)for(const [id,val] of capMap)$(id).checked=rr.storages.includes(val);if(Array.isArray(rr.finishes)&&rr.finishes.length)for(const [id,val] of colorMap)$(id).checked=rr.finishes.includes(val);}
for(const id of [...ids,...capMap.map(x=>x[0]),...colorMap.map(x=>x[0])])$(id)?.addEventListener('change',()=>save().catch(()=>{}));
const b=$('startMonitor');if(b)b.onclick=async()=>{if(!_4x){$('monitorStatus').textContent='請先驗證啟動碼。';return;}const cfg=await save();if(!cfg.autoBuyRules.storages.length||!cfg.autoBuyRules.finishes.length){$('monitorStatus').textContent='請至少勾選一個自動搶容量及一個顏色。';return;}await Promise.all([_px(),_sx()]);b.disabled=true;try{const r=await chrome.runtime.sendMessage({type:'startStockMonitor',config:cfg});if(!r?.ok){$('monitorStatus').textContent=r?.message||r?.error||'無法開始監測';await _wx();return;}await _14x();}finally{await _14x();}};
load().catch(()=>{});
})();
