import type { AssessmentMode,AssessmentSession } from '../../domain/types';
type Action={type:'answer';questionId:string;value:number}|{type:'next';total:number}|{type:'previous'};
export const initialState=(mode:AssessmentMode):AssessmentSession=>({version:1,mode,answers:{},currentIndex:0});
export function assessmentReducer(state:AssessmentSession,action:Action):AssessmentSession{switch(action.type){case'answer':return{...state,answers:{...state.answers,[action.questionId]:action.value}};case'next':return{...state,currentIndex:Math.min(action.total-1,state.currentIndex+1)};case'previous':return{...state,currentIndex:Math.max(0,state.currentIndex-1)};}}
