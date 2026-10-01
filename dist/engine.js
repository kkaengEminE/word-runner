import {WORDS,ROUTES,EQUIPMENT,MONSTERS,wordById} from './data.js';
export const SAVE_KEY='word-runner.save.v1';
export function freshState(){return {version:1,town:0,unlocked:0,hp:100,gold:80,xp:0,weapon:'sword',owned:['sword','staff'],potions:2,guards:1,shield:0,seen:[],records:{},medals:[],settings:{lang:'ko',meaningLang:'ko',speed:1,sound:false,auto:false,reducedMotion:false},stats:{battles:0,wins:0},journey:null};}
export function restoreState(raw){
 try{const s=typeof raw==='string'?JSON.parse(raw):raw;if(!s||s.version!==1) return freshState();const d=freshState();
 for(const k of ['town','unlocked']) if(Number.isInteger(s[k]))d[k]=Math.max(0,Math.min(2,s[k]));
 d.town=Math.min(d.town,d.unlocked);
 for(const k of ['gold','xp','potions','guards'])if(Number.isFinite(s[k])) d[k]=Math.max(0,Math.min(1000000,Math.floor(s[k])));
 d.owned=Array.isArray(s.owned)?[...new Set(['sword','staff',...s.owned.filter(id=>EQUIPMENT.some(e=>e.id===id))])]:d.owned;
 d.weapon=d.owned.includes(s.weapon)?s.weapon:'sword';d.seen=Array.isArray(s.seen)?[...new Set(s.seen.filter(id=>wordById(id)))]:[];
 for(const id of d.seen){const r=s.records?.[id]||{};d.records[id]={shown:Math.max(0,Number(r.shown)||0),correct:Math.max(0,Number(r.correct)||0),wrong:Math.max(0,Number(r.wrong)||0),spelling:Math.max(0,Number(r.spelling)||0),auto:Math.max(0,Number(r.auto)||0)};}
 d.medals=Array.isArray(s.medals)?[...new Set(s.medals.filter(n=>n===2))]:[];
 if(s.settings){for(const k of ['lang','meaningLang']) if(['ko','en','ja','ru','es'].includes(s.settings[k])) d.settings[k]=s.settings[k];for(const k of ['sound','auto','reducedMotion'])d.settings[k]=s.settings[k]===true;if([.65,1,1.6,2.5].includes(s.settings.speed))d.settings.speed=s.settings.speed;}
 d.shield=Math.max(0,Math.min(1,Number(s.shield)||0));d.hp=Math.max(0,Math.min(maxHp(d),Number(s.hp)||0));
 d.stats={battles:Math.max(0,Number(s.stats?.battles)||0),wins:Math.max(0,Number(s.stats?.wins)||0)};
 // Journeys resume from the last safe town; learned words and resources stay saved.
 if(s.journey||d.hp===0)d.hp=maxHp(d);d.journey=null;return d;
 }catch{return freshState();}}
export const level=s=>1+Math.floor(s.xp/100);
export const maxHp=s=>100+(level(s)-1)*10;
export const stats=s=>({strength:5+level(s)-1,intelligence:5+level(s)-1,agility:5+level(s)-1,memory:5+level(s)-1});
export const weapon=s=>EQUIPMENT.find(e=>e.id===s.weapon)||EQUIPMENT[0];
export const capacity=s=>stats(s).strength+3;
export const chances=s=>({double:Math.min(.4,.08+stats(s).intelligence*.012),critical:Math.min(.4,.05+stats(s).agility*.014),dodge:Math.min(.3,stats(s).agility*.018),auto:Math.min(.95,.65+stats(s).memory*.025)});
export function attack(s,rng=Math.random){const st=stats(s),w=weapon(s);const base=22+(w.type==='knight'?st.strength:st.intelligence)*2+w.power;const critical=rng()<chances(s).critical;const double=rng()<chances(s).double;const hit=Math.round(base*(critical?1.5:1));return {hit,hits:double?2:1,total:hit*(double?2:1),critical,double};}
export function receiveAttack(s,rng=Math.random){if(rng()<chances(s).dodge)return {kind:'dodge',damage:0};if(s.shield){s.shield=0;return {kind:'blocked',damage:0};}const damage=20;s.hp=Math.max(0,s.hp-damage);return {kind:'damage',damage};}
export function markSeen(s,id){if(!s.seen.includes(id))s.seen.push(id);const r=s.records[id]??={shown:0,correct:0,wrong:0,spelling:0,auto:0};r.shown++;}
export function recordAnswer(s,id,correct,type='choice',auto=false){if(!s.records[id])markSeen(s,id);const r=s.records[id];if(auto){r.auto++;return;}if(correct){r.correct++;if(type==='spell')r.spelling++;}else r.wrong++;}
export function normalizeAnswer(value){return String(value).normalize('NFKC').trim().toLocaleLowerCase('en-US').replace(/\s+/g,' ');}
export const isCorrect=(id,answer)=>normalizeAnswer(answer)===normalizeAnswer(wordById(id)?.word||'');
export function shuffled(arr,rng=Math.random){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function question(s,id,type='choice',rng=Math.random){const pool=s.seen.filter(x=>x!==id);const choices=shuffled([id,...shuffled(pool,rng).slice(0,3)],rng);return {id,type:type==='choice'&&choices.length<4?'spell':type,choices};}
export function createEnemies(rng=Math.random){const roll=rng();const ids=roll<.1?[3]:roll<.35?[2]:roll<.65?[1,1]:[0,0,0];return ids.map(i=>({...MONSTERS[i],maxHp:MONSTERS[i].hp}));}
export function beginJourney(s,target){if(!Number.isInteger(target)||Math.abs(target-s.town)!==1||target>Math.min(2,s.unlocked+1)||target<0)return null;const route=ROUTES[Math.min(target,s.town)];s.journey={from:s.town,to:target,route:route.id};return route;}
export function win(s){if(!s.journey)return null;const reward={gold:35,xp:45};s.gold+=reward.gold;s.xp+=reward.xp;s.stats.wins++;return reward;}
export function arrive(s){if(!s.journey)return;s.town=s.journey.to;s.unlocked=Math.max(s.unlocked,s.town);s.journey=null;s.hp=maxHp(s);}
export function die(s){if(s.journey)s.town=s.journey.from;s.journey=null;s.hp=maxHp(s);s.shield=0;}
export function useItem(s,item){if(item==='potion'&&s.potions>0&&s.hp<maxHp(s)){s.potions--;s.hp=Math.min(maxHp(s),s.hp+50);return true;}if(item==='guard'&&s.guards>0&&!s.shield){s.guards--;s.shield=1;return true;}return false;}
export function buy(s,id){if(id==='potion'||id==='guard'){const cost=id==='potion'?20:25;if(s.gold<cost)return false;s.gold-=cost;s[id==='potion'?'potions':'guards']++;return true;}const e=EQUIPMENT.find(e=>e.id===id);if(!e||s.owned.includes(id)||s.gold<e.cost||(e.town||0)>s.town||e.weight>capacity(s))return false;s.gold-=e.cost;s.owned.push(id);s.weapon=id;return true;}
export function createExam(s,rng=Math.random){const pool=shuffled(s.seen,rng),n=Math.min(pool.length,s.seen.length>=50?20:10);return pool.slice(0,n).map((id,i)=>question(s,id,i<Math.ceil(n/2)?'choice':'spell',rng));}
export const passedExam=(score,total)=>total>0&&score/total>=.8;
