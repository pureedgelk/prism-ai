/**
 * Prism AI 本地交互存储
 * 零配置：收藏、点赞、阅读量均存于浏览器 localStorage，不跨用户共享。
 * 预留 fetchRemoteCount 接口：将来接入云计数服务时，在此返回真实全站数字即可，UI 无需改动。
 */

export type Kind = 'prompt' | 'tutorial';

const STORAGE_PREFIX = 'prism:v1:';

interface KindState {
  bookmarks: string[];
  liked: string[];
  reads: Record<string, number>;
}

function emptyState(): KindState {
  return { bookmarks: [], liked: [], reads: {} };
}

function load(kind: Kind): KindState {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + kind);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<KindState>;
    return {
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
      liked: Array.isArray(parsed.liked) ? parsed.liked : [],
      reads: parsed.reads && typeof parsed.reads === 'object' ? parsed.reads : {},
    };
  } catch {
    return emptyState();
  }
}

function persist(kind: Kind, state: KindState) {
  try {
    localStorage.setItem(STORAGE_PREFIX + kind, JSON.stringify(state));
  } catch {
    // 存储被禁用或已满，静默降级，不影响阅读
  }
  window.dispatchEvent(
    new CustomEvent('prism:store-change', { detail: { kind } }),
  );
}

/* ============ 收藏 ============ */
export function isBookmarked(kind: Kind, id: string): boolean {
  return load(kind).bookmarks.includes(id);
}

export function toggleBookmark(kind: Kind, id: string): boolean {
  const state = load(kind);
  const exists = state.bookmarks.includes(id);
  state.bookmarks = exists
    ? state.bookmarks.filter((b) => b !== id)
    : [...state.bookmarks, id];
  persist(kind, state);
  return !exists;
}

export function getBookmarks(kind: Kind): string[] {
  return load(kind).bookmarks;
}

/* ============ 点赞 ============ */
export function isLiked(kind: Kind, id: string): boolean {
  return load(kind).liked.includes(id);
}

export function toggleLike(kind: Kind, id: string): boolean {
  const state = load(kind);
  const exists = state.liked.includes(id);
  state.liked = exists
    ? state.liked.filter((l) => l !== id)
    : [...state.liked, id];
  persist(kind, state);
  return !exists;
}

/* ============ 阅读（本机计数）============ */
export function getReadCount(kind: Kind, id: string): number {
  return load(kind).reads[id] ?? 0;
}

export function markRead(kind: Kind, id: string): number {
  const state = load(kind);
  state.reads[id] = (state.reads[id] ?? 0) + 1;
  persist(kind, state);
  return state.reads[id];
}

/**
 * 云计数预留接口。
 * 本地模式返回 null；将来接入 Supabase / LeanCloud 等服务时，
 * 在此请求真实全站计数，UI 层会自动用它替换本机数字。
 */
export async function fetchRemoteCount(
  _kind: Kind,
  _id: string,
): Promise<number | null> {
  return null;
}
