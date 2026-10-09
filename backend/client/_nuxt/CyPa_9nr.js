import{O as e,Ot as t,Q as n,T as r,_t as i,dt as a,xt as o}from"./BWrpnPTY.js";import{Ct as s}from"./BWFlmDX6.js";import{t as c}from"#entry";import{t as l}from"./CyNZ0QJR.js";var u={class:`bg`},d={class:`wrapper`},f={class:`box`},p=[`innerHTML`],m={class:`box`},h=[`innerHTML`],g=c({__name:`test`,setup(c){let{graphql:g}=l(),_=o(`
query {
  user(id:1) {
    skills {
      id
      title
    }
  }
}
`),v=o(`
query {
  user(id:1) {
    id
    nickName
    skillGroups {
      id
      title
      skills {
        id
        title
      }
    }
  }
}
`),y=async()=>{let e=await g(_.value);x.value=JSON.stringify(e,null,2)},b=async()=>{let e=await g(v.value);S.value=JSON.stringify(e,null,2)},x=o(``),S=o(``);return(o,c)=>(n(),e(`div`,u,[r(`div`,d,[r(`div`,f,[r(`code`,{innerHTML:t(_)},null,8,p),r(`div`,null,[r(`button`,{onClick:c[0]||=e=>y()},`Test`)]),r(`div`,null,[a(r(`textarea`,{"onUpdate:modelValue":c[1]||=e=>i(x)?x.value=e:null},null,512),[[s,t(x)]])])]),r(`div`,m,[r(`code`,{innerHTML:t(v)},null,8,h),r(`div`,null,[r(`button`,{onClick:c[2]||=e=>b()},`Test`)]),r(`div`,null,[a(r(`textarea`,{"onUpdate:modelValue":c[3]||=e=>i(S)?S.value=e:null},null,512),[[s,t(S)]])])])])]))}},[[`__scopeId`,`data-v-a0aea1f5`]]);export{g as default};