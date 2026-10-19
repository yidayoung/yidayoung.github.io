/* A toy test car and two distinct feedback paths, all driven by the scrubber. */
window.UnityAnimation = (() => {
  const clamp = n => Math.max(0,Math.min(1,n));
  const step = (t,a,b) => {const p=clamp((t-a)/(b-a));return p*p*(3-2*p);};
  const mix = (a,b,t) => a+(b-a)*t;
  const text = (x,y,s,size=17) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="800" fill="#294d5c">${s}</text>`;
  const check = `<path d="M-11 0L-2 9L15-12" fill="none" stroke="#608f7c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  const bug = `<ellipse rx="13" ry="17" fill="#c77858" stroke="#915f4d" stroke-width="2"/><path d="M0-15V16M-13-8L-22-14M13-8L22-14M-13 2H-24M13 2H24M-13 12L-21 20M13 12L21 20" stroke="#915f4d" stroke-width="3" stroke-linecap="round"/><circle cy="-20" r="8" fill="#915f4d"/>`;
  const rail = `${[-32,-16,0,16,32].map(x=>`<path d="M${x}-16V16" stroke="#a78358" stroke-width="6" stroke-linecap="round"/>`).join("")}<path d="M-43-9H43M-43 9H43" stroke="#688e88" stroke-width="5" stroke-linecap="round"/><path d="M-43-11H43M-43 7H43" stroke="#d4e4c8" stroke-width="1.5"/>`;
  function create(){
    return `<svg class="unity-explainer object-explainer" viewBox="0 0 1000 562" role="img" aria-labelledby="unity-title unity-desc">
      <title id="unity-title">Unity 自动测试：多轮跑测、提单、更新脚本、继续下一轮</title>
      <desc id="unity-desc">连续三轮示意跑测。每轮发现产品问题并留证提单，或发现测试逻辑缺口并更新脚本。脚本版本与提单记录随轮次积累，完成更新后继续下一轮；Jev 和 LLM 帮助解除当前阻塞。三轮数量和版本为示意，不代表实际统计。</desc>
      <defs>
        <filter id="ut-shadow" x="-45%" y="-50%" width="190%" height="210%"><feDropShadow dx="1" dy="4" stdDeviation="2.5" flood-color="#514833" flood-opacity=".19"/></filter>
        <linearGradient id="ut-paper" x2=".3" y2="1"><stop stop-color="#fffbed"/><stop offset="1" stop-color="#eadbb5"/></linearGradient>
        <linearGradient id="ut-metal" x2=".6" y2="1"><stop stop-color="#b4ccbc"/><stop offset=".5" stop-color="#86aaa0"/><stop offset="1" stop-color="#597f77"/></linearGradient>
        <linearGradient id="ut-paint" x2="0" y2="1"><stop stop-color="#eda783"/><stop offset=".5" stop-color="#d88460"/><stop offset="1" stop-color="#b56e50"/></linearGradient>
        <linearGradient id="ut-glass" x2="1" y2="1"><stop stop-color="#e9f5e9"/><stop offset="1" stop-color="#9fcbca"/></linearGradient>
        <linearGradient id="ut-wood" x2="0" y2="1"><stop stop-color="#f2d7a7"/><stop offset="1" stop-color="#c8a06c"/></linearGradient>
      </defs>
      <image href="assets/unity-scene.png" width="1000" height="562" preserveAspectRatio="xMidYMid slice"/>
      <g class="object-world">
        <g transform="translate(507 112)" filter="url(#ut-shadow)"><rect x="-84" y="-24" width="168" height="45" rx="20" fill="url(#ut-paper)" stroke="#c2b28c" stroke-width="1.5"/>${text(0,4,`<tspan id="ut-round-number">第 1 轮</tspan>`,19)}${[-22,0,22].map((x,i)=>`<circle id="ut-round-dot-${i}" cx="${x}" cy="36" r="4" fill="#b2c3a7"/>`).join("")}</g>
        <path d="M270 385H760A40 40 0 0 1 800 425A40 40 0 0 1 760 463H270A40 40 0 0 1 230 423A40 40 0 0 1 270 385" fill="none" stroke="#5c745b" stroke-width="38" opacity=".13"/>
        <path d="M270 380H760A40 39 0 0 1 800 419A40 39 0 0 1 760 458H270A40 39 0 0 1 230 419A40 39 0 0 1 270 380" fill="none" stroke="#ddcfa8" stroke-width="35"/>
        ${Array.from({length:17},(_,i)=>270+i*29).map(x=>`<path d="M${x} 361V399M${x} 440V476" stroke="#b29469" stroke-width="6" stroke-linecap="round"/>`).join("")}
        <path d="M270 370H760A50 49 0 0 1 810 419A50 49 0 0 1 760 468H270A50 49 0 0 1 220 419A50 49 0 0 1 270 370M270 390H760A30 29 0 0 1 790 419A30 29 0 0 1 760 448H270A30 29 0 0 1 240 419A30 29 0 0 1 270 390" fill="none" stroke="#6f9289" stroke-width="4"/>
        <path d="M270 368H760M270 388H760M270 446H760M270 466H760" stroke="#eef0ce" stroke-width="1.3" opacity=".8"/>
        <g id="ut-gap"><rect x="-44" y="-20" width="88" height="40" rx="8" fill="#c8d3ab"/><rect x="-39" y="-15" width="78" height="30" rx="9" fill="#e2c597" stroke="#bc9668" stroke-width="1.5" stroke-dasharray="4 4"/>${text(0,8,"?",23)}</g>
        <g transform="translate(305 231)" filter="url(#ut-shadow)">
          <path d="M-63-57H64V77H-63Z" fill="#cfbc92" stroke="#a18a64" stroke-width="2"/><rect x="-59" y="-62" width="121" height="132" rx="7" fill="url(#ut-paper)" stroke="#b39d76" stroke-width="1.8"/>
          <path d="M-49-53V62M-48 67H52M-48 72H52" stroke="#d5c69f" stroke-width="1"/>
          ${[-43,-21,1,23,45].map(y=>`<path d="M-67 ${y}Q-79 ${y-7}-67 ${y-10}H-56" fill="none" stroke="#78988a" stroke-width="3" stroke-linecap="round"/>`).join("")}
          ${[0,1,2].map(i=>`<g transform="translate(0 ${-33+i*28})"><rect x="-30" y="-8" width="15" height="15" rx="3" fill="#e4e8cf" stroke="#a7b79b"/><path d="M-4-3H40M-4 3H24" stroke="#99ad98" stroke-width="3" stroke-linecap="round"/><g id="ut-rule-${i}" transform="translate(-23 0) scale(.62)">${check}</g></g>`).join("")}
          <rect x="-24" y="49" width="65" height="24" rx="8" fill="#d2e0c4" stroke="#a1b69b"/>${text(8,66,`<tspan id="ut-script-version">v1</tspan>`,13)}${text(4,106,"测试脚本",18)}
        </g>
        <g id="ut-observer" transform="translate(509 227)" filter="url(#ut-shadow)"><path d="M-27 22Q-33 1-22-4H23Q33 1 27 22L22 43H-22Z" fill="url(#ut-metal)" stroke="#5a8278" stroke-width="3"/><rect x="-34" y="-55" width="68" height="57" rx="20" fill="url(#ut-paper)" stroke="#648d84" stroke-width="3"/><path d="M0-56V-71" stroke="#648d84" stroke-width="3"/><circle cy="-75" r="7" fill="#e2b16e"/><circle cx="-13" cy="-29" r="5" fill="#315563"/><circle cx="12" cy="-29" r="5" fill="#315563"/><path d="M-9-12Q0-5 9-12" fill="none" stroke="#315563" stroke-width="3"/><path d="M28 13L51 28" stroke="#5a8278" stroke-width="10" stroke-linecap="round"/><circle cx="56" cy="35" r="23" fill="url(#ut-glass)" fill-opacity=".75" stroke="#769e9b" stroke-width="6"/><path d="M72 53L88 70" stroke="#a58256" stroke-width="9" stroke-linecap="round"/>${text(0,80,"副驾观察",18)}</g>
        <g transform="translate(509 227)" fill="none" stroke-linecap="round">
          <path d="M-23-46Q0-54 23-46" stroke="#fffdf0" stroke-width="2" opacity=".8"/>
          <circle cx="-14" cy="-31" r="1.5" fill="#fffceb"/><circle cx="11" cy="-31" r="1.5" fill="#fffceb"/>
          <path d="M-22 7V23Q-20 32-13 33" stroke="#c1d8bd" stroke-width="2" opacity=".7"/>
          <path d="M42 28Q47 16 60 19M48 45L64 29" stroke="#fffdf0" stroke-width="2.5" opacity=".75"/>
          <path d="M78 60L82 56M83 65L87 61" stroke="#d9bc86" stroke-width="2"/>
        </g>
        <path id="ut-scan" d="M551 277L379 361L562 361Z" fill="#fff9d3" opacity=".30"/>
        <g id="ut-patch" filter="url(#ut-shadow)"><rect x="-46" y="-22" width="92" height="44" rx="9" fill="url(#ut-paper)" stroke="#fff5da" stroke-width="3"/>${rail}${text(0,-37,"补测试逻辑",17)}</g>
        <g id="ut-car" filter="url(#ut-shadow)">
          <ellipse cy="27" rx="42" ry="8" fill="#58674b" opacity=".16"/>
          <path d="M-38-7L-24-28Q-22-31-17-31H11Q16-31 20-25L30-10H36Q43-10 43-3V15Q43 20 37 20H-36Q-43 20-43 14V0Q-43-7-38-7Z" fill="url(#ut-paint)" stroke="#a37353" stroke-width="2"/>
          <path d="M-32-11L-21-26H-4V-11ZM1-26H11L23-11H1Z" fill="url(#ut-glass)" stroke="#f8e2bc" stroke-width="2"/>
          <path d="M-19-22L-12-16M6-22L12-16M-36 1H32" stroke="#fff0d2" stroke-width="1.5" opacity=".75"/>
          <path d="M-3-8V13M2-4H8" stroke="#ad7351" stroke-width="1.5" stroke-linecap="round"/><rect x="-44" y="9" width="9" height="7" rx="2" fill="#e7b881"/><rect x="36" y="0" width="9" height="9" rx="3" fill="#fff1ba" stroke="#d7ad71"/>
          ${[-25,27].map((x,i)=>`<g transform="translate(${x} 19)"><circle r="13" fill="#3f5c60" stroke="#658078" stroke-width="1.5"/><circle r="7.5" fill="#b8bba0"/><g id="ut-wheel-${i}"><path d="M0-6V6M-6 0H6" stroke="#f6e8bc" stroke-width="2"/></g><circle r="2.5" fill="#69887d"/></g>`).join("")}
        </g>
        <g id="ut-block" transform="translate(701 366)"><path d="M-20 32L-11-40H12L21 32Z" fill="#d49b61" stroke="#a37b54" stroke-width="3"/><path d="M-16-18H17M-18 9H19" stroke="#fff1cd" stroke-width="11"/>${text(0,65,"卡住",17)}</g>
        <g id="ut-jev" transform="translate(686 210)" filter="url(#ut-shadow)"><circle r="34" fill="#d4e6d9" stroke="#759d8d" stroke-width="3"/><path d="M-23 0Q0-27 23 0Q0 27-23 0Z" fill="#fff9e6" stroke="#759d8d" stroke-width="2"/><circle r="10" fill="#547e79"/>${text(0,63,"Jev",18)}</g>
        <g id="ut-uncertain" transform="translate(733 210)">${text(0,7,"?",27)}</g>
        <path id="ut-help-line" d="M711 181Q750 130 776 177" fill="none" stroke="#a898a9" stroke-width="3" stroke-dasharray="5 7"/>
        <g id="ut-llm" transform="translate(791 181)" filter="url(#ut-shadow)"><path d="M-20-16Q-36-29-43-9Q-63 7-40 20H30Q59 16 42-6Q41-30 17-22Q0-42-20-16Z" fill="#e7dce6" stroke="#ab93af" stroke-width="3"/>${text(0,7,"LLM",18)}</g>
        <g id="ut-answer" filter="url(#ut-shadow)"><circle r="22" fill="#e1eccf" stroke="#fff7df" stroke-width="3"/>${check}</g>
        <g id="ut-bug" filter="url(#ut-shadow)">${bug}</g>
        <g id="ut-evidence" transform="translate(320 490)" filter="url(#ut-shadow)"><path d="M-58-17L-43-34H41L58-17V31H-58Z" fill="url(#ut-wood)" stroke="#ad8757" stroke-width="3"/><path d="M-58-17H58" stroke="#ad8757" stroke-width="3"/><rect x="-36" y="-11" width="72" height="34" rx="5" fill="#fff2d3"/>${text(0,12,"提单",17)}<g id="ut-photo" transform="translate(0 -40)"><rect x="-24" y="-19" width="48" height="37" rx="4" fill="#f7f1dc" stroke="#8ba8a1" stroke-width="2"/><path d="M-18 10L-7-3L3 5L12-6L20 10" fill="#a8c4ad"/><circle cx="-11" cy="-9" r="4" fill="#e6bf76"/></g></g>
        ${[0,1,2].map(i=>`<g id="ut-ticket-${i}" filter="url(#ut-shadow)"><path d="M-19-26H9L20-15V26H-19Z" fill="url(#ut-paper)" stroke="#b8a580" stroke-width="1.3"/><rect x="-12" y="-14" width="25" height="16" rx="2" fill="${["#d49e7c","#b7a4c8","#8fb3a4"][i]}"/><path d="M-11 10H10M-11 16H4" stroke="#a1b39b" stroke-width="2"/>${text(0,-3,String(i+1),10)}</g>`).join("")}
        <g id="ut-next" transform="translate(566 405)"><path d="M-20 0A20 20 0 1 1 9 18M9 18V5M9 18L23 15" fill="none" stroke="#6d9b86" stroke-width="4" stroke-linecap="round"/>${text(0,-34,"继续下一轮",17)}</g>
      </g>
    </svg>`;
  }
  function trackPoint(p){
    const total=980+Math.PI*80;
    let d=clamp(p)*total;
    if(d<=490)return {x:270+d,y:380,flip:1};
    d-=490;
    if(d<=Math.PI*40){const a=-Math.PI/2+d/40;return{x:760+40*Math.cos(a),y:419+39*Math.sin(a),flip:-Math.sin(a)};}
    d-=Math.PI*40;
    if(d<=490)return{x:760-d,y:458,flip:-1};
    d-=490;
    const a=Math.PI/2+d/40;return{x:270+40*Math.cos(a),y:419+39*Math.sin(a),flip:-Math.sin(a)};
  }
  function render(global){
    const frame=document.getElementById("scene-frame");
    frame.querySelector(".object-explainer").setAttribute("viewBox",matchMedia("(max-width: 760px)").matches?"170 65 700 497":"0 0 1000 562");
    const el=id=>frame.querySelector(`#ut-${id}`);
    const fade=(id,v)=>el(id).setAttribute("opacity",clamp(v).toFixed(3));
    const move=(id,x,y,r=0,s=1)=>el(id).setAttribute("transform",`translate(${x} ${y}) rotate(${r}) scale(${s})`);
    const round=Math.min(2,Math.floor(global*3));
    const t=global===1?1:global*3-round;
    const gapX=[443,515,585][round];
    const stop=(gapX-65-270)/(980+Math.PI*80);
    const modelStop=(636-270)/(980+Math.PI*80);
    let route;
    if(t<.18)route=mix(0,stop,step(t,0,.18));
    else if(t<.43)route=stop;
    else if(t<.57)route=mix(stop,modelStop,step(t,.43,.57));
    else if(t<.78)route=modelStop;
    else route=mix(modelStop,1,step(t,.78,1));
    const car=trackPoint(route);
    el("car").setAttribute("transform",`translate(${car.x} ${car.y}) scale(${car.flip} 1)`);
    for(let i=0;i<2;i++)el(`wheel-${i}`).setAttribute("transform",`rotate(${(round+route)*2880})`);
    el("round-number").textContent=`第 ${round+1} 轮`;
    for(let i=0;i<3;i++){
      el(`round-dot-${i}`).setAttribute("fill",i<=round?"#d9966d":"#b2c3a7");
      const updated=i<round?1:i===round?step(t,.38,.43):0;
      fade(`rule-${i}`,updated);
      const produced=i<round?1:i===round?step(t,.27,.34):0;
      fade(`ticket-${i}`,produced);
      const fly=i<round?1:i===round?step(t,.28,.38):0;
      move(`ticket-${i}`,mix(car.x,294+i*24,fly),mix(350,455-i*3,fly)-Math.sin(fly*Math.PI)*50,mix(-10,(i-1)*9,fly),.8);
    }
    el("script-version").textContent=`v${round+1+(t>=.43?1:0)}`;
    el("scan").setAttribute("d",`M551 277L${car.x-32} ${car.y-14}L${car.x+42} ${car.y-14}Z`);
    fade("scan",.22+.06*Math.sin(global*70));
    const patch=step(t,.33,.43);
    move("patch",mix(330,gapX,patch),mix(250,380,patch)-Math.sin(patch*Math.PI)*43,mix(-9,0,patch));
    fade("patch",step(t,.29,.33));
    move("gap",gapX,380);fade("gap",1-step(t,.40,.43));
    fade("block",step(t,.52,.56)*(1-step(t,.76,.80)));
    el("block").setAttribute("transform",`translate(711 366) rotate(${mix(0,85,step(t,.75,.80))} 0 30)`);
    fade("jev",step(t,.58,.62));
    fade("uncertain",step(t,.63,.66)*(1-step(t,.73,.76)));
    fade("help-line",step(t,.65,.69));fade("llm",step(t,.67,.71));
    const answer=step(t,.71,.78);
    move("answer",mix(791,680,answer),mix(181,359,answer));
    fade("answer",step(t,.70,.72)*(1-step(t,.79,.82)));
    const evidence=step(t,.20,.29);
    move("bug",mix(gapX-30,320,evidence),mix(343,464,evidence)-Math.sin(evidence*Math.PI)*38,0,mix(.8,.55,evidence));
    fade("bug",step(t,.16,.19)*(1-step(t,.29,.32)));
    fade("evidence",step(global,.06,.09));fade("photo",step(global,.08,.12));
    fade("next",step(t,.90,.96));
  }
  return {create,render};
})();
