export const WORDS = [
{id:'en.n.lantern',word:'lantern',pos:'n',meaning:{ko:'등불',en:'a portable light',ja:'ランタン',ru:'фонарь',es:'farol'}},
{id:'en.n.forest',word:'forest',pos:'n',meaning:{ko:'숲',en:'a large area of trees',ja:'森',ru:'лес',es:'bosque'}},
{id:'en.n.river',word:'river',pos:'n',meaning:{ko:'강',en:'a natural stream of water',ja:'川',ru:'река',es:'río'}},
{id:'en.n.bridge',word:'bridge',pos:'n',meaning:{ko:'다리',en:'a structure for crossing a gap',ja:'橋',ru:'мост',es:'puente'}},
{id:'en.n.courage',word:'courage',pos:'n',meaning:{ko:'용기',en:'bravery in the face of fear',ja:'勇気',ru:'смелость',es:'valentía'}},
{id:'en.n.garden',word:'garden',pos:'n',meaning:{ko:'정원',en:'a place for growing flowers',ja:'庭',ru:'сад',es:'jardín'}},
{id:'en.n.shield',word:'shield',pos:'n',meaning:{ko:'방패',en:'protection carried in battle',ja:'盾',ru:'щит',es:'escudo'}},
{id:'en.n.castle',word:'castle',pos:'n',meaning:{ko:'성',en:'a large fortified building',ja:'城',ru:'замок',es:'castillo'}},
{id:'en.n.star',word:'star',pos:'n',meaning:{ko:'별',en:'a distant light in the night sky',ja:'星',ru:'звезда',es:'estrella'}},
{id:'en.n.journey',word:'journey',pos:'n',meaning:{ko:'여정',en:'travel from one place to another',ja:'旅',ru:'путешествие',es:'viaje'}}
];
export const ROUTES=[{id:0,from:0,to:1,words:WORDS.slice(0,5).map(w=>w.id),name:'forest0'}, {id:1,from:1,to:2,words:WORDS.slice(5).map(w=>w.id),name:'forest1'}];
export const EQUIPMENT=[{id:'sword',name:'sword',type:'knight',weight:2,power:0,cost:0},{id:'staff',name:'staff',type:'mage',weight:2,power:0,cost:0},{id:'silverSword',name:'silverSword',type:'knight',weight:4,power:9,cost:70,town:1},{id:'oakStaff',name:'oakStaff',type:'mage',weight:4,power:9,cost:70,town:1},{id:'guardianSword',name:'guardianSword',type:'knight',weight:6,power:16,cost:110,town:2},{id:'moonStaff',name:'moonStaff',type:'mage',weight:6,power:16,cost:110,town:2}];
export const MONSTERS=[{name:'slime',sprite:0,hp:26},{name:'wolf',sprite:1,hp:49},{name:'golem',sprite:2,hp:72},{name:'goldSlime',sprite:3,hp:120}];
export const wordById=id=>WORDS.find(w=>w.id===id);
export const meaning=(w,lang)=>w.meaning[lang]||w.meaning.en;
