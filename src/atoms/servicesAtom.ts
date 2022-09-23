import { atom, RecoilState } from 'recoil';
import { ISectionBase } from '../shared/interfaces';

const initialState: ISectionBase[] = [];

export const servicesAtom: RecoilState<ISectionBase[]> = atom({
    key: 'servicesAtom', 
    default: initialState
});