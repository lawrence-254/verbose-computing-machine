import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IoSearchCircleOutline } from "react-icons/io5";
import logoImage from '../../assets/d.png';

const HeaderContainer = styled.div`
height: 80px;
background-color: #3333;
width: 1440px;
padding: 0 80px 0 80px;
max-width: 2520px;
position: fixed;
top: 0;
left: 0;
display: flex;
align-items: center;
justify-content: space-between;
z-index: 1;
transform: none;
transition: all 0s ease 0s;
outline: #6666 dashed 1px;
box-sizing: border-box;
`;

const HeaderLogo = styled.div`
display: flex;
align-items: center;
background-color: #6161;
`;

const HeaderSearch = styled.div`
display: flex;
align-items: center;
background-color: #6666;
height: 66px;
width:284px;
padding: 14px 32px 14px 32px;

`;
const InputField = styled.input`
  flex: 1;
  border: none;
  outline: none;
`;

const SearchIcon = styled(IoSearchCircleOutline)`
  margin-right: 5px;
  color: #888;
`;


const HeaderNav = styled.div`
display: flex;
align-items: center;
background-color: #6161;
`;

const Header = () => {
  return (
    <HeaderContainer>
        <HeaderLogo>
            <img src={logoImage} style={{ width: "150px", height: "75px", borderRadius: "10px" }} />
        </HeaderLogo>

        <HeaderNav>
        <span>
          <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
            <Link to="/about">
            <li>About</li>
          </Link>
              <li>Shop</li>
          </ul>
        </span>
        <Link to="/login">
            <button style={{ width: "100px", height: "30px", borderRadius: "10px" }}>Login</button>
            </Link>
            <Link to="/register">
            <button style={{ width: "100px", height: "30px", borderRadius: "10px" }}>Register</button>
            </Link>
        </HeaderNav>
           <HeaderSearch>
      <InputField type="text" placeholder="Search" />
         <SearchIcon />
        </HeaderSearch>
    </HeaderContainer>
  )
}

export default Header
