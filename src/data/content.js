export const content = {
  en: {
    languageLabel: 'English',
    languageToggle: '中文',
    themeToggleLabel: 'Theme',
    nav: [
      { id: 'primer', label: 'Orientation' },
      { id: 'layers', label: 'Layers' },
      { id: 'supply-chain', label: 'Tooling' },
      { id: 'protocols', label: 'Protocols' },
      { id: 'agentic', label: 'Agentic Retrieval' },
      { id: 'operations', label: 'Operations' },
      { id: 'safety', label: 'Safety' },
      { id: 'playbook', label: 'Playbook' },
    ],
    hero: {
      eyebrow: 'Context Engineering Playbook',
      title: 'Context is All You Need',
      subtitle:
        'A practical playbook for LLM agents: start with signal hygiene, layer memory deliberately, then orchestrate tools, protocols, and governance.',
      badges: ['LLM Agents', 'Context Strategy'],
      ctaPrimary: { label: 'Explore the playbook', href: '#primer' },
      loopTitle: 'Context loop',
      loopYear: '2025',
      loop: [
        { title: 'Observe', body: 'Collect signals from conversation, tools, and environment.' },
        { title: 'Curate', body: 'Filter, label, and order only what the next step needs.' },
        { title: 'Decide & Act', body: 'Plan, call tools, and update state with fresh context.' },
      ],
    },
    sections: [
      {
        id: 'primer',
        numeral: '01',
        eyebrow: 'Orientation',
        title: 'Context is the control plane of every agent',
        paragraphs: [
          'LLMs reason strictly inside the window you provide. Think of that window as your agent’s control plane: this is where you place goals, rules, constraints, and the latest evidence. Anything not present is invisible to the model, so the content and ordering of this window directly shape every answer, tool call, and side effect.',
          'This page progresses from mental models to concrete system design. By the end you’ll know when to edit prompts, when to add memory, when to add retrieval or tooling, and when to standardise with protocols. We favour small, measurable interventions and include examples and checklists you can apply immediately.',
        ],
        highlights: [
          {
            title: 'Why it matters',
            description:
              'Tuning context is the cheapest lever to boost accuracy, cut hallucinations, and shape tone—no retraining required.',
          },
          {
            title: 'Key question',
            description: 'What must the agent remember now, and what can live in memory or storage until needed?',
          },
          {
            title: 'Delivery principle',
            description: 'Serve the minimum sufficient context for the next decision. Measure, then iterate.',
          },
        ],
      },
      {
        id: 'layers',
        numeral: '02',
        eyebrow: 'Layered memory',
        title: 'Designing the context stack: instant focus × living memory',
        paragraphs: [
          'Short-term context is the working scratchpad for the current turn. Include the active objective, the few recent turns that matter, key assumptions, and intermediate variables—cleanly ordered and labeled so cues are unambiguous.',
          'Long-term memory carries useful signal across threads and sessions—preferences, canonical facts, and durable intermediate results. It is only valuable if the right pieces are retrieved at the right time with ranking and justification; small high-quality memories beat large noisy ones.',
        ],
        columns: [
          {
            title: 'Instant context window',
            bullets: [
              'Structure prompts by roles, recent turns, and the active objective.',
              'Cull or compress stale turns before each round-trip.',
              'Use anchors (section headers, dividers, reasoning tags) to guide attention.',
            ],
          },
          {
            title: 'Persistent memory',
            bullets: [
              'Summaries, vector memories, and knowledge graphs capture signal beyond window limits.',
              'LangGraph-style checkpoints share state across nodes without flooding every prompt.',
              'Relevance filters decide when to rehydrate memories back into working context.',
            ],
          },
        ],
      },
      {
        id: 'supply-chain',
        numeral: '03',
        eyebrow: 'Context supply chain',
        title: 'How tooling injects fresh signal',
        paragraphs: [
          'Tool use expands context by appending structured observations back into the window. Treat every tool output as data with provenance and a schema (type, step, source, confidence), then promote only what the next decision needs. The loop mirrors ReAct: think → act → observe → append → think again.',
        ],
        cards: [
          {
            title: 'Retrieval channels',
            body:
              'file_search, vector stores, and domain APIs return clipped passages with provenance. Limit chunk count, prefer ranked snippets with justifications.',
          },
          {
            title: 'Execution channels',
            body:
              'Code interpreters, function calls, and ComputerTool runs emit JSON, tables, and screenshots. Route deltas, not entire logs.',
          },
          {
            title: 'Feedback loop',
            body:
              'Observation messages are first-class context objects. Annotate them (step IDs, tool names) so subsequent reasoning stays on track.',
          },
        ],
      },
      {
        id: 'protocols',
        numeral: '04',
        eyebrow: 'Interoperability',
        title: 'Standardise how you move context',
        paragraphs: [
          'The Model Context Protocol (MCP) standardises how agents discover capabilities and exchange context with external systems. If you run multiple models or runtimes, MCP gives you one contract for requests, responses, and auth or audit so tools and data sources can be reused across stacks.',
        ],
        listTitle: 'Adopt MCP-style practices to unlock reuse:',
        listItems: [
          'One schema for requests, responses, and tool metadata across providers.',
          'HostedMCPTool auto-discovers remote capabilities—register once, share everywhere.',
          'Expose internal systems via MCP so OpenAI, Anthropic, and in-house agents share a single source of truth.',
        ],
      },
      {
        id: 'agentic',
        numeral: '05',
        eyebrow: 'Agentic retrieval',
        title: 'From single-shot RAG to decision-led retrieval',
        paragraphs: [
          'Vanilla RAG retrieves once and answers, even when the initial pull is weak. Agentic retrieval plans a strategy, rewrites the query, chooses among sources (vector stores, web search, calculators), and cross-checks conflicts before promoting results to the prompt. It stops on a clear condition—enough evidence, budget reached, or a confidence threshold met.',
        ],
        comparison: {
          leftTitle: 'Traditional RAG',
          leftItems: [
            'One vector store, one query, no feedback.',
            'Pure embedding similarity.',
            'No verification; retrieved text is trusted.',
          ],
          rightTitle: 'Agentic retrieval',
          rightItems: [
            'Routes across vector stores, search APIs, calculators, and more.',
            'Rewrites or decomposes the question between pulls.',
            'Validates and reconciles conflicts before promotion to the prompt.',
          ],
        },
      },
      {
        id: 'operations',
        numeral: '06',
        eyebrow: 'Operational runbook',
        title: 'Keep state coherent across long missions',
        paragraphs: [
          'Complex tasks need explicit state so progress remains coherent. Define a typed state object (goals, sub-tasks, blockers, artifacts, tool outputs) and decide which fields are exposed to the model at each step—never dump the whole state. Use checkpoints or threads so runs are resumable and facts that outlive the task can be promoted into long-term memory.',
        ],
        timeline: [
          {
            title: 'Define the state object',
            body: 'Map fields: goals, sub-tasks, blockers, tool outputs. Decide which fields enter each prompt.',
          },
          {
            title: 'Persist with checkpoints',
            body: 'Use LangGraph checkpoints or Assistants threads so every node resumes with the latest state.',
          },
          {
            title: 'Promote to long-term memory',
            body:
              'When a fact outlives the task, serialize it into LangMem, vector stores, or knowledge bases for reuse.',
          },
        ],
      },
      {
        id: 'safety',
        numeral: '07',
        eyebrow: 'Safety posture',
        title: 'Guard the context channel',
        paragraphs: [
          'Richer context widens the attack surface because the same pipe carries untrusted content. Treat retrieved text as data, not instructions; require citations for risky actions, and run with least-privilege tools in sandboxes. Add guardrails and audit trails so prompt injection, data exfiltration, and over-broad permissions are contained.',
        ],
        columns: [
          {
            title: 'Model layer',
            bullets: [
              'Rejection training (e.g., RAG-Pref) to flag malicious inserts.',
              'Require citations so risky actions justify themselves with source context.',
            ],
          },
          {
            title: 'Tooling layer',
            bullets: [
              'Least privilege and sandboxed execution (Code Interpreter, containerized tools).',
              'Guardrails or human approval for sensitive scopes.',
            ],
          },
          {
            title: 'Governance layer',
            bullets: [
              'Trace every tool call and context mutation for audit.',
              'Reviewer agents or human-in-loop on high-impact decisions.',
            ],
          },
        ],
      },
      {
        id: 'playbook',
        numeral: '08',
        eyebrow: 'Next steps',
        title: 'Ship smarter context in four moves',
        paragraphs: [
          'Context work is continuous. Establish a weekly cadence to measure groundedness, tool success, and token efficiency; A/B test prompt structure and retrieval settings; and roll back changes that regress safety or cost. Start small, prove value, then expand deliberately.',
        ],
        checklist: [
          'Instrument your agent: log prompts, context size, and retrieval provenance.',
          'Run a hygiene pass: rewrite prompts with roles, separators, and explicit objectives.',
          'Add one retrieval upgrade: query rewriting, MCP integration, or multi-tool routing.',
          'Design a lightweight security review before enabling new capabilities.',
          'Track KPIs: groundedness rate, tool success, context-token efficiency.',
        ],
      },
    ],
  },
  zh: {
    languageLabel: '中文',
    languageToggle: 'English',
    themeToggleLabel: '主题',
    nav: [
      { id: 'primer', label: '基本概念' },
      { id: 'layers', label: '分层记忆' },
      { id: 'supply-chain', label: '工具与数据' },
      { id: 'protocols', label: '标准协议' },
      { id: 'agentic', label: '主动式检索' },
      { id: 'operations', label: '状态管理' },
      { id: 'safety', label: '安全防护' },
      { id: 'playbook', label: '实战指南' },
    ],
    hero: {
      eyebrow: '上下文工程实战指南',
      title: '上下文，就是驱动 AI 的一切',
      subtitle:
        '这是一份给大模型智能体 (Agent) 用的实操手册：从源头把信息处理干净，再精心设计记忆的层次，最后把工具、协议和安全规范整合起来。',
      badges: ['大模型 Agent', '上下文策略'],
      ctaPrimary: { label: '快速入门', href: '#primer' },
      loopTitle: '工作循环',
      loopYear: '2025',
      loop: [
        { title: '感知', body: '从对话、工具和环境中收集信息。' },
        { title: '筛选', body: '过滤、整理和排序，只保留下一步需要的信息。' },
        { title: '决策与行动', body: '制定计划、调用工具，并用新信息更新当前状态。' },
      ],
    },
    sections: [
      {
        id: 'primer',
        numeral: '01',
        eyebrow: '基本概念',
        title: '上下文，就是 Agent 的指挥中心',
        paragraphs: [
          '大模型的所有推理，都严格限制在你提供给它的上下文窗口之内。你可以把这个窗口想象成 Agent 的指挥中心：你在这里设定目标、规则、约束，并提供最新的信息。任何没放进窗口的内容，模型都完全看不见。因此，窗口里的内容和信息的顺序，直接塑造了 Agent 的每一次回答、每一次工具调用，以及它带来的所有影响。',
          '本指南将从核心理念讲到具体的系统设计。读完后你将清楚地知道：什么时候该优化提示词，什么时候该增加记忆，什么时候该引入检索或工具，以及什么时候该用标准协议来统一规范。我们推崇小而可度量的改进，并提供了你可以立刻上手的示例和清单。',
        ],
        highlights: [
          {
            title: '为什么重要？',
            description:
              '优化上下文，是提升 Agent 效果最划算的方法。它能提高准确率、减少胡说八道、还能调整语气，而且完全不需要重新训练模型。',
          },
          {
            title: '关键问题',
            description: 'Agent 此刻必须记住什么？哪些信息可以暂时存起来，等需要的时候再调用？',
          },
          {
            title: '实践原则',
            description: '只提供刚好够用的信息给下一步决策。先评估效果，再进行优化，不断迭代。',
          },
        ],
      },
      {
        id: 'layers',
        numeral: '02',
        eyebrow: '分层记忆',
        title: '设计记忆系统：既要即时专注，也要长期在线',
        paragraphs: [
          '短期上下文就像是处理当前任务的工作草稿。它应该包含当前目标、几轮关键的近期对话、核心的假设以及中间变量——所有这些都应被清晰地排序和标记，以避免任何含糊不清。',
          '长期记忆则负责跨越不同对话和任务，承载那些有价值的信息，比如用户偏好、不变的核心事实以及可复用的中间结果。长期记忆是否有用，取决于能否在正确的时间通过合理的排序和解释找到正确的信息。记住，少而精的高质量记忆远胜于多而杂乱的记忆。',
        ],
        columns: [
          {
            title: '即时上下文窗口（短期记忆）',
            bullets: [
              '按照“角色设定、最近对话、当前目标”的结构来组织提示词。',
              '在每次互动前，及时清理或压缩掉过时的对话内容。',
              '使用标题、分隔符或特定标签来引导模型的注意力。',
            ],
          },
          {
            title: '持久化记忆（长期记忆）',
            bullets: [
              '通过摘要、向量数据库或知识图谱，来保存超出单次对话窗口的信息。',
              '像 LangGraph 那样的检查点机制，可以在不同任务节点间共享状态，又不会让提示词变得臃肿。',
              '建立一套相关性筛选机制，决定什么时候该把长期记忆调取到当前的工作草稿上。',
            ],
          },
        ],
      },
      {
        id: 'supply-chain',
        numeral: '03',
        eyebrow: '上下文的数据源',
        title: '如何用工具给 Agent 带来新知识',
        paragraphs: [
          '使用工具，就是把结构化的观察结果添加回上下文窗口，从而拓展认知。要把每一次的工具输出都看作是带有来源和格式（类型、步骤、来源、置信度）的数据，然后只提取下一步决策所必需的信息。这个循环完美地体现了 ReAct 框架：思考 → 行动 → 观察 → 补充 → 再思考。',
        ],
        cards: [
          {
            title: '信息检索工具',
            body:
              '比如文件搜索、向量数据库和各种 API，它们能返回带有出处的信息片段。注意控制返回内容的数量，优先选择那些经过排序并说明了理由的结果。',
          },
          {
            title: '代码执行工具',
            body:
              '比如代码解释器、函数调用和电脑控制工具，它们会产生 JSON、表格或截图等结果。我们应该只把变化的部分告诉 Agent，而不是把完整的日志都丢给它。',
          },
          {
            title: '观察与反馈',
            body:
              '工具执行后的观察结果本身就是一种重要的上下文。给这些结果打上标签（比如步骤 ID、工具名称），能帮助 Agent 在后续的推理中保持思路清晰。',
          },
        ],
      },
      {
        id: 'protocols',
        numeral: '04',
        eyebrow: '互操作性',
        title: '统一标准，让信息自由流动',
        paragraphs: [
          '模型上下文协议（MCP）标准化了 Agent 发现外部能力以及与外部系统交换上下文的方式。如果你同时使用多种模型或运行时环境，MCP 能为你提供一套统一的请求、响应、授权和审计规范，让你的工具和数据源可以在不同的技术栈之间轻松复用。',
        ],
        listTitle: '采用 MCP 这类标准化思路的好处：',
        listItems: [
          '无论是请求、响应还是工具的描述，都用同一套格式，这样就不用在不同模型厂商之间来回切换了。',
          '工具可以一次注册，处处可用，能被系统自动发现和调用。',
          '把你内部的系统也通过 MCP 协议开放出来，这样无论是 OpenAI、Anthropic 还是自家的 Agent，都能使用同一套真实数据源。',
        ],
      },
      {
        id: 'agentic',
        numeral: '05',
        eyebrow: '主动式检索',
        title: '超越 RAG：从一次性问答到追根究底',
        paragraphs: [
          '传统 RAG 检索一次就直接回答，哪怕第一次检索到的信息质量很差。而主动式检索会先规划策略、改写问题，在多个信息源（向量库、网页搜索、计算器等）之间做出选择，并在采纳结果前进行交叉验证以消除矛盾。它的停止条件也非常明确——直到证据足够充分、预算用尽或达到了设定的置信度阈值。',
        ],
        comparison: {
          leftTitle: '传统 RAG',
          leftItems: [
            '通常只有一个知识库，一次检索，没有后续反馈。',
            '主要依赖向量相似度。',
            '直接信任检索到的内容，缺少验证环节。',
          ],
          rightTitle: '主动式检索',
          rightItems: [
            '可以在向量库、搜索引擎、计算器等多种工具间灵活切换。',
            '在检索过程中，会不断优化或拆解问题。',
            '将信息放入上下文之前，会先进行交叉验证和消除矛盾。',
          ],
        },
      },
      {
        id: 'operations',
        numeral: '06',
        eyebrow: '状态管理',
        title: '在复杂任务中保持思路清晰',
        paragraphs: [
          '复杂的长任务需要明确的状态管理，才能确保整个过程思路清晰、前后连贯。你应该定义一个类型明确的状态对象（包含目标、子任务、障碍、产出物、工具输出等），并决定在每一步只把必要的字段暴露给模型——绝不要把整个状态一股脑地全塞过去。利用检查点或线程机制，让任务可以随时恢复运行，并把那些比任务本身更持久的有效信息沉淀到长期记忆中。',
        ],
        timeline: [
          {
            title: '第一步：定义任务状态',
            body: '明确需要跟踪哪些信息：总目标、子任务、遇到的困难、工具输出等，并决定在每一步需要把哪些信息告诉 Agent。',
          },
          {
            title: '第二步：设置存档点',
            body: '使用 LangGraph 的检查点或 Assistants API 的线程等技术，确保任务中断后，Agent 能从最新的状态继续执行。',
          },
          {
            title: '第三步：沉淀为长期记忆',
            body:
              '当一个信息（比如某个结论或用户偏好）在任务结束后仍然有价值时，就应该把它存入长期记忆中，如向量库或知识库，方便未来复用。',
          },
        ],
      },
      {
        id: 'safety',
        numeral: '07',
        eyebrow: '安全防护',
        title: '保护好上下文这条关键通道',
        paragraphs: [
          '上下文越丰富，攻击面就越广，因为不可信的内容也会通过同一条管道流入。务必将检索到的文本视为数据，而不是指令；要求 Agent 在执行高风险操作时必须引用来源；让工具在沙盒环境中以最小权限运行。同时，增加护栏和审计日志，以遏制提示词注入、数据泄露和权限过大的问题。',
        ],
        columns: [
          {
            title: '模型自身',
            bullets: [
              '通过专门的训练（如 RAG-Pref），让模型学会拒绝恶意的指令。',
              '要求模型在执行高风险操作时，必须引用信息来源，做到有据可查。',
            ],
          },
          {
            title: '工具层面',
            bullets: [
              '遵循最小权限原则，并在沙盒环境中执行代码（如 Code Interpreter）。',
              '对于涉及敏感权限的操作，设置护栏或引入人工审批环节。',
            ],
          },
          {
            title: '管理与审计',
            bullets: [
              '记录每一次工具调用和上下文的变动，以便审计和回溯。',
              '对于影响重大的决策，可以引入另一个审查员 Agent 或人工进行复核。',
            ],
          },
        ],
      },
      {
        id: 'playbook',
        numeral: '08',
        eyebrow: '实战指南',
        title: '四步走，让你的 Agent 更聪明',
        paragraphs: [
          '上下文的优化是一项持续性工作。建议建立每周复盘的节奏，来衡量回答的准确率、工具成功率和 Token 效率；对提示词结构和检索设置进行 A/B 测试；如果改动导致安全或成本指标恶化，要能及时回滚。从小处着手，验证价值，然后有计划地推广。',
        ],
        checklist: [
          '首先，给你的 Agent 装上仪表盘：记录下每次的提示词、上下文大小和信息来源。',
          '做一次卫生大扫除：重新梳理提示词的结构，明确角色、分隔符和目标。',
          '尝试一次检索升级：比如引入问题改写、接入 MCP 协议或启用多工具协同检索。',
          '在开放新功能之前，进行一次轻量级的安全评估。',
          '持续跟踪关键指标：回答的准确率、工具调用的成功率、以及 Token 的使用效率。',
        ],
      },
    ],
  },
};
