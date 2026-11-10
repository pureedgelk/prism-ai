import {
  isBookmarked,
  toggleBookmark,
  isLiked,
  toggleLike,
  getReadCount,
  markRead,
  fetchRemoteCount,
  type Kind,
} from './store';

const ICONS = {
  star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  thumb: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11v9H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h3zm0 0 4.5-7a2.2 2.2 0 0 1 4 1.9L15 11h4.5a2 2 0 0 1 2 2.3l-1.4 7A2 2 0 0 1 18.1 22H7"/></svg>',
  eye: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>',
};

function makeNode(tag: string, cls: string): HTMLElement {
  const node = document.createElement(tag);
  node.className = cls;
  return node;
}

function makeButton(icon: string, text: string): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-pressed', 'false');
  btn.className = 'ia-btn';
  btn.innerHTML = `<span class="ia-icon">${icon}</span><span class="ia-label">${text}</span>`;
  return btn;
}

function setPressed(
  btn: HTMLButtonElement,
  pressed: boolean,
  onText: string,
  offText: string,
) {
  btn.classList.toggle('is-active', pressed);
  btn.setAttribute('aria-pressed', String(pressed));
  const label = btn.querySelector('.ia-label');
  if (label) label.textContent = pressed ? onText : offText;
}

function enhance(container: HTMLElement) {
  const kind = container.dataset.kind as Kind;
  const id = container.dataset.id ?? '';
  if (!id) return;
  const actions = (container.dataset.actions ?? 'bookmark')
    .split(',')
    .map((s) => s.trim());

  let mount = container.querySelector<HTMLElement>('.ia-actions');
  if (!mount) {
    mount = makeNode('div', 'ia-actions');
    container.appendChild(mount);
  }

  if (actions.includes('bookmark')) {
    const btn = makeButton(ICONS.star, '收藏');
    btn.addEventListener('click', () => {
      setPressed(btn, toggleBookmark(kind, id), '已收藏', '收藏');
    });
    mount.appendChild(btn);
    setPressed(btn, isBookmarked(kind, id), '已收藏', '收藏');
  }

  if (actions.includes('like')) {
    const btn = makeButton(ICONS.thumb, '有用');
    btn.addEventListener('click', () => {
      setPressed(btn, toggleLike(kind, id), '已赞', '有用');
    });
    mount.appendChild(btn);
    setPressed(btn, isLiked(kind, id), '已赞', '有用');
    // 云计数预留：远程可用时替换为真实全站数字
    fetchRemoteCount(kind, id).then((remote) => {
      if (remote !== null) {
        const label = btn.querySelector('.ia-label');
        if (label) label.textContent = `${remote} 人觉得有用`;
      }
    });
  }

  if (actions.includes('read')) {
    const count = markRead(kind, id);
    const chip = makeNode('span', 'ia-read');
    chip.innerHTML = `<span class="ia-icon">${ICONS.eye}</span><span class="ia-label">本机阅读 ${count} 次</span>`;
    mount.appendChild(chip);
    fetchRemoteCount(kind, id).then((remote) => {
      if (remote !== null) {
        const label = chip.querySelector('.ia-label');
        if (label) label.textContent = `阅读 ${remote}`;
      }
    });
  }
}

function init() {
  document.querySelectorAll<HTMLElement>('[data-interactive]').forEach(enhance);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
