import { atom } from 'recoil';

interface UIState {
  isNavOpen: boolean;
  isSidebarOpen: boolean;
  activeModal: string | null;
}

export const uiState = atom<UIState>({
  key: 'uiState',
  default: {
    isNavOpen: false,
    isSidebarOpen: false,
    activeModal: null
  }
});
