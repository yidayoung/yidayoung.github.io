(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const projects = {
    knot: {
      title: "Knot",
      eyebrow: "01 / A WORKBENCH FOR AGENTS",
      lead: "把仓库、工具和角色装配成专用 Agent。业务把任务交进来，再把约定好的结果接回去。",
      state: "两类分析业务已用于一个在研项目",
      phases: [
        [
          "准备材料",
          "代码仓库、Skills、MCP 与角色提示词，都是可以管理和复用的配置。",
        ],
        [
          "装配好帮手",
          "把需要的资料和工具组合起来，保存为可被调用的定制 Agent。",
        ],
        [
          "接一张委托",
          "外部业务通过 API 指定 Agent、任务、回调地址与 JSON 返回约定。",
        ],
        [
          "带着工具处理",
          "平台创建 run，Agent 结合项目代码、Skills 与日志等上下文执行分析。",
        ],
        [
          "把结果交回去",
          "按约定 JSON 回调业务系统，由业务端继续使用结构化结果。",
        ],
      ],
      facts: [
        [
          "从问题出发",
          "让分析进入业务流程",
          "错误收集和平台配套设计。新错误去重后触发分析，JSON 回调回填记录；客户端构建失败则经 Webhook 进入分析，先确认接收，再交付报告。",
        ],
        [
          "我做的部分",
          "独立设计开发平台",
          "负责平台架构、项目配置管理、业务接入和结果交付。复用 Pi 的 Agent 内核；构建分析 Skill 由客户端同事提供。",
        ],
        [
          "实际走到哪里",
          "已使用，也保留边界",
          "两类分析在一个在研项目持续运行。近期观察的数次构建分析调用耗时约 1 分钟。远程 Code Agent runtime 已验证，尚未投入日常使用。",
        ],
      ],
      more: [
        "为什么收敛到项目制？",
        "共享个人 Agent 时，仓库、密钥、MCP 鉴权和运行环境很快与个人身份交织。最终围绕项目整理 Agent 及其依赖，牺牲一部分自由度，让配置和使用更清楚。当前 shell 运行在 Agent Server 宿主机，不能声称具有安全沙箱。分析结果用于辅助定位，不自动修复。",
      ],
    },
    gdlore: {
      title: "gdlore",
      eyebrow: "02 / CONTEXT THAT TRAVELS",
      lead: "多个文件在上下文仓中流转。各职能按需读取上游资料，在本地逐项完成任务，过程中就能更新或新增文件，让下游接着做。",
      state: "策划、客户端、服务端完成一轮真实交付与验收",
      phases: [
        [
          "需求进入流水线",
          "一个功能拆成需求点。背景、需求、决定等以多个文件保存在同一功能与版本的上下文仓中；一个职能也会产出多个文件。",
        ],
        [
          "取出，在本地开发",
          "各职能选择需要的上游文件读取到本地，原文件仍保留在仓中。用本职能 Skill 推进 tasklist，任务逐项勾选。",
        ],
        [
          "放回，让下游接续",
          "每完成一项任务，就可以把阶段产出同步回仓：更新已有文件，或新增自己的文件。无需等整份 tasklist 完成，下游就能按需接续。",
        ],
        [
          "绕环补齐需求点",
          "交接可以反向发生，开发也向策划交付实现与配置说明。尚未覆盖的需求继续在环中推进，QA 可提前读取需求、准备验收。",
        ],
        [
          "实现与验收，都完成",
          "所有已经拆分的需求点都覆盖实现，并且验收完成，这个功能才结束流转。动画表达设计流程；实际验证范围见下方说明。",
        ],
      ],
      facts: [
        [
          "要解决的事",
          "减少反复解释",
          "固定文件读取接口，让同职能 Agent 的输入一致；文件内部格式由上下游共定。需求背景、讨论和决策理由与产物一起保留。",
        ],
        [
          "我做的部分",
          "把协作骨架搭起来",
          "设计实现整体架构、上下文仓、交接规则、状态记录、CLI 与配套工具，并提供指导编写职能 Skill 的 Skill。",
        ],
        [
          "实际走到哪里",
          "一轮完整验证",
          "“避难所改造”经三职能协作、测试和验收。首轮也发现跨系统兼容和配置生成工具缺口；后续使用主要由一人承担多个职能。",
        ],
      ],
      more: [
        "它也在检查：哪里还没准备好？",
        "常规约定需要人反复解释，说明规则或上下文还不够；Agent 无法操作，则说明工具能力需要补齐。人员继续负责业务决策与评审。自动复盘协作卡点与简单功能全自动交付仍是后续方向。",
      ],
    },
    unity: {
      title: "Unity 自动测试",
      eyebrow: "03 / TRY, OBSERVE, TRY AGAIN",
      lead: "一轮跑测发现问题，留下提单，或把缺失逻辑补进测试脚本。带着更新后的脚本继续下一轮，副驾一路观察，Jev / LLM 协助解除当前阻塞。",
      state: "初步验证有效 · 尚未成为 QA 日常流程",
      phases: [
        [
          "第一轮，发现问题",
          "小车代表按脚本跑测。副驾持续观察，产品问题收集界面、步骤和截图；测试逻辑缺口进入脚本补充路径。",
        ],
        [
          "留证提单，更新脚本",
          "产品问题按指纹合并提单；明确的测试逻辑缺口补进脚本。当前阻塞先用 Jev，置信度不足再请 LLM 协助。",
        ],
        [
          "第二轮，带着更新重跑",
          "上一轮补过的逻辑保留在新版本脚本中，再发起跑测。遇到新的问题，继续提单或补测试逻辑，已有记录不会清空。",
        ],
        [
          "第三轮，继续发现和补充",
          "每轮重复“跑测—发现—提单或更新脚本—重跑”。脚本版本与问题证据持续积累，不是一次跑完就结束。",
        ],
        [
          "更新完成，再跑下一轮",
          "三轮仅用于演示迭代。补好的测试脚本可继续用于下一轮，产品缺陷仍由开发确认和修复，不表现为自动修复产品源码。",
        ],
      ],
      facts: [
        [
          "已有基础与新增",
          "让界面变得可定位",
          "复用项目已有的客户端点击操作库和 Unity Server；新增 UI 层级 JSON 导出，以及按结构描述定位与点击控件的能力。",
        ],
        [
          "两层反馈",
          "副驾观察 + 即时兜底",
          "副驾持续收集问题并总结；明确的测试逻辑缺口及时补进脚本。规则未命中先用 Jev，置信度不足再调用 LLM；Agent 也会定期看状态并重跑验证。",
        ],
        [
          "实际走到哪里",
          "发现过真实问题",
          "不到一周的实际开发完成初步验证，首轮发现的多个客户端问题经同事确认并修复。准备交付 QA 时离职，尚未进入日常测试。",
        ],
      ],
      more: [
        "产品缺陷和脚本缺口，是两件事",
        "动画中的补片表示补充测试执行逻辑，不是自动修复 Unity 产品源码。产品缺陷会分类、按指纹合并、附带复现材料并打通 Jira 提单，由客户端开发确认与修复。也不是每次点击都由 Agent 规划。",
      ],
    },
    ui: {
      title: "Agent 辅助 UI 生成",
      eyebrow: "04 / SMALL PIECES, CLEAR RULES",
      lead: "先定义无项目资源的通用控件，再把资源与样式锁定成可选的项目元素。最后从这些选型中拼出真实页面，把自由问答题变成绝大多数的选择题。",
      state: "既有 Prefab 完整还原验证 · 新需求交付尚未运行",
      phases: [
        ["L0 通用控件定义", "不含项目资源的行业通用 UI 元素：图片、按钮、文本、滚动条、Checkbox 等。这里只定义元素及其属性，不指定某款游戏的图片或字体。"],
        [
          "L1 项目元素选型",
          "填入项目资源，形成多个可用选型。例如按钮锁定背景图与尺寸，文本锁定字体、字号和颜色；生成页面时从已定义的按钮、文本等选型中选择。",
        ],
        [
          "L2 拼成页面",
          "选择合适的 L1 按钮、文本、图片等元素，填入内容并安排布局，真正拼装一个 UI 页面。以组合与选型为主，少量属性按项目明确允许的范围调整。",
        ],
        [
          "经转换契约",
          "Unity 工程的自定义规则由转换契约处理，避免反向压进 UI 设计规范。",
        ],
        [
          "交付 Unity 资产",
          "工具链支持输出 UGUI Prefab 与 UI Toolkit UXML。既有功能 Prefab 已做还原验证。",
        ],
      ],
      facts: [
        [
          "从项目规范出发",
          "从通用定义到项目选型",
          "与客户端同事共同制定三层 JSON：L0 定义无资源的通用控件；L1 填充项目资源，锁定按钮背景与尺寸、文本字体与字号等，提供多个选型；L2 用这些 L1 元素组合真实页面。",
        ],
        [
          "我做的部分",
          "从描述到可用资产",
          "开发页面生成 Skill、转换器和可视化工作台。策划案先形成页面设计文本，人工对齐后，再生成 Unity 可用资产。",
        ],
        [
          "实际走到哪里",
          "已有页面还原验证",
          "完成既有功能 Prefab 的完整还原验证；真实新需求制作与交付尚未运行。工具链同时支持 UXML 输出。",
        ],
      ],
      more: [
        "为什么放弃 HTML 到 UI？",
        "HTML 的表述能力太强，可以自由创造布局与样式；但项目 UI 的目标是遵守既有规范，规范在这种自由表达中反而成为额外限制。于是把资源、字体、字号、颜色和尺寸等预先落实为 L1 选型，再用 L2 组合页面：把自由的问答题，变成绝大多数的选择题。",
      ],
    },
    go: {
      title: "Go 热更新",
      eyebrow: "05 / KEEP THE GAME GOING",
      lead: "棋局还在，只换规则。System 持有同一份数据，Controller 换成新实现，后面的调用接着走。",
      state: "用于两个经过线上测试的项目 · 主要用于问题修复",
      phases: [
        [
          "棋局一直在",
          "System 是单例，持有业务数据和 ctl 接口。ctl v1 使用这份数据执行逻辑。",
        ],
        ["准备新规则", "更新符合约定的 Controller 包，创建新的 ctl v2。"],
        [
          "拿同一份数据",
          "新 ctl 从所属 System 获取已有数据，不重建 System，也不重置业务数据。",
        ],
        [
          "在串行边界替换",
          "逻辑处理和热更新在单 goroutine 中串行发生；覆盖唯一 key 注册，必要时卸载清理。",
        ],
        [
          "换规则，继续走",
          "System 的接口绑定新 ctl，后续调用进入 v2，业务数据继续保留。",
        ],
      ],
      facts: [
        [
          "我的关键改动",
          "分开数据和逻辑",
          "在已有按包热更新基础上，提出 System 持数据、Controller 实例化 ctl，再通过接口绑定，使业务状态和逻辑替换分离。",
        ],
        [
          "实现要点",
          "生命周期也要处理",
          "基于 Go plugin 与 hotswap。新建幂等、唯一 key 覆盖以及卸载清理避免重复注册；用 Go 模板和 Makefile 固化模块结构。",
        ],
        [
          "实际范围",
          "明确哪些可以更新",
          "用于两个经过线上测试的项目。通常热更符合 System + Controller 约定的顶层 Controller 包，不支持任意包完整热更，也不支持数据结构变更。",
        ],
      ],
      more: [
        "为什么切换必须发生在串行边界？",
        "游戏逻辑在单 goroutine 执行，热更新与逻辑处理串行发生，避免一段业务运行到一半时并发更换实现。动画里的棋子、金币和等级是示例状态；切换期间始终保留同一份数据。",
      ],
    },
  };
  const keys = Object.keys(projects);
  const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
  const ease = (t) => (t = clamp(t)) * t * (3 - 2 * t);
  const segment = (t, a, b) => ease((t - a) / (b - a));
  const lerp = (a, b, t) => a + (b - a) * t;
  const label = (x, y, text, w = 140, color = "#fff7df") =>
    `<g transform="translate(${x} ${y})"><rect width="${w}" height="29" rx="7" fill="${color}" stroke="#fffaf0" stroke-width="2"/><text x="${w / 2}" y="19" text-anchor="middle" font-size="11">${text}</text></g>`;
  const paper = (id, x, y, w, h, title, color = "#fffae9", content = "") =>
    `<g id="${id}" transform="translate(${x} ${y})" filter="url(#object-shadow)"><path d="M0 0H${w - 15}L${w} 15V${h}H0Z" fill="${color}" stroke="#bca784" stroke-width="1.5"/><path d="M${w - 15} 0V15H${w}" fill="#e0d7b6"/><text x="${w / 2}" y="26" font-size="13" text-anchor="middle">${title}</text>${content || `<path d="M15 42H${w - 15}M15 53H${w - 28}M15 64H${w - 20}" stroke="#c2c6ad" stroke-width="3" stroke-linecap="round"/>`}</g>`;
  const scene = (key, content) =>
    `<svg viewBox="0 0 1000 562" role="img" aria-labelledby="scene-title scene-desc"><title id="scene-title">${projects[key].title}，交互原理演示</title><desc id="scene-desc">使用下方播放、重播、进度条和阶段按钮查看完整机制。当前阶段说明位于演示下方。</desc><defs><filter id="object-shadow" x="-30%" y="-30%" width="170%" height="180%"><feDropShadow dx="2" dy="6" stdDeviation="3" flood-color="#4d4335" flood-opacity=".21"/></filter><pattern id="grid" width="31" height="31" patternUnits="userSpaceOnUse"><path d="M31 0H0V31" fill="none" stroke="#fff" opacity=".3"/></pattern><linearGradient id="paper-blue" x2="0" y2="1"><stop stop-color="#b1d5db"/><stop offset="1" stop-color="#8cb7c6"/></linearGradient></defs><image href="assets/${key}-scene.png" width="1000" height="562" preserveAspectRatio="xMidYMid slice"/><g transform="translate(-140 -98) scale(1.28)">${content}</g></svg>`;
  const scenes = {
    knot: () =>
      scene(
        "knot",
        `
      ${label(391, 172, "Knot / 配置与任务工作台", 218)}
      <ellipse cx="500" cy="436" rx="236" ry="19" fill="#a97847" opacity=".12"/>
      <g transform="translate(331 280)" filter="url(#object-shadow)"><path d="M0 0H330L354 112H-24Z" fill="#83a6a1" stroke="#587d79" stroke-width="3"/><path d="M-24 112H354V124H-24Z" fill="#628982"/><path d="M13 10H317L333 96H-2Z" fill="#e5e7ce" stroke="#b6c8b0"/><path d="M100 18V90M215 18V90" stroke="#becab1" stroke-dasharray="4 4"/><text x="165" y="76" text-anchor="middle" font-size="13">定制 Agent</text></g>
      ${paper("repo", 232, 243, 91, 81, "仓库", "#d2e7e3")}${paper("skills", 351, 222, 91, 81, "Skills", "#efe2b0")}${paper("mcp", 479, 226, 91, 81, "MCP", "#d7ddeb")}${paper("role", 608, 244, 108, 81, "角色提示词", "#f1d9bd")}
      <g id="saved-agent" filter="url(#object-shadow)"><path d="M391 289L407 264H594L610 289Z" fill="#73998d" stroke="#4f7b71" stroke-width="2"/><rect x="389" y="288" width="223" height="88" rx="8" fill="#6b9286" stroke="#4f7b71" stroke-width="3"/><path d="M412 285V260Q412 253 420 253H445Q453 253 453 260V285" fill="#e5d8ae" stroke="#8aab93" stroke-width="2"/><path d="M468 285V258H500V285M516 285V258H548V285M563 285V258H590V285" fill="#d8c999" stroke="#8aab93" stroke-width="2"/><path d="M398 312H602" stroke="#a1b69c" stroke-width="3"/><rect x="435" y="325" width="132" height="31" rx="5" fill="#f9efd3"/><text x="500" y="345" text-anchor="middle" font-size="12">✓ 定制分析 Agent</text></g>
      ${paper("task", 209, 365, 151, 93, "业务委托 / API", "#fff5d6", `<text x="15" y="47" font-size="10">指定 Agent + 本次任务</text><text x="15" y="65" font-size="10">回调地址 + JSON 约定</text><path d="M15 77H131" stroke="#d3bf95"/>`)}
      <g id="processing"><circle cx="500" cy="335" r="31" fill="#fff8e2" stroke="#9eb7a4" stroke-width="3"/><g id="tool-turn"><path d="M481 340L510 318L517 328L488 350Z" fill="#8fadb8" stroke="#567e8b" stroke-width="2"/><circle cx="485" cy="346" r="4" fill="#f9efd4"/></g><text x="500" y="383" font-size="11" text-anchor="middle">读取代码 · 调用工具 · 分析</text></g>
      ${paper("result", 644, 357, 153, 101, "JSON 结果回调", "#dfeacb", `<text x="15" y="49" font-size="11" font-family="monospace">{ conclusion,</text><text x="26" y="67" font-size="11" font-family="monospace">evidence }</text><text x="15" y="87" font-size="10">→ 回填业务系统</text>`)}
      <g id="knot-check">${label(622, 471, "✓ 业务系统接收结果", 170, "#e6edce")}</g>`,
      ),
    gdlore: () => window.GdloreAnimation.create(),
    unity: () => window.UnityAnimation.create(),
    ui: () => window.UiAnimation.create(),
    go: () =>
      scene(
        "go",
        `
      ${label(390, 163, "System / 同一份业务数据", 243)}
      <g transform="translate(290 280)" filter="url(#object-shadow)"><path d="M0 0H322L356 149H-31Z" fill="#d6bb83" stroke="#ae9464" stroke-width="3"/><path d="M-31 149H356V162H-31Z" fill="#a98b59"/><path d="M11 12H312L336 136H-10Z" fill="#c6d2ab" stroke="#f1e4b9" stroke-width="3"/><path d="M14 16L317 133M78 13L337 113M148 14L331 84M219 13L324 54M0 54L121 136M-3 96L57 136M310 14L8 132M242 14L-4 112M170 14L-7 83M100 14L-5 52M318 52L205 136M325 96L274 136" fill="none" stroke="#9eb69a" stroke-width="1.5"/><text x="163" y="184" text-anchor="middle" font-size="11">System 不重建 · 数据不重置</text></g>
      ${[
        [351, 324, "#c77452"],
        [458, 351, "#739d8a"],
        [546, 316, "#d1af56"],
        [581, 388, "#7b9ab7"],
      ]
        .map(
          ([x, y, c]) =>
            `<g transform="translate(${x} ${y})" filter="url(#object-shadow)"><ellipse cx="0" cy="12" rx="15" ry="7" fill="#657c66" opacity=".3"/><path d="M-6 -7L-13 5L-6 9L-5 20H5L6 9L13 5L6 -7Z" fill="${c}" stroke="#60775f" stroke-width="1.5"/><circle cy="-13" r="7" fill="${c}" stroke="#60775f" stroke-width="1.5"/></g>`,
        )
        .join("")}
      <g transform="translate(304 465)"><rect width="322" height="30" rx="6" fill="#fff4d8" stroke="#d9c6a0"/><text x="161" y="20" font-size="11" text-anchor="middle">数据示意：等级 42 / 金币 1,280 / 状态保留</text></g>
      ${paper("ctl-v1", 678, 275, 122, 107, "ctl v1", "#cfdfd7", `<path d="M21 50H99M21 63H88M21 76H98" stroke="#8bab9e" stroke-width="4"/><text x="61" y="96" font-size="10" text-anchor="middle">当前规则</text>`)}
      ${paper("ctl-v2", 699, 210, 122, 107, "ctl v2", "#e8d0a4", `<path d="M21 50H99M21 63H88M21 76H98" stroke="#ba9866" stroke-width="4"/><text x="61" y="96" font-size="10" text-anchor="middle">新逻辑 · 同数据</text>`)}
      <path id="data-link" d="M616 331H674" fill="none" stroke="#8aab94" stroke-width="5" stroke-dasharray="7 5"/>
      <g id="serial-boundary">${label(390, 223, "串行边界 / 替换接口", 225, "#f7e8bd")}<path d="M650 258V425" stroke="#c5a15d" stroke-width="3" stroke-dasharray="6 7"/></g>
      <g id="old-registration">${label(674, 411, "旧注册 / 卸载清理", 146, "#e6d9bf")}</g>
      <g id="new-registration">${label(674, 411, "✓ 新注册 · 唯一 key", 160, "#deebd2")}</g>
      <g id="go-call"><circle r="9" fill="#fff3b1" stroke="#cbae65" stroke-width="3"/></g>
      <g id="go-check">${label(395, 219, "✓ 新逻辑继续，棋局还在", 229, "#dfebd1")}</g>`,
      ),
  };

  let active = null,
    progress = 0,
    playing = false,
    lastTick = 0,
    raf = 0,
    currentPhase = -1;
  let homeScroll = 0,
    origin = { x: innerWidth / 2, y: innerHeight / 2 },
    transitioning = false;
  let duration = 20000;
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  let storedMotion;
  try {
    storedMotion = localStorage.getItem("yida-reduced-motion");
  } catch (_) {
    /* optional persistence */
  }
  let reduced =
    storedMotion === null || storedMotion === undefined
      ? media.matches
      : storedMotion === "true";
  const node = (id) => document.getElementById(id);
  const move = (id, x, y, rotate = 0, scale = 1) => {
    const el = node(id);
    if (el)
      el.setAttribute(
        "transform",
        `translate(${x} ${y}) rotate(${rotate}) scale(${scale})`,
      );
  };
  const opacity = (id, value) => {
    const el = node(id);
    if (el) el.setAttribute("opacity", clamp(value).toFixed(3));
  };
  const motionState = () => {
    document.body.classList.toggle("reduced-motion", reduced);
    $("motion-toggle").setAttribute("aria-pressed", String(reduced));
    $("motion-toggle").setAttribute("aria-label", reduced ? "恢复动效" : "减少动效");
    $("motion-toggle").innerHTML = `<img src="assets/icon-${reduced ? "play" : "pause"}.svg" alt="" />`;
  };
  motionState();

  function renderScene(t) {
    if (active === "knot") {
      const assembly = segment(t, 0.07, 0.29);
      [
        ["repo", 232, 243, 368, 296, -7],
        ["skills", 351, 222, 410, 289, 4],
        ["mcp", 479, 226, 464, 289, -4],
        ["role", 608, 244, 515, 296, 7],
      ].forEach(([id, x, y, tx, ty, r]) => {
        move(
          id,
          lerp(x, tx, assembly),
          lerp(y, ty, assembly),
          lerp(r, 0, assembly),
        );
        opacity(id, 1 - segment(t, 0.3, 0.36));
      });
      opacity("saved-agent", segment(t, 0.25, 0.34));
      const incoming = segment(t, 0.4, 0.57);
      move(
        "task",
        lerp(209, 429, incoming),
        lerp(365, 294, incoming),
        lerp(-6, 0, incoming),
        lerp(1, 0.76, incoming),
      );
      opacity("task", segment(t, 0.35, 0.4) * (1 - segment(t, 0.58, 0.62)));
      opacity(
        "processing",
        segment(t, 0.56, 0.61) * (1 - segment(t, 0.78, 0.82)),
      );
      node("tool-turn").setAttribute(
        "transform",
        `rotate(${(t - 0.6) * 520} 500 335)`,
      );
      const out = segment(t, 0.79, 0.95);
      move(
        "result",
        lerp(448, 644, out),
        lerp(306, 357, out),
        lerp(-5, 3, out),
        lerp(0.74, 1, out),
      );
      opacity("result", segment(t, 0.77, 0.82));
      opacity("knot-check", segment(t, 0.94, 0.99));
    } else if (active === "gdlore") {
      window.GdloreAnimation.render(t);
    } else if (active === "unity") {
      window.UnityAnimation.render(t);
    } else if (active === "ui") {
      window.UiAnimation.render(t);
    } else if (active === "go") {
      const ready = segment(t, 0.21, 0.39),
        swap = segment(t, 0.62, 0.79);
      move(
        "ctl-v1",
        lerp(678, 825, swap),
        lerp(275, 337, swap),
        lerp(0, 18, swap),
      );
      opacity("ctl-v1", 1 - swap);
      move(
        "ctl-v2",
        lerp(699, 678, swap),
        lerp(lerp(210, 224, ready), 275, swap),
        lerp(-8, 0, ready),
      );
      opacity("ctl-v2", segment(t, 0.18, 0.26));
      opacity("data-link", segment(t, 0.4, 0.45));
      opacity(
        "serial-boundary",
        segment(t, 0.57, 0.62) * (1 - segment(t, 0.8, 0.85)),
      );
      opacity("old-registration", 1 - segment(t, 0.68, 0.75));
      opacity("new-registration", segment(t, 0.73, 0.82));
      const call =
        t < 0.2 ? segment(t, 0, 0.18) : t > 0.82 ? segment(t, 0.82, 0.99) : 0;
      move("go-call", lerp(635, 674, call), 327);
      opacity("go-call", t < 0.2 || t > 0.82 ? Math.sin(call * Math.PI) : 0);
      opacity("go-check", segment(t, 0.9, 0.97));
    }
  }
  function render() {
    if (!active) return;
    renderScene(progress);
    const index = Math.min(4, Math.floor(progress * 5));
    if (index !== currentPhase) {
      currentPhase = index;
      const [title, copy] = projects[active].phases[index];
      $("phase-number").textContent = String(index + 1).padStart(2, "0");
      $("phase-title").textContent = title;
      $("phase-copy").textContent = copy;
      $("phase-buttons")
        .querySelectorAll("button")
        .forEach((button, i) =>
          button.setAttribute("aria-current", i === index ? "step" : "false"),
        );
    }
    $("timeline").value = String(Math.round(progress * 1000));
    $("timeline").setAttribute(
      "aria-valuetext",
      `${Math.round(progress * 100)}%，${projects[active].phases[index][0]}`,
    );
    $("time-display").textContent =
      `0:${String(Math.floor((progress * duration) / 1000)).padStart(2, "0")} / 0:${duration / 1000}`;
    $("play-toggle").querySelector(".button-copy").textContent = playing
      ? "Ⅱ 暂停"
      : progress >= 1
        ? "↺ 再看一遍"
        : "▶ 播放演示";
    $("play-toggle").setAttribute(
      "aria-label",
      playing ? "暂停演示" : progress >= 1 ? "重新播放演示" : "播放演示",
    );
  }
  function stop() {
    playing = false;
    cancelAnimationFrame(raf);
    raf = 0;
    lastTick = 0;
    if (active) render();
  }
  function tick(time) {
    if (!playing || !active) return;
    if (lastTick) progress = clamp(progress + (time - lastTick) / duration);
    lastTick = time;
    if (progress >= 1) {
      if ($("loop").checked) {
        progress = 0;
        currentPhase = -1;
      } else {
        stop();
        return;
      }
    }
    render();
    raf = requestAnimationFrame(tick);
  }
  function play() {
    if (!active || document.hidden) return;
    if (progress >= 1) progress = 0;
    playing = true;
    lastTick = 0;
    render();
    raf = requestAnimationFrame(tick);
  }
  $("play-toggle").addEventListener("click", () => (playing ? stop() : play()));
  $("replay").addEventListener("click", () => {
    stop();
    progress = 0;
    currentPhase = -1;
    render();
    if (!reduced) play();
  });
  $("timeline").addEventListener("input", (event) => {
    const nextProgress = Number(event.target.value) / 1000;
    stop();
    progress = nextProgress;
    render();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
  });
  window.addEventListener("resize", () => {
    if (active === "gdlore" || active === "unity" || active === "ui") renderScene(progress);
  });
  $("motion-toggle").addEventListener("click", () => {
    reduced = !reduced;
    try {
      localStorage.setItem("yida-reduced-motion", String(reduced));
    } catch (_) {}
    motionState();
    if (reduced) stop();
  });
  media.addEventListener("change", (event) => {
    try {
      if (localStorage.getItem("yida-reduced-motion") !== null) return;
    } catch (_) {}
    reduced = event.matches;
    motionState();
    if (reduced) stop();
  });

  function showView(key) {
    const previous = active;
    stop();
    active = key;
    duration = key === "gdlore" || key === "unity" ? 36000 : 20000;
    progress = 0;
    currentPhase = -1;
    $("home-view").hidden = Boolean(key);
    $("project-view").hidden = !key;
    document.body.classList.toggle("is-home", !key);
    document.title = key
      ? `${projects[key].title} · 王毅达`
      : "王毅达 · 作品院子";
    if (!key) {
      window.scrollTo({ top: homeScroll, behavior: "instant" });
      if (previous)
        document
          .querySelector(`[data-project="${previous}"]`)
          ?.focus({ preventScroll: true });
      return;
    }
    const p = projects[key],
      index = keys.indexOf(key);
    $("project-title").textContent = p.title;
    $("project-eyebrow").textContent = p.eyebrow;
    $("project-lead").textContent = p.lead;
    $("project-state").textContent = p.state;
    $("project-serial").textContent =
      `A PLACE IN THE YARD / ${String(index + 1).padStart(2, "0")} OF 05`;
    $("project-switcher").innerHTML = keys
      .map(
        (k, i) =>
          `<a href="#project/${k}" aria-label="${projects[k].title}" ${k === key ? 'aria-current="page"' : ""}>${String(i + 1).padStart(2, "0")}</a>`,
      )
      .join("");
    $("scene-frame").innerHTML = scenes[key]();
    $("phase-buttons").innerHTML = p.phases
      .map(
        ([title], i) =>
          `<button data-phase="${i}" aria-current="false"><span>0${i + 1}</span>${title}</button>`,
      )
      .join("");
    $("phase-buttons")
      .querySelectorAll("button")
      .forEach((button) =>
        button.addEventListener("click", () => {
          stop();
          const n = Number(button.dataset.phase);
          progress = key === "unity" ? [.08, .27, .49, .75, 1][n] : key === "ui" ? [.1, .3, .59, .76, 1][n] : n === 4 ? 1 : n * 0.2 + .1;
          render();
        }),
      );
    $("project-facts").innerHTML =
      p.facts
        .map(
          ([k, title, copy]) =>
            `<div class="fact-card"><span>${k}</span><h2>${title}</h2><p>${copy}</p></div>`,
        )
        .join("") +
      `<details><summary>${p.more[0]}</summary><p>${p.more[1]}</p></details>`;
    const next = keys[(index + 1) % keys.length];
    $("next-project").href = `#project/${next}`;
    $("next-project").textContent = `下一个：${projects[next].title} →`;
    window.scrollTo({ top: 0, behavior: "instant" });
    render();
  }
  function animateRadius(from, to, ms) {
    return new Promise((resolve) => {
      const start = performance.now();
      function frame(now) {
        const p = clamp((now - start) / ms);
        $("iris-aperture").setAttribute("r", String(lerp(from, to, ease(p))));
        if (p < 1) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
  }
  async function transition(key, point = origin) {
    // A quick browser back/forward updates the desired route. The current iris
    // swaps to that latest route while closed, then reconciles once more after opening.
    if (transitioning) return;
    if (reduced) {
      showView(key);
      if (key) $("project-title").focus({ preventScroll: true });
      return;
    }
    transitioning = true;
    stop();
    const radius =
      Math.hypot(
        Math.max(point.x, innerWidth - point.x),
        Math.max(point.y, innerHeight - point.y),
      ) + 10;
    $("iris-aperture").setAttribute("cx", String(point.x));
    $("iris-aperture").setAttribute("cy", String(point.y));
    $("iris-aperture").setAttribute("r", String(radius));
    $("iris").hidden = false;
    await animateRadius(radius, 0, 325);
    key = routeKey();
    showView(key);
    await animateRadius(0, radius, 325);
    $("iris").hidden = true;
    transitioning = false;
    if (key) {
      $("project-title").focus({ preventScroll: true });
    }
    if (routeKey() !== active) transition(routeKey());
  }
  function routeKey() {
    const match = location.hash.match(/^#project\/(knot|gdlore|unity|ui|go)$/);
    return match ? match[1] : null;
  }
  let lastRoute = routeKey();
  document.querySelectorAll("[data-project]").forEach((button) =>
    button.addEventListener("click", () => {
      if (transitioning) return;
      homeScroll = scrollY;
      const rect = button.getBoundingClientRect();
      origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      location.hash = `project/${button.dataset.project}`;
    }),
  );
  window.addEventListener("hashchange", () => {
    const key = routeKey();
    if (key === lastRoute) return;
    lastRoute = key;
    transition(key);
  });
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href="#"]');
    if (link && active) {
      event.preventDefault();
      if (transitioning) return;
      location.hash = "";
    }
  });
  $("contact-toggle").addEventListener("click", () => {
    const open = $("contact-panel").hidden;
    $("contact-panel").hidden = !open;
    $("contact-toggle").setAttribute("aria-expanded", String(open));
  });
  // Preserve the home scroll position in memory while independently changing project views.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  showView(lastRoute);
})();
