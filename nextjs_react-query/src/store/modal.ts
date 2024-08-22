import { IPost } from '@/model/post.model';
import { create } from 'zustand';

type Mode = 'new' | 'comment';

interface ModalState {
	mode: Mode;
	data: IPost | null;
	setMode: (mode: Mode) => void;
	setData: (data: IPost) => void;
	reset: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
	mode: 'new',
	data: null,
	setMode(mode) {
		set({ mode });
	},
	setData(data) {
		set({ data });
	},
	reset() {
		set({
			mode: 'new',
			data: null,
		});
	},
}));
