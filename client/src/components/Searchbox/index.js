import React,{useState,useEffect,useRef} from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import './style.css';

const Searchbox = () => {
    let history = useHistory();
    let location = useLocation()
    const [searchInput,setSearchInput]= useState("")
    const filterRef = useRef();

    useEffect(()=>{
        if((location.pathname.slice(0,7) !=="/search") && (searchInput !== "")){
            setSearchInput('')
        }
    },[location.pathname])

    useEffect(() => {
        if((searchInput === "") && (location.pathname !== "/browse")){
            history.push('/browse')
        }
        let delayTimeOutFunction;
        if(!filterRef.current) {
            filterRef.current = true;
        } else { 
            if(searchInput!==""){delayTimeOutFunction = setTimeout(() => {
                history.push(`/search/${searchInput}`)
            }, 600);}
        }
        return () => clearTimeout(delayTimeOutFunction);// eslint-disable-next-line
    }, [searchInput]);


    return (
        <div className={`search-box`}>
            <input id="searching" type="text" placeholder="Type for search" value={searchInput} onChange={e =>setSearchInput(e.target.value)}/>
            {(searchInput==="") ? <label htmlFor="searching" className="search-icon"><i className="fas fa-search"></i></label> : <label className="search-icon" onClick={()=>setSearchInput("")}><i className="fas fa-times"></i></label>}
        </div>
    );
};

export default Searchbox;
