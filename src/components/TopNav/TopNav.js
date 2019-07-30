import React from 'react'
import styled from 'styled-components'
// import Login from './Login'
// import SignUp from './SignUp'

const Wrapper = styled.div`
text-align: right;
margin: 0;
padding:0;
display: flex
justify-content: right;
max-height: 10vh;
float:right;
margin:0;
`

const TopNavList = styled.ul`
padding: 10px;
padding-left:15px;
padding-bottom: 5px;
padding-top: 0;
color: gray;
margin-right: 5px;
margin-bottom: 5px;
margin-top:0;
`

const TopNavLi = styled.li`
  border-bottom: 1px solid gray;
  margin-left: 25px;
  list-style-type: none;
  float:right;
  font-weight: 300;
  cursor: pointer;
  
  :hover{
    color: #6a6767
    border-bottom: 2px solid #a9a9a9
    transition: border .3s color .3s;
  }

  :after {
    display:block;
    content: '';
    border-bottom: solid 3px #a9a9a9;  
    transform: scaleX(0);  
    transition: transform 250ms ease-in-out;
  }

   :hover:after { transform: scaleX(1); }
    li.fromRight:after{ transform-origin:100% 50%; }
    li.fromLeft:after{  transform-origin:  0% 50%; }
`

function TopNav () {
  const about = () => {
    alert("I haven't gotten here yet!")
  }

  // TODO: There is a bug with the Modals, type, close modal, then try typing again.
  return (
    <Wrapper>
      <TopNavList>
        {/* <Login /> */}
        {/* <SignUp /> */}
        <TopNavLi className='fromLeft' onClick={about}>About</TopNavLi>
      </TopNavList>
    </Wrapper>
  )
}

export default TopNav
