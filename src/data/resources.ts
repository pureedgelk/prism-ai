export interface ResourceItem {
  name: string;
  desc: string;
  url: string;
  tag: string;
}

export interface ResourceGroup {
  category: string;
  icon: string;
  items: ResourceItem[];
}

export const resourceGroups: ResourceGroup[] = [
  {
    category: '对话大模型',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    items: [
      { name: 'ChatGPT', desc: 'OpenAI 旗舰对话模型，综合能力强，生态成熟。', url: 'https://chatgpt.com', tag: '通用' },
      { name: 'Claude', desc: '长文本与写作、代码分析见长，表达自然。', url: 'https://claude.ai', tag: '写作/代码' },
      { name: 'DeepSeek', desc: '推理与代码能力突出，国内可直接访问。', url: 'https://chat.deepseek.com', tag: '推理' },
      { name: '豆包', desc: '字节跳动出品，中文场景友好，功能全面。', url: 'https://www.doubao.com', tag: '中文' },
      { name: '通义千问', desc: '阿里大模型，办公与企业场景集成度高。', url: 'https://tongyi.aliyun.com', tag: '办公' },
      { name: 'Kimi', desc: '超长文档阅读与资料整理能力强。', url: 'https://kimi.moonshot.cn', tag: '长文档' },
      { name: '智谱清言', desc: '国产 GLM 系列，支持多种智能体能力。', url: 'https://chatglm.cn', tag: '智能体' },
    ],
  },
  {
    category: '提示词与学习',
    icon: 'M12 6.25v13.5M6.75 12h10.5M12 3a9 9 0 100 18 9 9 0 000-18z',
    items: [
      { name: 'OpenAI Prompt Examples', desc: '官方提示词示例库，覆盖常见任务的标准写法。', url: 'https://platform.openai.com/docs/examples', tag: '官方' },
      { name: 'Anthropic Prompt Library', desc: 'Claude 官方提示词库与工程指南。', url: 'https://docs.anthropic.com', tag: '官方' },
      { name: 'DeepLearning.AI', desc: '吴恩达团队的 AI 短课程，含提示词工程专题。', url: 'https://www.deeplearning.ai', tag: '课程' },
      { name: 'FlowGPT', desc: '社区共享的提示词集合，可按场景检索。', url: 'https://flowgpt.com', tag: '社区' },
    ],
  },
  {
    category: '图像与视频生成',
    icon: 'M4 16l4.58-4.58a2 2 0 012.83 0L16 16m-2-2 1.58-1.58a2 2 0 012.83 0L20 14M4 6h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z',
    items: [
      { name: 'Midjourney', desc: '高质量艺术图像生成，风格化能力强。', url: 'https://www.midjourney.com', tag: '图像' },
      { name: '即梦 AI', desc: '字节出品，图像与视频生成，中文提示友好。', url: 'https://jimeng.jianying.com', tag: '图/视频' },
      { name: '可灵 AI', desc: '快手视频生成模型，运动连贯性表现好。', url: 'https://klingai.com', tag: '视频' },
    ],
  },
  {
    category: '效率与开发',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    items: [
      { name: 'GitHub', desc: '全球最大代码托管平台，学习与开源协作必备。', url: 'https://github.com', tag: '开发' },
      { name: 'Hugging Face', desc: '开源模型与数据集社区，前沿模型集散地。', url: 'https://huggingface.co', tag: '模型社区' },
      { name: 'Cursor', desc: 'AI 原生代码编辑器，编程辅助效率高。', url: 'https://cursor.com', tag: '编程' },
    ],
  },
];
