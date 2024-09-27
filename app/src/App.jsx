import { useEffect, useState } from 'react';
import styled from 'styled-components'
import SearchResult from './Components/SearchResult/SearchResult';
export const BASE_URL="http://localhost:9000";
const App = () => {

const [data,setDate]=useState(null);
const [loading,setLoading]=useState(false);
const [err,setErr]=useState(null);
const [filterData,setFilterData]=useState(null);
const [selectedBtn,setSelectedBtn]=useState("all");


useEffect(()=>{
  const fetchFoodData= async()=>{
    setLoading(true);
    try{
      const response=await fetch(BASE_URL)
      const json=await response.json();
      setDate(json);
      setFilterData(json)
      setLoading(false);
    }catch(err){
    setErr(err);
    }
    }
fetchFoodData();
},[])
const searchFood=(e)=>{
const searchValue=e.target.value;

if(searchValue===""){
setFilterData(null);
}
const filter=data?.filter((food)=>food.name.toLowerCase().includes(searchValue.toLowerCase()));
setFilterData(filter)
}


const filterFood=(type)=>{
if(type==="all"){
setFilterData(data)
setSelectedBtn("all")
return;
}
const filter=data?.filter((food)=>food.type.toLowerCase().includes(type.toLowerCase()));
setFilterData(filter)
setSelectedBtn(type)

}




const filterBtns=[
{
name:"All",
type:"all"
},
{
  name:"Breakfast",
  type:"breakfast"
  },

  {
    name:"Lunch",
    type:"lunch"
    },
    {
      name:"Dinner",
      type:"dinner"
      },
]






if(err)return<div>{err}</div>;
if(loading)return<div>Loading......</div>



return<>


 < Container>
<TopContainer>
<div className='logo'>
<img src="/imgs/logo.png" alt="Logo Img" />
</div>
<div className='search'>
<input onChange={searchFood} type="text" placeholder='Search Food' />

</div>
</TopContainer>
<FilterContainer>
{
filterBtns.map((value)=>(
<Button key={value.name} onClick={()=>filterFood(value.type)}>{value.name}</Button>

))

}

</FilterContainer>

</Container>;
<SearchResult data={filterData}/>
</>

};

export default App;
export const Container=styled.div`
max-width: 1200px;
margin:0 auto;

`

const TopContainer=styled.section`
min-height: 140px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;
.search{
input{
  background-color: transparent;
border: 1px solid red;
color: #fff;
border-radius: 5px;
height: 40px;
font-size: 1rem;
padding: 0 10px;
&::placeholder{
color: #fff;
}
}
}
@media(0<width<600px){
flex-direction: column;

}


`
const FilterContainer=styled.section`
display: flex;
justify-content: center;
gap: 12px;
padding-bottom: 40px;

`;
export const Button=styled.button`
background-color  :#ff4343 ;
border-radius: 5px;
padding: 6px 12px;
border: none;
color: #fff;
cursor: pointer;
&:hover{
background-color: #f22f2f;
}
`

