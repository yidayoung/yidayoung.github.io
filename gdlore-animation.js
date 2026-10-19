/* Persistent upstream files, selective reads, and incremental task-list writes. */
window.GdloreAnimation = (() => {
  const clamp = n => Math.max(0, Math.min(1, n));
  const step = (t, a, b) => { const p = clamp((t - a) / (b - a)); return p * p * (3 - 2 * p); };
  const mix = (a, b, t) => a + (b - a) * t;
  const colors = ["#e5b977", "#83b4a6", "#b2a1c5"];
  const names = [["需求", "决定", "参考"], ["界面", "配置", "交付"], ["协议", "逻辑", "交付"]];
  const windows = [[.015, .30], [.255, .60], [.51, .865]];
  const milestones = [.29, .54, .79];
  const text = (x, y, s, size = 17) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="800" fill="#335563">${s}</text>`;
  const tick = `<path d="M-6 0L-1 5L8-7" fill="none" stroke="#548c76" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  const point = p => { const a = Math.PI + p * Math.PI * 2; return {x: 500 + 280 * Math.cos(a), y: 403 + 73 * Math.sin(a)}; };
  const filePoint = (t, role, file) => point(t * .33 + role * .275 + file * .045);
  function paper(role, name, badge = "") {
    return `<path d="M-25-33H12L26-19V34H-25Z" fill="url(#gdl-paper)" stroke="#a59b82" stroke-width="1.6"/>
      <path d="M-24-32H12V-20H25" fill="${colors[role]}"/><path d="M12-33V-19H26" fill="#fffae7" stroke="#c7bca2" stroke-width="1"/>
      <rect x="-17" y="-11" width="33" height="22" rx="3" fill="${colors[role]}" opacity=".28"/>
      <path d="M-12-2H11M-12 5H4M-16 20H15M-16 25H7" stroke="#8ea89c" stroke-width="2" stroke-linecap="round"/>
      ${text(0, -18, name, 10)}
      ${badge ? `<circle cx="23" cy="27" r="11" fill="#f8f3dd" stroke="${colors[role]}" stroke-width="2"/>${text(23,31,badge,13)}` : ""}`;
  }
  function desk(x, i, name) {
    return `<g transform="translate(${x} 231)">
      <ellipse cy="63" rx="97" ry="12" fill="#6c6147" opacity=".14"/>
      <g id="gdl-agent-${i}" transform="translate(-23 0)">
        <path d="M-24-17Q-29-44-19-51H19Q29-44 24-17Z" fill="url(#gdl-body-${i})" stroke="#64897e" stroke-width="2"/>
        <path d="M-21-34L-35-11M21-34L35-11" stroke="${colors[i]}" stroke-width="9" stroke-linecap="round"/>
        <rect x="-31" y="-100" width="62" height="52" rx="20" fill="url(#gdl-shell)" stroke="#6f9287" stroke-width="2.4"/>
        <rect x="-24" y="-91" width="48" height="30" rx="13" fill="#cbded0"/><path d="M-19-85H17" stroke="#f9ffe8" stroke-width="2" opacity=".8"/>
        <g id="gdl-eyes-${i}"><circle cx="-11" cy="-77" r="4.5" fill="#355b63"/><circle cx="11" cy="-77" r="4.5" fill="#355b63"/><circle cx="-12" cy="-79" r="1.3" fill="#fff9df"/><circle cx="10" cy="-79" r="1.3" fill="#fff9df"/></g>
        <path d="M-5-57Q0-54 5-57M0-100V-111" fill="none" stroke="#78998c" stroke-width="2"/><circle cy="-115" r="5" fill="${colors[i]}" stroke="#fff0c9" stroke-width="2"/>
      </g>
      <path d="M-89 28H89L98 40H-98Z" fill="url(#gdl-wood)" stroke="#aa895e" stroke-width="2"/><path d="M-96 40H96V47H-96Z" fill="#b58e5f"/><path d="M-78 47V66M78 47V66" stroke="#a7865e" stroke-width="7" stroke-linecap="round"/>
      <path d="M-76 34H76" stroke="#f9dfaa" stroke-width="2" opacity=".7"/>
      <g transform="translate(-26 0)"><rect x="-40" y="-30" width="80" height="56" rx="6" fill="url(#gdl-metal)" stroke="#577e79" stroke-width="2"/><rect x="-33" y="-23" width="66" height="40" rx="3" fill="#edf0d6"/><path d="M-30-20H30" stroke="#fffbea" stroke-width="2"/>
        <circle cx="0" cy="22" r="1.5" fill="#f9f2d7"/><path d="M-47 27H47L51 31H-51Z" fill="#a7c1b0" stroke="#60877c"/>
        <path d="M-25-10H-6M-25-3H11M-25 4H0" stroke="${colors[i]}" stroke-width="3" stroke-linecap="round"/><path id="gdl-cursor-${i}" d="M14 1V10" stroke="#659180" stroke-width="2"/>
      </g>
      <g transform="translate(61 -8) rotate(5)" filter="url(#gdl-soft-shadow)"><rect x="-28" y="-65" width="57" height="91" rx="6" fill="url(#gdl-paper)" stroke="#bba47b" stroke-width="1.6"/><rect x="-12" y="-70" width="25" height="10" rx="3" fill="#8ea89a"/>
        ${text(0,-45,"TASKS",9)}
        ${[0,1,2].map(j=>`<g transform="translate(-14 ${-27+j*18})"><rect x="-5" y="-6" width="11" height="11" rx="2" fill="#e8e9d6" stroke="#b5c2aa"/><path d="M13-2H29M13 2H23" stroke="#b3bca4" stroke-width="2" stroke-linecap="round"/><g id="gdl-task-${i}-${j}">${tick}</g></g>`).join("")}
        ${text(1,17,`<tspan id="gdl-count-${i}">0 / 3</tspan>`,10)}
      </g>
      <g transform="translate(-72 12)"><path d="M-7-15H7V3Q0 11-7 3Z" fill="#f4e7c4" stroke="#ad956e" stroke-width="1.5"/><path d="M8-12Q18-13 17-5Q17 0 8 0" fill="none" stroke="#ad956e" stroke-width="2"/></g>
      ${text(-17,-137,name,18)}
      <rect x="-65" y="55" width="130" height="5" rx="2.5" fill="#bda478"/>
      <rect id="gdl-progress-${i}" x="-65" y="55" width="0" height="5" rx="2.5" fill="${colors[i]}"/>
      <g id="gdl-sync-${i}" transform="translate(84 64)"><circle r="13" fill="#fff6db" stroke="#83ab91" stroke-width="1.5"/><path d="M-5 3V-3H-9L0-10L9-3H5V3" fill="#80a58d"/></g>
    </g>`;
  }
  function create() {
    return `<svg class="gdlore-scene object-explainer" viewBox="0 0 1000 562" role="img" aria-labelledby="gdl-title gdl-desc">
      <title id="gdl-title">gdlore：多文件选择性读取，任务逐项完成，随时同步上下文</title>
      <desc id="gdl-desc">仓中保留多个上游文件，各职能选择需要的文件读取到本地。工作台的三项任务逐项勾选，过程中更新或新增多个文件并同步回仓。所有需求覆盖实现且验收完成后，环才结束。文件名和任务数量为示例。</desc>
      <defs>
        <linearGradient id="gdl-paper" x2=".3" y2="1"><stop stop-color="#fffdf0"/><stop offset="1" stop-color="#eee0ba"/></linearGradient>
        <linearGradient id="gdl-shell" x2=".4" y2="1"><stop stop-color="#fffbea"/><stop offset="1" stop-color="#dacfa9"/></linearGradient>
        <linearGradient id="gdl-metal" x2=".7" y2="1"><stop stop-color="#9abdb0"/><stop offset=".5" stop-color="#739b92"/><stop offset="1" stop-color="#507d77"/></linearGradient>
        <linearGradient id="gdl-wood" x2="0" y2="1"><stop stop-color="#eed2a2"/><stop offset="1" stop-color="#c49a65"/></linearGradient>
        ${colors.map((c,i)=>`<linearGradient id="gdl-body-${i}" x2="1" y2="1"><stop stop-color="${c}"/><stop offset="1" stop-color="#70988d"/></linearGradient>`).join("")}
        <filter id="gdl-soft-shadow" x="-40%" y="-40%" width="180%" height="190%"><feDropShadow dx="1" dy="3" stdDeviation="2" flood-color="#665336" flood-opacity=".19"/></filter>
      </defs>
      <image href="assets/gdlore-scene.png" width="1000" height="562" preserveAspectRatio="xMidYMid slice"/>
      <g class="object-world">
        <ellipse cx="500" cy="415" rx="304" ry="85" fill="#967347" opacity=".17"/>
        <ellipse cx="500" cy="408" rx="280" ry="73" fill="none" stroke="#6f8f7b" stroke-width="46"/>
        <ellipse cx="500" cy="403" rx="280" ry="73" fill="none" stroke="url(#gdl-metal)" stroke-width="43"/>
        <ellipse cx="500" cy="403" rx="280" ry="73" fill="none" stroke="#b8c9ab" stroke-width="33"/>
        <ellipse id="gdl-belt" cx="500" cy="403" rx="280" ry="73" fill="none" stroke="#8da78c" stroke-width="28" stroke-dasharray="2 17"/>
        <ellipse cx="500" cy="401" rx="300" ry="94" fill="none" stroke="#f2dfb2" stroke-width="1.5" opacity=".6"/>
        <path d="M461 328L475 331L463 339M540 469L525 477L540 482" fill="none" stroke="#fff6d6" stroke-width="3" stroke-linecap="round"/>
        <g transform="translate(500 397)" filter="url(#gdl-soft-shadow)"><path d="M-88-36V-48H-24L-11-36H88V30H-88Z" fill="#a7bca0" stroke="#7b9b83" stroke-width="2"/><path d="M-95-20H95L87 36H-87Z" fill="url(#gdl-paper)" stroke="#bea47a" stroke-width="2"/>
          ${text(0,3,"上下文仓",17)}
          ${[-38,0,38].map((x,i)=>`<g transform="translate(${x} 21)"><rect x="-10" y="-8" width="20" height="16" rx="3" fill="${colors[i]}"/><g id="gdl-covered-${i}">${tick}</g></g>`).join("")}
        </g>
        ${[0,1,2].map(j=>`<g id="gdl-seed-${j}" filter="url(#gdl-soft-shadow)">${paper(0,["背景","拆分","约定"][j])}</g>`).join("")}
        ${[0,1,2].map(i=>[0,1,2].map(j=>`<g id="gdl-output-${i}-${j}" filter="url(#gdl-soft-shadow)">${paper(i,names[i][j],j===1?`<tspan id="gdl-revision-${i}">+</tspan>`:"+")}</g>`).join("")).join("")}
        ${[285,500,715].map((x,i)=>desk(x,i,["策划","客户端","服务端"][i])).join("")}
        ${[0,1,2].map(i=>[0,1].map(j=>`<g id="gdl-read-${i}-${j}" filter="url(#gdl-soft-shadow)">${paper(Math.max(0,i-1),i===0?["背景","拆分"][j]:names[i-1][j])}</g>`).join("")).join("")}
        <g id="gdl-select"><ellipse id="gdl-selection" rx="25" ry="31" fill="none" stroke="#fff7d5" stroke-width="3" stroke-dasharray="4 3"/>${text(500,514,"按需读取 · 边做边同步",16)}</g>
        <g id="gdl-qa" transform="translate(680 493)"><circle r="23" fill="url(#gdl-shell)" stroke="#729c96" stroke-width="5"/><path d="M17 18L30 31" stroke="#aa875b" stroke-width="8" stroke-linecap="round"/><circle cx="-7" cy="-7" r="7" fill="#fffdf0" opacity=".6"/><g id="gdl-accepted">${tick}</g>${text(-1,51,"验收",16)}</g>
        <g transform="translate(822 401)"><path d="M0 26V-30" stroke="#a48459" stroke-width="7" stroke-linecap="round"/><g id="gdl-gate-arm"><rect x="-36" y="-35" width="72" height="12" rx="5" fill="url(#gdl-wood)" stroke="#a7865c" stroke-width="1.5"/><path d="M-28-34L-18-24M-5-34L5-24M18-34L28-24" stroke="#fff2d3" stroke-width="5"/></g></g>
        <g id="gdl-finished" transform="translate(813 488)"><circle r="24" fill="#e0eccd" stroke="#789b7d" stroke-width="2"/>${tick}${text(0,49,"功能完成",16)}</g>
      </g>
    </svg>`;
  }
  function render(t) {
    const frame = document.getElementById("scene-frame");
    frame.querySelector(".object-explainer").setAttribute("viewBox", matchMedia("(max-width: 760px)").matches ? "160 65 720 497" : "0 0 1000 562");
    const el = id => frame.querySelector(`#gdl-${id}`);
    const fade = (id,v) => el(id).setAttribute("opacity",clamp(v).toFixed(3));
    const move = (id,x,y,r=0,s=1) => el(id).setAttribute("transform",`translate(${x} ${y}) rotate(${r}) scale(${s})`);
    el("belt").setAttribute("stroke-dashoffset",String(-Math.min(t,.95)*350));
    for(let j=0;j<3;j++){const p=filePoint(t,-1,j);move(`seed-${j}`,p.x,p.y,-8+j*6,.57);}
    windows.forEach(([start,end],i)=>{
      const local=clamp((t-start)/(end-start));
      const sx=[285,500,715][i];
      let completed=0;
      for(let j=0;j<3;j++){
        const done=step(local,milestones[j],milestones[j]+.035);
        fade(`task-${i}-${j}`,done);
        if(done>=1)completed++;
        const p=filePoint(t,i,j);
        if(j===1){
          // First task creates two files. The second task revises this same file,
          // rather than inventing another document with an update badge.
          const first=step(local,.32,.44),readOwn=step(local,.46,.52),writeBack=step(local,.565,.69);
          let x=mix(sx+22,p.x,first),y=mix(247,p.y,first)-Math.sin(first*Math.PI)*35;
          x=mix(x,sx+22,readOwn);y=mix(y,247,readOwn);
          x=mix(x,p.x,writeBack);y=mix(y,p.y,writeBack)-Math.sin(writeBack*Math.PI)*35;
          move(`output-${i}-${j}`,x,y,mix(5,-2,first),.57);
          fade(`output-${i}-${j}`,step(local,.30,.32));
        }else{
          const sync=step(local,milestones[j]+.025,milestones[j]+.15);
          move(`output-${i}-${j}`,mix(sx+22,p.x,sync),mix(247,p.y,sync)-Math.sin(sync*Math.PI)*35,mix(5,-8+j*6,sync),.57);
          fade(`output-${i}-${j}`,step(local,milestones[j],milestones[j]+.025));
        }
      }
      el(`revision-${i}`).textContent=local>=.565?"↻":"+";
      el(`count-${i}`).textContent=`${completed} / 3`;
      el(`progress-${i}`).setAttribute("width",String(130*completed/3));
      const syncing=milestones.reduce((v,m)=>Math.max(v,step(local,m+.02,m+.05)*(1-step(local,m+.14,m+.19))),0);
      fade(`sync-${i}`,syncing);
      el(`cursor-${i}`).setAttribute("opacity", t>start&&t<end ? String(.35+.65*Math.abs(Math.sin(local*25))) : ".4");
      el(`eyes-${i}`).setAttribute("transform",`translate(0 -77) scale(1 ${Math.abs(Math.sin(t*23+i))<.08?.2:1}) translate(0 77)`);
      for(let j=0;j<2;j++){
        const source=i===0?filePoint(t,-1,j):filePoint(t,i-1,j);
        const p=step(local,.01+j*.06,.18+j*.06);
        move(`read-${i}-${j}`,mix(source.x,sx-45+j*28,p),mix(source.y,246+j*7,p)-Math.sin(p*Math.PI)*42,-8+j*13,.53);
        fade(`read-${i}-${j}`,step(local,.005+j*.05,.035+j*.05)*(1-step(local,.27,.33)));
      }
      fade(`covered-${i}`,step(t,[.71,.80,.87][i],[.75,.84,.90][i]));
    });
    const selected=t<.255?0:t<.51?1:2;
    const source=selected===0?filePoint(t,-1,0):filePoint(t,selected-1,0);
    move("selection",source.x,source.y,0,.65);
    fade("select",step(t,.02,.08)*(1-step(t,.87,.92)));
    fade("qa",step(t,.85,.90));
    fade("accepted",step(t,.92,.96));
    el("gate-arm").setAttribute("transform",`rotate(${mix(0,-82,step(t,.96,.99))})`);
    fade("finished",step(t,.98,1));
  }
  return {create,render};
})();
