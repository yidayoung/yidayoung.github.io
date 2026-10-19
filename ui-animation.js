/* Resource-free primitives -> locked project choices -> a real composed page. */
window.UiAnimation = (() => {
  const clamp=n=>Math.max(0,Math.min(1,n));
  const step=(t,a,b)=>{const p=clamp((t-a)/(b-a));return p*p*(3-2*p);};
  const mix=(a,b,t)=>a+(b-a)*t;
  const text=(x,y,s,size=16)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="800" fill="#365766">${s}</text>`;
  const lock=`<rect x="-6" y="-2" width="12" height="10" rx="2" fill="#c6ab72" stroke="#987d4d" stroke-width="1"/><path d="M-4-2V-7A4 4 0 0 1 4-7V-2" fill="none" stroke="#987d4d" stroke-width="2"/><circle cy="3" r="1.4" fill="#fff4cf"/>`;
  const button=(color,label,w=100)=>`<rect x="${-w/2}" y="-18" width="${w}" height="36" rx="12" fill="${color}" stroke="#fff4d4" stroke-width="2"/><path d="M${-w/2+12}-11H${w/2-12}" stroke="#fff6df" opacity=".4" stroke-width="2" stroke-linecap="round"/><text y="6" text-anchor="middle" font-size="16" font-weight="800" fill="#fff6e2">${label}</text>`;
  const primitives=[
    ["图片",`<rect x="-22" y="-18" width="44" height="34" rx="3"/><path d="M-17 11L-4-3L4 5L13-5L20 7"/><circle cx="-9" cy="-9" r="3"/>`],
    ["按钮",`<rect x="-25" y="-13" width="50" height="26" rx="8"/><path d="M-11 0H11"/>`],
    ["文本",`<path d="M-16-19H16M0-19V17M-8 17H8"/>`],
    ["滚动条",`<rect x="-23" y="-17" width="46" height="34" rx="3"/><path d="M14-12V12M14-5V5" stroke-width="5"/>`],
    ["Checkbox",`<rect x="-16" y="-16" width="32" height="32" rx="4"/><path d="M-9-1L-2 7L11-8"/>`],
  ];
  function create(){return `<svg class="ui-explainer object-explainer" viewBox="0 0 1000 562" role="img" aria-labelledby="ui-title ui-desc">
    <title id="ui-title">L0 无资源通用控件，L1 锁定项目资源与样式，L2 选择拼装页面</title>
    <desc id="ui-desc">图片、按钮、文本、滚动条和 Checkbox 先以无资源轮廓表示。项目图片与样式装入后形成多个锁定选型，再选择按钮与文本拼成真实页面，经过转换契约输出 Unity 资产。</desc>
    <defs><filter id="ui-soft-shadow" x="-30%" y="-40%" width="170%" height="190%"><feDropShadow dx="1" dy="4" stdDeviation="3" flood-color="#625038" flood-opacity=".18"/></filter><linearGradient id="ui-paper" x2=".3" y2="1"><stop stop-color="#fffdf0"/><stop offset="1" stop-color="#eedeb6"/></linearGradient></defs>
    <image href="assets/ui-scene.png" width="1000" height="562" preserveAspectRatio="xMidYMid slice"/>
    <g class="object-world">
      <g id="ui-primitives" filter="url(#ui-soft-shadow)">
        ${text(346,182,"L0 · 无资源",20)}
        ${primitives.map(([name,icon],i)=>`<g transform="translate(${244+i%3*100} ${254+Math.floor(i/3)*102})"><circle r="39" fill="url(#ui-paper)" stroke="#ccb992" stroke-width="1.5"/><g fill="none" stroke="#8ea69c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${icon}</g>${text(0,59,name,13)}</g>`).join("")}
      </g>
      <g id="ui-library" filter="url(#ui-soft-shadow)">
        <path d="M237 221H569L583 413H223Z" fill="#afc3ad" stroke="#78988b" stroke-width="2"/><path d="M223 413H583V424H223Z" fill="#7e9f8c"/>
        ${text(402,189,"L1 · 项目选型",20)}
        <g transform="translate(326 267)">${button("#dd8566","主按钮",126)}<g transform="translate(69 -23)">${lock}</g></g>
        <g transform="translate(489 267)">${button("#82a99b","次按钮",106)}<g transform="translate(58 -23)">${lock}</g></g>
        <path d="M264 297H388M264 293V301M388 293V301" stroke="#779385" stroke-width="1.5"/>${text(326,317,"背景图 / 尺寸",12)}
        <g transform="translate(323 357)">${text(0,0,"标题",25)}<g transform="translate(53 -13)">${lock}</g></g>
        <g transform="translate(485 357)">${text(0,0,"正文",16)}<g transform="translate(47 -10)">${lock}</g></g>
        ${text(407,395,"字体 / 字号 / 颜色",13)}
      </g>
      <g id="ui-page" filter="url(#ui-soft-shadow)"><rect x="609" y="213" width="220" height="236" rx="16" fill="url(#ui-paper)" stroke="#b49d78" stroke-width="2"/><rect x="619" y="223" width="200" height="35" rx="8" fill="#9bb7a3"/>
        ${text(719,189,"L2 · 真实页面",20)}
        <rect x="636" y="273" width="166" height="82" rx="8" fill="#d5e1c3" stroke="#b3c5a5"/>
        <path d="M644 346L682 301L716 329L750 293L796 346" fill="#9dbba5"/><circle cx="666" cy="292" r="8" fill="#ecd79c"/>
        <path d="M645 372H792M645 383H761" stroke="#b7bea3" stroke-width="3" stroke-linecap="round"/>
      </g>
      <g id="ui-chosen-button" filter="url(#ui-soft-shadow)">${button("#dd8566","主按钮",126)}</g>
      <g id="ui-chosen-text">${text(0,0,"标题",25)}</g>
      <g id="ui-contract" filter="url(#ui-soft-shadow)"><path d="M-42-40H23L42-21V40H-42Z" fill="#d8e4d5" stroke="#99b09b" stroke-width="2"/><path d="M-24 0H24M13-10L24 0L13 10" fill="none" stroke="#789b85" stroke-width="4" stroke-linecap="round"/>${text(0,65,"转换契约",15)}</g>
      <g id="ui-assets" filter="url(#ui-soft-shadow)"><path d="M-52-27L0-52L52-27V36L0 61L-52 36Z" fill="#aac4b5" stroke="#72988b" stroke-width="2"/><path d="M-52-27L0-3L52-27M0-3V61" fill="none" stroke="#72988b" stroke-width="2"/><path d="M-34-33L16-10" stroke="#dbe8ca" stroke-width="5"/>${text(0,90,"Prefab / UXML",17)}</g>
    </g></svg>`;}
  function render(t){
    const frame=document.getElementById("scene-frame");
    frame.querySelector(".ui-explainer").setAttribute("viewBox",matchMedia("(max-width: 760px)").matches?"175 145 675 375":"0 0 1000 562");
    const el=id=>frame.querySelector(`#ui-${id}`);
    const fade=(id,n)=>el(id).setAttribute("opacity",clamp(n).toFixed(3));
    const move=(id,x,y,s=1)=>el(id).setAttribute("transform",`translate(${x} ${y}) scale(${s})`);
    fade("primitives",1-step(t,.17,.24));fade("library",step(t,.19,.28)*(1-step(t,.69,.78)));
    fade("page",step(t,.37,.44)*(1-step(t,.78,.87)));
    const select=step(t,.42,.58);
    move("chosen-button",mix(326,719,select),mix(267,414,select)-Math.sin(select*Math.PI)*48);
    move("chosen-text",mix(323,719,select),mix(357,248,select)-Math.sin(select*Math.PI)*30);
    fade("chosen-button",step(t,.39,.43)*(1-step(t,.78,.87)));fade("chosen-text",step(t,.39,.43)*(1-step(t,.78,.87)));
    const convert=step(t,.65,.77);move("contract",mix(499,575,convert),mix(320,319,convert));
    fade("contract",step(t,.62,.68)*(1-step(t,.80,.87)));
    move("assets",mix(650,706,step(t,.82,.96)),340,mix(.7,1,step(t,.82,.96)));fade("assets",step(t,.82,.90));
  }
  return {create,render};
})();
