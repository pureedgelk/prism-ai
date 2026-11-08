export const PROMPT_CATEGORIES = [
  '学习辅助',
  '编程开发',
  '写作表达',
  '办公效率',
  '生活决策',
  '创意生成',
] as const;

export const AI_MODELS = ['通用', 'GPT', 'Claude', 'DeepSeek', '豆包'] as const;

export const TUTORIAL_CATEGORIES = [
  '入门启蒙',
  '工具实操',
  '提示词技巧',
  '效率工作流',
  '前沿探索',
] as const;

export const DIFFICULTIES = ['入门', '进阶', '实战'] as const;

export type PromptCategory = (typeof PROMPT_CATEGORIES)[number];
export type AiModel = (typeof AI_MODELS)[number];
export type TutorialCategory = (typeof TUTORIAL_CATEGORIES)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];
