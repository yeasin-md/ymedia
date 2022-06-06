import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { FaRegUser, FaSearch, FaYoutubeSquare } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../../redux/userRedux';
const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const items = useSelector(state => state.video.videos);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    const d = new Date();
    const time = d.getHours();

    if (time < 12) {
      setGreeting('Good morning');
    }
    if (time > 12) {
      setGreeting('Good afternoon');
    }
    // if (time < 5) {
    //   setGreeting("Good Evening");
    // }
    if (time === 12) {
      setGreeting('Go eat lunch');
    }
  }, []);

  const handleFilter = event => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = items.filter(value => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const logOut = e => {
    e.preventDefault();
    dispatch(logoutSuccess());
  };
  return (
    <div
      style={{ display: window.location.pathname === '/signin' ? 'none' : '' }}
    >
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" className="link" style={{ textDecoration: 'none' }}>
            yMedia
            <FaYoutubeSquare />
          </Link>
        </div>{' '}
        <div className="nav-search" style={{ flexDirection: 'column' }}>
          <div className="nav-searchBar">
            <input
              className="nav-search-input"
              type="search"
              value={wordEntered}
              onChange={handleFilter}
              name=""
              id=""
            />
            <div className="search-icon">
              <FaSearch />
            </div>
          </div>{' '}
          {filteredData.length !== 0 && (
            <div className="dataResult">
              {filteredData.slice(0, 15).map((value, key) => {
                return (
                  <Link
                    key={key}
                    className="dataItem"
                    // onClick={() => history.push(`/video/${value._id}`)}
                    to={`/video/${value._id}`}
                  >
                    <p>{value.title} </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <div className="nav-account">
          {!user ? (
            <Link to="/signin">
              <span>
                Sign In <FaRegUser />
              </span>
            </Link>
          ) : (
            <>
              <span onClick={logOut}>
                {' '}
                Log Out <FaRegUser />
              </span>
            </>
          )}
        </div>
      </div>
      <div className="nav-container-2">
        <div className="nav-part1">
          <div className="nav-logo">
            <Link to="/">
              yMedia <FaYoutubeSquare />
            </Link>
          </div>{' '}
          <div className="nav-account">
            {!user ? (
              <Link to="/signin">
                <span>
                  Sign in <FaRegUser />
                </span>
              </Link>
            ) : (
              <span onClick={logOut}>
                {' '}
                Log Out <FaRegUser />
              </span>
            )}
          </div>
        </div>
        <div className="nav-part2">
          <div className="p">
            {greeting}, {user ? user.username : 'Hello'}
          </div>
          <div className="nav-search">
            <div className="nav-searchBar">
              <input
                className="nav-search-input"
                type="search"
                value={wordEntered}
                onChange={handleFilter}
              />
              <div className="search-icon">
                <FaSearch />
              </div>
            </div>
            {filteredData.length !== 0 && (
              <div className="dataResult">
                {filteredData.slice(0, 15).map((value, key) => {
                  return (
                    <Link
                      key={key}
                      className="dataItem"
                      to={`/video/${value._id}`}
                    >
                      <p>{value.title} </p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
