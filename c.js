(()=>{if(window.__APPLEBOT_NATIVE_UNIVERSAL_V20__)return;window.__APPLEBOT_NATIVE_UNIVERSAL_V20__=true;const _0x=_1x=>new Promise(_2x=>setTimeout(_2x,_1x));const _3x=()=>new Promise(_4x=>requestAnimationFrame(()=>_4x()));const _5x=_6x=>(_6x||"").replace(/\s+/g," ").trim().toLowerCase();const _7x=_8x=>_5x(_8x?.innerText||_8x?.textContent||"");const _9x=_ax=>!!_ax&&_ax.isConnected&&_ax.getClientRects().length>0&&getComputedStyle(_ax).display!=="none"&&getComputedStyle(_ax).visibility!=="hidden";const _bx=_cx=>_9x(_cx)&&!_cx.disabled&&_cx.getAttribute("aria-disabled")!=="true";const _dx=()=>_5x(document.body?.innerText||"");const _ex=()=>Date.now();const _fx=()=>window.__APPLEBOT_TEST_URL__||location.href;const _gx=(_hx,_ix)=>_ix.some(_jx=>_hx.includes(_5x(_jx)));const _kx={add:["加入購物袋","add to bag"],viewBag:["查看購物袋","view bag"],remove:["移除","remove"],checkout:["結帳","checkout"],guest:["以訪客身份繼續","以訪客身份結帳","訪客結帳","continue as guest","guest checkout"],findStore:["尋找零售店","找零售店","find a store","select a store","選擇零售店"],chooseStore:["選擇此零售店","選擇這間零售店","select this store","choose this store","confirm store","確認零售店"],shipping:["送貨","delivery","ship"],pickup:["自取","取貨","pickup"],unavailable:["暫時無法","沒有存貨","無貨","不可取貨","unavailable","not available","out of stock"],available:["可供取貨","可取貨","available for pickup","available today","available"],noTrade:["不換購","無需換購","不參加換購","no trade-in","without trade-in"],noCare:["不要 applecare","不加入 applecare","無需 applecare","不用 applecare","無 applecare","無 applecare+","no applecare","without applecare"],emptyBag:["你的購物袋沒有任何項目","your bag is empty"],payment:["你想如何付款","付款方式","付款選項","payment method","how would you like to pay"],review:["檢查你的訂單","檢視你的訂單","review your order","place your order","提交訂單"],queue:["排隊","queue","please wait while we","waiting room"],captcha:["captcha","verify you are human","驗證你是人類","安全驗證"]};let _lx=false,_mx=false,_nx="",_ox=0;let __abContextInvalid=false;
function __abRuntimeOk(){try{return !__abContextInvalid&&!!chrome?.runtime?.id;}catch(_){return false;}}
async function _px(_qx){
    if(!__abRuntimeOk())return {ok:false,error:"EXTENSION_CONTEXT_INVALIDATED",contextInvalidated:true};
    try{return await chrome.runtime.sendMessage(_qx);}
    catch(_e){
        const _m=String(_e?.message||_e||"");
        if(/Extension context invalidated|Receiving end does not exist|message port closed/i.test(_m)){
            __abContextInvalid=true;
            return {ok:false,error:"EXTENSION_CONTEXT_INVALIDATED",contextInvalidated:true};
        }
        throw _e;
    }
}async function _rx(){const _sx=await _px({type:"getJob"});if(!_sx?.ok)return null;const _tx=_sx.job||null;if(_tx)_tx.profile=_sx.profile||{};return _tx;}const __abStrictMonitorParts={'MJXN4ZA/A':['256GB','黑色'],'MJXP4ZA/A':['256GB','銀色'],'MJXR4ZA/A':['256GB','冰川色'],'MJXQ4ZA/A':['256GB','布根地紅色'],'MJXT4ZA/A':['512GB','黑色'],'MJXU4ZA/A':['512GB','銀色'],'MJXW4ZA/A':['512GB','冰川色'],'MJXV4ZA/A':['512GB','布根地紅色']};
function __abStrictMonitorJob(_job){const _c=_job?.config||{},_lk=_job?.monitorLock||{},_st=_job?.state||{};const _strict=String(_c.jobSource||'')==='stock-monitor'||_c.strictTarget===true||!!_c.monitorTarget||_st.monitorTargetLocked===true||!!_job?.monitorLock;if(!_strict)return {ok:true,strict:false};const _t=_c.monitorTarget||{},_p=String(_c.pickupPart||_t.pickupPart||_lk.pickupPart||'').trim().toUpperCase(),_row=__abStrictMonitorParts[_p];if(!_row)return {ok:false,reason:'Monitor 安全鎖：SKU/Part 遺失或不屬於 256/512 Pro Max，已停止。'};const _lockOk=!_job?.monitorLock||(String(_lk.model||'')==='iPhone 18 Pro Max'&&String(_lk.storage||'')===_row[0]&&String(_lk.finish||'')===_row[1]&&String(_lk.pickupPart||'').trim().toUpperCase()===_p&&_lk.pickupOnly!==false);const _ok=_c.model==='iPhone 18 Pro Max'&&_c.fulfilment==='pickup-only'&&String(_c.storage)===_row[0]&&String(_c.finish)===_row[1]&&String(_t.model||'')==='iPhone 18 Pro Max'&&String(_t.storage||'')===_row[0]&&String(_t.finish||'')===_row[1]&&String(_t.pickupPart||'').trim().toUpperCase()===_p&&_t.pickupOnly!==false&&_lockOk;return _ok?{ok:true,strict:true,part:_p,storage:_row[0],finish:_row[1],target:_t}:{ok:false,reason:'Monitor 安全鎖：偵測目標與購買任務不一致，已停止；不會改買 iPhone 17、其他規格或送貨。'};}
async function _ux(_vx={},_wx=null,_xx=null){const _yx=await _px({type:"patchJob",patch:_vx,statePatch:_wx,log:_xx});if(_yx&&!_yx.ok)throw new Error(_yx.error||"patch failed");return _yx;}async function _zx(_10x,_11x,_12x=false){const _13x=_ex();if(!_12x&&_10x===_nx&&_13x-_ox<1600)return;_nx=_10x;_ox=_13x;await _ux({status:_10x,stage:_11x,url:_fx()},null,_12x?_10x:null);}async function _14x(_15x,_16x="stopped"){await _ux({active:false,status:_15x,stage:_16x,url:_fx()},null,_15x);}async function _17x(_18x,_19x=false){const _1ax=await _px({type:"navigate",target:_18x,force:_19x});if(!_1ax?.ok)throw new Error(_1ax?.error||"Navigation failed");return _1ax;}function _1bx(_1cx="button,a,[role=\"button\"],label"){return[...document.querySelectorAll(_1cx)].filter(_9x);}function _1dx(_1ex,_1fx=document,_1gx="button,a,[role=\"button\"],label",_1hx=true){const _1ix=_1ex.map(_5x);return[..._1fx.querySelectorAll(_1gx)].find(_1jx=>(_1hx?_bx(_1jx):_9x(_1jx))&&_1ix.some(_1kx=>_7x(_1jx).includes(_1kx)))||null;}function _1lx(_1mx,_1nx=document){for(const _1ox of _1mx){const _1px=_1nx.querySelector(`[data-autom="${CSS.escape(_1ox)}"]`);if(_bx(_1px))return _1px;}return null;}async function _1qx(_1rx,_1sx,_1tx=9000){const _1ux=_ex()+_1tx;let _1vx="";while(_ex()<_1ux){let _1wx=null;try{_1wx=_1rx();}catch(_1xx){_1vx=_1xx?.message||String(_1xx);}if(!_bx(_1wx)){await _0x(55);continue;}try{_1wx.scrollIntoView({block:"center",inline:"center",behavior:"instant"});}catch(_1yx){}await _3x();try{_1wx=_1rx();}catch(_1zx){_1vx=_1zx?.message||String(_1zx);_1wx=null;}if(!_bx(_1wx)){await _0x(45);continue;}const _20x=_1wx.getBoundingClientRect();if(_20x.width<2||_20x.height<2){await _0x(45);continue;}const _21x=await _px({type:"nativeClick",x:_20x.left+_20x.width/2,y:_20x.top+_20x.height/2});if(_21x?.ok)return true;_1vx=_21x?.error||"native click failed";await _0x(80);}throw new Error(`未能按「${_1sx}」${_1vx?`：${_1vx}` : ""}`);}async function _22x(_23x,_24x,_25x,_26x=7000){const _27x=_ex()+_26x;let _28x="";while(_ex()<_27x){let _29x=null;try{_29x=_23x();}catch(_2ax){_28x=_2ax?.message||String(_2ax);}if(!_bx(_29x)){await _0x(55);continue;}try{_29x.scrollIntoView({block:"center",inline:"center",behavior:"instant"});}catch(_2bx){}await _3x();_29x=_23x();if(!_bx(_29x)){await _0x(45);continue;}const _2cx=_29x.getBoundingClientRect();if(_2cx.width<2||_2cx.height<2){await _0x(45);continue;}const _2dx=await _px({type:"nativeFill",x:_2cx.left+_2cx.width/2,y:_2cx.top+_2cx.height/2,text:String(_24x??"")});if(_2dx?.ok){await _0x(90);const _2ex=_23x();if(_2ex&&String(_2ex.value||"").trim())return true;return true;}_28x=_2dx?.error||"native fill failed";await _0x(80);}throw new Error(`未能填寫「${_25x}」${_28x?`：${_28x}` : ""}`);}function _2fx(_2gx){if(!_2gx)return "";const _2hx=[];try{for(const _2ix of(_2gx.labels||[]))_2hx.push(_2ix.innerText||_2ix.textContent||"");}catch(_2jx){}const _2kx=_2gx.closest("label");if(_2kx)_2hx.push(_2kx.innerText||_2kx.textContent||"");return _5x([_2gx.name,_2gx.id,_2gx.getAttribute("autocomplete"),_2gx.placeholder,_2gx.getAttribute("aria-label"),_2gx.getAttribute("data-autom"),..._2hx].filter(Boolean).join(" "));}const _2lx={lastName:{label:"姓氏",keys:["family-name","familyname","lastname","last-name","surname","姓氏"]},firstName:{label:"名字",keys:["given-name","givenname","firstname","first-name","名字"]},address1:{label:"街道地址",keys:["address-line1","street-address","address1","address-1","street","區域/地區/街道名稱及號碼","街道名稱及號碼","街道名稱"]},address2:{label:"大廈／樓層／單位",keys:["address-line2","address2","address-2","apartment","apt","屋苑或大廈","座數/樓層/單位","樓層/單位"]},email:{label:"電子郵件",keys:["email","e-mail","電子郵件"]},phone:{label:"手機電話號碼",keys:["tel","telephone","phone","mobile","手機電話號碼","電話號碼"]}};function _2mx(){return[...document.querySelectorAll("input:not([type=\"hidden\"]):not([type=\"password\"]):not([type=\"search\"]),textarea,select")].filter(_2nx=>_9x(_2nx)&&!_2nx.disabled);}function _2ox(_2px){const _2qx=_2lx[_2px],_2rx=(_2qx?.keys||[]).map(_5x),_2sx=_2mx();let _2tx=null,_2ux=0;for(const _2vx of _2sx){const _2wx=_2fx(_2vx);let _2xx=0;for(const _2yx of _2rx)if(_2wx.includes(_2yx))_2xx+=_2yx.length+10;if(_2px==="email"&&_2vx.type==="email")_2xx+=30;if(_2px==="phone"&&_2vx.type==="tel")_2xx+=30;if(_2xx>_2ux){_2tx=_2vx;_2ux=_2xx;}}return _2ux>0?_2tx:null;}function _2zx(_30x,_31x=true){const _32x=["lastName","firstName","email","phone",...(_31x?["address1"]:[])];return _32x.filter(_33x=>!String(_30x?.[_33x]||"").trim());}function _34x(){const _35x=_fx().toLowerCase(),_36x=_dx();if(_35x.includes("_s=shipping-init"))return true;if(_35x.includes('_s=billing-init')||_35x.includes('_s=review')||_35x.includes('_s=fulfillment-init'))return false;return _gx(_36x,["我們應將你訂購的產品送到哪裡","where should we send"]);}function _37x(){const _38x=_fx().toLowerCase(),_39x=_dx();if(_38x.includes("_s=pickupcontact-init")||_38x.includes("pickupcontact")||_38x.includes("pickup-contact"))return true;if(_38x.includes('_s=billing-init')||_38x.includes('_s=review')||_38x.includes('_s=fulfillment-init'))return false;return _gx(_39x,["現在，請提供你的取貨資訊","輸入你的聯絡資料","誰會取貨","pickup contact","who will pick up"]);}async function _3ax(_3bx){const _3cx=_3bx.profile||{},_3dx=_34x(),_3ex=_37x();if(!_3dx&&!_3ex)return false;const _3fx=_2zx(_3cx,_3dx);if(_3fx.length){await _zx(`請先在 Extension 填寫訪客資料：${_3fx.map(_3gx=>_2lx[_3gx].label).join("、")}`, "guest-profile");
        return true;
    } const _3hx = _3dx ? ["lastName", "firstName", "address1", "address2", "email", "phone"] : ["lastName", "firstName", "email", "phone"]; let _3ix = 0; for (const _3jx of _3hx) {
        const _3kx = String(_3cx[_3jx] || "").trim();
        if (!_3kx)
            continue;
        const _3lx = _2ox(_3jx);
        if (!_3lx)
            continue;
        if (String(_3lx.value || "").trim() === _3kx) {
            _3ix++;
            continue;
        }
        await _zx(`自動填寫：${_2lx[_3jx].label}`, "guest-profile");
        await _22x(() => _2ox(_3jx), _3kx, _2lx[_3jx].label, 7000);
        _3ix++;
        await _0x(80);
    } await _ux({}, { guestProfileFilledAt: _ex() }, `訪客資料已填寫 ${_3ix}個欄位`); await _0x(250); return true; }
    async function _3mx(_3nx, _3ox, _3px, _3qx = 8000, _3rx = 2400) { const _3sx = await _rx(); const _3tx = _3sx?.state || {}; if (_3tx.lastAction === _3nx && _ex() - Number(_3tx.lastActionAt || 0) < _3rx)
        return false; await _ux({}, { lastAction: _3nx, lastActionAt: _ex() }, `動作 ${_3nx}`); try {
        await _1qx(_3ox, _3px, _3qx);
        return true;
    }
    catch (_3ux) {
        await _ux({}, { lastAction: "", lastActionAt: 0 }, `動作 ${_3nx}未送達`);
        throw _3ux;
    } }
    async function __abNavClick(_key, _finder, _label, _timeout = 9000, _hold = 10000) {
        const _j = await _rx(), _st = _j?.state || {}, _url = _fx(), _now = _ex();
        const _same = _st.navPendingKey === _key && _st.navPendingUrl === _url;
        const _tries = _same ? Number(_st.navPendingAttempts || 1) : 0;
        if (_same) {
            const _age = _now - Number(_st.navPendingAt || 0);
            if (_age < _hold) {
                await _zx(`已按「${_label}」；等待 Apple 載入下一頁（不重複點擊）`, "checkout");
                return false;
            }
            if (_tries >= 2) {
                await _14x(`已兩次按「${_label}」但 Apple 頁面仍未轉換；已停止避免重複點擊／404。`, "checkout");
                return false;
            }
            await _ux({}, null, `「${_label}」${Math.round(_hold/1000)}秒未轉頁；允許一次受控重試`);
        }
        await _ux({}, { navPendingKey:_key, navPendingUrl:_url, navPendingAt:_now, navPendingAttempts:_tries+1 }, `導航動作 ${_key}`);
        try {
            await _1qx(_finder, _label, _timeout);
            return true;
        } catch (_e) {
            await _ux({}, { navPendingKey:'', navPendingUrl:'', navPendingAt:0, navPendingAttempts:0 }, `導航動作 ${_key}未送達`);
            throw _e;
        }
    }
    function _3vx(_3wx, _3xx) { const _3yx = _3wx instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype; const _3zx = Object.getOwnPropertyDescriptor(_3yx, "value")?.set; if (_3zx)
        _3zx.call(_3wx, _3xx);
    else
        _3wx.value = _3xx; _3wx.dispatchEvent(new Event("input", { bubbles: true })); _3wx.dispatchEvent(new Event("change", { bubbles: true })); }
    function _40x() { const _41x = _dx(); return _gx(_41x, ["多謝你的訂單", "感謝你的訂購", "訂單已經成立", "訂單已確認", "thank you for your order", "your order is confirmed"]); }
    function _42x() { const _43x = _fx().toLowerCase(); return _43x.includes("/shop/checkout") || (/(^|\.)store\.apple\.com$/i.test(location.hostname) && _43x.includes("_s=")); }
    function _44x() { const _45x = _fx().toLowerCase(), _46x = _dx(); if (!_42x() || _34x() || _37x())
        return false; const _47x = _gx(_46x, ["你想如何付款", "信用卡或扣帳卡", "apple pay", "請選擇付款方式", "payment method", "how would you like to pay", "credit or debit card"]); const _48x = [...document.querySelectorAll("button,a,[role=\"button\"]")].some(_49x => _9x(_49x) && _gx(_7x(_49x), ["檢查你的訂單", "檢視你的訂單", "review your order"])); return _45x.includes("_s=billing-init") || _45x.includes("_s=payment") || _45x.includes("payment-method") || /\/payment(?:[/?#]|$)/.test(_45x) || _47x || _48x; }
    function _4ax(_4bx) { return _5x(String(_4bx || "").replace(//g, " apple ")); }
    function _4cx(_4dx) { if (!_4dx)
        return ""; return _4ax([_4dx.innerText, _4dx.textContent, _4dx.value, _4dx.getAttribute?.("aria-label"), _4dx.getAttribute?.("data-autom"), _4dx.getAttribute?.("name"), _4dx.id, _4dx.className].filter(Boolean).join(" ")); }
    function _4ex(_4fx) { if (!_4fx)
        return null; if (_4fx.matches?.("input[type=\"radio\"]")) {
        if (_4fx.id) {
            const _4gx = document.querySelector(`label[for="${CSS.escape(_4fx.id)}"]`);
            if (_bx(_4gx))
                return _4gx;
        }
        const _4hx = _4fx.closest("label");
        if (_bx(_4hx))
            return _4hx;
    } return _bx(_4fx) ? _4fx : null; }
    function _4ix(_4jx) { const _4kx = _4jx === "applepay" ? ["apple pay", "applepay"] : ["信用卡或扣帳卡", "信用卡", "credit or debit card", "credit card", "debit card"]; for (const _4lx of [...document.querySelectorAll("input[type=\"radio\"]")]) {
        if (!_9x(_4lx))
            continue;
        const _4mx = _4cx(_4lx) + " " + _4cx(_4lx.closest("label"));
        if (_gx(_4mx, _4kx))
            return _4ex(_4lx);
    } const _4nx = "label,[role=\"radio\"],button,[data-autom],apple-pay-button"; const _4ox = [...document.querySelectorAll(_4nx)].filter(_bx); return _4ox.find(_4px => _gx(_4cx(_4px), _4kx)) || null; }
    function _4qx() { return _1dx(["檢查你的訂單", "檢視你的訂單", "review your order"], document, "button,a,[role=\"button\"],input[type=\"submit\"],input[type=\"button\"]"); }
    function _4rx() { const _4sx = "button,a,[role=\"button\"],input[type=\"submit\"],input[type=\"button\"],apple-pay-button,[data-autom*=\"apple\" i],[class*=\"apple-pay\" i],[id*=\"apple-pay\" i]"; const _4tx = [...document.querySelectorAll(_4sx)].filter(_bx); const _4ux = _4tx.find(_4vx => { const _4wx = _4cx(_4vx); return _gx(_4wx, ["apple pay", "applepay"]) && _gx(_4wx, ["繼續", "continue", "使用", "pay"]); }); if (_4ux)
        return _4ux; const _4xx = _4tx.find(_4yx => { const _4zx = String(_4yx.innerText || _4yx.textContent || _4yx.value || ""); return /(?:使用|continue(?:\s+with)?)\s*(?:\s*pay|apple\s*pay)|(?:\s*pay|apple\s*pay).*?(?:繼續|continue)/i.test(_4zx); }); if (_4xx)
        return _4xx; const _50x = _4ax(document.body?.innerText || ""); if (_50x.includes("apple pay"))
        return _4tx.find(_51x => _gx(_4cx(_51x), ["繼續", "continue"]) && !_gx(_4cx(_51x), ["更改", "change", "提交訂單", "place order"])) || null; return null; }
    function _52x() { return _1dx(["立即提交訂單", "提交訂單", "place order", "place your order"], document, "button,a,[role=\"button\"],input[type=\"submit\"],input[type=\"button\"]"); }
    function _53x(_54x){const _55x=_54x.config||{},_56x=_dx(),_57x=Number(_55x.quantity||1),_58x=Number(_54x.state?.confirmedQty||0),_59x=[_55x.model,_55x.storage,_55x.finish].map(_5x).filter(Boolean);if(!_59x.every(_5ax=>_56x.includes(_5ax))||_58x!==_57x)return false;const _guard=__abStrictMonitorJob(_54x);if(!_guard.ok)return false;if(_guard.strict){const _st=_54x.state||{};return String(_st.bagValidatedFulfilment||'')==='pickup-only'&&!!String(_st.bagValidatedStore||'').trim();}return true;}
function _5bx(_5cx) { return ["lastName", "firstName", "address1"].filter(_5dx => !String(_5cx?.[_5dx] || "").trim()); }
    function _5ex() { return _gx(_dx(), ["帳單地址", "billing address"]) && !!(_2ox("lastName") && _2ox("firstName") && _2ox("address1")); }
    async function _5fx(_5gx = 12000) { const _5hx = _ex() + _5gx; while (_ex() < _5hx) {
        if (_5ex())
            return true;
        await _zx("信用卡已選；等待 Apple 載入帳單地址欄位", "billing");
        await _0x(90);
    } return false; }
    async function _5ix(_5jx) { const _5kx = _5jx.profile || {}, _5lx = _5bx(_5kx); if (_5lx.length) {
        await _zx(`請先在 Extension 填寫帳單地址資料：${_5lx.map(_5mx=>_2lx[_5mx].label).join("、")}`, "billing");
        return false;
    } if (!await _5fx(12000)) {
        await _zx("信用卡已選；帳單地址仍在載入，Bot 會繼續等待", "billing");
        return false;
    } const _5nx = ["lastName", "firstName", "address1", "address2"]; let _5ox = 0; for (const _5px of _5nx) {
        const _5qx = String(_5kx[_5px] || "").trim();
        if (!_5qx)
            continue;
        const _5rx = _2ox(_5px);
        if (!_5rx) {
            if (_5px !== "address2")
                return false;
            continue;
        }
        if (String(_5rx.value || "").trim() === _5qx) {
            _5ox++;
            continue;
        }
        await _zx(`自動填寫帳單地址：${_2lx[_5px].label}`, "billing");
        await _22x(() => _2ox(_5px), _5qx, _2lx[_5px].label, 9000);
        _5ox++;
        await _0x(90);
    } await _ux({}, { billingProfileFilledAt: _ex() }, `帳單地址已填寫 ${_5ox}個欄位`); return true; }
    async function _5sx(_5tx) {
        const _5ux = (_5tx.config?.paymentMethod || "card").toLowerCase();
        const __pst=_5tx.state||{};
        if(__pst.reviewOrderClicked){
            const __age=_ex()-Number(__pst.reviewOrderClickedAt||0),__tries=Number(__pst.reviewClickAttempts||1);
            if(__age<10000){await _zx('已按「檢查你的訂單」；等待 Apple 進入 Review 頁（不重複點擊）',"payment");return;}
            if(__tries>=2){await _14x('已按「檢查你的訂單」但頁面仍未前進；已停止避免重複提交。',"payment");return;}
            await _ux({}, {reviewOrderClicked:false,reviewOrderClickedAt:0}, 'Review 頁 10 秒內未開啟；允許一次受控重試');
        }
        if (_5ux === "applepay") {
            const _5vx = _5tx.state || {};
            if (!_5vx.paymentMethodSelected) {
                await _zx("選擇 Apple Pay", "payment");
                await _3mx("payment-applepay", () => _4ix("applepay"), "Apple Pay", 8000, 2400);
                await _ux({}, { paymentMethodSelected: "applepay" }, "付款方式：Apple Pay");
                await _0x(260);
            }
            const _5wx = _4qx();
            if (_bx(_5wx)) {
                await _zx("Apple Pay 已選；自動按「檢查你的訂單」", "payment", true);
                await _3mx("payment-review-applepay", _4qx, "檢查你的訂單", 9000, 5000);
                await _ux({ status: "已按「檢查你的訂單」；等待 Apple Review 頁面的「使用 Apple Pay 繼續」", stage: "review-transition", url: _fx() }, { reviewOrderClicked: true, reviewOrderClickedAt:_ex(), reviewClickAttempts:Number((_5tx.state||{}).reviewClickAttempts||0)+1 }, "Apple Pay → Review");
                return;
            }
            await _zx("Apple Pay 已選；等待 Apple 啟用「檢查你的訂單」", "payment");
            return;
        }
        const _5xx = _5tx.state || {};
        if (!_5xx.paymentMethodSelected) {
            await _zx("選擇信用卡／扣帳卡", "payment");
            await _3mx("payment-card", () => _4ix("card"), "信用卡／扣帳卡", 8000, 2400);
            await _ux({}, { paymentMethodSelected: "card" }, "付款方式：信用卡／扣帳卡");
            await _0x(120);
        }
        const _5yx = await _5ix(_5tx);
        if (!_5yx)
            return;
        await _zx("帳單地址已填寫；正在自動填寫信用卡資料", "payment-card-auto");
        const { ccProfile = {} } = await chrome.storage.local.get("ccProfile");
        if (!ccProfile.ccNumber || !ccProfile.ccExp || !ccProfile.ccCvv) {
            await _zx("請先在 Extension 儲存完整信用卡號碼／到期日／CVV", "payment-card-missing");
            return;
        }
        const _ccFind = (_keys) => {
            const _all = [...document.querySelectorAll('input:not([type="hidden"])')];
            for (const _el of _all) {
                const _meta = [
                    _el.id,
                    _el.name,
                    _el.getAttribute("autocomplete"),
                    _el.getAttribute("aria-label"),
                    _el.placeholder,
                    _el.getAttribute("data-autom")
                ].filter(Boolean).join(" ").toLowerCase();
                if (_keys.some(_k => _meta.includes(_k)))
                    return _el;
            }
            return null;
        };
        const numInput = _ccFind(["cardnumber", "card-number", "cc-number", "creditcardnumber", "accountnumber"]);
        const expInput = _ccFind(["expiration", "expiry", "exp-date", "cc-exp", "expirydate", "expirationdate"]);
        const cvvInput = _ccFind(["securitycode", "security-code", "cvv", "cvc", "cc-csc", "verification"]);
        if (!numInput || !expInput || !cvvInput) {
            await _zx("信用卡欄位仍在載入；Bot 會繼續等待", "payment-card-auto");
            return;
        }
        await _22x(() => numInput, ccProfile.ccNumber, "信用卡號碼", 5000);
        await _0x(100);
        await _22x(() => expInput, ccProfile.ccExp, "到期日", 3000);
        await _0x(100);
        await _22x(() => cvvInput, ccProfile.ccCvv, "安全碼", 3000);
        await _ux({}, { cardFilled: true, cardFilledAt: _ex() }, "信用卡資料已自動填寫");
        await _zx("信用卡資料已自動填寫；等待「檢查你的訂單」", "payment-card-filled");
    }
    async function _5zx(_60x) {
        const _61x = (_60x.config?.paymentMethod || "card").toLowerCase();
        if (_61x === "applepay") {
            const _62x = _60x.state || {};
            if (_62x.applePayContinueSent) {
                await _zx("已送出 Apple Pay Continue；等待系統付款介面", "applepay-confirm");
                return;
            }
            const _63x = _4rx();
            if (_bx(_63x)) {
                await _zx("Review 頁已準備好；自動按「使用 Apple Pay 繼續」", "review", true);
                await _ux({}, { applePayContinueSent: true }, "Apple Pay Continue 已鎖定");
                await _1qx(_4rx, "使用 Apple Pay 繼續", 12000);
                await _14x("已按「使用 Apple Pay 繼續」；請你在 Apple Pay 系統視窗完成最後付款確認", "applepay-confirm");
                return;
            }
            const _64x = await _px({ type: "nativeApplePayContinue" });
            if (_64x?.ok && _64x.clicked) {
                await _ux({}, { applePayContinueSent: true }, `Apple Pay Continue via ${_64x.source||"deep"}`);
                await _14x("已按「使用 Apple Pay 繼續」；請你在 Apple Pay 系統視窗完成最後付款確認", "applepay-confirm");
                return;
            }
            await _zx("等待 Apple 顯示「使用 Apple Pay 繼續／使用 Pay 繼續」按鈕", "review");
            return;
        }
        const _65x = (_60x.config?.cardReviewAction || "manual").toLowerCase();
        if (_65x !== "auto") {
            await _14x("已到最終確認階段；請你核對後手動提交訂單", "review");
            return;
        }
        const _66x = _60x.state || {};
        if (_66x.finalSubmitSent) {
            await _zx("已按「立即提交訂單」；等待 Apple 確認訂單", "order-submitting");
            return;
        }
        if (!_53x(_60x)) {
            await _14x("Review 頁訂單資料未通過自動核對；為避免落錯單，已停止自動提交", "review-verify-failed");
            return;
        }
        const _67x = _52x();
        if (!_bx(_67x)) {
            await _zx("Review 訂單資料已核對；等待「立即提交訂單」按鈕可用", "review");
            return;
        }
        await _ux({ status: "Review 資料已核對；正在提交訂單", stage: "order-submitting", url: _fx() }, { finalSubmitSent: true, finalSubmitAt: _ex() }, "信用卡 Review → 最終提交已鎖定");
        try {
            await _1qx(_52x, "立即提交訂單", 10000);
        }
        catch (_68x) {
            await _ux({}, { finalSubmitSent: false, finalSubmitAt: 0 }, "最終提交 click 未送達，解除鎖");
            throw _68x;
        }
        await _zx("已按「立即提交訂單」；等待 Apple 訂單確認", "order-submitting", true);
    }
    function _69x() { const _6ax = _fx().toLowerCase(), _6bx = _dx(), _6cx = _42x(); if (_gx(_6bx, _kx.captcha))
        return "manual-security"; if (_gx(_6bx, _kx.queue) && !_6ax.includes("/shop/bag"))
        return "manual-queue"; if (_34x() || _37x())
        return "checkout"; if (_6cx && _6ax.includes("review"))
        return "review"; if (_44x())
        return "payment"; if (_6cx && _gx(_6bx, _kx.review))
        return "review"; if (_6bx.includes("the page you're looking for can't be found") || _6bx.includes("page not found") || _6bx.includes("找不到頁面"))
        return "pnf"; if (_6ax.includes("/shop/bag") || document.querySelector("[data-autom=\"bag-item-remove-button\"],select[data-autom=\"item-quantity-dropdown\"]"))
        return "bag"; if (_6ax.includes("step=attach") || (_gx(_6bx, _kx.viewBag) && _6bx.includes("iphone")))
        return "attach"; if (_6cx || _6ax.includes("_s=") || _gx(_6bx, _kx.guest))
        return "checkout"; if (_6ax.includes("/shop/buy-iphone/iphone-17") || _6ax.includes("/shop/buy-iphone/iphone-18-pro"))
        return "product"; return "unknown"; }
    const _6dx = {
        'iPhone 17': { path: "iphone-17", screen: "6.3", family: "17" },
        'iPhone 18 Pro': { path: "iphone-18-pro", screen: "6.3", family: "18pro" },
        'iPhone 18 Pro Max': { path: "iphone-18-pro", screen: "6.9", family: "18pro" }
    };
    function _6ex(_6fx) { const _m=_6dx[_6fx?.model]; if(!_m) throw new Error("未知或遺失 iPhone 型號；安全停止，絕不預設 iPhone 17。"); return _m; }
function _6gx(_6hx) { return [_6hx.model, _6hx.storage, _6hx.finish].map(_5x).filter(Boolean); }
    const _6ix = {
        model: { 'iPhone 17': null, 'iPhone 18 Pro': null, 'iPhone 18 Pro Max': null },
        finish: { '霧藍色': "dimensionColormistblue", '薰衣草紫色': "dimensionColorlavender", '黑色': "dimensionColorblack", '白色': "dimensionColorwhite", '鼠尾草綠色': "dimensionColorsage", '布根地紅色': "dimensionColorburgundy", '冰川色': "dimensionColorglacier", '銀色': "dimensionColorsilver" },
        storage: { '256GB': "dimensionCapacity256gb", '512GB': "dimensionCapacity512gb", '1TB': "dimensionCapacity1tb", '2TB': "dimensionCapacity2tb" }
    };
    function _6jx(_6kx) { return _6kx ? document.querySelector(`input[data-autom="${CSS.escape(_6kx)}"]`) : null; }
    function _6lx(_6mx) { const _6nx = _6jx(_6mx); if (!_6nx)
        return null; if (_6nx.id) {
        const _6ox = document.querySelector(`label[for="${CSS.escape(_6nx.id)}"]`);
        if (_bx(_6ox))
            return _6ox;
    } return _bx(_6nx) ? _6nx : null; }
    function _6px(_6qx) { try {
        const _6rx = decodeURIComponent(new URL(_fx()).pathname).toLowerCase(), _6sx = _6ex(_6qx);
        if (_6rx.includes(`/${_6sx.path}/`) && _6rx.includes(`${_6sx.screen}-`) && _6rx.includes(String(_6qx.storage).toLowerCase()) && _6rx.includes(String(_6qx.finish).toLowerCase()))
            return true;
    }
    catch (_6tx) { } const _6ux = [_6ix.model[_6qx.model], _6ix.finish[_6qx.finish], _6ix.storage[_6qx.storage]].filter(Boolean); const _6vx = _6ux.map(_6jx).filter(Boolean); if (_6ux.length && _6vx.length === _6ux.length && _6vx.every(_6wx => _6wx.checked))
        return true; const _6xx = _dx(); return _6gx(_6qx).every(_6yx => _6xx.includes(_6yx)); }
    async function _6zx(_70x, _71x, _72x = false) { let _73x = _6jx(_70x); if (!_73x) {
        const _74x = _ex() + (_72x ? 5000 : 3000);
        while (_ex() < _74x && !(_73x = _6jx(_70x)))
            await _0x(45);
    } if (!_73x)
        return false; if (_73x.checked)
        return true; await _1qx(() => _6lx(_70x), _71x, 6000); const _75x = _ex() + 5000; while (_ex() < _75x) {
        if (_6jx(_70x)?.checked)
            return true;
        await _0x(70);
    } throw new Error(`未能確認「${_71x}」`); }
    function _76x() { return _1lx(["add-to-cart", "add-to-cart-button", "add-to-bag", "add-to-bag-button"]) || _1dx(_kx.add); }
    async function _77x(_78x, _79x) { const _7ax = _1dx(_78x, document, "button,label,[role=\"button\"]"); if (!_7ax)
        return false; const _7bx = _7ax.tagName === "LABEL" && _7ax.htmlFor ? document.getElementById(_7ax.htmlFor) : null; if (_7bx?.checked)
        return true; await _1qx(() => _1dx(_78x, document, "button,label,[role=\"button\"]"), _79x, 3000); await _0x(160); return true; }
    function _7cx(_7dx) { const _7ex = _6ex(_7dx), _7fx = `${_7ex.screen}-吋顯示器-${String(_7dx.storage).toLowerCase()}-${_7dx.finish}`; return `/hk-zh/shop/buy-iphone/${_7ex.path}/${encodeURIComponent(_7fx)}`; }
    async function _7gx(_7hx) {
        const _7ix = _7hx.config || {}, _7jx = _7hx.state || {}, _7kx = Number(_7ix.quantity || 1);
        if (!_7jx.preflightDone) {
            await _zx("尚未完成購物袋預檢；返回購物袋", "product");
            await _17x("/hk-zh/shop/bag");
            return;
        }
        if (Number(_7jx.confirmedQty || 0) >= _7kx) {
            await _17x("/hk-zh/shop/bag");
            return;
        }
        if (_7jx.addInFlight) {
            if (_ex() - Number(_7jx.addSentAt || 0) > 1800) {
                await _zx("Add 已送出；前往購物袋驗證實際數量", "product", true);
                await _17x("/hk-zh/shop/bag");
            }
            return;
        }
        for (const [_7lx, _7mx] of [[_6ix.model[_7ix.model], _7ix.model], [_6ix.finish[_7ix.finish], _7ix.finish], [_6ix.storage[_7ix.storage], _7ix.storage]]) {
            const _7nx = _6jx(_7lx);
            if (_7nx && !_7nx.checked)
                await _6zx(_7lx, _7mx, true);
        }
        if (!_6px(_7ix)) {
            await _zx("等待指定型號／容量／顏色真正選中", "product");
            return;
        }
        if (_6jx("choose-noTradeIn"))
            await _6zx("choose-noTradeIn", "不換購");
        else if (!_bx(_76x()))
            await _77x(_kx.noTrade, "不換購");
        let _7ox = false;
        try {
            _7ox = await _6zx("noapplecare", "無 AppleCare+", false);
        }
        catch (_7px) {
            _7ox = false;
        }
        if (!_7ox && !_bx(_76x()))
            _7ox = await _77x(_kx.noCare, "無 AppleCare+");
        if (!_7ox && !_bx(_76x())) {
            await _zx("不換購已選定；等待 AppleCare 區塊完成重畫", "product");
            return;
        }
        if (!_bx(_76x())) {
            await _zx("全部設定已確認；等待「加入購物袋」可用", "product");
            return;
        }
        const _7qx = Number(_7jx.confirmedQty || 0);
        await _ux({ status: `正在加入第 ${_7qx+1}部（目標 ${_7kx}）`, stage: "product", url: _fx() }, { addInFlight: true, addSentAt: _ex(), addClickCount: Number(_7jx.addClickCount || 0) + 1 }, `Add #${_7qx+1}已鎖定`);
        try {
            await _1qx(_76x, `加入第 ${_7qx+1}部`, 8000);
        }
        catch (_7rx) {
            await _ux({ status: `Add 原生點擊失敗：${_7rx?.message||_7rx}`, stage: "product" }, { addInFlight: false, addSentAt: 0 }, "Add click 未送達，解除鎖");
            throw _7rx;
        }
    }
    async function _7sx(_7tx) { await _ux({ status: "Add 已被 Apple 接收；前往購物袋驗證數量", stage: "attach", url: _fx() }, null, "偵測到 step=attach / 配件頁"); await _17x("/hk-zh/shop/bag"); }
    function _7ux() { return [...document.querySelectorAll("select[data-autom=\"item-quantity-dropdown\"],select[name*=\"quantity\" i]")].filter(_7vx => _9x(_7vx) && !_7vx.closest("[aria-hidden=\"true\"],[hidden]")); }
    function _7wx(_7xx, _7yx) { const _7zx=String(_7xx||""); if(_7yx?.model==="iPhone 18 Pro Max")return /iphone\s*18\s*pro\s*max/i.test(_7zx); if(_7yx?.model==="iPhone 18 Pro")return /iphone\s*18\s*pro(?!\s*max)/i.test(_7zx); if(_7yx?.model==="iPhone 17")return /iphone\s*17(?!e)(?:\s|$)/i.test(_7zx); return false; }
function _80x(_81x) { const _82x = String(_81x || ""); return /iphone\s*17(?!e)(?:\s|$)/i.test(_82x) || /iphone\s*18\s*pro(?:\s*max)?/i.test(_82x); }
    function _83x(_84x = document, _85x = null) { return [..._84x.querySelectorAll(".rs-iteminfo-title,[data-autom=\"bag-item-name\"],[data-autom*=\"item-title\"],h2,h3")].filter(_86x => _9x(_86x) && _80x(_7x(_86x))); }
    function _87x(_88x, _89x) { let _8ax = _88x; for (let _8bx = 0; _8bx < 14 && _8ax; _8bx++, _8ax = _8ax.parentElement) {
        const _8cx = _7x(_8ax);
        if (_80x(_8cx))
            return _8ax;
        if (_8ax === document.body)
            break;
    } return null; }
    function _8dx(_8ex) { let _8fx = _8ex; for (let _8gx = 0; _8gx < 12 && _8fx; _8gx++, _8fx = _8fx.parentElement) {
        if (!_9x(_8fx))
            continue;
        if (_8fx.matches?.("[data-autom*=\"bag-item\"],li,article")) {
            if (_8fx.querySelector?.("[data-autom=\"bag-item-remove-button\"],select[data-autom=\"item-quantity-dropdown\"]") || _1dx([..._kx.findStore, ..._kx.remove], _8fx, "button,a,[role=\"button\"]", false))
                return _8fx;
        }
        if ([..._8fx.querySelectorAll?.("select[data-autom=\"item-quantity-dropdown\"],select[name*=\"quantity\" i]") || []].some(_9x))
            return _8fx;
    } return _8ex.closest("li,article,div") || _8ex.parentElement; }
    function _8hx(_8ix, _8jx = null) { const _8kx = _8jx || [..._8ix.querySelectorAll("select[data-autom=\"item-quantity-dropdown\"],select[name*=\"quantity\" i]")].find(_9x); const _8lx = Number(_8kx?.value); if (Number.isFinite(_8lx) && _8lx > 0)
        return _8lx; const _8mx = [..._8ix.querySelectorAll("[data-autom*=\"quantity\" i]")].find(_9x); const _8nx = _7x(_8mx); let _8ox = _8nx.match(/(?:數量|quantity)\s*[:：]?\s*(\d+)/i); if (!_8ox)
        _8ox = _7x(_8ix).match(/(?:數量|quantity)\s*[:：]?\s*(\d+)/i); const _8px = Number(_8ox?.[1] || 1); return Number.isFinite(_8px) && _8px > 0 ? _8px : 1; }
    function _8qx(_8rx) { const _8sx = new Set(), _8tx = []; for (const _8ux of _7ux()) {
        const _8vx = _87x(_8ux, _8rx);
        if (!_8vx || _8sx.has(_8vx))
            continue;
        const _8wx = _5x(_8vx.innerText || _8vx.textContent);
        if (!_80x(_8wx))
            continue;
        _8sx.add(_8vx);
        const _8xx = _83x(_8vx, _8rx)[0] || null;
        _8tx.push({ container:_8vx, title:_8xx, full:_8wx, qty: _8hx(_8vx, _8ux) });
    } if (_8tx.length)
        return _8tx; for (const _8yx of _83x(document, _8rx)) {
        const _8zx = _8dx(_8yx);
        if (!_8zx || !_9x(_8zx) || _8sx.has(_8zx))
            continue;
        _8sx.add(_8zx);
        const _90x = _5x(_8zx.innerText || _8zx.textContent);
        _8tx.push({ container:_8zx, title:_8yx, full:_90x, qty: _8hx(_8zx) });
    } return _8tx; }
    function _91x(_92x, _93x) { return _7wx(_92x.full, _93x) && [_93x.storage, _93x.finish].map(_5x).filter(Boolean).every(_94x => _92x.full.includes(_94x)); }
    function _95x(_96x, _97x) { return _80x(_96x.full); }
    function _98x(_99x) { return _8qx(_99x).filter(_9ax => _91x(_9ax, _99x)); }
    function _9bx(_9cx) { return _8qx(_9cx).filter(_9dx => _95x(_9dx, _9cx) && !_91x(_9dx, _9cx)); }
    function _9ex(_9fx) { return _98x(_9fx).reduce((_9gx, _9hx) => _9gx + _9hx.qty, 0); }
    function _9ix() { return _1lx(["checkout", "checkout-button", "proceed-to-checkout"]) || _1dx(_kx.checkout); }
    function _9jx(_9kx, _9lx = 0) { const _9mx = _1dx(_kx.findStore, _9kx.container, "button,a,[role=\"button\"]"); if (_9mx)
        return _9mx; const _9nx = _kx.findStore.map(_5x), _9ox = [...document.querySelectorAll("button,a,[role=\"button\"]")].filter(_9px => _bx(_9px) && _9nx.some(_9qx => _7x(_9px).includes(_9qx))); return _9ox[_9lx] || _9ox[0] || null; }
    function _9rx() { const _9sx = [...document.querySelectorAll("[role=\"dialog\"],.as-l-container,.rs-pickup-options")].filter(_9x); return _9sx.find(_9tx => _gx(_7x(_9tx), [..._kx.findStore, ..._kx.pickup, "零售店", "store"])) || null; }
    function _9ux(_9vx) { return _9vx?.querySelector("input[type=\"search\"],input[placeholder*=\"位置\"],input[placeholder*=\"location\" i],input[aria-label*=\"位置\"],input[aria-label*=\"location\" i]") || null; }
    function _9wx(_9xx) { return _1dx(["搜尋", "search", '顯示更多零售店', '更多零售店', '查看其他零售店', '其他零售店', 'show more stores', 'more stores', 'other stores'], _9xx || document, "button,a,[role=\"button\"]"); }
    function _9yx(_9zx) { if (!_9zx)
        return []; const _a0x = [], _a1x = new Set(); for (const _a2x of _9zx.querySelectorAll("input[type=\"radio\"]")) {
        const _a3x = _a2x.closest("label,li,[role=\"radio\"],div") || _a2x.parentElement;
        if (!_a3x || _a1x.has(_a3x))
            continue;
        _a1x.add(_a3x);
        const _a4x = _7x(_a3x), _a5x = _a2x.disabled || _a2x.getAttribute("aria-disabled") === "true" || _gx(_a4x, _kx.unavailable);
        _a0x.push({ radio:_a2x, card:_a3x, tx:_a4x, available: !_a5x && _bx(_a3x) });
    } if (!_a0x.length) {
        for (const _a6x of [..._9zx.querySelectorAll("[role=\"radio\"],button,label,li")].filter(_9x)) {
            const _a7x = _7x(_a6x);
            if (!_a7x || _a7x.length < 3 || _a1x.has(_a6x) || !_gx(_a7x, [..._kx.available, ..._kx.unavailable]))
                continue;
            _a1x.add(_a6x);
            _a0x.push({ radio: null, card:_a6x, tx:_a7x, available: _bx(_a6x) && !_gx(_a7x, _kx.unavailable) });
        }
    } return _a0x; }
    const _a8x = {
        'ifc mall': ["ifc mall", "ifc", "國際金融中心"],
        'Causeway Bay': ["causeway bay", "銅鑼灣", "希慎廣場"],
        'Festival Walk': ["festival walk", "又一城", "九龍塘"],
        'Canton Road': ["canton road", "廣東道", "尖沙咀"],
        'New Town Plaza': ["new town plaza", "新城市廣場", "沙田"],
        'apm Hong Kong': ["apm hong kong", "apm", "觀塘"]
    };
    function _a9x(_aax, _abx) { if (!_abx)
        return false; const _acx = _a8x[_abx] || [_abx]; const _adx = _5x(_aax); return _acx.some(_aex => _adx.includes(_5x(_aex))); }
    function _afx(_agx) { for (const [_ahx] of Object.entries(_a8x))
        if (_a9x(_agx, _ahx))
            return _ahx; return String(_agx || "").replace(/\s+/g, " ").trim().slice(0, 120); }
    function _pickupStoreFromText(_pst, _psr = "") { const _pt = _5x(_pst); if (!_pt || _gx(_pt, [..._kx.unavailable, '沒有庫存', '售罄', '已售罄', 'sold out'])) return ""; const _hasPickup = _gx(_pt, [..._kx.pickup, '店內取貨', 'pickup']) || /(?:今天|明天|today|tomorrow)/i.test(_pt) || _gx(_pt, ['可供取貨','available for pickup','available today']); if (!_hasPickup) return ""; if (_psr && _a9x(_pt, _psr)) return _psr; for (const _ps of Object.keys(_a8x)) if (_a9x(_pt, _ps)) return _ps; return ""; }
    function _pickupStoreOnPage(_psr = "") { const _els = [...document.querySelectorAll('section,article,li,div')].filter(_9x).map(_e => ({ e:_e, tx:_7x(_e) })).filter(_o => _o.tx && _o.tx.length >= 3 && _o.tx.length <= 1800).sort((_a,_b) => _a.tx.length - _b.tx.length); for (const _o of _els) { const _store = _pickupStoreFromText(_o.tx, _psr); if (_store && (!_psr || _a9x(_o.tx, _psr))) return _store; } return ""; }
    function _aix(_ajx, _akx, _alx = "", _amx = true) { const _anx = _9yx(_ajx).filter(_aox => _aox.available); if (_alx) {
        const _apx = _anx.find(_aqx => String(_aqx.radio?.value || "") === String(_alx));
        if (_apx)
            return _apx;
    } if (_akx) {
        const _arx = _anx.find(_asx => _a9x(_asx.tx, _akx));
        if (_arx)
            return _arx;
        if (!_amx)
            return null;
    } return _amx ? (_anx[0] || null) : null; }
    function _atx() { const _aux = _9rx() || document; return _1dx(_kx.chooseStore, _aux, "button,a,[role=\"button\"]") || _1dx(["完成", "done"], _aux, "button,a,[role=\"button\"]"); }
    function _avx(_awx, _axx = "") { const _ayx = _awx?.full || ""; const _itemStore = _pickupStoreFromText(_ayx, _axx); if (!_itemStore) return false; return _axx ? _a9x(_ayx, _axx) : true; }
    function _azx(_b0x) { return _b0x.fulfilment === "pickup" || _b0x.fulfilment === "pickup-only"; }
    function _b1x(_b2x) { return _b2x?.model === "iPhone 18 Pro" || _b2x?.model === "iPhone 18 Pro Max"; }
    function _b3x(_b4x) { return String(_b4x || "").replace(/[：]/g, ":").replace(/[–—至到]/g, "-").replace(/\s*-\s*/g, '-').replace(/\s*:\s*/g, ':').replace(/\s+/g, " ").trim(); }
    function _b5x() { if (!_gx(_dx(), ["取貨時段", "取貨時間", "選擇時段", "pickup time", "time slot", "pickup slot"]))
        return []; const _b6x = [...document.querySelectorAll("button,label,[role=\"radio\"],[role=\"button\"],input[type=\"radio\"],option")].filter(_b7x => _9x(_b7x) && !_b7x.disabled); return _b6x.map(_b8x => ({ e:_b8x, tx: _b3x(_b8x.innerText || _b8x.textContent || _b8x.value || _b8x.getAttribute?.("aria-label") || "") })).filter(_b9x => /\b(?:0?[89]|1\d|2[0-3]):[0-5]\d\b/.test(_b9x.tx)); }
    async function _bax(_bbx) { const _bcx = _bbx.config || {}, _bdx = _bbx.state || {}; if (!_b1x(_bcx) || !_azx(_bcx) || _bdx.timeslotSelected)
        return false; const _bex = _b5x(); if (!_bex.length)
        return false; const _bfx = String(_bcx.pickupTimeslot || "earliest"); let _bgx = null; if (_bfx === "earliest") {
        _bgx = _bex[0];
    }
    else {
        const _bhx = _b3x(_bfx);
        _bgx = _bex.find(_bix => _bix.tx.includes(_bhx));
    } if (!_bgx) {
        await _zx(`等待自取時段 ${_bfx==="earliest"?"最早可用":_bfx}`, "pickup-timeslot");
        return true;
    } await _zx(`選擇自取時段：${_bgx.tx}`, "pickup-timeslot", true); await _1qx(() => { const _bjx = _b5x(); if (_bfx === "earliest")
        return _bjx[0]?.e || null; return _bjx.find(_bkx => _bkx.tx.includes(_b3x(_bfx)))?.e || null; }, `自取時段 ${_bgx.tx}`, 8000); await _ux({}, { timeslotSelected: _bgx.tx }, `自取時段：${_bgx.tx}`); await _0x(180); return true; }
    async function _blx(_bmx,_bnx="目前沒有可用自取門市"){const _cfg=_bmx?.config||{};if(String(_cfg.jobSource||'')==='stock-monitor'||_cfg.strictTarget||_cfg.fulfilment==='pickup-only'){await _ux({status:`${_bnx}；Monitor/只自取安全鎖生效，繼續等待自取，絕不轉送貨`,stage:"pickup",url:_fx()},{pickupNoStoreStreak:0,selectedStore:"",selectedStoreValue:"",pickupVerifiedAt:0},"只自取安全鎖：拒絕轉送貨");return false;}const _box={..._cfg,fulfilment:"shipping"};await _ux({config:_box,status:`${_bnx}；已自動改用送貨`,stage:"bag",url:_fx()},{pickupNoStoreStreak:0,selectedStore:"",selectedStoreValue:""},"自取無貨 → 自動轉送貨");await _0x(80);await _17x("/hk-zh/shop/bag",true);return false;}
function __abPickupPartCandidates(_cfg={}){const _strict=String(_cfg.jobSource||'')==='stock-monitor'||!!_cfg.strictTarget,_norm=_t=>String(_t||'').replaceAll('\\/','/').replace(/%2F/ig,'/').trim().toUpperCase();if(_strict){const _p=_norm(_cfg.pickupPart||_cfg.monitorTarget?.pickupPart||'');return _p&&__abStrictMonitorParts[_p]?[_p]:[];}const _set=new Set(),_add=_t=>{_t=String(_t||'').replaceAll('\\/','/').replace(/%2F/ig,'/');for(const _m of _t.matchAll(/\b[A-Z0-9]{5,14}Z[A-Z]\/A\b/gi))_set.add(_m[0].toUpperCase());};if(_cfg.pickupPart)_add(_cfg.pickupPart);for(const _row of _98x(_cfg)){_add(_row.container?.outerHTML||'');for(const _el of _row.container?.querySelectorAll?.('*')||[])for(const _a of _el.attributes||[])_add(_a.value);}if(!_set.size){const _need=[_cfg.model,_cfg.storage].map(_5x).filter(Boolean);for(const _s of document.querySelectorAll('script')){const _tx=String(_s.textContent||''),_n=_5x(_tx);if(_need.every(_x=>_n.includes(_x)))_add(_tx);if(_set.size>=16)break;}}return[..._set].slice(0,16);}
function __abHitMatchesConfig(_h,_cfg={}){const _strict=String(_cfg.jobSource||'')==='stock-monitor'||!!_cfg.strictTarget;if(_strict){const _p=String(_cfg.pickupPart||_cfg.monitorTarget?.pickupPart||'').trim().toUpperCase();if(!_p||String(_h?.part||'').trim().toUpperCase()!==_p)return false;}const _t=_5x(_h?.productTitle||'');if(!_t)return true;const _m=_5x(_cfg.model||''),_s=_5x(_cfg.storage||''),_f=_5x(_cfg.finish||'');return(!_m||_t.includes(_m))&&(!_s||_t.includes(_s))&&(!_f||_t.includes(_f));}
function __abChooseApiStore(_hits,_cfg,_current=''){const _strict=String(_cfg?.jobSource||'')==='stock-monitor'||!!_cfg?.strictTarget,_good=(_hits||[]).filter(_h=>__abHitMatchesConfig(_h,_cfg)),_pool=_strict?_good:(_good.length?_good:(_hits||[])),_want=_current||_cfg.storePriority||'';return(_want?_pool.find(_h=>_a9x(_h.storeName,_want)):null)||_pool[0]||null;}
async function __abQueryPickupApi(_cfg,_force=false){const _parts=__abPickupPartCandidates(_cfg);const _r=await _px({type:'pickupAvailabilityQuery',parts:_parts,config:{model:_cfg.model,storage:_cfg.storage,finish:_cfg.finish,pickupPart:_cfg.pickupPart||'',jobSource:_cfg.jobSource||'',strictTarget:!!_cfg.strictTarget,monitorTarget:_cfg.monitorTarget||null},location:'Hong Kong',force:!!_force});if(!_r?.ok)return _r||{ok:false,reason:'no-response'};const _j=await _rx(),_st=_j?.state||{},_chosen=__abChooseApiStore(_r.hits||[],_cfg,_st.selectedStore||_st.pendingStore||'');await _ux({}, {pickupApiCheckedAt:_r.checkedAt||_ex(),pickupApiParts:_r.parts||[],pickupApiHits:_r.hits||[],pickupApiStore:_chosen?.storeName||'',pickupApiPart:_chosen?.part||(_r.parts||[])[0]||''}, `Apple 自取 API：${(_r.hits||[]).length}個可用門市${_chosen?.storeName?`；目標 ${_chosen.storeName}`:''}`);return{..._r,chosen:_chosen};}

    function __abBagCommittedPickupStore(_cfg={}) {
        const _rows=_98x(_cfg);
        for(const _row of _rows){
            const _s=_pickupStoreFromText(_row.full||'');
            if(_s) return _s;
        }
        return _pickupStoreOnPage('')||'';
    }
    function __abFreshApiHitForStore(_state={},_store='',_maxAge=30000){
        if(!_store)return null;
        const _at=Number(_state.pickupApiCheckedAt||0);
        if(!_at||(_ex()-_at)>_maxAge)return null;
        return (Array.isArray(_state.pickupApiHits)?_state.pickupApiHits:[]).find(_h=>_a9x(_h?.storeName||'',_store))||null;
    }
    function __abHeadlessPickupReady(_cfg={},_state={}){
        const _bag=__abBagCommittedPickupStore(_cfg);
        if(!_bag)return{ok:false,reason:'no-bag-store'};
        const _hit=__abFreshApiHitForStore(_state,_bag);
        if(!_hit)return{ok:false,reason:'api-not-fresh',bagStore:_bag};
        const _priority=String(_cfg.storePriority||'').trim();
        if(_priority){
            const _priorityHit=(Array.isArray(_state.pickupApiHits)?_state.pickupApiHits:[]).find(_h=>_a9x(_h?.storeName||'',_priority));
            if(_priorityHit&&!_a9x(_bag,_priority))return{ok:false,reason:'priority-switch-needed',bagStore:_bag,priorityStore:_priorityHit.storeName};
        }
        return{ok:true,store:_afx(_bag),hit:_hit,source:'api+bag-dom'};
    }
    function __abCloseStoreModalIfOpen(){
        const _dlg=_9rx();if(!_dlg)return false;
        const _close=[..._dlg.querySelectorAll('button,[role="button"]')].find(_e=>_bx(_e)&&(/close|關閉|關上|取消/i.test(String(_e.getAttribute('aria-label')||''))||/^×$/.test(String(_e.textContent||'').trim())));
        if(_bx(_close)){try{_close.click();return true;}catch(_e){}}
        return false;
    }
    function __abModalStoreMatch(_dlg,_target='') {
        if(!_dlg||!_target) return null;
        const _nodes=[..._dlg.querySelectorAll('label,li,[role="radio"],button,div')].filter(_9x);
        const _cand=[];
        for(const _el of _nodes){
            const _tx=_7x(_el);
            if(!_tx||_tx.length>700||!_a9x(_tx,_target)) continue;
            const _bad=_gx(_tx,[..._kx.unavailable,'沒有庫存','售罄','已售罄','unavailable','out of stock']);
            const _good=!_bad&&(_gx(_tx,[..._kx.available,'可供取貨','可取貨','available for pickup','available today'])||/(?:今天|明天|today|tomorrow)/i.test(_tx));
            if(!_good) continue;
            const _radio=_el.matches?.('input[type="radio"]')?_el:_el.querySelector?.('input[type="radio"]');
            _cand.push({radio:_radio||null,card:_el,tx:_tx,available:true});
        }
        _cand.sort((a,b)=>a.tx.length-b.tx.length);
        return _cand[0]||null;
    }
    async function _bpx(_bqx, _brx) {
        const _bsx = _bqx.config || {}, _btx = _bqx.state || {}, _bux = _98x(_bsx), _bvx = _bux[_brx];
        if (!_bvx)
            return true;
        const _verifiedStore = _btx.selectedStore || "";
        if (_btx.pickupVerifiedAt && _verifiedStore && _avx(_bvx, _verifiedStore) && !_9rx())
            return true;
        if (!_9rx()) {
            const _bwx = _9jx(_bvx, _brx);
            if (!_bwx) {
                await _zx('只自取：未能讀取零售店選擇；不會前往結帳', "pickup");
                return false;
            }
            await _zx(`讀取第 ${_brx+1}個商品列可用自取零售店`, "pickup");
            await _1qx(() => { const _bxx = _98x(_bsx)[_brx]; return _bxx ? _9jx(_bxx, _brx) : null; }, "尋找零售店", 8000);
            await _0x(260);
        }
        let _byx = _9rx();
        if (!_byx)
            return false;
        const _bzx = _9ux(_byx);
        if (_bzx && !_bzx.value.trim()) {
            _3vx(_bzx, "Hong Kong");
            await _0x(100);
            const _c0x = _9wx(_byx);
            if (_bx(_c0x))
                await _1qx(() => _9wx(_9rx()), "搜尋門市", 5000);
            await _ux({}, { storeSearchCount: Number(_btx.storeSearchCount || 0) + 1, lastStoreRefreshAt: _ex() }, "搜尋 Hong Kong 門市");
            await _0x(320);
            _byx = _9rx() || _byx;
        }
        const _availableStores = _9yx(_byx).filter(_x => _x.available);
        if (_availableStores.length)
            await _ux({}, null, `已讀取零售店：${_availableStores.length}間可供自取`);
        const _c1x = _bsx.storePriority || "";
        const _apiTarget = _btx.pickupApiStore || "";
        const _c2x = _btx.pendingStore || _btx.selectedStore || _apiTarget || "";
        const _c2v = _btx.pendingStoreValue || _btx.selectedStoreValue || "";
        const _c3x = (_apiTarget ? _aix(_byx, _c2x || _apiTarget, _c2v, false) : _aix(_byx, _c2x || _c1x, _c2v, true)) || __abModalStoreMatch(_byx,_c2x||_apiTarget||_c1x);
        if (!_c3x) {
            const _c4x = await _rx(), _c5x = _c4x?.state || {}, _c6x = _ex(), _c7x = Number(_c5x.lastStoreRefreshAt || 0), _c8x = !_c7x || (_c6x - _c7x >= 5000);
            await _zx(_apiTarget ? `API 已確認 ${_apiTarget}有貨；等待 Apple 零售店視窗載入該門市（不靠視窗判斷庫存）` : (_c2x ? `等待 ${_c2x}可供取貨` : '只自取：目前沒有可用零售店；持續等待'), "pickup");
            if (_c8x) {
                const _c9x = Number(_c5x.pickupNoStoreStreak || 0) + 1;
                await _ux({}, { pickupNoStoreStreak: _c9x, lastStoreRefreshAt: _c6x, pickupVerifiedAt: 0 }, `10秒自取門市重查 #${_c9x}`);
                if (_bsx.fulfilment === "pickup" && _c9x >= 2)
                    return await _blx(_c4x, "目前所有自取門市暫時無貨");
                const _cax = _9wx(_9rx());
                if (_bx(_cax)) {
                    await _1qx(() => _9wx(_9rx()), "重新搜尋門市", 4000);
                    await _ux({}, { storeSearchCount: Number(_c5x.storeSearchCount || 0) + 1 }, "重新查自取庫存");
                }
            }
            return false;
        }
        if (_c1x && !_a9x(_c3x.tx, _c1x))
            await _ux({}, null, `優先門市 ${_c1x}無貨；改選其他可用門市`);
        const _c8x = _afx(_c3x.tx), _c9x = _c3x.radio?.value || "";
        await _ux({ status: `可用自取門市已找到：${_c8x}；正在確認`, stage: "pickup" }, { pendingStore: _c8x, pendingStoreValue: _c9x, pickupVerifiedAt: 0 }, `候選自取門市 ${_c8x}`);
        await _1qx(() => { const _cax = _9rx(); if (!_cax)
            return null; const _cbx = _aix(_cax, _c8x, _c9x, true); if (!_cbx)
            return null; if (_cbx.radio?.id) {
            const _ccx = _cax.querySelector(`label[for="${CSS.escape(_cbx.radio.id)}"]`);
            if (_bx(_ccx))
                return _ccx;
        } return _bx(_cbx.card) ? _cbx.card : (_bx(_cbx.radio) ? _cbx.radio : null); }, "選擇自取門市", 7000);
        await _0x(180);
        const _confirm = _atx();
        if (!_bx(_confirm)) {
            await _zx(`已選 ${_c8x}；等待 Apple 啟用「確認你的零售店」`, "pickup");
            return false;
        }
        await _3mx(`confirm-store-${_brx}-${_c8x}`, _atx, "確認自取門市", 7000, 1700);
        await _0x(450);
        if (_9rx()) {
            await _zx(`已按確認 ${_c8x}；等待零售店視窗關閉`, "pickup");
            return false;
        }
        const _fresh = _98x(_bsx)[_brx];
        if (!_fresh || !_avx(_fresh, _c8x)) {
            await _zx(`已確認 ${_c8x}；等待購物袋顯示可取貨狀態`, "pickup");
            return false;
        }
        await _ux({ status: `自取門市已確認：${_c8x}`, stage: "pickup" }, { selectedStore: _c8x, selectedStoreValue: _c9x, pendingStore: "", pendingStoreValue: "", pickupNoStoreStreak: 0, pickupVerifiedAt: _ex(), checkoutPickupBackoffUntil: 0 }, `自取門市驗證完成 ${_c8x}`);
        return true;
    }
    async function _cdx(_cex) {
        const _cfx = _cex.config || {}, _cgx = _cex.state || {}, _chx = Number(_cfx.quantity || 1), _cix = _8qx(_cfx), _cjx = _9ex(_cfx), _ckx = _9bx(_cfx);
        if (_ckx.length) {
            await _14x(`購物袋內有其他同系列 iPhone 規格（${_ckx.length}個商品列）。為避免誤刪你的商品已停止；請先手動清理舊 iPhone，再開始。`, "bag");
            return;
        }
        const _clx = _gx(_dx(), _kx.emptyBag) && _cix.length === 0;
        if (!_cgx.preflightDone) {
            if (!_cix.length && !_clx) {
                await _zx("等待購物袋完成載入", "preflight");
                return;
            }
            if (_cjx > _chx) {
                await _14x(`購物袋已有 ${_cjx}部指定 iPhone，超過目標 ${_chx}；已停止避免改錯數量。`, "bag");
                return;
            }
            await _ux({ status: `購物袋預檢完成：目前 ${_cjx}/目標 ${_chx}`, stage: "preflight" }, { preflightDone: true, confirmedQty: _cjx, addInFlight: false }, `預檢數量 ${_cjx}/${_chx}`);
            if (_cjx < _chx)
                await _17x(_7cx(_cfx));
            return;
        }
        if (_cgx.addInFlight) {
            const _cmx = Number(_cgx.confirmedQty || 0);
            if (_cjx > _cmx) {
                await _ux({ status: `Add 驗證成功：購物袋實際數量 ${_cjx}/${_chx}`, stage: "bag" }, { confirmedQty: _cjx, addInFlight: false, addSentAt: 0, addFailures: 0 }, `實際數量由 ${_cmx}→${_cjx}`);
                const _cnx = await _rx();
                if (_cjx < _chx) {
                    await _17x(_7cx(_cfx));
                    return;
                }
                _cex = _cnx;
            }
            else if (_cjx === _cmx) {
                if (_ex() - Number(_cgx.addSentAt || 0) < 7000) {
                    await _zx(`等待 Apple 購物袋確認第 ${_cmx+1}部（目前仍 ${_cjx}）`, "bag");
                    return;
                }
                if (Number(_cgx.addFailures || 0) < 1) {
                    await _ux({ status: "本次 Add 未反映到購物袋；受控重試一次", stage: "bag" }, { addInFlight: false, addFailures: Number(_cgx.addFailures || 0) + 1 }, "Add 未增加數量，允許一次重試");
                    await _17x(_7cx(_cfx));
                    return;
                }
                await _14x(`Add 重試後購物袋仍維持 ${_cjx}部；已停止避免重複加入。`, "bag");
                return;
            }
            else {
                await _14x(`購物袋數量由 ${_cmx}下降至 ${_cjx}；已停止避免錯誤操作。`, "bag");
                return;
            }
        }
        const _cox = await _rx();
        const _cpx = Math.max(Number(_cox?.state?.confirmedQty || 0), _cjx);
        if (_cjx > _chx) {
            await _14x(`購物袋實際有 ${_cjx}部，超過目標 ${_chx}；已停止避免超量。`, "bag");
            return;
        }
        if (_cjx < _chx) {
            await _ux({ status: `仍缺 ${_chx-_cjx}部；返回產品頁加入下一部`, stage: "bag" }, { confirmedQty: _cjx, addInFlight: false }, `需要再 Add：${_cjx}/${_chx}`);
            await _17x(_7cx(_cfx));
            return;
        }
        if (_cpx !== _cjx)
            await _ux({}, { confirmedQty: _cjx }, `確認最終數量 ${_cjx}`);
        if (_azx(_cfx)) {
            let _pickupState=(await _rx())?.state||{};
            let _bagCommittedStore=__abBagCommittedPickupStore(_cfx);
            if(_bagCommittedStore&&_pickupState.bagDisplayedStore!==_bagCommittedStore){
                await _ux({}, {bagDisplayedStore:_bagCommittedStore}, `購物袋已顯示自取門市：${_bagCommittedStore}`);
                _pickupState=(await _rx())?.state||{};
            }

            let _headless=__abHeadlessPickupReady(_cfx,_pickupState);
            const _nowApi=_ex(),_nextApi=Number(_pickupState.pickupApiNextAt||0);
            if(!_headless.ok&&_nowApi>=_nextApi){
                const _api=await __abQueryPickupApi(_cfx,false);
                if(_api?.ok&&Array.isArray(_api.parts)&&_api.parts.length){
                    if(!(_api.hits||[]).length){
                        await _ux({}, {pickupApiNextAt:_ex()+5000,pickupVerifiedAt:0,pickupApiStore:'',pickupVerifySource:''}, 'Apple 自取 API 已完成：目前 0 間可用門市');
                        if(_cfx.fulfilment==="pickup") return await _blx(await _rx(),'Apple 自取 API 已確認目前沒有可用零售店');
                        await _zx('只自取：Apple API 暫無可用零售店；5秒後直接再查 API，不開門市視窗浪費時間',"pickup");
                        return;
                    }
                    _pickupState=(await _rx())?.state||{};
                    _bagCommittedStore=__abBagCommittedPickupStore(_cfx);
                    _headless=__abHeadlessPickupReady(_cfx,_pickupState);
                    if(!_headless.ok){
                        const _hits=_api.hits||[],_priority=String(_cfx.storePriority||''),_priorityHit=_priority?_hits.find(_h=>_a9x(_h.storeName,_priority)):null;
                        const _hit=_priorityHit||_api.chosen||__abChooseApiStore(_hits,_cfx,_pickupState.selectedStore||_bagCommittedStore||'');
                        if(_hit){
                            await _ux({}, {pendingStore:_hit.storeName,pickupApiStore:_hit.storeName,pickupApiPart:_hit.part||'',pickupApiNextAt:0,pickupVerifySource:''}, `API 鎖定可用門市：${_hit.storeName}${_bagCommittedStore?`；購物袋現有 ${_bagCommittedStore}，只有真正需要改店先開視窗`:''}`);
                            _pickupState=(await _rx())?.state||{};
                        }
                    }
                }else if(_api&&!_api.ok){
                    await _ux({}, {pickupApiNextAt:_ex()+5000}, `自取 API 暫不可用（${_api.reason||_api.status||'unknown'}）；本輪使用 Apple 購物袋狀態作後備`);
                    _pickupState=(await _rx())?.state||{};
                }
            }

            _headless=__abHeadlessPickupReady(_cfx,_pickupState);
            if(_headless.ok){
                const _store=_headless.store;
                await _ux({status:`自取門市已確認：${_store}`,stage:"pickup"}, {selectedStore:_store,selectedStoreValue:'',pendingStore:'',pendingStoreValue:'',pickupVerifiedAt:_ex(),pickupNoStoreStreak:0,pickupApiStore:_store,pickupApiPart:_headless.hit?.part||_pickupState.pickupApiPart||'',pickupApiNextAt:0,checkoutPickupBackoffUntil:0,pickupVerifySource:_headless.source}, `API + 購物袋已確認 ${_store} 有貨；不開「選擇地點」視窗`);
                __abCloseStoreModalIfOpen();
                _pickupState=(await _rx())?.state||{};
            }else{
                const _cqx=_98x(_cfx);
                for(let _crx=0;_crx<_cqx.length;_crx++){
                    const _csx=_98x(_cfx);if(_crx>=_csx.length)break;
                    const _ctx=await _bpx(await _rx(),_crx);
                    if(!_ctx)return;
                    _pickupState=(await _rx())?.state||{};
                }
                if(_9rx()){
                    await _zx('只自取：只有需要更換／首次提交門市時才使用零售店視窗；目前仍未完成提交',"pickup");
                    return;
                }
            }

            _pickupState=(await _rx())?.state||{};
            const _finalHeadless=__abHeadlessPickupReady(_cfx,_pickupState);
            const _verifiedStore=_pickupState.selectedStore||"";
            const _verifiedRows=_98x(_cfx);
            const _legacyReady=!!_verifiedStore&&!!_pickupState.pickupVerifiedAt&&_verifiedRows.length>0&&_verifiedRows.every(_row=>_avx(_row,_verifiedStore));
            if(!_finalHeadless.ok&&!_legacyReady){
                await _zx('只自取：未能同時確認 Apple API 庫存及購物袋已提交門市；不會前往結帳',"pickup");
                return;
            }
            const _finalStore=_finalHeadless.ok?_finalHeadless.store:_verifiedStore;
            await _ux({}, null, `自取最終檢查通過：${_finalStore}；直接前往結帳`);
        }
        const _bagStateNow = (await _rx())?.state || {};
        if (Number(_bagStateNow.checkoutPickupBackoffUntil || 0) > _ex()) {
            await _zx(`剛由 Checkout 返回重新驗證門市；等待 ${Math.ceil((Number(_bagStateNow.checkoutPickupBackoffUntil)-_ex())/1000)}秒後再進結帳`, "pickup");
            return;
        }
        if(_bagStateNow.checkoutStarted){
            const _age=_ex()-Number(_bagStateNow.checkoutStartedAt||0),_tries=Number(_bagStateNow.checkoutClickAttempts||1);
            if(_age<9000){await _zx('已按結帳；等待 Apple 開啟安全結帳頁（不重複點擊）',"bag");return;}
            if(_tries>=2){await _14x('已按結帳但 Apple 仍停留在購物袋；已停止避免重複點擊／404。請重新開始任務。',"bag");return;}
            await _ux({}, {checkoutStarted:false,checkoutStartedAt:0}, '結帳頁 9 秒內未開啟；允許一次受控重試');
        }
        if (_bx(_9ix())) {
            await _zx("數量及交付方式已確認；前往結帳", "bag", true);
            const _fresh=(await _rx())?.state||{};
            await _ux({ status: "正在進入結帳流程", stage: "checkout" }, { checkoutStarted: true, checkoutStartedAt:_ex(), checkoutClickAttempts:Number(_fresh.checkoutClickAttempts||0)+1 }, "鎖定結帳動作");
            await _3mx("checkout", _9ix, "結帳", 9000, 3200);
            return;
        }
        await _zx(_azx(_cfx) ? "等待自取設定／結帳按鈕可用" : "等待 Apple 啟用結帳按鈕", "bag");
    }
    function _cux(_cvx) {
        const _isPickup = _cvx === "pickup";
        const _strong = _isPickup
            ? ['我會自行取貨','我會親自取貨','我會前來取貨','我會來取貨','我要自行取貨','我想自行取貨','我要自取','我想自取','店內取貨','到店取貨','自行取貨','親自取貨','i will pick it up','i’ll pick it up',"i'll pick it up",'pick up at store','store pickup']
            : ['我希望送貨','我要送貨','我想送貨','送貨給我','安排送貨','deliver it to me','i want delivery','ship it to me','home delivery'];
        const _weak = _isPickup ? ['自行取貨','親自取貨','自取','pickup','pick up'] : ['送貨','delivery','deliver','shipping'];
        const _opposite = _isPickup ? ['我希望送貨','我要送貨','送貨給我','delivery','shipping','deliver'] : ['我會自行取貨','我會親自取貨','自行取貨','親自取貨','自取','pickup','pick up'];
        const _bad = ['常見問題','faq','送貨地址','shipping address','取貨聯絡資料','pickup contact','取貨時段','pickup time','time slot','繼續','continue'];
        const _els = [...document.querySelectorAll('button,label,[role="button"],[role="radio"],input[type="radio"]')].filter(_9x);
        let _best = null, _bestScore = 0;
        for (const _el of _els) {
            const _click = _4ex(_el) || _el;
            const _parts = [_el.innerText,_el.textContent,_el.value,_el.getAttribute?.('aria-label'),_el.getAttribute?.('data-autom'),_el.getAttribute?.('name')];
            if (_el.matches?.('input[type="radio"]')) {
                const _lab = _4ex(_el);
                if (_lab && _lab !== _el) _parts.push(_lab.innerText,_lab.textContent,_lab.getAttribute?.('aria-label'),_lab.getAttribute?.('data-autom'));
            }
            const _parent = _el.closest?.('button,label,[role="button"],[role="radio"]');
            if (_parent && _parent !== _el) _parts.push(_parent.innerText,_parent.textContent,_parent.getAttribute?.('aria-label'),_parent.getAttribute?.('data-autom'));
            const _tx = _4ax(_parts.filter(Boolean).join(' '));
            if (!_tx || _tx.length > 520 || _bad.some(_x => _tx.includes(_5x(_x)))) continue;
            let _score = 0;
            for (const _x of _strong) if (_tx.includes(_5x(_x))) _score = Math.max(_score, 100 + _5x(_x).length);
            if (!_score) for (const _x of _weak) if (_tx.includes(_5x(_x))) _score = Math.max(_score, 35 + _5x(_x).length);
            if (!_score) continue;
            if (_opposite.some(_x => _tx.includes(_5x(_x)))) _score -= 80;
            if (_el.matches?.('button,label,[role="button"],[role="radio"]')) _score += 8;
            if (_el.matches?.('input[type="radio"]')) _score += 5;
            if (_tx.length < 120) _score += 5;
            if (_score > _bestScore && _bx(_click)) { _best = _click; _bestScore = _score; }
        }
        return _best;
    }
    function __abFulfilmentConfirmed(_mode) {
        const _target = _cux(_mode);
        if (_bx(_fulfilSpecificContinue(_mode))) return true;
        if (!_target) return false;
        const _nodes = [_target];
        const _parent = _target.closest?.('label,[role="radio"],[role="button"],button');
        if (_parent && _parent !== _target) _nodes.push(_parent);
        for (const _n of _nodes) {
            if (_n.matches?.('input[type="radio"]') && _n.checked) return true;
            if (_n.getAttribute?.('aria-checked') === 'true' || _n.getAttribute?.('aria-selected') === 'true' || _n.getAttribute?.('data-selected') === 'true') return true;
            const _radio = _n.querySelector?.('input[type="radio"]');
            if (_radio?.checked) return true;
            const _roleRadio = _n.querySelector?.('[role="radio"][aria-checked="true"]');
            if (_roleRadio) return true;
        }
        if (_target.matches?.('label') && _target.getAttribute?.('for')) {
            try { const _r = document.getElementById(_target.getAttribute('for')); if (_r?.checked) return true; } catch (_e) {}
        }
        return false;
    }
    function _cwx() { if (_44x())
        return null; const _cxx = ["提交訂單", "place order", "pay now", "立即付款", "確認購買", "confirm purchase", "檢查你的訂單", "檢視你的訂單", "review your order"]; const _cyx = _1bx("button,a,[role=\"button\"]"); const _safe = _el => { if (!_bx(_el)) return false; const _href = String(_el.getAttribute?.('href') || "").trim(); if (_href && /(?:^|\/)404(?:[?#/]|$)/i.test(_href)) return false; return true; }; const _czx = _cyx.find(_d0x => _safe(_d0x) && _gx(_7x(_d0x), ["繼續前往付款", "繼續填寫付款資料", "繼續填寫送貨地址", "繼續填寫自取資料", "continue to payment", "continue to shipping address", "continue to shipping", "continue to pickup"])); if (_czx)
        return _czx; return _cyx.find(_d1x => { if (!_safe(_d1x))
        return false; const _d2x = _7x(_d1x), _d3x = _5x(_d1x.getAttribute("data-autom") || ""); if (_gx(_d2x, _cxx) || _d2x.includes("繼續購物") || _d2x.includes("continue shopping"))
        return false; return _d2x === "繼續" || _d2x === "continue" || _d3x.includes("continue"); }) || null; }

    function _fulfilSpecificContinue(_mode) {
        const _pickup = _mode === "pickup";
        const _want = _pickup
            ? ['繼續填寫自取資料','繼續填寫取貨資料','繼續自取','continue to pickup','continue with pickup','pickup details']
            : ['繼續填寫送貨地址','繼續填寫送貨資料','繼續送貨','continue to shipping address','continue to shipping','continue to delivery'];
        const _els = [...document.querySelectorAll('button,a,[role="button"],input[type="submit"],input[type="button"]')].filter(_bx);
        return _els.find(_el => {
            const _tx = _4cx(_el);
            if (!_tx) return false;
            const _href = String(_el.getAttribute?.('href') || '');
            if (_href && /(?:^|\/)404(?:[?#/]|$)/i.test(_href)) return false;
            return _want.some(_x => _tx.includes(_5x(_x)));
        }) || null;
    }
    function _checkoutStoreSnapshot(_store = '') {
        const _nodes = [...document.querySelectorAll('button,label,[role="button"],[role="radio"],li,section,article,div')].filter(_9x);
        const _rows = [];
        for (const _name of Object.keys(_a8x)) {
            let _best = null;
            for (const _el of _nodes) {
                const _tx = _7x(_el);
                if (!_tx || _tx.length > 700 || !_a9x(_tx, _name)) continue;
                const _hasState = _gx(_tx, [..._kx.available, ..._kx.unavailable, '無法使用','暫時無法使用','可供取貨','可取貨','available','unavailable']);
                if (!_hasState) continue;
                if (!_best || _tx.length < _best.tx.length) _best = { e:_el, tx:_tx };
            }
            if (_best) {
                const _unavailable = _gx(_best.tx, [..._kx.unavailable, '無法使用','暫時無法使用','沒有庫存','售罄','unavailable','out of stock']);
                const _available = !_unavailable && _gx(_best.tx, [..._kx.available, '可供取貨','可取貨','available for pickup','available']);
                _rows.push({ ..._best, store:_name, unavailable:_unavailable, available:_available });
            }
        }
        const _selected = _store ? _rows.find(_r => _a9x(_r.tx, _store)) || null : null;
        return {
            rows:_rows,
            selected:_selected,
            listSeen:_rows.length >= 2,
            allUnavailable:_rows.length >= 2 && _rows.every(_r => _r.unavailable)
        };
    }
    function _checkoutStoreClickable(_row) {
        if (!_row?.e) return null;
        const _e = _row.e;
        if (_e.matches?.('button,label,[role="button"],[role="radio"],input[type="radio"]')) {
            const _x = _4ex(_e) || _e;
            if (_bx(_x)) return _x;
        }
        const _child = [...(_e.querySelectorAll?.('input[type="radio"],button,label,[role="button"],[role="radio"]') || [])].find(_bx);
        return _child ? (_4ex(_child) || _child) : null;
    }
    async function _d4x(_d5x) {
        const _d6x = _d5x.config || {}, _d7x = _dx(), _dst = _d5x.state || {}, _du = _fx();
        if (_dst.checkoutPageUrl !== _du) {
            await _ux({}, { checkoutPageUrl: _du, checkoutPageSeenAt: _ex(), lastAction: "", lastActionAt: 0, navPendingKey:'', navPendingUrl:'', navPendingAt:0, navPendingAttempts:0 }, `結帳頁已切換：${_du}`);
            await _zx('結帳頁載入中；等待 Apple 控制項穩定', "checkout");
            return;
        }
        if (_ex() - Number(_dst.checkoutPageSeenAt || 0) < 650) {
            await _zx('結帳頁載入中；等待 Apple 控制項穩定', "checkout");
            return;
        }
        if (_gx(_d7x, _kx.guest)) {
            await _zx("Apple 帳戶登入不可用／未登入；選擇訪客結帳", "checkout");
            await __abNavClick('guest', () => _1dx(_kx.guest), "以訪客身份繼續", 9000, 10000);
            return;
        }

        const _d8x = _cux("pickup"), _d9x = _cux("shipping");
        const _isFulfilment = (_d8x || _d9x) && (_gx(_d7x, ["你想如何收取訂單產品", "how would you like to get your order", "delivery or pickup", '你想以哪一種方式領取訂單', '你想以哪種方式領取訂單', '你想怎樣領取訂單', '你想如何領取訂單', 'how would you like to receive your order', 'how do you want to receive your order']) || _du.toLowerCase().includes("_s=fulfillment") || (!!_d8x && !!_d9x && !_34x() && !_37x() && !_44x()));
        if (_isFulfilment) {
            const _dbx = _azx(_d6x) ? "pickup" : "shipping";
            const _dcx = _dbx === "pickup" ? _d8x : _d9x;

            const _choiceConfirmed = __abFulfilmentConfirmed(_dbx);
            if (_choiceConfirmed && _dst.fulfilmentChoice !== _dbx) {
                await _ux({}, { fulfilmentChoice:_dbx, fulfilmentChosenAt:_ex(), fulfilmentAttemptMode:'', fulfilmentAttemptAt:0, fulfilmentClickAttempts:0 }, `交付方式已由頁面確認：${_dbx}`);
                await _zx('交付方式已確認；等待 Apple 顯示下一步', "checkout");
                return;
            }
            if (_dst.fulfilmentChoice === _dbx && !_choiceConfirmed && _ex() - Number(_dst.fulfilmentChosenAt || 0) >= 1200) {
                await _ux({}, { fulfilmentChoice:'', fulfilmentChosenAt:0, lastAction:'', lastActionAt:0 }, '交付方式舊狀態未被目前頁面確認；清除鎖定並重新選擇');
                return;
            }
            if (!_choiceConfirmed && _bx(_dcx) && _dst.fulfilmentChoice !== _dbx) {
                const _sameAttempt = _dst.fulfilmentAttemptMode === _dbx;
                const _attemptAge = _ex() - Number(_dst.fulfilmentAttemptAt || 0);
                const _attempts = _sameAttempt ? Number(_dst.fulfilmentClickAttempts || 0) : 0;
                if (_sameAttempt && _attemptAge < 900) {
                    await _zx('已按交付方式；等待 Apple 回應', "checkout");
                    return;
                }
                if (_attempts >= 3) {
                    await _14x(`已嘗試 3 次選擇${_dbx === "pickup" ? '自取' : '送貨'}，但 Apple 頁面沒有確認選擇；已停止避免無限卡住。`, "checkout");
                    return;
                }
                await _zx(_dbx === "pickup" ? '選擇自取方式（庫存以購物袋零售店檢查為準）' : '選擇直接送貨方式', "checkout");
                const _did = await _3mx(`fulfilment-${_dbx}`, () => _cux(_dbx), _dbx === "pickup" ? "自取" : "送貨", 7000, 1100);
                if (_did) {
                    await _0x(220);
                    if (__abFulfilmentConfirmed(_dbx)) {
                        await _ux({}, { fulfilmentChoice:_dbx, fulfilmentChosenAt:_ex(), fulfilmentAttemptMode:'', fulfilmentAttemptAt:0, fulfilmentClickAttempts:0 }, `交付方式已確認：${_dbx}`);
                    } else {
                        await _ux({}, { fulfilmentAttemptMode:_dbx, fulfilmentAttemptAt:_ex(), fulfilmentClickAttempts:_attempts + 1 }, `交付方式點擊已送出；等待頁面確認（${_attempts + 1}/3）`);
                    }
                }
                return;
            }
            if (_dst.fulfilmentChoice === _dbx && _choiceConfirmed && _ex() - Number(_dst.fulfilmentChosenAt || 0) < 800) {
                await _zx('交付方式已選定；等待 Apple 更新對應下一步', "checkout");
                return;
            }

            if (_dbx === "pickup") {
                let _store = String(_dst.selectedStore || _dst.pickupApiStore || '');
                if (!_store || !_dst.pickupVerifiedAt) {
                    await _ux({ status:'Checkout 前缺少已提交的自取門市；返回購物袋只做一次門市提交', stage:"bag" }, { checkoutStarted:false, checkoutPageUrl:'', checkoutPageSeenAt:0, fulfilmentChoice:'', fulfilmentChosenAt:0 }, 'Checkout pickup gate → bag commit');
                    await _17x("/hk-zh/shop/bag", true); return;
                }
                const _pickupNext = _fulfilSpecificContinue("pickup");
                if (_bx(_pickupNext)) {
                    await _zx(`API／購物袋已鎖定 ${_store}；直接繼續自取資料`, "checkout");
                    await __abNavClick('pickup-specific-continue', () => _fulfilSpecificContinue("pickup"), '繼續填寫自取資料', 9000, 10000); return;
                }
                const _snap = _checkoutStoreSnapshot(_store);
                if (_snap.selected && !_snap.selected.unavailable) {
                    const _clickStore = _checkoutStoreClickable(_snap.selected);
                    if (_bx(_clickStore)) {
                        await _zx(`Checkout 已載入 ${_store}；套用同一間 API 已驗證門市`, "checkout");
                        await _3mx(`checkout-store-${_store}`, () => _checkoutStoreClickable(_checkoutStoreSnapshot(_store).selected), _store, 7000, 2200); return;
                    }
                }
                const _now=_ex(),_next=Number(_dst.pickupApiNextAt||0);
                if(_now>=_next){
                    const _api=await __abQueryPickupApi(_d6x,true);
                    if(_api?.ok && Array.isArray(_api.parts) && _api.parts.length){
                        const _same=(_api.hits||[]).find(_h=>_a9x(_h.storeName,_store));
                        if(_same){await _ux({}, {pickupApiNextAt:_ex()+2500,pickupApiStore:_same.storeName,pickupApiPart:_same.part||_dst.pickupApiPart||''}, `Checkout linkage：API 再確認 ${_same.storeName}仍有貨`);await _zx(`API 再確認 ${_same.storeName}仍有貨；等待 Checkout UI 同步，不會誤轉送貨`,"checkout");return;}
                        const _alt=__abChooseApiStore(_api.hits||[],_d6x,'');
                        if(_alt){await _ux({status:`原門市狀態已變；API 找到 ${_alt.storeName}，返回購物袋快速改店`,stage:"bag"},{checkoutStarted:false,checkoutPageUrl:'',checkoutPageSeenAt:0,fulfilmentChoice:'',fulfilmentChosenAt:0,pickupVerifiedAt:0,selectedStore:'',selectedStoreValue:'',pendingStore:_alt.storeName,pickupApiStore:_alt.storeName,pickupApiPart:_alt.part||'',pickupApiNextAt:0},`Checkout API 改店 → ${_alt.storeName}`);await _17x("/hk-zh/shop/bag",true);return;}
                        if(_d6x.fulfilment==="pickup"){await _ux({config:{..._d6x,fulfilment:"shipping"},status:'Apple API 已確認自取無貨；立即切換送貨',stage:"checkout"},{fulfilmentChoice:'',fulfilmentChosenAt:0,pickupApiNextAt:0},'自取優先 → API 確認無貨 → 送貨');return;}
                        await _ux({}, {pickupApiNextAt:_ex()+5000}, '只自取：Checkout 期間 API 確認 0 間可用門市；5秒後再查');
                        await _zx('只自取：API 暫無門市；留在 Checkout 等貨，不會轉送貨',"pickup");return;
                    }
                    await _ux({}, {pickupApiNextAt:_ex()+4000}, `Checkout 自取 API 暫不可用（${_api?.reason||_api?.status||'unknown'}）；保持自取並等待`);
                }
                await _zx(`等待 Checkout 載入 ${_store}；庫存判斷由 Apple API 負責`, "checkout"); return;
            }

            const _shipNext = _fulfilSpecificContinue("shipping");
            if (_bx(_shipNext)) {
                await _zx('送貨方式已確認；只使用「繼續填寫送貨地址」進入送貨流程', "checkout");
                await __abNavClick('shipping-specific-continue', () => _fulfilSpecificContinue("shipping"), '繼續填寫送貨地址', 9000, 10000);
                return;
            }
            await _zx('已選直接送貨；等待 Apple 啟用送貨地址下一步（不使用通用 Continue／不直接跳 URL）', "checkout");
            return;
        }

        const _ddx = _34x() || _37x();
        if (_ddx) {
            const _dex = _2zx(_d5x.profile || {}, _34x());
            if (_dex.length) {
                await _3ax(_d5x);
                return;
            }
            await _3ax(_d5x);
            await _0x(180);
            const _dfx = _cwx();
            if (_bx(_dfx)) {
                const _href = String(_dfx.getAttribute?.('href') || "");
                if (/(?:^|\/)404(?:[?#/]|$)/i.test(_href)) {
                    await _zx('Apple 下一步仍在初始化；等待有效結帳連結', "checkout");
                    return;
                }
                await _zx(_34x() ? "送貨及聯絡資料已填妥；繼續前往付款" : "取貨聯絡資料已填妥；繼續前往付款", "checkout");
                await __abNavClick('continue-details', _cwx, "繼續前往付款", 8000, 10000);
                return;
            }
            const _dgx = [...document.querySelectorAll("input[required],select[required],textarea[required]")].filter(_dhx => _9x(_dhx) && !String(_dhx.value || "").trim());
            if (_dgx.length) {
                await _zx(`已自動填寫可識別欄位；仍有 ${_dgx.length}個 Apple 必填欄位未完成`, "guest-profile");
                return;
            }
            await _zx("資料已填寫；等待 Apple 驗證並啟用「繼續前往付款」", "guest-profile");
            return;
        }
        const _dix = _cwx();
        if (_bx(_dix)) {
            const _href = String(_dix.getAttribute?.('href') || "");
            if (/(?:^|\/)404(?:[?#/]|$)/i.test(_href)) {
                await _zx('Apple 下一步仍在初始化；等待有效結帳連結', "checkout");
                return;
            }
            await _zx("自動繼續至下一個結帳步驟", "checkout");
            await __abNavClick('continue-generic', _cwx, "繼續", 7000, 10000);
            return;
        }
        const _djx = [...document.querySelectorAll("input[required],select[required],textarea[required]")].some(_dkx => _9x(_dkx) && !String(_dkx.value || "").trim());
        if (_djx || document.querySelector("form")) {
            await _zx("等待 Apple 結帳表單完成載入", "checkout");
            return;
        }
        await _zx("結帳頁載入中；等待下一個可安全執行步驟", "checkout");
    }
    async function _dlx(_dmx) { const _dnx = _dmx.state || {}, _dox = Number(_dnx.pnfRecoveries || 0); if (_dnx.addInFlight) {
        if (_dox >= 2) {
            await _14x("Apple 連續出現 Page Not Found；已停止避免循環", "pnf");
            return;
        }
        await _ux({ status: "Add 後出現 Page Not Found；直接以購物袋實際數量驗證", stage: "pnf" }, { pnfRecoveries: _dox + 1 }, "PNF → bag verification");
        await _17x("/hk-zh/shop/bag");
        return;
    }
    const _checkoutPnf = Number(_dnx.checkoutPnfRecoveries || 0);
    if (_dnx.checkoutStarted && _checkoutPnf < 1) {
        await _ux({ status: 'Apple 結帳暫時跳到 404；返回購物袋重新建立一次結帳流程', stage: "pnf" }, { checkoutPnfRecoveries: _checkoutPnf + 1, checkoutStarted: false, checkoutPageUrl: "", checkoutPageSeenAt: 0, fulfilmentChoice: "", fulfilmentChosenAt: 0, lastAction: "", lastActionAt: 0 }, 'Checkout 404 → bag controlled retry');
        await _17x("/hk-zh/shop/bag", true);
        return;
    }
    if (_dnx.checkoutStarted && _checkoutPnf >= 1) {
        await _14x('Apple 結帳再次出現 Page Not Found；已停止，避免循環重試', "pnf");
        return;
    }
    await _14x("未送出 Add 前出現 Page Not Found；已停止", "pnf"); }
    async function _dpx() { if (_lx)
        return; _lx = true; try {
        const _dqx = await _rx();
        if (_40x()) {
            if (_dqx?.stage === "license-consumed")
                return;
            if (_dqx?.stage === "license-consume-pending" && _ex() - Number(_dqx?.stageAt || 0) < 5000)
                return;
            const _drx = await _px({ type: "consumeLicense" });
            if (_drx?.ok)
                await _ux({ active: false, status: "已確認 Apple 訂單成功；啟動碼已永久失效", stage: "license-consumed", url: _fx() }, null, "訂單成功 → 啟動碼已註銷");
            else
                await _ux({ active: false, status: "已確認訂單成功；啟動碼註銷等待重新連線", stage: "license-consume-pending", url: _fx() }, null, "訂單成功 → 啟動碼註銷待重試");
            return;
        }
        if (!_dqx?.active)
            return;
        const __monitorGuard=__abStrictMonitorJob(_dqx);
        if(!__monitorGuard.ok){await _14x(__monitorGuard.reason,"monitor-target-mismatch");return;}
        if (await _bax(_dqx))
            return;
        const _dsx = _69x();
        if (_dsx === "payment") {
            await _5sx(_dqx);
            return;
        }
        if (_dsx === "review") {
            await _5zx(_dqx);
            return;
        }
        if (_dsx === "manual-security") {
            await _zx("Apple 要求安全驗證；請你完成，完成後 Bot 會自動續跑", "manual");
            return;
        }
        if (_dsx === "manual-queue") {
            await _zx("Apple 排隊／等待頁；Bot 不會繞過，頁面放行後自動續跑", "manual");
            return;
        }
        if (_dsx === "pnf") {
            await _dlx(_dqx);
            return;
        }
        if (_dsx === "attach") {
            await _7sx(_dqx);
            return;
        }
        if (_dsx === "bag") {
            await _cdx(_dqx);
            return;
        }
        if (_dsx === "checkout") {
            await _d4x(_dqx);
            return;
        }
        if (_dsx === "product") {
            await _7gx(_dqx);
            return;
        }
        await _zx("等待 Apple 頁面進入可識別步驟", "unknown");
    }
    catch (_dtx) {
        const _dux = _dtx?.message || String(_dtx);
        if(/EXTENSION_CONTEXT_INVALIDATED|Extension context invalidated/i.test(_dux)||!__abRuntimeOk()){
            __abContextInvalid=true;
            return;
        }
        try{await _ux({ status: `錯誤：${_dux}`, stage: "error", url: _fx() }, null, `錯誤 ${_dux}`);}catch(_e){}
    }
    finally {
        _lx = false;
    } }
    function _dvx(_dwx = 0) {
        if(_mx||!__abRuntimeOk())return;
        _mx = true;
        setTimeout(() => {
            _mx = false;
            if(!__abRuntimeOk())return;
            _dpx().catch(()=>{});
        }, _dwx);
    }
    new MutationObserver(() => _dvx(80)).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["disabled", "aria-disabled", "class", "value"] });
    window.addEventListener("pageshow", () => _dvx(30));
    window.addEventListener("popstate", () => _dvx(30));
    window.addEventListener("applebot:navigate", () => _dvx(10));
    setInterval(() => _dvx(0), 650);
    _dvx(0);
})();
