export interface ModelInfo {
  key: string;
  name: string;
  vendor: string;
  strengths: string[];
  bestFor: string;
  chinese: '优秀' | '良好' | '一般';
  access: '国内直连' | '需网络条件';
  pricing: string;
  note: string;
}

export const models: ModelInfo[] = [
  {
    key: 'gpt',
    name: 'GPT 系列',
    vendor: 'OpenAI',
    strengths: ['综合能力均衡', '生态与插件成熟', '多模态与代码能力强'],
    bestFor: '通用任务、复杂推理、需要丰富工具生态的场景',
    chinese: '良好',
    access: '需网络条件',
    pricing: '免费额度 + 订阅/付费',
    note: '版本迭代快，不同版本能力差异较大，建议以官方最新说明为准。',
  },
  {
    key: 'claude',
    name: 'Claude 系列',
    vendor: 'Anthropic',
    strengths: ['长文本理解', '写作表达自然', '代码分析与重构'],
    bestFor: '长文档处理、写作润色、大型代码库分析',
    chinese: '良好',
    access: '需网络条件',
    pricing: '免费额度 + 订阅/付费',
    note: '长上下文与安全对齐表现突出，适合需要细腻表达的任务。',
  },
  {
    key: 'deepseek',
    name: 'DeepSeek',
    vendor: '深度求索',
    strengths: ['逻辑推理', '数学与代码', '国内可直接访问'],
    bestFor: '数理推理、编程开发、预算敏感的高频使用',
    chinese: '优秀',
    access: '国内直连',
    pricing: '免费 + 低价 API',
    note: '推理与代码性价比高，API 价格友好，适合学生与开发者。',
  },
  {
    key: 'doubao',
    name: '豆包',
    vendor: '字节跳动',
    strengths: ['中文理解', '多端集成', '功能全面易上手'],
    bestFor: '日常中文问答、办公写作、移动端随手使用',
    chinese: '优秀',
    access: '国内直连',
    pricing: '免费为主',
    note: '中文场景与产品化体验友好，新手入门门槛低。',
  },
  {
    key: 'kimi',
    name: 'Kimi',
    vendor: '月之暗面',
    strengths: ['超长文档', '资料整理', '联网检索'],
    bestFor: '长论文/合同阅读、资料汇总、信息检索',
    chinese: '优秀',
    access: '国内直连',
    pricing: '免费 + 付费增值',
    note: '以长上下文和阅读体验见长，适合处理大量材料。',
  },
];

export const compareDimensions = [
  { key: 'vendor', label: '厂商' },
  { key: 'bestFor', label: '最适合' },
  { key: 'chinese', label: '中文能力' },
  { key: 'access', label: '访问方式' },
  { key: 'pricing', label: '成本' },
] as const;
